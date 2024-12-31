import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        coverage: {
            // you can include other reporters, but 'json-summary' is required, json is recommended
            reporter: ['text', 'json-summary', 'json'],
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@/__test__': path.resolve(__dirname, '__test__'),
        },
    },
})
