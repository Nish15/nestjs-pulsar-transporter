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
     * Test that connect function is be defined.
     */
    it('should called connect', () => {
      expect(clientPulsarService.connect).toBeDefined();
    })
  })
})