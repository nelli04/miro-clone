import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useEffect } from "react";
import { History } from "@liveblocks/client";

type UseCanvasShortcutsProps = {
  history: History;
};

export function useCanvasShortcuts({ history }: UseCanvasShortcutsProps) {
  const deleteLayers = useDeleteLayers();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Backspace") {
        deleteLayers();
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();

        if (e.shiftKey) {
          history.redo();
        } else {
          history.undo();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayers, history]);
}
