import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react({ babel: { babelrc: true } })],
    server: {
        hmr: process.env.GITPOD_WORKSPACE_URL
        ? {
            // removes the protocol and replaces it with the port we're connecting to
            host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
            protocol: 'wss',
            clientPort: 443
        }
        : true
    }
});
