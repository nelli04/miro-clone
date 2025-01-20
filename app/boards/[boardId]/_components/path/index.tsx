import { PointerEvent } from "react";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/get-svg-path-from-stroke";

type PathProps = {
  x: number;
  y: number;
  fill: string;
  points: number[][];
  onPointerDown?: (e: PointerEvent) => void;
  stroke?: string;
};

export const Path = ({
  points,
  x,
  y,
  stroke,
  onPointerDown,
  fill,
}: PathProps) => {
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};
