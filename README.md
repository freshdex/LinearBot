## Description

Discord bot for [Linear](https://linear.app/) made with [Nest](https://docs.nestjs.com/)

Automatically posts Linear issue updates to Discord channels, including:
- New issue creation
- Status changes
- Assignee updates
- Title modifications

<p align="center">
  <img src="github/LinearBot.png" title="LinearBot Example">
</p>

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- A Discord account with server admin permissions
- A Linear workspace

### 1. Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Navigate to the "Bot" section and click "Add Bot"
4. Copy the bot token (you'll need this for the `.env` file)
5. Under "OAuth2" → "URL Generator":
   - Select scope: `bot`
   - Select permissions: `Send Messages`, `Embed Links`, `Read Message History`
   - Copy the generated URL and open it in your browser
   - Select your server and authorize the bot

Read the [Discord Bot Documentation](https://discord.com/developers/docs/intro) for more information

### 2. Get Discord Channel ID

1. Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
2. Right-click on the channel where you want notifications
3. Click "Copy ID"

### 3. Linear Webhook Setup

1. Go to your Linear workspace settings
2. Navigate to "API" → "Webhooks"
3. Create a new webhook pointing to your server URL (must be HTTPS)
4. Example: `https://your-domain.com/linear`
5. Generate a Linear API key from Settings → API → Personal API Keys

Read the [Linear Webhook Documentation](https://developers.linear.app/docs/graphql/webhooks) for more information

### 4. Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/LinearBot.git
cd LinearBot

# Install dependencies
npm install
# or
yarn install
```

### 5. Configuration

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
CHANNELID=YOUR_DISCORD_CHANNEL_ID_HERE
LINEARAGENT=Linear-Webhook
LINEARAPI=YOUR_LINEAR_API_KEY_HERE
COMPANYNAME=Your Company Name
COMPANYLOGO=https://example.com/your-logo.png
```

**Important Notes:**
- Do not use quotes around values in the `.env` file
- `LINEARAGENT` should remain as `Linear-Webhook` (used for webhook validation)
- `COMPANYLOGO` should be a square image (recommended 128x128px)

### 6. Running the Server

```bash
# Development mode with hot-reload
npm run start:dev
# or
yarn start:dev

# Production mode
npm run start:prod
# or
yarn start:prod
```

The server will start on `http://localhost:3000`

### 7. Local Development with Tunneling

If you're testing locally and need to expose your server to Linear webhooks:

**Option A: Cloudflare Tunnel (Recommended)**
```bash
# Install cloudflared
# Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

# Run tunnel
cloudflared tunnel --url http://localhost:3000
```

**Option B: ngrok**
```bash
ngrok http 3000
```

Use the generated HTTPS URL as your Linear webhook URL (append `/linear` to the URL)

## Troubleshooting

### Bot not posting to Discord

1. **Check bot permissions**: Ensure the bot has "Send Messages", "Embed Links", and "Read Message History" permissions in the channel
2. **Verify bot token**: Make sure the TOKEN in `.env` is correct and has no quotes
3. **Check channel ID**: Verify the CHANNELID matches your target Discord channel
4. **Environment variables**: If variables aren't loading, restart the server completely

### Webhook not receiving events

1. **HTTPS required**: Linear webhooks require HTTPS. Use a tunnel service for local development
2. **Check webhook URL**: Ensure it ends with `/linear` (e.g., `https://your-domain.com/linear`)
3. **User-agent validation**: The webhook validates the `Linear-Webhook` user-agent header

### "Entity not found: User" error

This has been fixed in this fork. The bot now handles unassigned issues gracefully by showing "Unassigned" instead of trying to fetch a non-existent user.

## What's Fixed in This Fork

This fork includes several important fixes and improvements over the original:

1. **TypeScript version upgrade** (3.7.4 → 4.9.5) - Fixes compilation errors with Apollo Client
2. **Environment variable loading** - Fixed issue where system environment variables would override `.env` file
3. **Unassigned issues** - Added null checks for assigneeId to handle unassigned issues
4. **Error handling** - Better validation of webhook payloads
5. **Documentation** - Comprehensive setup guide with troubleshooting section

See [CHANGELOG.md](CHANGELOG.md) for detailed changes.

## Architecture

```
Linear Webhook → OriginGuard (validates user-agent) → AppController → AppService → Discord
                                                             ↓
                                                        GqlService (fetches user data)
```

## Available Commands

```bash
# Build the project
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

## License

LinearBot is [MIT licensed](LICENSE).
