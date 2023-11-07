import { storage, type Storage } from "./storage";

const REFRESH_TOKEN = "refresh-token";

class AuthService {
    private _access_token?: string;

    public get access_token() {
        return this._access_token;
    }

    public get isAuthenticated() {
        console.log("isAuthenticated", Boolean(this.refresh_token));
        return Boolean(this.refresh_token);
    }

    private get refresh_token() {
        return this.storage.get("REFRESH_TOKEN");
    }

    private set refresh_token(value) {
        if (value) this.storage.set("REFRESH_TOKEN", value);
        else this.storage.drop("REFRESH_TOKEN");
    }

    constructor(private readonly storage: Storage) {
        setInterval(this.renewTokens, 60 * 60 * 1000);
    }

    public async renewTokens() {
        if (!this.refresh_token) return;

        const { access_token, refresh_token: new_refresh_token } = await (
            await fetch("/api/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: this.refresh_token }),
            })
        ).json();
        this._access_token = access_token;
        //this.refresh_token = new_refresh_token;
    }

    public async signIn(
        data: SignInData,
    ): Promise<{ success: true } | { success: false; error: any }> {
        const res = await fetch("/api/auth", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const res_json = await res.json();

        if (res.ok) {
            const { access_token, refresh_token } = res_json;
            this._access_token = access_token;
            this.refresh_token = refresh_token;
            return { success: true };
        }
        return { success: false, error: res_json };
    }

    public async signUp(
        data: SignUpData,
    ): Promise<{ success: true } | { success: false; error: any }> {
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            const { access_token, refresh_token } = await res.json();
            access_token && (this._access_token = access_token);
            refresh_token && (this.refresh_token = refresh_token);
            console.log(access_token);
            return { success: true };
        }
        return { success: false, error: await res.json() };
    }

    public signOut() {
        this.refresh_token = null;
        this._access_token = undefined;
    }
}

export type SignInData = {
    identifier: string;
    password: string;
};

export type SignUpData = {
    username: string;
    email: string;
    password: string;
};

export default new AuthService(storage);
