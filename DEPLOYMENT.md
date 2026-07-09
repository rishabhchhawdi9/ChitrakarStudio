# GitHub Pages Deployment Guide

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

### 1. Configure GitHub Pages

1. Go to your repository settings: https://github.com/rishabhchhawdi9/ChitrakarStudio/settings/pages
2. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This allows the workflow to deploy automatically

### 2. Automatic Deployment

The project is configured with an automated GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

- Triggers on every push to the `main` branch
- Installs dependencies
- Builds the project to the `dist` folder
- Deploys to GitHub Pages

**No additional setup needed!** Just push to `main` and the workflow handles the rest.

### 3. Manual Deployment (if needed)

To manually build and deploy:

```bash
npm run build
```

This creates a `dist` folder with all static files ready for deployment.

## Project Structure

- **`src/`** - Source code (React components, routes, styles)
- **`public/`** - Static assets
- **`dist/`** - Build output (generated, not committed)
- **`.github/workflows/`** - GitHub Actions deployment script

## Framework

This project uses:
- **TanStack Start** - Full-stack React framework
- **Vite** - Fast build tool
- **React** - UI library
- **TailwindCSS** - Styling

## Troubleshooting

### README still showing on GitHub Pages

1. Wait 5-10 minutes for the first deployment
2. Check the "Actions" tab to see if the workflow ran successfully
3. Visit your site at: https://rishabhchhawdi9.github.io/ChitrakarStudio/

### Build fails

- Check the Actions tab for error logs
- Ensure all dependencies are up to date: `npm install`
- Verify `GEMINI_API_KEY` is set if your app needs it

## Environment Variables

If your app needs the `GEMINI_API_KEY`:

1. Go to Settings → Secrets and variables → Actions
2. Create a new secret: `GEMINI_API_KEY` with your API key value
3. Update the workflow to use it:

```yaml
- name: Build project
  env:
    GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  run: npm run build
```

## More Information

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [TanStack Start Documentation](https://tanstack.com/start/latest)
- [Vite Documentation](https://vitejs.dev/)
