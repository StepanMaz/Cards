import { Link } from "react-router-dom";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import authService from "../../../services/authService";

export default function SignUpPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handlesubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const res = await authService.signUp({
            username: usernameRef.current?.value ?? "",
            email: emailRef.current?.value ?? "",
            password: passwordRef.current?.value ?? "",
        });
        if (!res.success) {
            alert(JSON.stringify(res.error));
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handlesubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered? <Link to={"/signin"}>Sign In</Link>
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            ref={usernameRef}
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            ref={emailRef}
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            ref={passwordRef}
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
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
