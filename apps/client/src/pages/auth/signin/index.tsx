import { Link } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import authService from "../../../services/authService";
import { actions } from "../../../redux/slices/auth";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";

export default function SignInPage() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const handlesubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        dispatch(
            actions.signIn({
                password: passwordRef.current?.value ?? "",
                identifier: emailRef.current?.value ?? "",
            }),
        );
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handlesubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Not registered yet? <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            ref={emailRef}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
}
