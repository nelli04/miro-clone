import { Side } from "@/types/canvas";

type HandleSelection = {
  side: Side;
  cursor: string;
  x: number;
  y: number;
  width: number;
  onPointerDown: (side: Side) => void;
};

export const HandleSelection = ({
  side,
  cursor,
  x,
  y,
  width,
  onPointerDown,
}: HandleSelection) => (
  <rect
    className="fill-white stroke-1 stroke-blue-500"
    x={0}
    y={0}
    style={{
      cursor,
      width: `${width}px`,
      height: `${width}px`,
      transform: `translate(${x}px, ${y}px)`,
    }}
    onPointerDown={(e) => {
      e.stopPropagation();
      onPointerDown(side);
    }}
  />
);

export const handleConfig = [
  { side: Side.Top + Side.Left, cursor: "nw-resize", offsetX: 0, offsetY: 0 },
  { side: Side.Top, cursor: "ns-resize", offsetX: 0.5, offsetY: 0 },
  {
    side: Side.Top + Side.Right,
    cursor: "nesw-resize",
    offsetX: 1,
    offsetY: 0,
  },
  { side: Side.Right, cursor: "ew-resize", offsetX: 1, offsetY: 0.5 },
  {
    side: Side.Bottom + Side.Right,
    cursor: "nwse-resize",
    offsetX: 1,
    offsetY: 1,
  },
  { side: Side.Bottom, cursor: "ns-resize", offsetX: 0.5, offsetY: 1 },
  {
    side: Side.Bottom + Side.Left,
    cursor: "nesw-resize",
    offsetX: 0,
    offsetY: 1,
  },
  { side: Side.Left, cursor: "ew-resize", offsetX: 0, offsetY: 0.5 },
];
