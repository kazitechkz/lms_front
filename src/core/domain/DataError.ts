export interface UnexpectedError {
    kind: "UnexpectedError";
    error: Error;
}

export interface ServerError {
    kind: "ServerError";
    error: Error;
    errorCode: number;
}

export interface ValidationError {
    kind: "ValidationError";
    error: Error;
}

export interface AuthenticationError {
    kind: "AuthenticationError";
    error: Error;
}

export interface ErrorData {
    message: string;
    source:  string;
    value:   string;
}

export interface ErrorFold {
    kind: "ErrorFold",
    error: ErrorData[],
}


export type DataError = UnexpectedError | ServerError | AuthenticationError | ErrorFold | ValidationError;