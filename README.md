# Telegram Web App

A web-based Telegram bot built with a modern tech stack.

Demo: [@TrimTasticBot](https://t.me/TrimTasticBot)

## Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **Database ORM**: [Mikro-ORM](https://mikro-orm.io/)
- **Frontend**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Monorepo Management**: [TurboRepo](https://turborepo.org/)

## Getting Started

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed (version 16.x.x or higher).
- [npm](https://www.npmjs.com/) (usually comes with Node.js).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/theic/telegram-contest-mini-app.git telegram-contest-mini-app
   cd telegram-contest-mini-app
   ```

2. Install the dependencies:
   ```bash
   npm i
   ```

3. Optional. Initialize postgresql database:
   ```bash
   docker-compose up -d
   ```

4. Run migrations
   ```bash
   npx --workspace api mikro-orm migration:up
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The app should now be running on your local machine.

## Usage

- Step 1: Start the bot by sending `/start` to the bot.
- Step 2: Send or forward a video file to the bot.
- Step 3: Wait for the bot to process the video using Whisper service.
- Step 4: The bot will send you a message with the processed video. Push the "Download" button to view and download the subtitles.

## Local deployment

To obtain a fixed HTTPS URL for your local frontend server in VSCode:

- Step 1: Open VSCode.
- Step 2: Navigate to the Terminal panel.
- Step 3: Select the "Ports" tab.
- Step 4: Click on "Add Port".
- Step 5: Direct it to your frontend server.
