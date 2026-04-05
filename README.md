# SMIT Connect Portal

A React + Tailwind + Redux Toolkit portal for SMIT admissions, courses, student registration, and leave management.

## Features

- Home page with SMIT portal summary and Facebook page embed
- Courses page with admission status and popup admission form
- Student signup/login with admin-upload restriction
- Student dashboard with leave submission and leave tracking
- Admin login, password reset, and add-admin flows
- Excel-based student bulk upload using `xlsx`
- Course management with add/edit popup
- Leave management with approve/reject flow and optional image attachment
- Supabase-first service layer with local mock fallback for quick demos

## Default Mock Credentials

### Admin
- Username: `admin`
- Password: `admin123`

### Seeded Students
- CNIC: `42101-1234567-8`
- Roll Number: `SMIT-001`
- Signup password: choose during registration

- CNIC: `42101-2345678-9`
- Roll Number: `SMIT-002`
- Signup password: choose during registration

## Run Locally

```bash
npm install
npm run dev
```

## Supabase Environment

Copy `.env.example` to `.env` and add:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SMIT_FACEBOOK_PAGE_URL=https://www.facebook.com/SaylaniMassITTraining
```

If Supabase keys are not present, the app uses localStorage-backed mock data automatically.

## Suggested Supabase Tables

See `supabase-schema.sql` for a starting schema.
