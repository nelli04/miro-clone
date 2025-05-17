import Room from "@/components/room";
import { Canvas } from "./_components/canvas/canvas";
import { CanvasLoading } from "./_components/canvas/canvas-loading";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { boardId } = await params;
  
  return (
    <Room roomId={boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
};

export default BoardIdPage;
