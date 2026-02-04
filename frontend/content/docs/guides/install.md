---
title: "Installing the Wiki"
order: 1
hide: false
---

## Overview

This comprehensive guide will walk you through the complete installation process for the Wiki system. Whether you're setting up a development environment or deploying to production, this documentation covers everything you need to know to get started quickly and efficiently.

> The Wiki system is built on modern web technologies and follows industry best practices for documentation management. By the end of this guide, you'll have a fully functional wiki running on your local machine or server.

## Prerequisites

Before beginning the installation process, ensure your system meets the following requirements:

### System Requirements

Your development machine should have adequate resources to run the wiki smoothly. We recommend at least 4GB of RAM and 2GB of free disk space. The wiki has been tested on Windows 10/11, macOS 10.15+, and various Linux distributions including Ubuntu 20.04+, Debian 11+, and Fedora 35+.

### Required Software

You'll need to install several pieces of software before proceeding with the wiki installation:

**Node.js and npm**: The wiki requires Node.js version 18.0 or higher. We strongly recommend using the latest LTS (Long Term Support) version for optimal stability and performance. You can download Node.js from the official website, and npm will be included automatically with your Node.js installation.

**Git**: Version control is essential for managing your wiki content and keeping it in sync with updates. Install Git version 2.30 or higher from the official Git website. This will allow you to clone the repository and manage your wiki's version history effectively.

**Text Editor or IDE**: While you can use any text editor, we recommend Visual Studio Code, WebStorm, or Sublime Text for the best development experience. These editors provide excellent syntax highlighting, code completion, and debugging capabilities.

### Optional Dependencies

For advanced features and optimal development experience, consider installing these optional tools:

**Docker**: If you plan to use containerized deployment, install Docker Desktop version 20.10 or higher. This simplifies deployment and ensures consistency across different environments.

**PostgreSQL**: While the wiki can use SQLite for development, production environments benefit from PostgreSQL 13 or higher for better performance and scalability.

## Installation Steps

Follow these detailed steps to install the wiki on your local machine:

### Step 1: Clone the Repository

First, you'll need to obtain a copy of the wiki source code. Open your terminal or command prompt and navigate to the directory where you want to install the wiki. Then execute the following command:

```bash
git clone https://github.com/your-organization/wiki-system.git
cd wiki-system
```

This command creates a new directory called `wiki-system` and downloads all the necessary files from the repository. The cloning process may take a few minutes depending on your internet connection speed.

### Step 2: Install Dependencies

Once you have the source code, you need to install all the required Node.js packages. The wiki uses numerous dependencies for routing, rendering, authentication, and more. Run the following command in your terminal:

```bash
npm install
```

This command reads the `package.json` file and downloads all specified dependencies into the `node_modules` directory. The installation process typically takes 2-5 minutes depending on your internet speed and computer performance. You'll see a progress indicator showing which packages are being installed.

If you encounter any errors during installation, they're usually related to network issues or missing system dependencies. Check the troubleshooting section below for common solutions.

### Step 3: Configure Environment Variables

The wiki requires certain environment variables to function correctly. Create a new file called `.env` in the root directory of your project. You can copy the example environment file as a starting point:

```bash
cp .env.example .env
```

Open the `.env` file in your text editor and configure the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/wiki_db
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Make sure to replace the placeholder values with your actual configuration. The `SESSION_SECRET` should be a long, random string for security purposes. You can generate one using the following command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Initialize the Database

Before running the wiki for the first time, you need to set up the database schema. The wiki includes migration scripts that automatically create all necessary tables and indexes. Run the following commands:

```bash
npm run db:migrate
npm run db:seed
```

The first command creates all database tables, while the second populates them with initial data including a default admin user and sample content. This process should complete in less than a minute.

### Step 5: Run the Development Server

You're now ready to start the wiki! Execute the following command to launch the development server:

```bash
npm run dev
```

The development server will start and you should see output indicating that the wiki is running. By default, the server listens on port 3000. Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the wiki homepage. Congratulations! You've successfully installed the wiki system.

## Configuration Options

The wiki offers extensive configuration options to customize its behavior and appearance.

### Basic Configuration

The main configuration file is located at `config/wiki.config.js`. This file controls fundamental aspects of the wiki's operation:

```javascript
module.exports = {
  siteName: 'My Wiki',
  siteDescription: 'A comprehensive knowledge base',
  theme: 'light',
  itemsPerPage: 20,
  enableSearch: true,
  enableComments: false
}
```

You can modify these values to suit your needs. Changes to this file require a server restart to take effect.

### Advanced Settings

For more advanced customization, edit the `config/advanced.config.js` file. This includes settings for caching, performance optimization, and third-party integrations:

```javascript
module.exports = {
  cache: {
    enabled: true,
    ttl: 3600,
    provider: 'redis'
  },
  search: {
    engine: 'elasticsearch',
    indexName: 'wiki_content'
  },
  authentication: {
    providers: ['local', 'github', 'google'],
    sessionDuration: 86400
  }
}
```

### Theme Customization

The wiki supports custom themes through CSS variables. Create a new file in `styles/themes/` to define your custom theme:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --background-color: #ffffff;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
  --sidebar-width: 256px;
}
```

Reference your custom theme in the configuration file to activate it.

## Development Workflow

Understanding the development workflow helps you make changes and contribute effectively.

### File Structure

The wiki follows a standard Next.js application structure:

```
wiki-system/
├── app/
│   ├── wiki/
│   │   ├── [slug]/
│   │   └── layout.tsx
│   ├── api/
│   └── layout.tsx
├── components/
│   ├── sidebar/
│   ├── editor/
│   └── common/
├── lib/
│   ├── db/
│   └── utils/
├── public/
│   ├── images/
│   └── fonts/
└── styles/
    └── globals.css
```

Each directory serves a specific purpose in organizing the application code.

### Hot Reloading

The development server includes hot module replacement, which means changes to your code are reflected immediately in the browser without requiring a full page reload. This significantly speeds up the development process.

When you save a file, the development server automatically rebuilds the affected modules and updates the browser. You'll see a brief indicator in the corner of the screen during this process.

### Running Tests

The wiki includes a comprehensive test suite to ensure code quality and prevent regressions. Run the test suite with:

```bash
npm test
```

For continuous testing during development, use watch mode:

```bash
npm run test:watch
```

This runs tests automatically whenever you modify relevant files.

## Database Setup

Detailed database configuration ensures optimal performance and reliability.

### PostgreSQL Setup

For production deployments, we recommend PostgreSQL. First, create a new database:

```sql
CREATE DATABASE wiki_db;
CREATE USER wiki_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE wiki_db TO wiki_user;
```

Then update your `.env` file with the connection string:

```env
DATABASE_URL=postgresql://wiki_user:secure_password@localhost:5432/wiki_db
```

### SQLite Setup (Development Only)

For local development, SQLite provides a simpler alternative. Simply set your database URL to:

```env
DATABASE_URL=file:./dev.db
```

The wiki will automatically create the database file in your project root.

### Running Migrations

Migrations manage database schema changes over time. To apply all pending migrations:

```bash
npm run db:migrate
```

To create a new migration:

```bash
npm run db:migrate:create -- --name=add_user_preferences
```

## Troubleshooting

Common issues and their solutions are documented here for quick reference.

### Port Already in Use

If you see an error indicating port 3000 is already in use, either stop the conflicting application or change the port in your `.env` file:

```env
PORT=3001
```

### Module Not Found Errors

Missing module errors typically indicate incomplete dependency installation. Try removing the `node_modules` directory and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Errors

Verify your database is running and the connection string in `.env` is correct. Test the connection using:

```bash
npm run db:test-connection
```

### Permission Errors

On Unix-based systems, you might encounter permission errors when installing global packages. Use the following command to fix npm permissions:

```bash
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

## Next Steps

Now that you have the wiki installed and running, explore these resources to make the most of your installation:

- Read the **User Guide** to learn how to create and organize content
- Check the **API Documentation** if you plan to integrate with other systems
- Review the **Deployment Guide** when you're ready to move to production
- Join our **Community Forum** to connect with other users and contributors

The wiki is designed to grow with your needs, so don't hesitate to customize and extend it as required for your specific use case.
