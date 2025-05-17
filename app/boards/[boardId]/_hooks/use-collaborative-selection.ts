import { useOthersMapped } from "@/liveblocks.config";
import { connectionIdToColor } from "@/lib/connection-id-to-color";
import { useMemo } from "react";

export const useCollaborativeSelection = () => {
  const selections = useOthersMapped((o) => o.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const result: Record<string, string> = {};

    for (const [connectionId, selection] of selections) {
      for (const layerId of selection) {
        result[layerId] = connectionIdToColor(connectionId);
      }
    }

    return result;
  }, [selections]);

  return { layerIdsToColorSelection };
};
