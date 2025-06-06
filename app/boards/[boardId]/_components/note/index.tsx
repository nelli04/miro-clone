import { PointerEvent } from "react";
import { Kalam } from "next/font/google";
import { NoteLayer } from "@/types/canvas";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "@/liveblocks.config";
import { colorToCss } from "@/lib/color-to-css";
import { getContrastingTextColor } from "@/lib/get-contrasting-text-color";
import { cn } from "@/lib/cn";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

type NoteProps = {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: PointerEvent, id: string) => void;
  selectionColor?: string;
};

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnWidth = width * scaleFactor;
  const fontSizeBasedOnHeight = height * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

export const Note = ({
  onPointerDown,
  selectionColor,
  id,
  layer,
}: NoteProps) => {
  const { x, y, height, width, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const contentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#000",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "Text"}
        onChange={contentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};
