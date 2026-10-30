# Steadfast Home Care — Next.js migration

Migration of the original single-file GitHub Pages website to Next.js App Router, TypeScript, and reusable React components. Preserves the service descriptions and contact details from the original source, while correcting broken telephone/email links and replacing `mailto:` form submission with an API endpoint.

## Quick start

1. Install Node.js 20.9+ (Node 22 LTS recommended).
2. Run `npm install` and `npm run dev`.
3. Visit http://localhost:3000.
4. Run `npm run typecheck` and `npm run build` before opening the PR.

## Deploy on Vercel

1. Push the migrated files to your `nextjs-migration` branch in the repository root.
2. Import the GitHub repository into Vercel (Framework Preset: Next.js; root directory: `./`).
3. Set the environment variables described below. Deploy the branch to a **preview** URL first.
4. Test mobile and desktop layout, all links, and a real contact form submission.
5. Merge the PR once approved, then connect `steadfasthomecares.com` and `www.steadfasthomecares.com` in Vercel > Project > Settings > Domains.
6. Update DNS at Squarespace *only to the exact records shown in Vercel*. Keep mail-related MX/SPF/DKIM records intact. Remove conflicting GitHub Pages A/AAAA/CNAME records when cutover is ready.
7. Disable GitHub Pages under GitHub > Settings > Pages once the new domain is serving from Vercel.

### Contact form setup

The form POSTs to `/api/contact` and uses Resend's email API. Create a Resend account, verify the sending domain, and add the following in Vercel environment settings:

- `RESEND_API_KEY` — server-only API key; never prefix with NEXT_PUBLIC_.
- `CONTACT_FROM_EMAIL` — verified sender, e.g. `website@steadfasthomecares.com`.
- `CONTACT_TO_EMAIL` — destination email, currently `hesangbedo@steadfasthomecares.com`.

Until configured, the form **returns a visible error** (503) rather than falsely confirming a sent message. For production use, add rate limiting, CAPTCHA/Turnstile, appropriate privacy disclosures and an abuse-monitoring policy. Do not request personal medical information through this general inquiry form.

### Checks before publishing

- Confirm the listed public phone number, email, address, business name, license number, and service area with the owner.
- Verify any regulatory claims and privacy notice requirements before publishing.
- The old placeholder testimonials were deliberately removed; publish only genuine, approved customer testimonials.
- Original `Logo.png` is **not included** in this ZIP because it was not accessible as an image download here. Add it manually to `public/logo.png` and render it in the header if desired; current fallback displays the company name as text.
- The existing GitHub Pages `CNAME` file must **not** be copied into the new Next.js application.
- Avoid collecting protected health information in the general contact form. Consult a qualified compliance advisor before handling sensitive patient information.

## Deployment safety

Keep `main` and the live GitHub Pages site unchanged while testing Vercel preview deployment. Only point Squarespace DNS at Vercel during a scheduled cutover.
