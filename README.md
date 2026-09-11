# 🚀 Personal Portfolio

A modern, responsive, and interactive developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**.

The portfolio is designed to showcase projects, technical skills, professional experience, development activity, and ways to get in touch — all through a clean and modern interface.

🌐 **Live Website:** [portfolio-smoky-xi-71.vercel.app](https://portfolio-smoky-xi-71.vercel.app/)

---

## ✨ Features

* 🎨 Modern and responsive user interface
* ⚡ Built with Next.js 16 App Router
* 📱 Fully responsive across desktop, tablet, and mobile
* 🧩 Modular and reusable React components
* 🎯 Dedicated project showcase
* 🛠️ Technology and stack section
* 📈 GitHub activity integration
* 🕒 Timeline / experience section
* 📬 Contact section
* 🤝 Recruiter-focused section
* 🔍 SEO-friendly metadata
* 🗺️ Automatically generated sitemap and robots configuration
* 🖼️ Dynamic Open Graph image generation
* 🎨 Tailwind CSS 4 for styling
* 🧠 Zustand for lightweight state management
* 🖥️ Lucide React for icons
* 🚀 Ready for deployment on Vercel

---

## 🛠️ Tech Stack

| Technology         | Purpose                                      |
| ------------------ | -------------------------------------------- |
| **Next.js 16**     | React framework and application architecture |
| **React 19**       | UI development                               |
| **TypeScript**     | Type-safe development                        |
| **Tailwind CSS 4** | Styling and responsive design                |
| **Zustand**        | State management                             |
| **Lucide React**   | Icons                                        |
| **ESLint**         | Code quality and linting                     |
| **Vercel**         | Deployment and hosting                       |

---

## 📂 Project Structure

```text
Portfolio/
├── app/
│   ├── activity/          # GitHub/activity section
│   ├── contact/           # Contact page/section
│   ├── projects/          # Projects showcase
│   ├── recruiter/         # Recruiter-focused content
│   ├── stack/             # Technology stack
│   ├── timeline/          # Experience/timeline
│   ├── page.tsx           # Main portfolio page
│   ├── layout.tsx         # Root application layout
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Sitemap generation
│   ├── robots.ts          # Robots configuration
│   └── opengraph-image.tsx # Dynamic OG image
│
├── components/
│   ├── modules/           # Feature-specific components
│   ├── os/                # OS/UI-related components
│   └── ui/                # Reusable UI components
│
├── content/               # Portfolio content and data
├── lib/                   # Utility functions and helpers
├── public/                # Static assets
├── scripts/               # Development/build scripts
│
├── .env.example           # Environment variable template
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── eslint.config.mjs      # ESLint configuration
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js** 20+
* **npm**
* **Git**

### 1. Clone the repository

```bash
git clone https://github.com/raahul4559/Portfolio.git
```

### 2. Navigate to the project

```bash
cd Portfolio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Then add the required values to `.env.local`.

> Never commit secrets or private API keys to the repository.

### 5. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

The build process also synchronizes GitHub-related data before building.

### Production Server

```bash
npm run start
```

Starts the application using the production build.

### Lint

```bash
npm run lint
```

Runs ESLint to check the codebase for potential issues.

### Sync GitHub Data

```bash
npm run sync:github
```

Synchronizes GitHub-related portfolio/activity data.

---

## 🔧 Customization

This portfolio is structured so that the content and UI can be modified without having to rewrite the entire application.

### Personal Information

Update the relevant files inside:

```text
content/
```

### Projects

Project-related pages and components are organized under:

```text
app/projects/
```

### Technology Stack

The stack section is available under:

```text
app/stack/
```

### Timeline / Experience

Experience and timeline-related content can be found under:

```text
app/timeline/
```

### Contact

Contact functionality is organized under:

```text
app/contact/
```

### Visual Components

Reusable components are located under:

```text
components/
```

This separation keeps the application modular and easier to maintain.

---

## 📊 GitHub Integration

The project includes a GitHub synchronization script:

```bash
npm run sync:github
```

The script is also executed automatically as part of the production build through the `prebuild` script.

If GitHub API credentials or other configuration are required, use the provided:

```text
.env.example
```

as a reference for your local `.env.local` configuration.

---

## 🌐 Deployment

The portfolio can be deployed easily using **Vercel**.

### Deploy with Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Deploy the project.

For local production testing:

```bash
npm run build
npm run start
```

---

## 📱 Responsive Design

The portfolio is designed to provide a consistent experience across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

Tailwind CSS is used throughout the application to handle responsive layouts and styling.

---

## 🔐 Environment Variables

Environment variables should be stored in `.env.local`.

Example:

```env
# Add project-specific environment variables here
# Follow .env.example for the required configuration
```

Do not commit `.env.local` or sensitive credentials to Git.

---

## 🤝 Contributing

This is primarily a personal portfolio project, but suggestions, improvements, and bug reports are welcome.

To contribute:

```bash
git clone https://github.com/raahul4559/Portfolio.git
cd Portfolio
npm install
```

Create a new branch:

```bash
git checkout -b feature/your-feature
```

Make your changes, test them locally, and submit a pull request.

---

## 📄 License

This project is available for personal and educational use.

If you reuse this project as a template, consider replacing the personal content, images, links, and branding with your own.

---

## 📬 Contact

If you'd like to discuss a project, collaboration, job opportunity, or just say hello, feel free to reach out through the contact section of the portfolio.

🌐 **Portfolio:**
https://portfolio-smoky-xi-71.vercel.app/

💻 **GitHub:**
https://github.com/raahul4559

---

## ⭐ Show Your Support

If you find this project useful or inspiring, consider giving the repository a ⭐ on GitHub.

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS.**
