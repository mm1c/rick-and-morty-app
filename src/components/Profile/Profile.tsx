import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import BackBtn from "../BackBtn/BackBtn";
import { DataMeta } from "../../models/DataMeta";
import { mapApiDataToTable, mapApiEpisodeData } from "../../utils/mappers";
import ProfileData from "./ProfileData/ProfileData";
import Episodes from "./Episodes/Episodes";
import { fetchEpisodeData, fetchProfilePageData } from "../../utils/requests";
import { EpisodeResponse } from "../../models/EpisodeResponse";
import Spinner from "../Spinner/Spinner";
import { useParallelQueries } from "../../hooks/useParallelQueries";

const profileMeta: DataMeta[] = [
  { key: "name", value: "Name" },
  { key: "species", value: "Species" },
  { key: "status", value: "Status" },
  { key: "gender", value: "Gender" },
  { key: "origin", value: "Origin" },
  { key: "location", value: "Location" },
];

export default function Profile() {
  const params = useParams();

  const [episodeUrls, setEpisodeUrls] = useState<string[]>([]);

  const { data: fetchedProfileData } = useQuery({
    queryKey: ["character", params?.id],
    queryFn: () => fetchProfilePageData(params?.id ? +params?.id : undefined),
  });

  useEffect(() => {
    if (!fetchedProfileData) return;
    setEpisodeUrls(() => fetchedProfileData.episode);
  }, [fetchedProfileData]);

  const {
    queries: episodeQueries,
    isAnyQueryLoading: isAnyEpisodeQueryLoading,
  } = useParallelQueries<string, EpisodeResponse | null>(
    "episode",
    episodeUrls,
    fetchEpisodeData
  );

  const episodeData = useMemo(() => {
    return isAnyEpisodeQueryLoading
      ? []
      : mapApiEpisodeData(
          episodeQueries
            .map((query) => query.data)
            .reduce((result, data) => {
              if (!data) return result;
              return [...result, data];
            }, [] as EpisodeResponse[])
        );
  }, [episodeQueries, isAnyEpisodeQueryLoading]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 24px",
      }}
    >
      {!fetchedProfileData ? (
        <Spinner />
      ) : (
        <ProfileData
          profileMeta={profileMeta}
          profileData={mapApiDataToTable([fetchedProfileData])}
        />
      )}

      {isAnyEpisodeQueryLoading ? (
        <Spinner />
      ) : (
        <Episodes episodeData={episodeData} />
      )}

      <BackBtn />
    </Box>
  );
}
