import { DataSource, DataSourceConfig } from 'apollo-datasource'
import { Client } from '@notionhq/client'

export class NotionDataSource extends DataSource {
  client: Client

  constructor({ notion_token }) {
    super()
    this.client = new Client({
      auth: notion_token
    })
  }

  initialize(config: DataSourceConfig<{ auth?: string }>) {
    console.log('initialize', config.context)
    this.client = new Client({
      auth: config.context?.auth
    })
  }

  async search(args) {
    this.client.search({ ...args })
  }

  async request(args) {
    this.client.request(args)
  }

  get databases() {
    return this.client.databases
  }

  get blocks() {
    return this.client.blocks
  }

  get pages() {
    return this.client.pages
  }

  get users() {
    return this.client.users
  }
}
