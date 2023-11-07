import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./pages/game";
import SignUpPage from "./pages/auth/signup";
import SignInPage from "./pages/auth/signin";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LobbyPage from "./pages/lobby";
import Protected from "./components/protected";
import { useEffect, useState } from "react";
import authService from "./services/authService";
import { useAppSelector, useAppDispatch } from "./hooks";
import { actions } from "./redux/slices/auth";
import { TestPage } from "./pages/test";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => void dispatch(actions.refreshTokens()), []);

    const is_logged_in = useAppSelector((state) => state.auth.is_logged_in);

    return !is_logged_in ? (
        "Loading..."
    ) : (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                    <Route
                        path="game"
                        element={
                            <Protected>
                                <GamePage />
                            </Protected>
                        }
                    />
                    <Route
                        path="lobbies"
                        element={
                            <Protected>
                                <LobbyPage />
                            </Protected>
                        }
                    />
                    <Route
                        path="test"
                        element={
                            <Protected>
                                <TestPage />
                            </Protected>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
