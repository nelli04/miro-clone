import { useMutation } from "@/liveblocks.config";
import { CanvasMode, Point } from "@/types/canvas";
import { CanvasState } from "@/types/canvas";

type PencilTool = {
  canvasState: CanvasState;
};

export const usePencilTool = ({ canvasState }: PencilTool) => {
  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode]
  );

  return { continueDrawing };
};
