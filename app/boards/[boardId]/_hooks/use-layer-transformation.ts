import { useCallback } from "react";
import { resizeBounds } from "@/lib/resize-bounds";
import { useMutation } from "@/liveblocks.config";
import { CanvasMode, CanvasState, Point, Side, XYWH } from "@/types/canvas";
import { History } from "@liveblocks/client";

type LayerTransformationType = {
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
  history: History;
};

export const useLayerTransformation = ({
  canvasState,
  setCanvasState,
  history,
}: LayerTransformationType) => {
  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState]
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const onResizeHandlerPointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();

      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  return {
    translateSelectedLayers,
    resizeSelectedLayer,
    onResizeHandlerPointerDown,
  };
};
