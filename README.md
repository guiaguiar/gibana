This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key (required for server actions)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Your Stripe publishable key (required for Stripe Pricing Table)
NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID=prctbl_... # Your Stripe Pricing Table ID (get from Stripe Dashboard)
NEXT_PUBLIC_BASE_URL=http://localhost:3000 # Your app URL (for production, use your actual domain)
```

**Important:** 
- Get your Stripe keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- Create a Pricing Table in Stripe Dashboard (Settings → Billing → Pricing tables) and copy the ID
- Set `NEXT_PUBLIC_BASE_URL` to your production domain when deploying
- **Note:** This app uses Stripe as the only source of truth for users. No custom authentication or user database is needed.

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

## Architecture

This application uses a **Stripe-Hosted** approach, meaning:

- **No Custom Authentication**: Stripe is the only source of truth for users
- **Email-Based Access**: Users manage subscriptions by entering their email
- **Stripe Customer Portal**: All subscription management happens in Stripe's hosted portal
- **Stripe Pricing Table**: Sign-ups are handled through Stripe's Pricing Table component
- **Server-Side Security**: All Stripe API calls (using secret key) happen in Next.js Server Actions only

## Payments & Subscriptions

The app uses **Stripe-Hosted** solutions for a secure and low-maintenance payment experience:

### Sign Up Flow

1. Users visit the homepage and see the **Stripe Pricing Table**
2. Clicking any plan in the pricing table redirects to **Stripe Checkout**
3. Stripe automatically creates a customer record during checkout
4. After successful payment, users are redirected back to the homepage

### Managing Subscriptions

1. Users click the account icon in the top-left corner (or visit `/minha-conta`)
2. They enter their email address
3. The app looks up the customer in Stripe by email
4. If found, a **Stripe Customer Portal** session is created
5. Users are redirected to the portal where they can:
   - View all subscriptions
   - Update payment methods
   - Cancel subscriptions
   - View billing history
   - Update billing information

### If Customer Not Found

If a user enters an email that doesn't exist in Stripe, they see a friendly message:
> "Nenhum cliente encontrado. Você precisa ter uma assinatura ativa para gerenciar sua conta. Por favor, assine primeiro!"

With a link to return to the pricing page.

### Benefits of Stripe-Hosted Approach

- **Security**: All sensitive payment data is handled by Stripe
- **Low Maintenance**: No need to build or maintain custom billing UI or authentication
- **Always Up-to-Date**: Stripe automatically updates the portal with new features
- **Compliance**: Stripe handles all PCI compliance requirements
- **Single Source of Truth**: Stripe is the only database needed for customers

### Routes

- `/` - Homepage with product showcase and Stripe Pricing Table
- `/minha-conta` - Simple page with email input to access Stripe Customer Portal

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
