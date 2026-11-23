import { writeFile } from 'fs/promises';
import chalk from 'chalk';
import { formatPageTitle, formatBlockContent, printSuccess, printError } from '../formatter.js';

export async function exportCommand(client, pageId, options = {}) {
  const { output } = options;

  try {
    const page = await client.getPage(pageId);
    const blocks = await client.getBlocks(pageId);

    const title = formatPageTitle(page);
    let markdown = `# ${title}\n\n`;

    for (const block of blocks) {
      const content = formatBlockContent(block);
      if (content) {
        markdown += content + '\n\n';
      }
    }

    if (output) {
      await writeFile(output, markdown, 'utf-8');
      printSuccess(`Exported to: ${chalk.bold(output)}`);
    } else {
      console.log(markdown);
    }
  } catch (error) {
    printError('Export failed: ' + error.message);
    throw error;
  }
}
