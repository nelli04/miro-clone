import { useMutation } from "@/liveblocks.config";

export const useMoveLayers = (selection: string[] | null) => {
    const moveToBack = useMutation(({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];
      const arr = liveLayerIds.toImmutable();
  
      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indices.push(i);
        }
      }
  
      indices.forEach((index, i) => liveLayerIds.move(index, i));
    }, [selection]);
  
    const moveToFront = useMutation(({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];
      const arr = liveLayerIds.toImmutable();
  
      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indices.push(i);
        }
      }
  
      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i));
      }
    }, [selection]);
  
    return { moveToBack, moveToFront };
  };