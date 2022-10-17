import { Client, ClientConfig } from 'pulsar-client';

export class ClientPulsar {
  protected client: Client;

  constructor(protected readonly options: ClientConfig) {
    if (!this.options && ! this.options.serviceUrl) {
      throw new Error("Service url not found.");
      
    }

    this.client = this.connect();
  }

  public connect(): Client {
    if (this.client) {
      return this.client;
    }
    const serviceUrl = this.options.serviceUrl;
    this.client = new Client({ serviceUrl });
    return this.client;
  }

  public async produce(topic: string, data: any): Promise<void> {
    const producer = await this.client.createProducer({ topic });
    await producer.send({ data: Buffer.from(data) });
  }
}
