import { Link } from "react-router";
import { useParams } from "react-router";
import { ErrorMessage } from "../components/ErrorMessage";
import Board from "../components/Board";
import useGame from "../hooks/useGame";
import useMakeMove from "../hooks/useMakeMove";

export default function GamePage() {
  const { id } = useParams<{ id: string }>();

  if (!id) return <ErrorMessage message="Invalid game ID" />;

  const { data, isError, error, isLoading } = useGame(id);
  const makeMove = useMakeMove(id);

  if (isLoading) return <p className="text-center">Loading game...</p>;
  if (isError)
    return (
      <ErrorMessage
        message={error.response?.data.errors?.[0]?.message || error.message}
      />
    );
  if (!data) return <ErrorMessage message="Game not found" />;

  const handleMakeMove = (row: number, col: number) => {
    makeMove.mutate({ row, col });
  };

  const getNextToMove = () => {
    if (!data.second_player) return "Waiting for another player...";

    const totalMoves = data.board.flat().filter(Boolean).length;
    const isFirstTurn = totalMoves % 2 === 0;

    return isFirstTurn
      ? `${data.first_player.username}'s turn (X)`
      : `${data.second_player.username}'s turn (O)`;
  };

  const isFinished = data.status === "finished";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-4xl font-semibold text-center mb-6">
        Game #{data.id}
      </h2>

      <div className="text-gray-700 text-center mb-4">
        <p>
          Status: <span className="font-medium">{data.status}</span>
        </p>
        <p className="mt-4 text-2xl font-medium">
          {isFinished
            ? data.winner?.username
              ? `Winner: ${data.winner.username}`
              : "Game finished without winner"
            : getNextToMove()}
        </p>
      </div>

      {isFinished ? (
        <div className="text-center mt-6">
          <Link
            to="/"
            className="px-4 py-2 bg-white text-black border border-gray-400 shadow-lg rounded-lg"
          >
            Back to Games List
          </Link>
        </div>
      ) : (
        <div>
          <Board
            board={data.board}
            firstPlayerId={data.first_player?.id}
            secondPlayerId={data.second_player?.id}
            onMakeMove={handleMakeMove}
          />
          {makeMove.isError && (
            <ErrorMessage
              message={
                makeMove.error.response?.data.errors[0].message ||
                makeMove.error.message
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
