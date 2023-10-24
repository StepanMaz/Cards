import { WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway({ namespace: "lobby" })
export class LobbyGateway {}
