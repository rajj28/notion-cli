import chalk from 'chalk';
import { formatPage, printInfo, printError } from '../formatter.js';

export async function listCommand(client, options = {}) {
  const { limit = 20, json = false } = options;

  try {
    const pages = await client.listPages(limit);

    if (json) {
      console.log(JSON.stringify(pages, null, 2));
      return;
    }

    if (pages.length === 0) {
      console.log(chalk.yellow('No pages found'));
      return;
    }

    console.log(chalk.bold(`\nRecent pages (${pages.length}):\n`));
    
    pages.forEach((page, index) => {
      console.log(formatPage(page));
      if (index < pages.length - 1) {
        console.log('');
      }
    });
  } catch (error) {
    printError('List failed: ' + error.message);
    throw error;
  }
}
