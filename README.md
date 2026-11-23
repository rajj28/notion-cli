# notion-cli

Command-line tool to interact with Notion's API. Search your workspace, create notes, and export content - all from your terminal.

## Features

- 🔍 **Search** - Find pages across your Notion workspace
- ✍️ **Create** - Quick note creation with markdown-style syntax
- 📄 **Export** - Export pages to markdown format
- 🎨 **Rich formatting** - Supports headers, lists, code blocks
- ⚡ **Fast** - Minimal dependencies, quick responses

## Installation

```bash
npm install -g notion-cli
```

## Setup

1. Create a Notion integration at https://www.notion.so/my-integrations
2. Copy your integration token
3. Set environment variable:

```bash
export NOTION_TOKEN="your_integration_token_here"
```

4. Share pages with your integration in Notion

## Usage

### Search pages

```bash
notion search "project ideas"
```

### Create a new page

```bash
notion create "Meeting Notes" --parent "workspace-id"
```

### Export a page

```bash
notion export "page-id" --format markdown
```

### List recent pages

```bash
notion list --limit 10
```

## Options

- `--token` - Provide token directly (overrides env variable)
- `--json` - Output raw JSON responses
- `--verbose` - Enable detailed logging

## Development

```bash
# Clone repo
git clone https://github.com/rajj28/notion-cli.git
cd notion-cli

# Install dependencies
npm install

# Run tests
npm test

# Run locally
node bin/notion.js search "test"
```

## Architecture

- **bin/notion.js** - Entry point with command parsing
- **src/client.js** - Notion API wrapper
- **src/commands/** - Command implementations
- **src/formatter.js** - Output formatting utilities

## Requirements

- Node.js >= 18.0.0
- Notion integration token
- Pages shared with the integration

## License

MIT © Ruturaj Sonkamble

## Contributing

Pull requests welcome! Please ensure:
- Tests pass (`npm test`)
- Code is linted (`npm run lint`)
- Commits follow conventional format

## Roadmap

- [ ] Database query support
- [ ] Bulk operations
- [ ] Template system
- [ ] Interactive mode
- [ ] Page property updates
