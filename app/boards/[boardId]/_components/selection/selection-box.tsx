"use client";

import { memo } from "react";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@/liveblocks.config";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { handleConfig, HandleSelection } from "./handle-selection";

type SelectionBoxProps = {
  onResizeHandlerPointerDown: (corner: Side, initialBounds: XYWH) => void;
};

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(
  ({ onResizeHandlerPointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();

    if (!bounds) {
      return null;
    }

    const handleX = (offsetX: number) =>
      bounds.x + bounds.width * offsetX - HANDLE_WIDTH / 2;
    const handleY = (offsetY: number) =>
      bounds.y + bounds.height * offsetY - HANDLE_WIDTH / 2;

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowHandles &&
          handleConfig.map(({ side, cursor, offsetX, offsetY }) => (
            <HandleSelection
              key={side}
              side={side}
              cursor={cursor}
              x={handleX(offsetX)}
              y={handleY(offsetY)}
              width={HANDLE_WIDTH}
              onPointerDown={(corner) =>
                onResizeHandlerPointerDown(corner, bounds)
              }
            />
          ))}
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";
