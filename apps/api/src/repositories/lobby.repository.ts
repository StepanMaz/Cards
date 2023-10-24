import { Injectable } from "@nestjs/common";
import { LocalRepository } from "./local.repository";
import type { Lobby } from "../services/lobby";

@Injectable()
export class LobbyRepository<TLobbyMember> extends LocalRepository<
    Lobby<TLobbyMember>
> {}
