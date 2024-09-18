import { Container, IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

enum PaginationDirections {
  PREVIOUS,
  NEXT,
}

interface PaginationProps {
  pageCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ pageCount, setCurrentPage }: PaginationProps) => {
  // const { pageCount, setCurrentPage } = props;

  const paginate = (direction: PaginationDirections) => {
    if (direction === PaginationDirections.PREVIOUS) {
      return setCurrentPage((page) => (page > 0 ? page - 1 : 0));
    }

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
    >
      <IconButton
        aria-label="paginate-previous"
        onClick={() => paginate(PaginationDirections.PREVIOUS)}
      >
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <IconButton
        aria-label="paginate-next"
        onClick={() => paginate(PaginationDirections.NEXT)}
      >
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
    </Container>
  );
};
