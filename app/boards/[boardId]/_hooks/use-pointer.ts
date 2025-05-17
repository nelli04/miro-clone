import { pointerEventToCanvasPoint } from "@/lib/pointer-event-to-canvas-point";
import { useMutation } from "@/liveblocks.config";
import { Camera, CanvasMode, CanvasState, Color, Point } from "@/types/canvas";
import { History } from "@liveblocks/client";
import { useCallback, PointerEvent } from "react";
import { useInsertLayer } from "./insert-layer";
import { useSelection } from "./use-selection";
import { useLayerTransformation } from "./use-layer-transformation";
import { usePencilTool } from "./use-pencil-tool";

type PointerType = {
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
  camera: Camera;
  lastUsedColor: Color;
  history: History;
  layerIds: readonly string[] | null;
};

export const usePointer = ({
  canvasState,
  setCanvasState,
  camera,
  lastUsedColor,
  history,
  layerIds,
}: PointerType) => {
  const { insertLayer, insertPath } = useInsertLayer({
    lastUsedColor,
    setCanvasState,
  });

  const { continueDrawing } = usePencilTool({ canvasState });

  const { translateSelectedLayers, resizeSelectedLayer } =
    useLayerTransformation({ canvasState, setCanvasState, history });

  const { startMultiSelection, updateSelectionNet } = useSelection({
    setCanvasState,
    layerIds,
  });

  const startDrawing = useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        pencilColor: lastUsedColor,
      });
    },
    [lastUsedColor]
  );

  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      switch (canvasState.mode) {
        case CanvasMode.None:
        case CanvasMode.Pressing:
          unselectLayers();
          setCanvasState({ mode: CanvasMode.None });
          break;
        case CanvasMode.Pencil:
          insertPath();
          break;
        case CanvasMode.Inserting:
          insertLayer(canvasState.layerType, point);
          break;
        default:
          setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [
      camera,
      canvasState,
      setCanvasState,
      history,
      insertLayer,
      unselectLayers,
      insertPath,
    ]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      switch (canvasState.mode) {
        case CanvasMode.Pencil:
          startDrawing(point, e.pressure);
          break;
        case CanvasMode.Inserting:
          break;
        default:
          setCanvasState({ origin: point, mode: CanvasMode.Pressing });
      }
    },
    [camera, canvasState.mode, setCanvasState, startDrawing]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      switch (canvasState.mode) {
        case CanvasMode.Pressing:
          startMultiSelection(current, canvasState.origin);
          break;
        case CanvasMode.SelectionNet:
          updateSelectionNet(current, canvasState.origin);
          break;
        case CanvasMode.Translating:
          translateSelectedLayers(current);
          break;
        case CanvasMode.Resizing:
          resizeSelectedLayer(current);
          break;
        case CanvasMode.Pencil:
          continueDrawing(current, e);
          break;
      }

      setMyPresence({ cursor: current });
    },
    [camera, canvasState]
  );

  return {
    onPointerDown,
    onPointerLeave,
    onLayerPointerDown,
    onPointerUp,
    onPointerMove,
  };
};
