import { createSlice } from '@reduxjs/toolkit';
import {
  chainMapID,
  getDefinedChain,
  typeChain,
  typeChainID,
} from '../../../shared/constant/chain';
import { useAppSelector } from '../hooks';

interface ChainState {
  mode?: 'fork' | 'quick';
  name?: string;
  isLoading?: boolean;
  l1: typeChainID[];
  l2: typeChainID[];
  chainIndex: {
    [key in typeChainID]?: number;
  };
  chainConfing: {
    [key in typeChainID]?: {
      name: string;
      id: number;
      nativeCurrency: {
        decimals: number;
        name: string;
        symbol: string;
      };
      rpcUrls: {
        default: {
          http: string[];
        };
      };
    };
  };
}

const initialState: ChainState = {
  mode: undefined,
  name: undefined,
  isLoading: false,
  l1: [],
  l2: [],
  chainConfing: {},
  chainIndex: {},
};

interface forkModePayloadInterface {
  name:string;
  l2: typeChain[];
}

export const ChainSlide = createSlice({
  name: 'chain',
  initialState,
  reducers: {
    runQuickMode(state, { payload }) {
      state.mode = 'quick';
      state.name = payload.name;
      state.isLoading = true;
      state.l1 = [chainMapID.local];
      state.l2 = [chainMapID.OPChainA, chainMapID.OPChainB];
      state.chainIndex = {
        [chainMapID.local]: 0,
        [chainMapID.OPChainA]: 1,
        [chainMapID.OPChainB]: 2,
      };
      state.chainConfing = {
        [chainMapID.local]: getDefinedChain('local', 0),
        [chainMapID.OPChainA]: getDefinedChain('OPChainA', 1),
        [chainMapID.OPChainB]: getDefinedChain('OPChainB', 2),
      };
    },
    runForkMode(state, { payload }: { payload: forkModePayloadInterface }) {
      state.mode = 'fork';
      state.name = payload.name;
      state.isLoading = true;
      state.l1 = [chainMapID.mainnet];
      state.l2 = payload.l2.map((chain) => chainMapID[chain]);
      state.chainIndex = {
        [chainMapID.mainnet]: 0,
        ...payload.l2.reduce((acc, chain, index) => {
          acc[chainMapID[chain]] = index + 1;
          return acc;
        }, {} as { [key in typeChainID]?: number }),
      };
      state.chainConfing = {
        [chainMapID.mainnet]: getDefinedChain('mainnet', 0),
        ...payload.l2.reduce((acc, chain, index) => {
          acc[chainMapID[chain]] = getDefinedChain(chain, index + 1);
          return acc;
        }, {} as { [key in typeChainID]?: ReturnType<typeof getDefinedChain> }),
      };
    },
  },
});

export const useChainState = () => useAppSelector((state) => state.chain);
export const { runQuickMode } = ChainSlide.actions;
export default ChainSlide.reducer;
