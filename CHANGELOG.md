# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- `.env.example` file with placeholder values for easier setup
- Comprehensive README with step-by-step setup instructions
- Troubleshooting section in README
- Architecture diagram in README
- Better error handling for missing payload data
- Null safety checks throughout the codebase
- Comments explaining the environment variable override logic

### Fixed
- **Critical**: Fixed environment variable loading issue where system environment variables would override `.env` file values
  - Solution: Manually override `process.env` with parsed dotenv values in `src/main.ts`
  - This ensures `.env` file always takes precedence
- **Bug**: Fixed "Entity not found: User" error when Linear issues have no assignee
  - Added null check for `payload.data.assigneeId` in `src/app.service.ts`
  - Unassigned issues now display "Unassigned" instead of crashing
- **Bug**: Fixed compilation errors with Apollo Client dependencies
  - Upgraded TypeScript from 3.7.4 to 4.9.5
  - Added `skipLibCheck: true` to `tsconfig.json`
- Added optional chaining for `payload.updatedFrom` to prevent undefined errors
- Added null coalescing for `payload.data.state.name` to handle missing state names

### Changed
- Upgraded TypeScript from `^3.7.4` to `^4.9.5` in `package.json`
- Added `skipLibCheck: true` to `tsconfig.json` for better compatibility
- Removed debug logging from production code:
  - Removed token logging from `src/app.controller.ts`
  - Removed user-agent logging from `src/origin.guard.ts`
  - Removed dotenv debug logging from `src/main.ts`
- Improved code documentation with inline comments

### Security
- Ensured `.env` file is properly gitignored
- Created `.env.example` to prevent accidental credential commits
- Removed all personal information and tokens from tracked files

## Original Version

The original version by [TMoynat](https://github.com/TMoynat/LinearBot) provided:
- Basic Linear webhook integration with Discord
- NestJS framework setup
- Discord.js integration for bot functionality
- Linear GraphQL API integration for user data
- Webhook validation using user-agent headers
