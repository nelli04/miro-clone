"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { BoardCard } from "../board-card";
import { useSearchParams } from "next/navigation";
import { EmptySearch } from "../empty/empty-search";
import { EmptyFavorites } from "../empty/empty-favorites";
import { EmptyBoards } from "../empty/empty-boards";
import { NewBoardButton } from "../new-board-button";

type BoardListProps = {
  orgId: string;
};

export const BoardList = ({ orgId }: BoardListProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const favorites = searchParams.get("favorites") || "";

  const data = useQuery(api.boards.get, { orgId, search, favorites });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl ">
          {favorites ? "Favorites boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && search) {
    return <EmptySearch />;
  }

  if (!data?.length && favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl ">
        {favorites ? "Favorites boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
