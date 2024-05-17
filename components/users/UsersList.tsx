import type { User } from "../../types/user";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import UserCard from "./UserCard";

interface UsersListProps {
  users: User[];
}

const UsersList = ({ users }: UsersListProps) => {
  return (
    <Grid container spacing={2}>
      {users?.map((user) => (
        <Grid key={user.id} xs={12} sm={6} md={4} lg={3}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UsersList;
