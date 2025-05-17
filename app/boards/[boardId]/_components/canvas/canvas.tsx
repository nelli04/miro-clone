"use client";

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { CanvasMode, CanvasState, Side, XYWH } from "@/types/canvas";
import { useCallback, useState, WheelEvent } from "react";
import { Info } from "../info";
import { Participants } from "../participansts";
import { Toolbar } from "../toolbar";

import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce";

import { useCanvasShortcuts } from "../../_hooks/use-canvas-shortcuts";
import { usePointer } from "../../_hooks/use-pointer";
import { SelectionTools } from "../selection/selection-tools";
import { CanvasLoading } from "./canvas-loading";
import { CanvasSvg } from "./canvas-svg";
import { useLayerTransformation } from "../../_hooks/use-layer-transformation";

type CanvasProps = {
  boardId: string;
};

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);

  const [lastUsedColor, setLastUsedColor] = useState({
    r: 255,
    g: 134,
    b: 493,
  });
  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const pencilDraft = useSelf((me) => me.presence.pencilDraft);

  useDisableScrollBounce();

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  const {
    onPointerUp,
    onPointerDown,
    onPointerLeave,
    onPointerMove,
    onLayerPointerDown,
  } = usePointer({
    camera,
    canvasState,
    setCanvasState,
    history,
    lastUsedColor,
    layerIds,
  });

  const {onResizeHandlerPointerDown} = useLayerTransformation({canvasState, setCanvasState, history});

  const onWheel = useCallback((e: WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  useCanvasShortcuts({ history });

  if (!layerIds) {
    return <CanvasLoading />;
  }

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <CanvasSvg
        camera={camera}
        canvasState={canvasState}
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        layerIds={layerIds}
        onLayerPointerDown={onLayerPointerDown}
        onResizeHandlerPointerDown={onResizeHandlerPointerDown}
        pencilDraft={pencilDraft}
        lastUsedColor={lastUsedColor}
      />
    </main>
  );
};
