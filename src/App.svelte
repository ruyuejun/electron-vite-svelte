<script lang="ts">
    let count = $state(0)

    function increment() {
        count++
    }
</script>

<main>
    <div class="container">
        <h1>Electron + Svelte + TypeScript</h1>
        <div class="card">
            <button onclick={increment}>
                Count is {count}
            </button>
            <p>
                Edit <code>src/App.svelte</code> to test hot module replacement
            </p>
        </div>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family:
            -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue',
            sans-serif;
        background: #1a1a1a;
        color: #f0f0f0;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        padding: 2rem;
    }

    .container {
        text-align: center;
        max-width: 600px;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .card {
        padding: 2rem;
        background: #242424;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }

    button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 500;
        color: white;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
    }

    button:active {
        transform: translateY(0);
    }

    p {
        margin-top: 1.5rem;
        color: #a0a0a0;
    }

    code {
        padding: 0.2rem 0.4rem;
        background: #1a1a1a;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        color: #667eea;
    }
</style>
