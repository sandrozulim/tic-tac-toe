type BoardProps = {
  board: (number | null)[][];
  firstPlayerId: number;
  secondPlayerId: number;
  onMakeMove: (row: number, col: number) => void;
};

export default function Board({
  board,
  firstPlayerId,
  secondPlayerId,
  onMakeMove,
}: BoardProps) {
  const getCellDisplay = (value: number | null): string => {
    if (value === firstPlayerId) return "X";
    if (value === secondPlayerId) return "O";
    if (value === null) return "";
    return "?";
  };

  const handleClick = (value: number | null, row: number, col: number) => {
    if (value !== null) return;
    onMakeMove(row, col);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((cell, colIndex) => {
            const display = getCellDisplay(cell);
            const isOccupied = cell !== null;

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`w-16 h-16 border border-gray-400 flex items-center justify-center text-2xl font-bold rounded-md transition 
                  ${
                    !isOccupied
                      ? "hover:bg-gray-100 cursor-pointer"
                      : "cursor-default"
                  }`}
                onClick={() => handleClick(cell, rowIndex, colIndex)}
                disabled={isOccupied}
              >
                {display}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
