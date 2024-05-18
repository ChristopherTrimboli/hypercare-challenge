import { Box, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const skeletonCount = 24;

const UserListSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Grid key={index} xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={275}
              sx={{
                borderRadius: "2px 2px 0 0",
              }}
            />

            <Box
              sx={{
                p: 2,
              }}
            >
              <Skeleton variant="text" width={"100%"} height={50} />

              <Skeleton variant="text" width={"100%"} height={20} />

              <Skeleton variant="text" width={"100%"} height={20} />

              <Skeleton variant="text" width={"100%"} height={20} />

              <Skeleton variant="text" width={"100%"} height={20} />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserListSkeleton;
