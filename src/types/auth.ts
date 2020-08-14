export interface AuthState {
    readonly attemptingLogin: boolean;
    readonly token: string | null;
    readonly loginAttemptFailed: boolean;
    readonly appInitialising: boolean;
    readonly appInitialised: boolean;
    readonly attemptingRegister: boolean;
    readonly registerErrorMsg?: string;
}
