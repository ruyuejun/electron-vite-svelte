import { mount } from 'svelte'
import App from './App.svelte'

console.log('ello World')

const app = mount(App, {
    target: document.getElementById('app')!,
})

export default app
