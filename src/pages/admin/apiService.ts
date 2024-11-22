import axios from "axios";
import { userTable } from "./collum";

type Role = {
  id: string;
  name: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
};

export const fetchUserData = async (): Promise<userTable[]> => {
  const response = await axios.get("/api/users");

  return response.data.map((user: User) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles.length
      ? user.roles.map((role: Role) => role.name).join(", ")
      : null,
  }));
};
