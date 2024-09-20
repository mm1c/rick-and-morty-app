import { Container, IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

enum PaginationDirections {
  PREVIOUS,
  NEXT,
}

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({
  pageCount,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  if(currentPage > pageCount - 1) {
    currentPage = pageCount - 1
  } else if(currentPage < 0) {
    currentPage = 0;
  }

  const paginate = (direction: PaginationDirections) => {
    if (direction === PaginationDirections.PREVIOUS)
      return setCurrentPage((page) => (page > 0 ? page - 1 : 0));

    setCurrentPage((page) => (page < pageCount - 1 ? page + 1 : pageCount - 1));
  };

  return (
    <Container
      sx={{
        flexDirection: "row",
        justifyContent: { xs: "space-between", sm: "flex-end" },
        alignItems: "center",
        marginTop: "20px",
        display: "flex",
      }}
      data-testid="pagination"
    >
      {currentPage > 0 && (
        <IconButton
          aria-label="paginate-previous"
          onClick={() => paginate(PaginationDirections.PREVIOUS)}
          data-testid="paginate_prev"
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      )}
      {currentPage < pageCount - 1 && (
        <IconButton
          aria-label="paginate-next"
          onClick={() => paginate(PaginationDirections.NEXT)}
          data-testid="paginate_next"
        >
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      )}
    </Container>
  );
};
