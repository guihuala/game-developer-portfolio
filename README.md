# Game Developer Portfolio | 游戏开发作品集

This is a personal game developer portfolio built with React, Tailwind CSS, and Framer Motion. It showcases various game projects, development skills, and a unique interactive 3D osmanthus (桂花) model.

这是一个使用 React, Tailwind CSS 和 Framer Motion 构建的个人游戏开发作品集。它展示了各种游戏项目、开发技能以及一个独特的交互式 3D 桂花模型。

## Highlights

- **Interactive 3D Elements:** Uses `@react-three/fiber` and `@react-three/drei` to render an interactive floating osmanthus flower model.
- **Dynamic Project Gallery:** A smoothly animated project gallery showcasing details of multiple game development works.
- **Responsive Layout:** fully responsive and beautifully styled using Tailwind CSS.
- **Fluid Animations:** Page transitions and component micro-animations powered by `motion/react` (Framer Motion).

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 自動部署到 GitHub Pages

工作流位於 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)，使用 GitHub 內建授權，不需要額外設定部署密鑰。

首次使用：

1. 在 GitHub 倉庫的 **Settings → Pages → Build and deployment**，將 **Source** 設為 **GitHub Actions**。
2. 將這些變更提交並推送到 `main`，工作流會安裝依賴、執行 TypeScript 檢查、建置並部署 `dist`。
3. 在 **Actions → Deploy to GitHub Pages** 查看結果；部署成功後可從 `github-pages` 環境開啟網站。預設網址為 https://guihuala.github.io/game-developer-portfolio/ 。

之後每次推送到 `main` 都會自動部署，也可在 Actions 頁面使用 **Run workflow** 手動觸發。針對 `main` 的 Pull Request 只執行檢查和建置；檢查失敗時不會部署。

工作流會根據 Pages 設定取得網站子路徑，並啟用 hash 路由（例如 `/#/works`），支援直接開啟或重新整理內頁。圖片和 3D 模型也會使用相同的部署路徑。一般本機開發仍使用原有路由。

本機驗證相同的部署建置：

```bash
npm ci
npm run lint
BASE_PATH=/game-developer-portfolio/ VITE_GITHUB_PAGES=true npm run build
npm run preview
```

開啟 http://localhost:4173/game-developer-portfolio/ 。本地圖片路徑在內容設定中使用 `assetUrl('/檔案名稱')`，外部圖片網址可保持原樣。

參考：[Vite 的 GitHub Pages 部署說明](https://vite.dev/guide/static-deploy#github-pages)。
