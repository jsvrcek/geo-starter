import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            // Your API endpoint
            '/api': {
                target: 'http://api:8000/',
                changeOrigin: true,
            },
        },
        host: true,
    },
    plugins: [react()],
});
