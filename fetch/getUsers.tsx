import { User } from "../types/user";

export default async function getUsers() {
  const res = await fetch(
    "https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const json = await res.json();
  return json.data.users as User[];
}
