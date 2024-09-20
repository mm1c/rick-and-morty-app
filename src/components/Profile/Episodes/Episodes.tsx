import { Typography, Stack, List, ListItem, ListItemText } from "@mui/material";
import { Episode } from "../../../models/Episode";

export default function Episodes({ episodeData }: { episodeData: Episode[] }) {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ margin: "20px 0 10px", borderBottom: "1px solid #9d9d9d" }}
      >
        Episodes
      </Typography>

      <Stack
        spacing={0}
        sx={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: { xs: "100%", sm: "552px" },
          flexWrap: "wrap",
        }}
      >
        <List
          sx={{
            padding: 0,
            margin: 0,
          }}
        >
          {episodeData.map((episode) => {
            return (
              <ListItem key={episode.name} sx={{ padding: "5px 0 5px 10px" }}>
                <ListItemText sx={{ display: "list-item", margin: 0 }}>
                  {episode.name} / {episode.episode} / {episode.airDate}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    </>
  );
}
