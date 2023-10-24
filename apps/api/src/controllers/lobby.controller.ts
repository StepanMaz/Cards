import { JwtAuthGuard } from "src/services/auth";
import { LobbyService } from "../services/lobby.service";
import { Controller, Logger, Post, UseGuards } from "@nestjs/common";

@Controller("lobby")
export class LobbyController {
    logger = new Logger(LobbyController.name);

    constructor(private readonly lobby_service: LobbyService<string>) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    public createLobby() {
        return "damn";
    }
}
