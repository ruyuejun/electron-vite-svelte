<script lang="ts">
    import Counter from '@/lib/components/Counter.svelte'
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-brand-50 to-ink-50 p-8">
    <div class="max-w-2xl w-full space-y-8">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-brand-700 mb-2">Demo Router 页面</h1>
            <p class="text-ink-600">这是一个演示路由页面，包含计数器组件</p>
        </div>

        <div class="flex justify-center">
            <Counter />
        </div>

        <div class="text-center">
            <a
                href="/"
                class="inline-block px-6 py-3 bg-ink-700 text-white rounded-lg hover:bg-ink-800 transition-colors shadow-md hover:shadow-lg">
                返回首页
            </a>
        </div>
    </div>
</div>
