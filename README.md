# Monitorex Dashboard

A modern monitoring dashboard built with Next.js and Tauri, providing a powerful interface for device and sensor management.

## Features

- 📊 Real-time device monitoring
- 🔌 Electrical board management
- 📡 Sensor data visualization
- 👥 User management system
- 📊 Analytics dashboard
- ⚙️ System settings configuration
- 🔒 Secure authentication

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [Tauri](https://tauri.app/) - Build desktop applications
- [TailwindCSS](https://tailwindcss.com/) - For styling
- TypeScript - For type safety
- PM2 - For process management

## Prerequisites

- Node.js 14.0 or later
- Rust (for Tauri development)
- Yarn or npm

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Run the development server:

```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── pages/           # Next.js pages
├── public/          # Static assets
├── src/            # Source files
├── src-tauri/      # Tauri configuration and Rust code
├── styles/         # Global styles
└── ...
```

## Production Deployment

### Using PM2

To deploy the application using PM2, use the following command:

```bash
pm2 startOrRestart ecosystem.config.js --env prod
```

### Using Vercel

The application can be deployed on [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Vercel will detect Next.js automatically and deploy

## Development

You can start editing the pages by modifying files in the `pages` directory. The pages auto-update as you edit the files.

API routes can be accessed at `/api/*`. The `pages/api` directory is mapped to `/api/*`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tauri Documentation](https://tauri.app/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
