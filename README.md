# Unik Biotech Research Project

This is a modern, static React application for Unik Biotech Research. It features a responsive UI built with Tailwind CSS and Radix UI primitives.

## Features
- Multi-language support (English/Marathi)
- Responsive layout and animations
- Contact & Dealer Inquiry forms (powered by Formsubmit)
- Next-Gen Biotech thematic design

## Prerequisites
- **Node.js** (18+)
- **NPM** or **Yarn**

## Quick Start

Navigate to the `frontend` directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
# or if you encounter issues:
npm install --legacy-peer-deps
```

Start the development server:

```bash
npm start
```

The application will launch in your browser at `http://localhost:3000`.

## Production Build & Deployment

To build the app for production (e.g. Hostinger Standard Static Hosting):

```bash
cd frontend
npm run build
```

This will create an optimized production build inside the `frontend/build` folder. Follow your host provider's instructions for serving static files, or simply upload the contents of the `build` folder to your `public_html` directory via cPanel/hPanel.

### Important: Routing Setup
Since this is a Single Page Application using React Router, you will need to add a fallback redirect if hosting on an Apache/LiteSpeed server (like Hostinger). Create a file named `.htaccess` inside the `build` folder (or your `public_html` folder) with the following content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Form Handling (Formsubmit.co)

Forms in this application are securely routed through [Formsubmit.co](https://formsubmit.co/). 

The current configuration sends emails to `enquiries@unikbiotechresearch.com`. If you want to change the receiver email, modify the `fetch` endpoints in:
- `src/pages/Contact.jsx`
- `src/pages/DealerLocator.jsx`

*Note: It is highly recommended to configure Formsubmit Email Aliases to prevent your raw email from being exposed to potential email scrapers.*

# unik_biotech
