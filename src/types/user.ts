import { Team } from './team';

export interface User {
    _id: string;
    username?: string;
    email: string;
    fullName?: string;
    occupation?: string;
    aboutMe?: string;
    team?: string;
    teamInvites?: Team[];
}
