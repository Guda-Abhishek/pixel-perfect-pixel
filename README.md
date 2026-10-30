# Pixel Perfect Pixel

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e57d50c9-d7ca-4bc6-8c2b-1c145ec53a9b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## AI chatbot configuration

The portfolio chatbot API is handled server-side by `src/routes/api/chat.ts` and uses the OpenAI Responses API only. Lovable AI is currently paused and is not used as a fallback.

### Local development

1. Copy `.env.example` to `.env.local`.
2. Put your key in `.env.local` as `OPENAI_API_KEY=your_real_key`.
3. Restart the development server.

`.env`, `.env.local`, and other real environment files are ignored by Git. Never put an API key in React components, client-side variables such as `VITE_OPENAI_API_KEY`, source files, screenshots, issues, or public repositories.

### Deployment

Add `OPENAI_API_KEY` as a **server-side environment secret** in the hosting provider's dashboard, then redeploy. Do not put the secret into frontend build variables. No Lovable AI key is needed while Lovable AI is paused. OpenAI API access and usage billing are managed separately from ChatGPT subscriptions.

## Private resume administration

The private admin routes are protected in the server entry before TanStack renders them. Unauthenticated requests to `/admin/resumes` and `/api/admin/*` receive a generic 404. The only public admin screen is `/admin/login`; it does not appear in public navigation.

### Configure local admin access

1. Copy `.env.example` to `.env.local`.
2. Set `PORTFOLIO_ADMIN_PASSWORD` to a strong, unique password.
3. Generate a separate signing secret using `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` and put it in `PORTFOLIO_ADMIN_SESSION_SECRET`.
4. Restart the development server, then open `/admin/login`.

Never commit `.env.local`, and do not use `VITE_` prefixes for admin secrets. Configure both values as server-side deployment secrets before deploying. The session cookie is HttpOnly, SameSite=Strict, signed, and expires after eight hours. Login attempts are rate-limited per process; configure an additional edge/platform rate limit for production.

### Current scope

Authentication and the protected Resume Manager shell are in place. Resume upload, private persistent object storage, document parsing, review/approval, and publishing are not yet connected. They must be implemented against a private storage service before the manager can accept real resumes. Do not upload original resumes into public assets or commit them to Git.
