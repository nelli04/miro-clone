import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

import { Layer, Color } from "./types/canvas";

const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",
});

type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string[];
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  pencilColor: Color | null;
};

type UserMeta = {
  id?: string,
  info? : {
    name?: string,
    picture?: string
  };
};

type Storage = {
  layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
};

export const {
  RoomProvider,
  useMyPresence,
  useStorage,
  useSelf,
  useOthers,
  useHistory,
  useCanUndo,
  useCanRedo,
  useOthersConnectionIds,
  useOther,
  useMutation,
  useOthersMapped,
} = createRoomContext<Presence, Storage, UserMeta>(client);
