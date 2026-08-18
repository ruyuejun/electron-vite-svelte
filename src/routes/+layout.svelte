<script lang="ts">
    import '@/app.css'
    import { onMount } from 'svelte'

    let { children } = $props()

    onMount(() => {})
</script>

<div class="min-h-screen w-full">
    {@render children()}
</div>
