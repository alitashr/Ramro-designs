import React, { useState } from "react";
import { Pagination } from "./index";
export interface IPaginationContainerProps {
  handlePagination: (page: number) => void;
  totalPages: number
}
export const PaginationContainer = (props: IPaginationContainerProps) => {
  const { handlePagination, totalPages = 15} = props;

  const [page, setPage] = useState(1);
  //const totalPages = 15;
  const handlePages = (updatePage: number) => {
    if(handlePagination) handlePagination(updatePage);
    setPage(updatePage);
  };
  return (
    <div className="container">
      <Pagination page={page} totalPages={totalPages} handlePagination={handlePages} />
    </div>
  );
};
