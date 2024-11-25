import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchRoles, updateUser, Role } from './apiService'; 

interface UpdateUserFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    roles: string | null; // Assuming roles is a single role ID for simplicity
  };
  onSubmit: (updatedUser: any) => void;
  onCancel: () => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [roleId, setRoleId] = useState(user.roles || ''); // Assuming roles is a single role ID
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    getRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(user.id, { name, email, roleId }); // Sending the new role ID
      onSubmit({ ...user, name, email, roles: roleId });
    } catch (error: any) {
      setError('Failed to update user: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div>
        <label htmlFor="roles">Roles</label>
        <select
          id="roles"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          required
          className="block w-full mt-1 p-2 border rounded"
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-2">
        <Button type="submit" variant="default">Submit</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
