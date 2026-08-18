import { defineConfig, loadEnv, type Plugin } from 'vite'
import { join } from 'node:path'
import { watch, type FSWatcher } from 'node:fs'
// import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import electronSimple from 'vite-plugin-electron/simple'
import { promisify } from 'node:util'
import { exec } from 'node:child_process'
import { resolve } from 'node:path'

const __dirname = import.meta.dirname

const type = process.env.VITE_TYPE
const isH5 = type === 'h5'

const execPromise = promisify(exec)

// Debounce helper
function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout | undefined
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => fn(...args), delay)
    }
}

// Custom plugin: watch the image directory and convert automatically
function autoImg2AvifPlugin(): Plugin {
    let watcher: FSWatcher | undefined
    let running = false

    const runImg2Avif = debounce(async () => {
        if (running) return
        running = true
        console.log('[img2avif] Image change detected; starting conversion...')
        try {
            const { stdout, stderr } = await execPromise('pnpm run img2avif', {
                cwd: __dirname,
            })
            if (stdout) console.log(stdout)
            if (stderr) console.error(stderr)
            console.log('[img2avif] Conversion complete')
        } catch (error) {
            console.error('[img2avif] Conversion failed:', error)
        } finally {
            running = false
        }
    }, 500)

    return {
        name: 'auto-img2avif',
        apply: 'serve',
        configureServer(server) {
            const imagesDir = resolve(__dirname, 'src/assets/images')
            console.log(`[img2avif] Watching: ${imagesDir}`)

            watcher = watch(imagesDir, { recursive: true }, (_event, filename) => {
                if (filename && /\.(png|jpe?g)$/i.test(filename.toString())) {
                    runImg2Avif()
                }
            })

            server.httpServer?.once('close', () => {
                watcher?.close()
                watcher = undefined
            })
        },
    }
}

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production'
    const sourcemap = mode === 'development'
    const env = loadEnv(mode, process.cwd(), 'VITE_')

    return {
        // base: join(__dirname, 'src'),
        // base: './',
        resolve: {
            alias: {
                '@': join(__dirname, 'src'),
            },
        },
        plugins: [
            // svelte(),
            sveltekit(),
            tailwindcss(),
            autoImg2AvifPlugin(),
            isH5
                ? null
                : electronSimple({
                      main: {
                          entry: join(__dirname, 'electron/main/index.ts'),
                          onstart({ startup }) {
                              startup(['.'], { cwd: __dirname })
                          },
                          vite: {
                              build: {
                                  sourcemap,
                                  minify: isProduction,
                                  outDir: join(__dirname, 'dist-electron/main'),
                                  rollupOptions: {
                                      output: {
                                          format: 'cjs',
                                          entryFileNames: '[name].cjs',
                                      },
                                  },
                              },
                          },
                      },
                      preload: {
                          input: join(__dirname, 'electron/preload/index.ts'),
                          vite: {
                              build: {
                                  sourcemap,
                                  minify: isProduction,
                                  outDir: join(__dirname, 'dist-electron/preload'),
                              },
                          },
                      },
                  }),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/variables.scss" as *;`,
                },
            },
        },
        // build: {
        //     outDir: join(__dirname, 'dist'),
        //     emptyOutDir: true,
        // },
        server: {
            port: 3000,
            host: '0.0.0.0',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            cors: true,
            proxy: {
                '/api': {
                    target: env.VITE_HOST,
                    ws: false,
                    secure: false,
                    changeOrigin: true,
                },
                '/ws/connect': {
                    target: env.VITE_HOST_MSGWS,
                    changeOrigin: true,
                    ws: true, // Required for the WebSocket handshake to succeed
                    secure: false,
                    // Optional: remove the proxy prefix from the path if needed
                    // rewrite: (path) => path.replace(/^\/ws-proxy/, ''),
                },
            },
        },
    }
})
