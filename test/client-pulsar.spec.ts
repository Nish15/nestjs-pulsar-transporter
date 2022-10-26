import { ClientConfig } from 'pulsar-client';

import { ClientPulsar } from '../src/client-pulsar';

describe('ClientPulsar', () => {
  let clientConfig: ClientConfig = { serviceUrl: ''};
  let clientPulsarService: ClientPulsar;

  beforeEach(() => {
    clientPulsarService = new ClientPulsar(clientConfig)
  })

  describe('connect', () => {
    /**
     * Test that the connect function is defined.
     */
    it('should be defined', () => {
      expect(clientPulsarService.connect).toBeDefined();
    })
  })
})
