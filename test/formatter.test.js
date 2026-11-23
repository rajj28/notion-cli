import { test } from 'node:test';
import assert from 'node:assert';
import { formatPageTitle, formatBlockContent, formatRichText } from '../src/formatter.js';

test('formatPageTitle extracts title from properties', () => {
  const page = {
    properties: {
      title: {
        title: [
          { plain_text: 'Test Page' }
        ]
      }
    }
  };

  assert.strictEqual(formatPageTitle(page), 'Test Page');
});

test('formatPageTitle returns "Untitled" for missing title', () => {
  const page = { properties: {} };
  assert.strictEqual(formatPageTitle(page), 'Untitled');
});

test('formatRichText concatenates plain text', () => {
  const richText = [
    { plain_text: 'Hello ' },
    { plain_text: 'World' }
  ];

  assert.strictEqual(formatRichText(richText), 'Hello World');
});

test('formatRichText handles empty array', () => {
  assert.strictEqual(formatRichText([]), '');
});

test('formatBlockContent formats paragraph', () => {
  const block = {
    type: 'paragraph',
    paragraph: {
      rich_text: [{ plain_text: 'Sample text' }]
    }
  };

  assert.strictEqual(formatBlockContent(block), 'Sample text');
});

test('formatBlockContent formats heading_1', () => {
  const block = {
    type: 'heading_1',
    heading_1: {
      rich_text: [{ plain_text: 'Title' }]
    }
  };

  assert.strictEqual(formatBlockContent(block), '# Title');
});

test('formatBlockContent formats bulleted list', () => {
  const block = {
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ plain_text: 'Item' }]
    }
  };

  assert.strictEqual(formatBlockContent(block), '- Item');
});

test('formatBlockContent formats code block', () => {
  const block = {
    type: 'code',
    code: {
      language: 'javascript',
      rich_text: [{ plain_text: 'console.log("hello");' }]
    }
  };

  const result = formatBlockContent(block);
  assert.ok(result.includes('```javascript'));
  assert.ok(result.includes('console.log("hello");'));
});
