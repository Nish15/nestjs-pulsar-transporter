import { Client, Consumer, Producer } from 'pulsar-client';

import { CustomClientOptions } from '@nestjs/microservices';

import { ServerPulsar } from '../src/server-pulsar';

describe('ServerPulsar', () => {
  let client: Client;
  let producer: Producer;
  let consumers: Consumer[] = [];
  let customerClientOptions: CustomClientOptions['options'];
  
  let serverPulsarService: ServerPulsar;
  beforeEach(() => {
    serverPulsarService = new ServerPulsar(customerClientOptions)
  })

  describe('listen', () => {
    /**
     * Test that listen function is be defined.
     */
    it('should be define', () => {
      expect(serverPulsarService.listen).toBeDefined();
    })

    it('should called createPulsarClient function', () => {
      jest.spyOn(serverPulsarService, 'createPulsarClient').mockImplementation(() => client);
      serverPulsarService.listen(() => {});
      expect(serverPulsarService.createPulsarClient).toBeCalled();
    })
  })
})