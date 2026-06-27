# Meridian Group — Next.js Setup Guide

This is the production-ready Next.js version of the Meridian Group website.
It connects to a real Supabase database for content editing and form submissions.

---

## What you'll need

- Node.js 18+ (download at nodejs.org)
- A free Supabase account (supabase.com)
- A free Vercel account (vercel.com) — for deployment
- Optionally: a Resend account (resend.com) for contact form emails

---

## Step 1 — Set up Supabase

1. Go to supabase.com and create a free account
2. Click **New Project**, give it any name (e.g. "meridian"), choose a region, set a password
3. Wait ~2 minutes for the project to provision

**Create the database tables:**
1. In your project, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `supabase-schema.sql` from this project
4. Copy the entire contents and paste it into the SQL editor
5. Click **Run** (or press Cmd+Enter)
6. You should see "Success. No rows returned" — this is correct

**Get your API keys:**
1. In your Supabase project, click **Settings** (gear icon, bottom left)
2. Click **API**
3. You'll see three values you need:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon public** key — a long string starting with `eyJ...`
   - **service_role** key — another long string (keep this secret!)

---

## Step 2 — Configure the project

1. In the `meridian-nextjs` folder, duplicate the file `.env.local.example`
2. Rename the copy to `.env.local`
3. Open `.env.local` and fill in the three values from Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
```

The `RESEND_API_KEY` and email fields are optional — the contact form will still
save to the database even without them; you just won't get email notifications.

---

## Step 3 — Create your admin account

The admin login uses Supabase's built-in authentication.

1. In your Supabase project, click **Authentication** in the left sidebar
2. Click **Add User** → **Create New User**
3. Enter your email and a strong password
4. Click **Create User**

That's the email/password you'll use to log in to admin mode on the website.

---

## Step 4 — Run the site locally

Open a terminal, navigate to the `meridian-nextjs` folder, and run:

```bash
npm install
npm run dev
```

The site will be available at http://localhost:3000

**Test that everything works:**
- Visit http://localhost:3000 — you should see the homepage with content
- Visit http://localhost:3000/admin/login
- Log in with the email/password you created in Step 3
- Go back to the homepage — press **Ctrl+Shift+A** or click the ⚙ button (bottom-right)
- You should enter admin mode — text will get gold dashed outlines
- Click any text and edit it — it saves to the database automatically
- Refresh the page — your edits should persist

---

## Step 5 — Deploy to Vercel (go live)

1. Push the `meridian-nextjs` folder to a GitHub repository
   (If you don't have one, go to github.com, create a repository, and follow the instructions)

2. Go to vercel.com, sign in with GitHub

3. Click **Add New Project** → import your repository

4. In the **Environment Variables** section, add the same values from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY` (optional)
   - `CONTACT_EMAIL_TO` (optional)
   - `CONTACT_EMAIL_FROM` (optional)

5. Click **Deploy** — Vercel will build and deploy the site in ~2 minutes

6. Your site is now live at `https://your-project-name.vercel.app`

**Custom domain (optional):**
1. In Vercel, go to your project → Settings → Domains
2. Add your domain (e.g. meridiangroup.com)
3. Vercel shows you DNS records to add in your domain registrar
4. Add them, wait ~10 minutes for DNS to propagate

---

## How the admin system works

**Logging in:**
- Go to `/admin/login` on your live site
- Log in with your Supabase credentials

**Editing content:**
- Press **Ctrl+Shift+A** (or click the ⚙ button, bottom-right)
- All editable text gets a gold dashed outline
- Click any text → type your changes → click elsewhere to save
- Each field saves individually as you finish editing it (on blur)
- Click **Save All** to force-save everything on the page at once
- Click **Reset Page** to wipe all edits on the current page and restore defaults
- Click **Exit** (or Ctrl+Shift+A again) to leave admin mode

**Content storage:**
- Every edit is a row in the `page_content` table in Supabase
- Row format: `{ page: 'home', key: 'hero-title', value: 'Navigate...' }`
- You can view and edit all content directly in the Supabase dashboard under **Table Editor**

---

## How the contact form works

When someone submits the contact form:

1. The form data is sent to `/api/contact` (a Next.js serverless function)
2. The submission is saved to the `inquiries` table in Supabase
3. If `RESEND_API_KEY` is set, a notification email is sent to `CONTACT_EMAIL_TO`

**Viewing submissions:**
- Log in to Supabase → Table Editor → `inquiries`
- All form submissions are there with timestamps

**Setting up email (Resend):**
1. Go to resend.com, create a free account (3,000 emails/month free)
2. Go to API Keys → Create API Key
3. Add it to your Vercel environment variables as `RESEND_API_KEY`
4. For `CONTACT_EMAIL_FROM`, use an address at a domain you've verified in Resend
   (or use their default `onboarding@resend.dev` for testing)
5. Redeploy on Vercel for the change to take effect

---

## Project structure

```
meridian-nextjs/
├── pages/
│   ├── index.js          Homepage
│   ├── services.js       Services page
│   ├── about.js          About page
│   ├── work.js           Work / case studies page
│   ├── clients.js        Clients / testimonials page
│   ├── contact.js        Contact page with live form
│   ├── admin/
│   │   └── login.js      Admin login page
│   └── api/
│       ├── content.js    API: read/write page content
│       └── contact.js    API: submit contact form
├── components/
│   ├── Nav.jsx           Shared navigation
│   ├── Footer.jsx        Shared footer
│   ├── AdminBar.jsx      Admin toolbar + gear button
│   └── Editable.jsx      Inline-editable text component
├── context/
│   └── AdminContext.jsx  Admin state management
├── lib/
│   ├── supabase.js       Supabase client (browser)
│   └── content.js        Content fetching (server)
├── styles/
│   └── globals.css       All shared CSS
├── supabase-schema.sql   Run this once in Supabase SQL Editor
├── .env.local.example    Copy → .env.local and fill in values
└── package.json
```

---

## Adding a new editable field

1. In the page JSX, replace a plain element:
   ```jsx
   // Before
   <h2>Our Values</h2>

   // After
   <Editable tag="h2" id="values-title" content={c('values-title', 'Our Values')} />
   ```
2. The second argument to `c()` is the fallback shown when no DB value exists
3. The `id` becomes the `key` column in the `page_content` table

---

## Costs

Everything runs free until you have real traffic:

| Service  | Free tier                          |
|----------|------------------------------------|
| Vercel   | 100GB bandwidth/month              |
| Supabase | 500MB database, 2GB bandwidth/month |
| Resend   | 3,000 emails/month                 |
| Domain   | ~€10/year (Cloudflare, Namecheap)  |
