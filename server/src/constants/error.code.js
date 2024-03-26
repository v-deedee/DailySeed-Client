export default {
    AUTH: {
        TOKEN_NOT_FOUND: {
            code: "TOKEN_NOT_FOUND",
            msg: "Login required"
        },
        TOKEN_EXPIRED: {
            code: "TOKEN_EXPIRED",
            msg: "Token expired"
        },
        TOKEN_INVALID: {
            code: "TOKEN_INVALID",
            msg: "Token cannot be authenticated"
        },
        ROLE_INVALID: {
            code: "ROLE_INVALID",
            msg: "Your role does not have permission for this function"
        },
        USER_EXPIRED: {
            code: "USER_EXPIRED",
            msg: "Account has expired"
        },
        USER_DELETED: {
            code: "USER_DELETED",
            msg: "Account has been deleted from the system"
        },
        TOKEN_BLOCKED: {
            code: "TOKEN_BLOCKED",
            msg: "Account has just changed the password or has been kicked"
        }
    },

    URL_NOT_FOUND: {
        code: "URL_NOT_FOUND",
        msg: "URL not found",
    },

    INTERNAL_SERVER_ERROR: {
        code: "INTERNAL_SERVER_ERROR",
        msg: "Internal server error",
    },
};
