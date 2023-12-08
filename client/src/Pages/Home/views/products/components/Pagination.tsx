import { FC } from "react";

type PagionationProps = {
  currentPage: number;
  totalPages: number;
  dataLength: number;
  onPageChange: (page: number) => void;
};
const Pagination: FC<PagionationProps> = ({
  currentPage,
  totalPages,
  dataLength,
  onPageChange,
}) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400 flex items-center justify-center gap-2">
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage}
        </span>
        Out of
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages - currentPage}
        </span>
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
