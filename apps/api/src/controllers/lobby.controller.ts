import { JwtAuthGuard } from "src/services/auth";
import { LobbyService } from "../services/lobby.service";
import { Controller, Logger, Post, UseGuards, Req } from "@nestjs/common";
import { AuthorizedRequest } from "src/types&constants/auth";

@Controller("lobby")
export class LobbyController {
    logger = new Logger(LobbyController.name);

    constructor(private readonly lobby_service: LobbyService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    public createLobby(@Req() request: AuthorizedRequest) {
        const lobby_id = this.lobby_service.create({ id: request.user.userId });
        return { lobby_id };
    }
}
