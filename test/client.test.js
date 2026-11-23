import { test } from 'node:test';
import assert from 'node:assert';
import { NotionClient } from '../src/client.js';

test('NotionClient throws without token', () => {
  const originalToken = process.env.NOTION_TOKEN;
  delete process.env.NOTION_TOKEN;

  assert.throws(
    () => new NotionClient(),
    /Notion token required/
  );

  if (originalToken) {
    process.env.NOTION_TOKEN = originalToken;
  }
});

test('NotionClient accepts token parameter', () => {
  const client = new NotionClient('test-token');
  assert.strictEqual(client.token, 'test-token');
});

test('NotionClient falls back to env var', () => {
  const originalToken = process.env.NOTION_TOKEN;
  process.env.NOTION_TOKEN = 'env-token';

  const client = new NotionClient();
  assert.strictEqual(client.token, 'env-token');

  if (originalToken) {
    process.env.NOTION_TOKEN = originalToken;
  } else {
    delete process.env.NOTION_TOKEN;
  }
});
