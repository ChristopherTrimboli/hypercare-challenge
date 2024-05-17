"use client";

import { useCallback, useState } from "react";
import type { User } from "../types/user";
import UsersList from "../components/users/UsersList";
import UserInfoModal from "../components/users/UserInfoModal";

export default function ClientPage({ users }: { users: User[] }) {
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const onViewUser = useCallback(
    (userId: string) => {
      setActiveUser(users.find((user) => user.id === userId) ?? null);
    },
    [users]
  );

  return (
    <>
      <UsersList users={users} onViewUser={onViewUser} />

      <UserInfoModal user={activeUser} onClose={() => setActiveUser(null)} />
    </>
  );
}
