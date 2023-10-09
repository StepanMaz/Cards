import { Link } from "react-router-dom";
import "../signin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";

export default function SignInPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handlesubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const responce = await fetch("/api/auth", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
        });

        if (!responce.ok) {
            alert((await responce.json()).message[0])
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handlesubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <Link to={"/signup"}>Sign Up</Link>
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
    )
}