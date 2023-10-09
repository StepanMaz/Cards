import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { Logger } from "@nestjs/common";
import { DECK52, SUITS, } from "@shared/types/cards";
import type { ServerEvents, ClientEvents, ToSocketIOEvents } from "@shared/types/game/events";

type OnEvents = ToSocketIOEvents<ClientEvents>
type EmitEvents = ToSocketIOEvents<ServerEvents>

@WebSocketGateway({ namespace: 'game' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(GameGateway.name);

    @WebSocketServer()
    server: Server<OnEvents, EmitEvents>;

    handleConnection(client: Socket<OnEvents, EmitEvents>) {
        this.logger.log(`New game gateway connection id: ${client.id}`);

        client.broadcast.emit("set_hand", { id: client.id, count: 6 });
        client.broadcast.emit('add_player', { id: client.id });
        client.emit('set_player_hand', { cards: this.generateRandom() });
        client.emit('set_table', { id: client.id, card: { suit: "Clubs", value: 8 } });
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Game gateway dissconnection id: ${client.id}`)
    }

    generateRandom() {
        const res = [];
        for (let i = 0; i < 6; i++) {
            const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
            const value = DECK52[Math.floor(Math.random() * DECK52.length)];

            res.push({ suit, value })
        }
        return res;
    }
}