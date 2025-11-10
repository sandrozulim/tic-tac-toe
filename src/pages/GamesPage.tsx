import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { usePaginatedGames } from "../hooks/usePaginatedGames";
import { PaginationControls } from "../components/PaginationControls";
import GameCard from "../components/GameCard";

export default function GamesPage() {
  const [page, setPage] = useState(1);
  const { data, isError, error, isFetching, totalPages } = usePaginatedGames(
    ["games"],
    page
  );

  if (isError) {
    return (
      <ErrorMessage
        message={error.response?.data.errors?.[0]?.message || error.message}
      />
    );
  }

  if (data?.results?.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Games</h2>
        <ErrorMessage message="No games found" />
      </div>
    );
  }

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Games</h2>

      {!isFetching && data?.results && (
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {data.results.map((game) => (
              <li
                className="p-4 border border-gray-200 rounded-lg shadow-lg"
                key={game.id}
              >
                <GameCard game={game} />
              </li>
            ))}
          </ul>
          <PaginationControls
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            isFetching={isFetching}
          />
        </div>
      )}
    </div>
  );
}
