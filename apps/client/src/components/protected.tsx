import { Navigate, Route, RouteProps, redirect } from "react-router-dom";
import tokenService from "../services/authService";
import { ReactNode } from "react";
import { useAppSelector } from "../hooks";

export default function Protected({ children }: { children: ReactNode }) {
    const isLoggedIn = useAppSelector((state) => state.auth.is_logged_in);

    return isLoggedIn ? children : <Navigate replace to={"/signin"}></Navigate>;
}
