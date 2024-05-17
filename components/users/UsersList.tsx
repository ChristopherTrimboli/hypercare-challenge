"use client";

import type { User } from "../../types/user";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import UserCard from "./UserCard";
import { memo } from "react";

interface UsersListProps {
  users: User[];
  onViewUser: (userId: string) => void;
}

const UsersList = memo(({ users, onViewUser }: UsersListProps) => {
  return (
    <Grid container spacing={2}>
      {users?.map((user) => (
        <Grid key={user.id} xs={12} sm={6} md={4} lg={3}>
          <UserCard user={user} onViewUser={onViewUser} />
        </Grid>
      ))}
    </Grid>
  );
});

export default UsersList;
