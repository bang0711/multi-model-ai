This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone the project

```bash
git clone https://github.com/bang0711/multi-model-ai.git
```

Install all dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Create .env files

```bash
touch .env
```

Paste the environment variables

```bash
OPENAI_API_KEY='ollama'
OPENAI_BASE_URL='http://localhost:11434/v1'
DEFAULT_MODEL='gemma'
```

Alternatively:

```bash
OPENAI_API_KEY='sk-<YOUR_KEY>'
OPENAI_BASE_URL='https://api.openai.com/v1'
DEFAULT_MODEL='<YOUR_MODEL>'
```

Run the server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
