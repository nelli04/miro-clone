import { CanvasState } from "@/types/canvas";
import { Redo2, Undo2 } from "lucide-react";
import { ToolButton } from "../tool-button";
import { toolButton } from "./tool-button-array";

type ToolbarProps = {
  canvasState: CanvasState;
  setCanvasState: (state: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canRedo: boolean;
  canUndo: boolean;
};

export const Toolbar = ({
  undo,
  canUndo,
  canRedo,
  redo,
  setCanvasState,
  canvasState,
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center gap-y-1 shadow-md">
        {toolButton.map((tool) => (
          <ToolButton
            key={tool.label}
            label={tool.label}
            icon={tool.icon}
            onClick={() => tool.onClick(setCanvasState)}
            isActive={tool.isActive(canvasState)}
          />
        ))}
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-gray-200 rounded-md p-1.5 flex flex-col items-center gap-y-1 shadow-md animate-pulse">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-300 rounded-full"/>
          ))}
      </div>
      <div className="bg-gray-200 rounded-md p-1.5 flex flex-col items-center shadow-md animate-pulse">
        <div className="h-8 w-8 bg-gray-300 rounded-full"/>
        <div className="h-8 w-8 bg-gray-300 rounded-full"/>
      </div>
    </div>
  );
};
