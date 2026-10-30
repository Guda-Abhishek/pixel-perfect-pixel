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
