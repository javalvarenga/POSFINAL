import { defineConfig } from 'vite';
import react  from '@vitejs/plugin-react';
import * as path from 'path';
import { existsSync } from 'fs';
import * as dotenv from 'dotenv';

// Dotenv
dotenv.config({
    path: existsSync('.env') ? '.env' : path.resolve('envs', `.env.${process.env.NODE_ENV}`)
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@@': path.resolve(__dirname),
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        cors: true,
        port: process.env.VITE_PORT as unknown as number,
        hmr: {
            host: 'localhost',
            protocol: 'ws',
            port: process.env.VITE_PORT as unknown as number
        }
    }
});
