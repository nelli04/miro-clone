"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "../user-avatar";
import { connectionIdToColor } from "@/lib/connection-id-to-color";

const MAX_SHOW_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUsers = users.length > MAX_SHOW_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOW_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info?.picture}
              fallback={info?.name?.[0] || "A"}
              name={info?.name}
              borderColor={connectionIdToColor(connectionId)}
            />
          );
        })}

        {currentUser && (
          <UserAvatar
            src={currentUser?.info?.picture}
            fallback={`${currentUser?.info?.name} ('You')`}
            name={currentUser?.info?.name}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            src={currentUser?.info?.picture}
            fallback={`${currentUser?.info?.name} ('You')`}
            name={`${users.length - MAX_SHOW_USERS} more`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};
