import { LobbyMember } from ".";

export interface Lobby {
    owner: LobbyMember;
    members: LobbyMember[];
    state: string;
}
