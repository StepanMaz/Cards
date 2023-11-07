import { LobbyRepository } from "../repositories/lobby.repository";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { LobbyMember } from "../types&constants/lobby/lobbyMember";

@Injectable()
export class LobbyService {
    constructor(private readonly lobby_repo: LobbyRepository) {}

    public create(member: LobbyMember) {
        const id = uuid() as string;

        this.lobby_repo.create(id, { owner: member, members: [], state: "1" });

        return id;
    }

    public getAll() {
        // return this.lobby_repo.all();
    }

    public get(id: string) {
        return this.lobby_repo.get(id);
    }

    public exists(id: string) {
        return this.lobby_repo.exists(id);
    }
}
