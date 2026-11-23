import chalk from 'chalk';
import { printSuccess, printError } from '../formatter.js';

export async function createCommand(client, title, options = {}) {
  const { parent, content = '' } = options;

  try {
    const page = await client.createPage(parent, title, content);

    printSuccess(`Created page: ${chalk.bold(title)}`);
    console.log(chalk.gray(`  ID: ${page.id}`));
    console.log(chalk.gray(`  URL: ${page.url}`));
  } catch (error) {
    printError('Failed to create page: ' + error.message);
    throw error;
  }
}
