import { http, createPublicClient } from 'viem';

export const getPublicClient = (chain: any) =>
  createPublicClient({
    chain,
    transport: http(),
  });
