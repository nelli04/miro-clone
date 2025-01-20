"use client";

import { memo } from "react";
import { ColorPicker } from "@/app/boards/[boardId]/_components/color-picker";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";

import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { useMoveLayers } from "../../_hooks/use-move-layers";
import { ToolButton } from "../tool-button";

type SelectionToolsProps = {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

const getTranslatedStyle = (
  bounds: { x: number; y: number; width: number },
  camera: Camera
) => ({
  transform: `translate(calc(${bounds.width / 2 + bounds.x + camera.x}px - 50%), calc(${bounds.y + camera.y - 16}px - 100%))`,
});

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const { moveToBack, moveToFront } = useMoveLayers(selection);

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
      return null;
    }

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={getTranslatedStyle(selectionBounds, camera)}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <ToolButton
            label="Bring to front"
            onClick={moveToFront}
            icon={BringToFront}
          />
          <ToolButton
            label="Send to back"
            onClick={moveToBack}
            icon={SendToBack}
          />
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <ToolButton label="Delete" onClick={deleteLayers} icon={Trash2} />
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
