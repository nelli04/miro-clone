import { penPointsToPathLayer } from "@/lib/pen-points-to-path-layer";
import { useMutation } from "@/liveblocks.config";
import {
    CanvasMode,
    CanvasState,
    Color,
    LayerType,
    Point,
} from "@/types/canvas";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";

const MAX_LAYERS = 100;

type InsertLayerType = {
  lastUsedColor: Color;
  setCanvasState: (state: CanvasState) => void;
};

export const useInsertLayer = ({
  lastUsedColor,
  setCanvasState,
}: InsertLayerType) => {
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Rectangle
        | LayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const insertPath = useMutation(
    ({ self, setMyPresence, storage }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });

        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: CanvasMode.Pencil });
    },
    [lastUsedColor]
  );

  return { insertLayer, insertPath };
};
