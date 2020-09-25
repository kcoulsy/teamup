import { User } from './user';

export interface TeamUser {
    _id: string;
    user: User;
    role: string;
    roleIndex: number;
}

export interface RolePermission {
    permissions: string[];
    _id: string;
    roleIndex: number;
}

export interface Team {
    _id: string | null;
    name: string | null;
    description: string | null;
    users: TeamUser[];
    roles: string[];
    rolePermissions: RolePermission[];
}
