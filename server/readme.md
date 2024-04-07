# Commands

Start server

```bash
npm run start
```

# APIs

## Auth

1. Login

    `POST /auth/login`

    Request:

    - Body
        ```js
        {
            username: "example",
            password: "exameple"
        }
        ```

    Response:

    - If OK
        ```js
        {
            ok: true,
            data: {
                token: "Bearer <token>",
                payload: {
                    id: 1,
                    username: "example",
                    role: "user"
                }
            }
        }
        ```

## User

1. Create user

    `POST /user`

    Request

    - Body
        ```js
        {
            username: "example",
            password: "example",
            email: "example@gmail.com"
        }
        ```

    Response

    - If OK
        ```js
        {
            ok: true,
            data: {
                user: {
                    // User's data
                }
            }
        }
        ```

2. View user's profile

    `GET /user`

    Request

    - Header

        `Authorization: Bearer <user's token>`

    Response

    - If OK
        ```js
        {
            ok: true,
            data: {
                user: {
                    // User's data
                }
            }
        }
        ```
