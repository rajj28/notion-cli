#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { NotionClient } from '../src/client.js';
import { searchCommand } from '../src/commands/search.js';
import { createCommand } from '../src/commands/create.js';
import { exportCommand } from '../src/commands/export.js';
import { listCommand } from '../src/commands/list.js';

const program = new Command();

program
  .name('notion')
  .description('Command-line tool for Notion API')
  .version('1.0.0')
  .option('--token <token>', 'Notion integration token (or set NOTION_TOKEN env var)')
  .option('--json', 'Output raw JSON')
  .option('--verbose', 'Enable verbose logging');

program
  .command('search <query>')
  .description('Search for pages in your Notion workspace')
  .option('-l, --limit <number>', 'Maximum results to return', '10')
  .action(async (query, options) => {
    try {
      const client = new NotionClient(program.opts().token);
      await searchCommand(client, query, {
        ...options,
        json: program.opts().json,
        verbose: program.opts().verbose
      });
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('create <title>')
  .description('Create a new page')
  .option('-p, --parent <id>', 'Parent page or database ID (required)')
  .option('-c, --content <text>', 'Page content')
  .action(async (title, options) => {
    try {
      if (!options.parent) {
        console.error(chalk.red('Error: --parent option is required'));
        process.exit(1);
      }
      const client = new NotionClient(program.opts().token);
      await createCommand(client, title, options);
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('export <pageId>')
  .description('Export a page to markdown')
  .option('-o, --output <file>', 'Output file path')
  .action(async (pageId, options) => {
    try {
      const client = new NotionClient(program.opts().token);
      await exportCommand(client, pageId, options);
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List recent pages')
  .option('-l, --limit <number>', 'Maximum results to return', '20')
  .action(async (options) => {
    try {
      const client = new NotionClient(program.opts().token);
      await listCommand(client, {
        ...options,
        json: program.opts().json
      });
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program.parse();
