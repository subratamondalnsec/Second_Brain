# Second Brain AI — Frontend

Next.js (App Router) + TypeScript frontend for authentication flow and dashboard UI.

## Tech Stack

- Next.js
- React + TypeScript
- Tailwind CSS
- Axios

## Project Structure

```text
Frontend/
	app/
		(auth)/
			login/page.tsx
			signup/page.tsx
		dashboard/page.tsx
		layout.tsx
		page.tsx
		globals.css
	context/
		AuthContext.tsx
	hooks/
		useAuth.ts
	lib/
		api.ts
		auth.ts
		utils.ts
	types/
		auth.ts
	.env.local
	next.config.mjs
	tsconfig.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add `.env.local`:

```env
NEXT_PUBLIC_API_URL=/api
```

3. Start dev server:

```bash
npm run dev
```

Frontend runs at: `http://localhost:3000`

## Routes

- `/` → redirects based on auth state
- `/login`
- `/signup`
- `/dashboard` (protected in client logic)

## Auth Flow

- Token key in localStorage: `sb_token`
- User key in localStorage: `sb_user`
- `AuthProvider` manages:
	- `user`
	- `isAuthenticated`
	- `isLoading`
	- `signup`, `login`, `logout`

## Backend Connection

The frontend API client uses `NEXT_PUBLIC_API_URL` from `.env.local`.

Current setup uses:

- `NEXT_PUBLIC_API_URL=/api`
- Rewrite proxy in `next.config.mjs` from `/api/:path*` to `http://localhost:5000/api/:path*`

If you do not want proxy mode, set this instead:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Useful Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — lint code
- `npm run typecheck` — TypeScript check
