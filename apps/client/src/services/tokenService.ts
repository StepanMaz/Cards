const REFRESH_TOKEN = "refresh-token";

class AuthService {
    private _access_token?: string;

    public get access_token() {
        return this._access_token;
    }

    public get isAuthenticated() {
        return this.refresh_token != null;
    }

    private get refresh_token() {
        return localStorage.getItem(REFRESH_TOKEN);
    }

    private set refresh_token(value) {
        if (value) localStorage.setItem(REFRESH_TOKEN, value);
    }

    constructor() {
        this.renewTokens();
        setInterval(this.renewTokens);
    }

    private async renewTokens() {
        if (!this.refresh_token) return;

        const { access_token, refresh_token: new_refresh_token } = await (
            await fetch("")
        ).json();
        this._access_token = access_token;
        this.refresh_token = new_refresh_token;
    }
}

export default new AuthService();
