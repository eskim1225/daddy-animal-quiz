import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // GitHub Pages 배포 시 빌드 모드일 때만 '/daddy-animal-quiz/' 경로 사용
  // 로컬 개발 서버(npm run dev)에서는 루트('/') 경로를 사용하여 접속 편의성 유지
  base: command === 'build' ? '/daddy-animal-quiz/' : '/',
}))
