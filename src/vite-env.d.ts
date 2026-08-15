/// <reference types="svelte" />
/// <reference types="vite/client" />

interface Window {
    electronAPI: {
        platform: NodeJS.Platform
    }
}
