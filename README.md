# HTML Bundler

Production Cloudflare Worker that folds `index.html`, `styles.css`, and `script.js` into one self-contained HTML5 file.

Live target: https://html-bundler.registermysite.com
Studio: https://html-studio.registermysite.com
Repo: https://github.com/RegisterMySite-com/html-bundler

Shaped like Cloudflare llm-chat-app-template (module Worker + public assets + Workers AI) plus Durable Objects and R2.

See DEPLOY.md for ship steps. Studio browser calls only `/api/export-to-bundler` on the studio origin; the studio Worker signs the body and posts to `/api/import-from-studio`.
