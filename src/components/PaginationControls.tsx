import { Button } from "./Button";
import ArrowRightIcon from "./icons/ArrowRight";
import ArrowLeftIcon from "./icons/ArrowLeft";

type PaginationControlsProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  isFetching?: boolean;
};

export function PaginationControls({
  page,
  setPage,
  totalPages,
  isFetching,
}: PaginationControlsProps) {
  return (
    <div className="flex justify-center items-center gap-4">
      <Button
        className="w-fit rounded-full p-1"
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1 || isFetching}
        aria-label="Previous page"
      >
        <ArrowLeftIcon />
      </Button>
      <span className="text-sm text-gray-600">
        {page} / {totalPages}
      </span>
      <Button
        className="w-fit rounded-full p-1"
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages || isFetching}
        aria-label="Next page"
      >
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
