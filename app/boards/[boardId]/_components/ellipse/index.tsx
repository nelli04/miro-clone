import { PointerEvent } from "react";
import { EllipseLayer } from "@/types/canvas";
import { colorToCss } from "@/lib/color-to-css";

type EllipseProps = {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: PointerEvent, id: string) => void;
  selectionColor?: string;
};

export const Ellipse = ({
  onPointerDown,
  selectionColor,
  id,
  layer,
}: EllipseProps) => {
  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(
                ${layer.x}px,
                ${layer.y}px
                )`,
      }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={layer.fill ? colorToCss(layer.fill) : "#000"}
      stroke={selectionColor || "transparent"}
      strokeWidth={1}
    />
  );
};
