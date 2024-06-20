# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Only allowed PORT is 3999 so make sure to run this project on this port:

```bash
export PORT=3999
```

## Development Environment

set the domain as ENV VARIABLE which you want to run

```bash
export DEFAULT_PAGE_DOMAIN=lahore.abbitest1.com
```

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Generate fully static site:

```bash
npm run generate
npx serve dist -p 3999
```

Run this command if you got heap out of memory exception:

```bash
export NODE_OPTIONS='--max_old_space_size=6144'
```

For Node=20> bug workaround, mostly happened in code pipelines i.e gitlab CI:

```bash
export NODE_OPTIONS='--no-network-family-autoselection'
```

For serving the project after statically generating run:

```bash
npx serve dist
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
