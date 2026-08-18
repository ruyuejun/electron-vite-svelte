<script lang="ts">
    let count = $state(0)

    function increment() {
        count++
    }
</script>

<div class="flex flex-col items-center gap-4 p-6 rounded-lg bg-brand-50 border border-brand-200">
    <h2 class="text-2xl font-semibold text-brand-700">计数器</h2>
    <div class="text-4xl font-bold text-brand-600">{count}</div>
    <button
        onclick={increment}
        class="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-md hover:shadow-lg active:scale-95"
    >
        点击 +1
    </button>
</div>
