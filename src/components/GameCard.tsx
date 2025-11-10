import { twMerge } from "tailwind-merge";
import type { components } from "../types/api.generated";
import { Button } from "./Button";

type Game = components["schemas"]["Game"];

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className={twMerge(
            "w-2 h-2 rounded-full",
            game.status === "finished" ? "bg-red-500" : "bg-green-500"
          )}
        />
        <h3 className="font-semibold text-gray-800">Game {game.id}</h3>
      </div>

      {game.first_player && (
        <div className="flex flex-col text-sm text-gray-500 mt-4">
          <p>
            Player 1:{" "}
            <span className="font-medium">{game.first_player?.username}</span>
          </p>
          <p>
            Player 2:{" "}
            <span className="font-medium">{game.second_player?.username}</span>
          </p>
        </div>
      )}
      {/* TODO - Implement join game feature */}
      {game.status === "open" && !game.second_player && (
        <Button className="mt-2">Join</Button>
      )}
    </div>
  );
}
