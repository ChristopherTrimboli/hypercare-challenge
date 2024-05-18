import { Suspense } from "react";
import { Container, Typography, Divider } from "@mui/material";
import ClientPage from "./ClientPage";
import UserListSkeleton from "../components/users/UsersListSkeleton";
import getUsers from "../fetch/getUsers";

const PageContent = async () => {
  const users = await getUsers();
  return <ClientPage users={users} />;
};

export default async function Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" className="header">
        Hypercare Users
      </Typography>
      <Typography variant="subtitle1">
        Connect with your healthcare colleagues and explore our community.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Suspense fallback={<UserListSkeleton />}>
        <PageContent />
      </Suspense>
    </Container>
  );
}
