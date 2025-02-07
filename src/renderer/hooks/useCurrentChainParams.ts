import { useLocation, useParams } from 'react-router-dom';
import { typeChainID } from '../../shared/constant/chain';

function extractValues(path: string) {
  const parts = path.split("/"); // Split by "/"

    if (parts.length >= 4) {
        return { layer: parts[3], chainId: parts[4] }; // Adjust index as needed
    }

    return { layer: null, chainId: null };
}

export const useCurrentChainParams = () => {
  const { layer, chainId } = useParams();
  let layerNum = +(layer as string);
  let chainIdNum = +(chainId as string);
  const location = useLocation();

  if (isNaN(layerNum) || isNaN(chainIdNum)) {
    const { layer, chainId } = extractValues(location.pathname);
    layerNum = +(layer as string);
    chainIdNum = +(chainId as string);
  }

  return {
    layer: layerNum as 1 | 2,
    chainId: chainIdNum as typeChainID,
  };
};
