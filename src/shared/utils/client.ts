import { http, createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import { localChain } from '../constant/chain';

export const client = {
  local: {
    eth: createPublicClient({
      chain: localChain,
      transport: http(),
    }),
  },
};
