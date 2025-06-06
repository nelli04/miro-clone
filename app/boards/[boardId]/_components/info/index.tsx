"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Hint from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

type InfoProps = {
  boardId: string;
};

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5" />;
};

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to board" side="bottom" sideOffset={10}>
        <Link href="/">
          <Button className="px-2" variant="board">
            <Image src="/logo.svg" alt="Board logo" height={40} width={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Button>
        </Link>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Main menu" side="bottom" sideOffset={10}>
        <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
          <Button size="icon" variant="board">
            <Menu />
          </Button>
        </Actions>
      </Hint>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
