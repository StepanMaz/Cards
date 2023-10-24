import { LobbyRepository } from "../repositories/lobby.repository";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { InMemoryLobby } from "./lobby";

@Injectable()
export class LobbyService<TLobbyMember> {
    constructor(private readonly lobby_repo: LobbyRepository<TLobbyMember>) {}

    public create(member: TLobbyMember) {
        const id = uuid() as string;
        const lobby = new InMemoryLobby(member);
        this.lobby_repo.set(id, lobby);
    }

    public getAll() {
        return this.lobby_repo.all();
    }

    public get(id: string) {
        return this.lobby_repo.get(id);
    }
}
