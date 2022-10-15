import { Client, Consumer, Message, Producer } from 'pulsar-client';

import { CustomClientOptions, CustomTransportStrategy, Server } from '@nestjs/microservices';

export class ServerPulsar extends Server implements CustomTransportStrategy {
  protected client: Client;
  protected producer: Producer;
  protected consumers: Consumer[] = [];
  constructor(private readonly options: CustomClientOptions["options"]) {
    super();
    this.initializeSerializer(options);
    this.initializeDeserializer(options);
  }

  /**
   * Listen
   */
  public listen(callback: () => void): void {
    this.client = this.createPulsarClient();
    this.start(callback);
  }

  public start(callback: () => void): void {
    this.bindHandlers();
    callback();
  }

  public bindHandlers(): void {
    this.messageHandlers.forEach(async (handler, pattern) => {
      // Only handling event pattern
      if (handler.isEventHandler) {
        const consumer = await this.client.subscribe({
          topic: pattern,
          subscription:
            handler.extras.subscription ||
            this.options.subscription ||
            "default",
          subscriptionType:
            handler.extras.subscriptionType ||
            this.options.subscriptionType ||
            "default",
          listener: async (message: Message, consumer: Consumer) => {
            await handler(JSON.parse(message.getData().toString()));
            consumer.acknowledge(message);
          },
        });
        this.consumers.push(consumer);
      }
    });
  }

  /**
   * Get and save a connection to the faye broker
   */
  public createPulsarClient(): Client {
    const serviceUrl = this.options?.serviceUrl;
    return new Client({ serviceUrl });
  }

  /**
   * Close() is required by `CustomTransportStrategy`...
   * Closing pulsar connection
   */
  public close(): void {
    this.consumers.forEach((consumer) => {
      consumer.close();
    });
  }
}
