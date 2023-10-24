import type { Game } from "../game";
import { Injectable } from "@nestjs/common";
import { LocalRepository } from "./local.repository";

@Injectable()
export class GameRepository extends LocalRepository<Game> {}
