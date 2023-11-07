import { Logger } from "@nestjs/common";
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import type {
    LobbyAuthFormat,
    LobbyClientEvents,
    LobbyServerEvents,
    ToSocketIOEvents,
} from "shared/src/types/sockets";
import type { Server, Socket } from "socket.io";
import type { AccessTokenPaylod } from "src/services/auth";
import { LobbyService } from "src/services/lobby.service";
import { TokenService } from "src/services/token/token.service";

type OnEvents = ToSocketIOEvents<LobbyClientEvents>;
type EmitEvents = ToSocketIOEvents<LobbyServerEvents>;

@WebSocketGateway({ namespace: "lobby" })
export class LobbyGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(LobbyGateway.name);

    @WebSocketServer()
    server: Server<OnEvents, EmitEvents>;

    constructor(
        private readonly token_service: TokenService,
        private readonly lobby_service: LobbyService,
    ) {}

    async handleConnection(client: Socket<OnEvents, EmitEvents>) {
        this.logger.log(`Client ${client.id} connected.`);

        const { token, lobby_id } = client.handshake.auth as LobbyAuthFormat;

        const decoded =
            await this.token_service.verify<AccessTokenPaylod>(token);
        /*
        const lobby = await this.lobby_service.get(lobby_id);

        if (lobby == null) {
            this.logger.warn(
                `Client ${client.id} tried to join not existing lobby.`,
            );
            return void client.disconnect();
        }*/

        client.emit("test", { decoded });
    }

    handleDisconnect(client: Socket<OnEvents, EmitEvents>) {
        this.logger.log(`Client ${client.id} dissconnected.`);
    }
}
