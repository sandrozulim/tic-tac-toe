import { twMerge } from "tailwind-merge";
import type { components } from "../types/api.generated";
import { Button } from "./Button";
import useJoinGame from "../hooks/useJoinGame";

type Game = components["schemas"]["Game"];

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  const joinGameMutation = useJoinGame();

  const canJoinGame = game.status === "open" && !game.second_player;
  const isFinished = game.status === "finished";
  const statusIndicatorColor = isFinished ? "bg-red-500" : "bg-green-500";

  const handleJoinGame = () => {
    joinGameMutation.reset();
    joinGameMutation.mutate(game.id);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className={twMerge("w-2 h-2 rounded-full", statusIndicatorColor)}
        />
        <h3 className="font-semibold text-gray-800">Game {game.id}</h3>
      </div>

      {game.first_player && (
        <div className="flex flex-col text-sm text-gray-500 mt-4">
          <p>
            Player 1:{" "}
            <span className="font-medium">{game.first_player.username}</span>
          </p>
          <p>
            Player 2:{" "}
            <span className="font-medium">
              {game.second_player?.username ?? "Waiting..."}
            </span>
          </p>
          {isFinished && game.winner && (
            <p className="mt-2 text-sm font-medium">
              Winner: {game.winner.username}
            </p>
          )}
        </div>
      )}

      {canJoinGame && (
        <Button
          onClick={handleJoinGame}
          className="mt-2 w-fit py-0.5"
          disabled={joinGameMutation.isPending}
        >
          {joinGameMutation.isPending ? "Joining..." : "Join"}
        </Button>
      )}

      {joinGameMutation.isError && (
        <p className="text-red-600 mt-2">
          {joinGameMutation.error?.response?.data.errors?.[0]?.message ||
            joinGameMutation.error?.message}
        </p>
      )}
    </div>
  );
}
