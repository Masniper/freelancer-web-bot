
# Freelancer Web Bot

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Overview
![Image Description](https://github.com/Masniper/freelancer-web-bot/blob/main/Freelancer-web-bot.png?raw=true)
Freelancer Web Bot is an application designed to help users track and manage projects listed on Freelancer.com. The bot fetches active projects, categorizes them by job type, and provides tools to filter and view project details.

## Features

- Fetches and displays active projects from Freelancer.com.
- Allows filtering of projects by job type.
- Provides a user-friendly interface to add, remove, and select job types.
- Displays project details including title, description, budget, and submission time.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed. This project was built using Node.js version 14.x and above.

### Installation

First, clone the repository:

```bash
git clone https://github.com/masniper/freelancer-web-bot.git
cd freelancer-web-bot
```

Then, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

Start the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Usage

- **Adding a Job Type**: Use the search functionality to find a job type and add it to the list.
- **Removing a Job Type**: Click the remove button next to a job type to remove it.
- **Selecting a Job Type**: Select a job type to filter projects by that job.
- **Refreshing Projects**: Click the refresh button to fetch the latest projects.
- **Clearing Projects**: Click the clear button to remove all fetched projects.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
