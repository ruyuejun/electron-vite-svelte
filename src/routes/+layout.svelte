<script lang="ts">
    import '@/app.css'
    import { onMount } from 'svelte'

    let { children } = $props()

    onMount(() => {})
</script>

<div class="relative z-10 flex min-h-screen">
    {@render children()}
</div>
