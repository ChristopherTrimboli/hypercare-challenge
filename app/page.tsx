import { Container, Typography, Divider } from "@mui/material";
import type { User } from "../types/user";
import ClientPage from "./ClientPage";

async function getUsers() {
  const res = await fetch(
    "https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const json = await res.json();
  return json.data.users as User[];
}

export default async function Page() {
  const users = await getUsers();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3">Hypercare Users</Typography>
      <Typography variant="subtitle1">
        Connect with your healthcare colleagues and explore our community.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <ClientPage users={users} />
    </Container>
  );
}
