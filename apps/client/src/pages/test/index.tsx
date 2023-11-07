import { useAppDispatch } from "../../hooks";
import { actions } from "../../redux/slices/auth";

export function TestPage() {
    const dispatch = useAppDispatch();

    return (
        <>
            <button onClick={() => void dispatch(actions.signOut())}>
                Sign out
            </button>
            <button onClick={() => void dispatch(actions.refreshTokens())}>
                Refresh tokens
            </button>
        </>
    );
}
