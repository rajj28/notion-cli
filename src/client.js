import { Client } from '@notionhq/client';

export class NotionClient {
  constructor(token) {
    this.token = token || process.env.NOTION_TOKEN;
    
    if (!this.token) {
      throw new Error(
        'Notion token required. Set NOTION_TOKEN env var or use --token option'
      );
    }

    this.client = new Client({ auth: this.token });
  }

  async search(query, options = {}) {
    const { limit = 10 } = options;
    
    const response = await this.client.search({
      query,
      page_size: parseInt(limit),
      filter: { property: 'object', value: 'page' }
    });

    return response.results;
  }

  async createPage(parentId, title, content) {
    const children = [];
    
    if (content) {
      children.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content } }]
        }
      });
    }

    const response = await this.client.pages.create({
      parent: { page_id: parentId },
      properties: {
        title: {
          title: [{ type: 'text', text: { content: title } }]
        }
      },
      children
    });

    return response;
  }

  async getPage(pageId) {
    return await this.client.pages.retrieve({ page_id: pageId });
  }

  async getBlocks(blockId) {
    const response = await this.client.blocks.children.list({
      block_id: blockId,
      page_size: 100
    });

    return response.results;
  }

  async listPages(limit = 20) {
    const response = await this.client.search({
      filter: { property: 'object', value: 'page' },
      page_size: limit,
      sort: { direction: 'descending', timestamp: 'last_edited_time' }
    });

    return response.results;
  }
}
