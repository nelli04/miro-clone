import { colorToCss } from "@/lib/color-to-css";
import { CanvasMode, CanvasState, Side, XYWH } from "@/types/canvas";
import React from "react";
import { CursorsPresence } from "../cursor/cursors-presence";
import { LayerPreview } from "../layer-preview";
import { Path } from "../path";
import { SelectionBox } from "../selection/selection-box";
import { useCollaborativeSelection } from "../../_hooks/use-collaborative-selection";

type CanvasSVGProps = {
  camera: { x: number; y: number };
  canvasState: CanvasState;
  onWheel: (e: React.WheelEvent) => void;
  onPointerMove: (e: React.PointerEvent<Element>) => void;
  onPointerLeave: () => void;
  onPointerUp: (e: React.PointerEvent<SVGSVGElement>) => void;
  onPointerDown: (e: React.PointerEvent) => void;
  layerIds: readonly string[];
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  onResizeHandlerPointerDown: (corner: Side, bounds: XYWH) => void;
  pencilDraft: number[][] | null;
  lastUsedColor: { r: number; g: number; b: number };
};

export const CanvasSvg = ({
  camera,
  canvasState,
  onWheel,
  onPointerMove,
  onPointerLeave,
  onPointerUp,
  onPointerDown,
  layerIds,
  onLayerPointerDown,
  onResizeHandlerPointerDown,
  pencilDraft,
  lastUsedColor,
}: CanvasSVGProps) => {
  const { layerIdsToColorSelection } = useCollaborativeSelection();

  
  return (
    <svg
      className="h-[100vh] w-[100vw]"
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
    >
      <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
        {layerIds.map((layerId) => (
          <LayerPreview
            key={layerId}
            id={layerId}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={layerIdsToColorSelection[layerId]}
          />
        ))}

        <SelectionBox onResizeHandlerPointerDown={onResizeHandlerPointerDown} />

        {canvasState.mode === CanvasMode.SelectionNet &&
          canvasState.current && (
            <rect
              className="fill-blue-500/5 stroke-blue-500 stroke-1"
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
            />
          )}

        <CursorsPresence />

        {pencilDraft !== null && pencilDraft.length > 0 && (
          <Path
            x={0}
            y={0}
            fill={colorToCss(lastUsedColor)}
            points={pencilDraft as number[][]}
          />
        )}
      </g>
    </svg>
  );
};
