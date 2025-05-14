export declare class AuthService {
    private readonly jwtSecret;
    private readonly jwtExpiration;
    private readonly refreshTokenExpiration;
    constructor();
    registerUser(userData: any): Promise<any>;
    loginUser(credentials: any): Promise<any>;
    refreshAccessToken(token: string): Promise<any>;
    private generateAccessToken;
    private generateRefreshToken;
}
