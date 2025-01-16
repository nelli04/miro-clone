import { PointerEvent } from "react";
import { colorToCss } from "@/lib/color-to-css";
import { RectangleLayer } from "@/types/canvas";

type RectangleProps = {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Rectangle = ({
  onPointerDown,
  selectionColor,
  id,
  layer,
}: RectangleProps) => {
  const { x, y, height, width, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};
