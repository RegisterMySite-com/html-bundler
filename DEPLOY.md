# Deploy HTML Bundler

```bash
cd html-bundler
npm install
npx wrangler r2 bucket create html-bundler
npx wrangler secret put IMPORT_HMAC
npx wrangler deploy
```

Attach custom domain html-bundler.registermysite.com. Use the same IMPORT_HMAC as html-studio.
