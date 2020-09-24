import { User } from './user';
export interface TeamMember {
    _id: string;
    user: User;
    role: string;
    roleIndex: number;
}
export interface Team {
    _id: string | null;
    name: string | null;
    description: string | null;
    users: TeamMember[];
    roles: any[];
    rolePermissions: any[];
}
