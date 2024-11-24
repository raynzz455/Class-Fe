import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchRoles, createUser, Role } from './apiService'; 

interface AddUserFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roleId, setRoleId] = useState('');
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
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await createUser({ name, email, password, roleId });
      onSubmit();
    } catch (error: any) {
      setError('Failed to create user: ' + (error.response?.data?.message || error.message));
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
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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

export default AddUserForm;
