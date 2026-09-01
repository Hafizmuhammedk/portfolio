# Hafis Muhammed — Portfolio

A monochrome editorial portfolio focused on AI engineering, backend systems, and production software work.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

## Contact form email delivery

The contact form sends mail through Gmail using Nodemailer. Before sending can work, copy `.env.example` to `.env.local` and set `SMTP_APP_PASSWORD` to a Gmail App Password for `hafizmuhammed1019@gmail.com`.

Enable Google two-step verification first, then create the app password in the Google Account security settings. Do not use or commit your normal Gmail password. Restart `npm run dev` after editing `.env.local`.

## Structure

- `app/` — application layout, metadata, and page composition
- `components/` — portfolio sections and scoped CSS Modules
- `lib/data.js` — project, experience, and technical content
- `public/images/` — project interface previews
