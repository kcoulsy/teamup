// I'm well aware these are a duplicate of ./src/constants/permissions.ts on the client side
// however I want to keep server and client seperate for now
export const PERM_VIEW_TEAM_SETTINGS = 'PERM_VIEW_TEAM_SETTINGS';
export const PERM_UPDATE_TEAM_DETAILS = 'PERM_UPDATE_TEAM_DETAILS';
export const PERM_INVITE_TEAM_MEMBERS = 'PERM_INVITE_TEAM_MEMBERS';
export const PERM_UPDATE_TEAM_MEMBERS = 'PERM_UPDATE_TEAM_MEMBERS';
export const PERM_REMOVE_TEAM_MEMBERS = 'PERM_REMOVE_TEAM_MEMBERS';
export const PERM_UPDATE_TEAM_ROLES = 'PERM_UPDATE_TEAM_ROLES';
export const PERM_UPDATE_TEAM_PERMS = 'PERM_UPDATE_TEAM_PERMS';
export const PERM_CREATE_TEAM_PROJECT = 'PERM_CREATE_TEAM_PROJECT';
export const PERM_EDIT_TEAM_PROJECT = 'PERM_EDIT_TEAM_PROJECT';
export const PERM_REMOVE_TEAM_PROJECT = 'PERM_REMOVE_TEAM_PROJECT';
export const PERM_ADD_TASK = 'PERM_ADD_TASK';
export const PERM_EDIT_OTHER_TASK = 'PERM_EDIT_OTHER_TASK';
export const PERM_DELETE_OTHER_TASK = 'PERM_DELETE_OTHER_TASK';
export const PERM_ASSIGN_MEMBER = 'PERM_ASSIGN_MEMBER';

// So it can be imported as a single object
export default {
    PERM_VIEW_TEAM_SETTINGS,
    PERM_UPDATE_TEAM_DETAILS,
    PERM_INVITE_TEAM_MEMBERS,
    PERM_UPDATE_TEAM_MEMBERS,
    PERM_REMOVE_TEAM_MEMBERS,
    PERM_UPDATE_TEAM_ROLES,
    PERM_UPDATE_TEAM_PERMS,
    PERM_CREATE_TEAM_PROJECT,
    PERM_EDIT_TEAM_PROJECT,
    PERM_REMOVE_TEAM_PROJECT,
    PERM_ADD_TASK,
    PERM_EDIT_OTHER_TASK,
    PERM_DELETE_OTHER_TASK,
    PERM_ASSIGN_MEMBER,
};