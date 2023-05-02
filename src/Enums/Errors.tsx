export enum Errors {
    BadRequest = 400,
    Unauthorized = 401,
    InternalError = 500,
}

export enum ErrorResponse {
    'Same Login exists' = 1,
    'Hiring exists' = 2,
    'Invalid data' = 3,
    'Same data exists' = 4,
    'Invalid Email' = 5,
    'Invalid Password' = 6
}

export enum ErrorTitles {
    ERROR = "Error",
    WARNING = "Warning",
    SUCCESS = "Success",
    INFO = "Info", 
}