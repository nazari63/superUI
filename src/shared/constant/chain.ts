import { defineChain } from 'viem';

export const AvailableForkChain = [
  'base',
  'lyra',
  'metal',
  'mode',
  'op',
  'orderly',
  'race',
  'tbn',
  'zora',
];

export type AvailableForkChainType = (typeof AvailableForkChain)[number];

export const localChain = defineChain({
  name: 'local',
  id: 900,
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545'],
    },
  },
});
