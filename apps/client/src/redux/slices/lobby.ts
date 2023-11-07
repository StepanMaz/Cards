import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, Suit } from "@shared/types/cards";

export type LobbiesState = {
    current_id?: string;
    lobbies: Record<string, Lobby>;
};

export type LobbyMember = {
    username: string;
};

export type Lobby = {
    owner: LobbyMember;
    members: Record<string, LobbyMember>;
};

const initialState: LobbiesState = {
    lobbies: {},
};

const lobbySlcie = createSlice({
    name: "lobby",
    initialState,
    reducers: {
        setCurrent(state, action: PayloadAction<LobbyIdField>) {
            state.current_id = action.payload.lobby_id;
        },
        addLobby(state, action: PayloadAction<LobbyField & LobbyIdField>) {
            const { lobby, lobby_id } = action.payload;
            state.lobbies[lobby_id] = lobby;
        },
        removeLobby(state, action: PayloadAction<LobbyIdField>) {
            delete state.lobbies[action.payload.lobby_id];
        },
        addMember(
            state,
            action: PayloadAction<LobbyIdField & MemberIdField & MemberField>,
        ) {
            const { lobby_id, member_id, member } = action.payload;
            state.lobbies[lobby_id].members[member_id] = member;
        },
        removeMember(
            state,
            action: PayloadAction<LobbyIdField & MemberIdField>,
        ) {
            const { lobby_id, member_id } = action.payload;
            delete state.lobbies[lobby_id].members[member_id];
        },
    },
});

type LobbyIdField = { lobby_id: string };
type LobbyField = { lobby: Lobby };
type MemberIdField = { member_id: string };
type MemberField = { member: LobbyMember };

export const { setCurrent, addLobby, removeLobby, addMember, removeMember } =
    lobbySlcie.actions;
export type actions = typeof lobbySlcie.actions;
export const reducer = lobbySlcie.reducer;
