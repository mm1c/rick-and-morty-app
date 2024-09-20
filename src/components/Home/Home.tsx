import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { CustomTable } from "../CustomTable/CustomTable/CustomTable";
import { DataMeta } from "../../models/DataMeta";
import { mapApiDataToTable } from "../../utils/mappers";
import { dynamicPaths } from "../../routes";
import { getArrayOfNumbers } from "../../utils/lib";
import { fetchCharacterPageData } from "../../utils/requests";
import SearchBar from "./SearchBar/SearchBar";
import { Character } from "../../models/Character";
import Spinner from "../Spinner/Spinner";
import { useParallelQueries } from "../../hooks/useParallelQueries";
import { ApiPageResponse } from "../../models/ApiPageResponse";

const SEARCH_PARAM_KEY = "s";
const MIN_SEARCH_TERM_LENGTH = 3;
const ITEMS_PER_PAGE = 20;

const tableHeader: DataMeta[] = [
  { key: "image", value: "" },
  { key: "name", value: "Name" },
  { key: "species", value: "Species" },
  { key: "status", value: "Status" },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageCounts, setPageCounts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get(SEARCH_PARAM_KEY) || ""
  );
  const delayedSearchTerm = useDebounce(searchTerm, 200);

  const {
    data: fetchedTotalPageCountData,
    isLoading: isTotalPageCountLoading,
  } = useQuery({
    queryKey: ["page", 1],
    queryFn: () => fetchCharacterPageData(1),
  });

  useEffect(() => {
    if (!fetchedTotalPageCountData?.info?.pages) return;

    setPageCounts(() =>
      getArrayOfNumbers(1, fetchedTotalPageCountData.info.pages)
    );
  }, [fetchedTotalPageCountData]);

  const { queries: pageQueries, isAnyQueryLoading: isAnyPageQueryLoading } =
    useParallelQueries<number, ApiPageResponse | null>(
      "page",
      pageCounts,
      fetchCharacterPageData
    );

  const tableData = useMemo(() => {
    return isAnyPageQueryLoading
      ? []
      : pageQueries.reduce(
          (result, query) => [
            ...result,
            ...mapApiDataToTable(query?.data?.results),
          ],
          [] as Character[]
        );
  }, [isAnyPageQueryLoading, pageQueries]);

  const filteredData = useMemo(
    () =>
      tableData.filter((item) => {
        if (
          !delayedSearchTerm ||
          delayedSearchTerm.length < MIN_SEARCH_TERM_LENGTH
        )
          return true;

        return item["name"]
          .toLowerCase()
          .includes(delayedSearchTerm.toLowerCase());
      }),
    [tableData, delayedSearchTerm]
  );

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
    setSearchParams(`${SEARCH_PARAM_KEY}=${e.target.value}`);
  };

  const tableToRender = useMemo(
    () => (
      <CustomTable
        header={tableHeader}
        data={filteredData}
        onRowClick={(id) => navigate(dynamicPaths.profile(id))}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    ),
    [navigate, filteredData]
  );

  return (
    <>
      {isTotalPageCountLoading || isAnyPageQueryLoading ? (
        <Spinner />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
          {tableToRender}
        </>
      )}
    </>
  );
}
