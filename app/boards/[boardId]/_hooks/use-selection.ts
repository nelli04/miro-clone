import { findIntersectingLayersWithRectangle } from "@/lib/find-intersecting-layers-with-rectangle";
import { useMutation } from "@/liveblocks.config";
import { CanvasMode, CanvasState, Point } from "@/types/canvas";
import { useCallback } from "react";

type Selection = {
  layerIds: readonly string[] | null;
  setCanvasState: (state: CanvasState) => void;
};

export const useSelection = ({ setCanvasState, layerIds }: Selection) => {
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, [setCanvasState]);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();

      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = layerIds
        ? findIntersectingLayersWithRectangle(layerIds, layers, origin, current)
        : [];

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  return { startMultiSelection, updateSelectionNet };
};
