export default {
    AUTH: {
        TOKEN_NOT_FOUND: {
            code: "TOKEN_NOT_FOUND",
            message: "Login required",
        },
        TOKEN_EXPIRED: {
            code: "TOKEN_EXPIRED",
            message: "Token expired",
        },
        TOKEN_INVALID: {
            code: "TOKEN_INVALID",
            message: "Token cannot be authenticated",
        },
        ROLE_INVALID: {
            code: "ROLE_INVALID",
            message: "Your role does not have permission for this function",
        },
        USER_EXPIRED: {
            code: "USER_EXPIRED",
            message: "Account has expired",
        },
        USER_DELETED: {
            code: "USER_DELETED",
            message: "Account has been deleted from the system",
        },
        TOKEN_BLOCKED: {
            code: "TOKEN_BLOCKED",
            message: "Account has just changed the password or has been kicked",
        },
        USER_NOT_FOUND: {
            code: "USER_NOT_FOUND",
            message: "Your account is not in the system",
        },
        PASSWORD_INVALID: {
            code: "PASSWORD_INVALID",
            message: "Your password is incorrect",
        },
    },

    HABIT: {
        HABIT_NOT_FOUND: {
            code: "HABIT_NOT_FOUND",
            message: "Your habit is not in the system",
        },
        INVALID_AUTHORIZATION: {
            code: "HABIT_INVALID_AUTHORIZATION",
            message: "You do not have permission to access this habit",
        },
        HABIT_UPDATE_INVALID: {
            code: "HABIT_UPDATE_INVALID",
            message: "Your habit is not ready to be updated",
        },
        CRITERION_NOT_FOUND: {
            code: "CRITERION_NOT_FOUND",
            message: "Your criterion is not in the system",
        },
    },

    SEED: {
        NOT_FOUND: {
            code: "SEED_NOT_FOUND",
            message: "Your seed is not in the system",
        },
    },

    TREE: {
        NOT_FOUND: {
            code: "TREE_NOT_FOUND",
            message: "Your tree is not in the system",
        },
        INVALID_AUTHORIZATION: {
            code: "TREE_INVALID_AUTHORIZATION",
            message: "You do not have permission to access this tree",
        },
        ALREADY_CREATED: {
            code: "TREE_ALREADY_CREATED",
            message: "Today's tree has already created.",
        },
    },

    BODY_INVALID: {
        code: "BODY_INVALID",
    },

    URL_NOT_FOUND: {
        code: "URL_NOT_FOUND",
        message: "URL not found",
    },

    INTERNAL_SERVER_ERROR: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
    },
};
