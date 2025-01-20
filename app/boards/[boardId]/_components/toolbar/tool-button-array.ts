import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";
import { Circle, MousePointer2, Pencil, Square, StickyNote, Type } from "lucide-react";

export const toolButton = [
    {
      label: "Select",
      icon: MousePointer2,
      isActive: (state: CanvasState) =>
        [
          CanvasMode.None,
          CanvasMode.Translating,
          CanvasMode.SelectionNet,
          CanvasMode.Pressing,
          CanvasMode.Resizing,
        ].includes(state.mode),
      onClick: (setCanvasState: (state: CanvasState) => void) =>
        setCanvasState({ mode: CanvasMode.None }),
    },
    {
      label: "Text",
      icon: Type,
      isActive: (state: CanvasState) =>
        state.mode === CanvasMode.Inserting && state.layerType === LayerType.Text,
      onClick: (setCanvasState: (state: CanvasState) => void) =>
        setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Text }),
    },
    {
      label: "Sticky Note",
      icon: StickyNote,
      isActive: (state: CanvasState) =>
        state.mode === CanvasMode.Inserting &&
        state.layerType === LayerType.Note,
      onClick: (setCanvasState: (state: CanvasState) => void) =>
        setCanvasState({ mode: CanvasMode.Inserting, layerType: LayerType.Note }),
    },
    {
      label: "Rectangle",
      icon: Square,
      isActive: (state: CanvasState) =>
        state.mode === CanvasMode.Inserting &&
        state.layerType === LayerType.Rectangle,
      onClick: (setCanvasState: (state: CanvasState) => void) =>
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Rectangle,
        }),
    },
    {
      label: "Elipse",
      icon: Circle,
      isActive: (state: CanvasState) =>
        state.mode === CanvasMode.Inserting &&
        state.layerType === LayerType.Ellipse,
      onClick: (setCanvasState: (state: CanvasState) => void) =>
        setCanvasState({
          mode: CanvasMode.Inserting,
          layerType: LayerType.Ellipse,
        }),
    },
    {
      label: "Pen",
      icon: Pencil,
      isActive: (state: CanvasState) => state.mode === CanvasMode.Pencil,
      onClick: (setCanvasState: (state: CanvasState) => void) =>
        setCanvasState({ mode: CanvasMode.Pencil }),
    },
  ];