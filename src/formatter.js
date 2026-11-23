import chalk from 'chalk';

export function formatPageTitle(page) {
  const titleProp = page.properties.title || page.properties.Name || page.properties.Title;
  if (!titleProp) return 'Untitled';
  
  const titleText = titleProp.title || titleProp.rich_text || [];
  return titleText.map(t => t.plain_text).join('');
}

export function formatPage(page, options = {}) {
  const title = formatPageTitle(page);
  const url = page.url;
  const lastEdited = new Date(page.last_edited_time).toLocaleDateString();

  if (options.json) {
    return { id: page.id, title, url, lastEdited };
  }

  return [
    chalk.bold.cyan(title),
    chalk.gray(`  ID: ${page.id}`),
    chalk.gray(`  URL: ${url}`),
    chalk.gray(`  Last edited: ${lastEdited}`)
  ].join('\n');
}

export function formatBlockContent(block) {
  const type = block.type;
  const content = block[type];

  if (!content) return '';

  switch (type) {
    case 'paragraph':
      return formatRichText(content.rich_text);
    
    case 'heading_1':
      return '# ' + formatRichText(content.rich_text);
    
    case 'heading_2':
      return '## ' + formatRichText(content.rich_text);
    
    case 'heading_3':
      return '### ' + formatRichText(content.rich_text);
    
    case 'bulleted_list_item':
      return '- ' + formatRichText(content.rich_text);
    
    case 'numbered_list_item':
      return '1. ' + formatRichText(content.rich_text);
    
    case 'code':
      const language = content.language || 'text';
      const code = formatRichText(content.rich_text);
      return `\`\`\`${language}\n${code}\n\`\`\``;
    
    case 'quote':
      return '> ' + formatRichText(content.rich_text);
    
    default:
      return formatRichText(content.rich_text || []);
  }
}

export function formatRichText(richText) {
  if (!Array.isArray(richText)) return '';
  return richText.map(t => t.plain_text).join('');
}

export function printSuccess(message) {
  console.log(chalk.green('✓'), message);
}

export function printError(message) {
  console.error(chalk.red('✗'), message);
}

export function printInfo(message) {
  console.log(chalk.blue('ℹ'), message);
}
