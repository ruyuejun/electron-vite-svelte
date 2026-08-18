export const prerender = true
export const ssr = false

export function load() {
    if (typeof window !== 'undefined') {
        // window.location.href = '/dashboard';
    }
    return {}
}
