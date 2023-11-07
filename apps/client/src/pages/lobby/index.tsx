import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { lobbyMiddleware } from "../../redux/store.js";
import { LobbyAuthFormat } from "@shared/types/sockets/index.js";
import tokenService from "../../services/authService.js";
import { Lobby as LobbyType, LobbyMember } from "../../redux/slices/lobby.js";
import { useAppSelector } from "../../hooks/use-app-selector/index.js";

export default function LobbyPage() {
    useEffect(() => {
        const socket = io("/lobby", {
            auth: { token: tokenService.access_token } as LobbyAuthFormat,
        });
        lobbyMiddleware.useConnection(socket);
        lobbyMiddleware.active = true;

        return () => {
            lobbyMiddleware.active = false;
            lobbyMiddleware.useConnection(null);
        };
    }, []);

    const lobbies = useAppSelector((state) => state.lobby);

    return (
        <div>
            {lobbies.current_id && (
                <div>
                    Current lobby:{" "}
                    <Lobby lobby={lobbies.lobbies[lobbies.current_id]} />
                </div>
            )}
            <hr></hr>
            {Object.entries(lobbies.lobbies).map(([key, lobby]) => (
                <Lobby key={key} lobby={lobby} />
            ))}
        </div>
    );
}

function Lobby({ lobby }: { lobby: LobbyType }) {
    return (
        <div style={{ display: "inline" }}>
            <Member member={lobby.owner} />| $
            {Object.values(lobby.members).map((m) => (
                <Member member={m} />
            ))}
        </div>
    );
}

function Member({ member }: { member: LobbyMember }) {
    return <span>| ${member.username} |</span>;
}
