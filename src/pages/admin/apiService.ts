import axios from "axios";
import { userTable } from "./collum";

export type Role = {
  id: string;
  name: string;
};

export type User = {
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

export const fetchRoles = async (): Promise<Role[]> => {
  const response = await axios.get("/api/roles");
  return response.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  roleId: string;
}) => {
  const response = await axios.post("/api/users", data);
  return response.data;
};
