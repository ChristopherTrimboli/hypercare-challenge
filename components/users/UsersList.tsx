"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { User } from "../../types/user";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import UserCard from "./UserCard";

interface UsersListProps {
  users: User[];
  onViewUser: (userId: string) => void;
}

const usersPerChunk = 24;

const UsersList = memo(({ users, onViewUser }: UsersListProps) => {
  const [chunkedUsers, setChunkedUsers] = useState<User[]>([]);
  const [chunkIndex, setChunkIndex] = useState(0);
  const loadingRef = useRef(false);
  const initialLoadRef = useRef(false);

  const loadNextChunk = useCallback(() => {
    if (loadingRef.current || (initialLoadRef.current && chunkIndex === 0))
      return;

    loadingRef.current = true;

    const nextChunk = users.slice(
      chunkIndex * usersPerChunk,
      (chunkIndex + 1) * usersPerChunk
    );

    setChunkedUsers((u) => [...u, ...nextChunk]);
    setChunkIndex(chunkIndex + 1);

    loadingRef.current = false;
    initialLoadRef.current = true;
  }, [chunkIndex, users]);

  useEffect(() => {
    if (!initialLoadRef.current) {
      loadNextChunk();
    }

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadNextChunk();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadNextChunk]);

  return (
    <Grid container spacing={2}>
      {chunkedUsers?.map((user, index) => (
        <Grid key={`${user.id}-${index}`} xs={12} sm={6} md={4} lg={3}>
          <UserCard user={user} onViewUser={onViewUser} />
        </Grid>
      ))}
    </Grid>
  );
});

export default UsersList;
