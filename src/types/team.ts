export interface TeamMember {
    _id: string;
    user: string;
    role: string;
    roleIndex: number;
}
export interface Team {
    _id: string | null;
    name: string | null;
    description: string | null;
    members: TeamMember[];
    roles: any[];
    rolePermissions: any[];
}
