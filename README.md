This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
JWT_SECRET=your-secret-key-change-in-production # A random secret string for JWT signing (use a strong random string in production)
NEXT_PUBLIC_BASE_URL=http://localhost:3000 # Your app URL (for production, use your actual domain)
```

**Important:** 
- Get your Stripe secret key from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- Generate a strong JWT_SECRET (you can use: `openssl rand -base64 32`)
- Set `NEXT_PUBLIC_BASE_URL` to your production domain when deploying

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

The app includes a complete authentication system integrated with Stripe:

- **Sign Up**: Creates a new user account and a Stripe customer
- **Sign In**: Authenticates existing users
- **Session Management**: Uses secure HTTP-only cookies with JWT tokens
- **User Storage**: Currently uses file-based storage (`/data/users.json`) - easy to migrate to a database later

### Features

- Password hashing with bcrypt
- Secure session management with JWT
- Automatic Stripe customer creation on signup
- User menu with logout functionality

## Payments & Subscriptions

The app integrates with Stripe Checkout for secure payment processing:

- **Stripe Checkout**: All payments are processed on Stripe's secure checkout page
- **Automatic Mode Detection**: Supports both subscription and one-time payments
- **Customer Association**: Logged-in users are automatically associated with their Stripe customer
- **Subscription Management**: View all active subscriptions on `/minha-conta` page

### How It Works

1. Users browse products on the homepage
2. Clicking "Assinar" or "Comprar" redirects to Stripe Checkout
3. After successful payment, users are redirected to `/minha-conta`
4. The `/minha-conta` page displays all active subscriptions with:
   - Product details
   - Subscription status
   - Next payment date
   - Price information

### Protected Routes

- `/minha-conta` - Requires authentication, redirects to homepage if not logged in

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
