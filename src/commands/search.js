import chalk from 'chalk';
import { formatPage, printInfo, printError } from '../formatter.js';

export async function searchCommand(client, query, options = {}) {
  const { limit = 10, json = false, verbose = false } = options;

  if (verbose) {
    printInfo(`Searching for: "${query}" (limit: ${limit})`);
  }

  try {
    const results = await client.search(query, { limit });

    if (json) {
      console.log(JSON.stringify(results, null, 2));
      return;
    }

    if (results.length === 0) {
      console.log(chalk.yellow('No results found'));
      return;
    }

    console.log(chalk.bold(`\nFound ${results.length} result(s):\n`));
    
    results.forEach((page, index) => {
      console.log(formatPage(page));
      if (index < results.length - 1) {
        console.log('');
      }
    });
  } catch (error) {
    printError('Search failed: ' + error.message);
    throw error;
  }
}
