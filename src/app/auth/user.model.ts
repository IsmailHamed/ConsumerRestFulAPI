export class User {
    constructor(
        public id: string,
        public  tokenType: string,
        private _token: string,
        private _refreshToken: string,
        private _tokenExpirationDate: Date
    ) {
    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}

