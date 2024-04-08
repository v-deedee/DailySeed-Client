# Commands

Start server

```bash
npm run start
```

# Cloud URL

`res.cloudinary.com/dvzkzyy1c/image/upload/f_auto,q_auto/`

# APIs

## Auth

1. Login

    `POST /api/auth/login`

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

1.  Create user

    `POST /api/user`

    Request

    -   Body
        ```js
        {
            username: "example",
            password: "example",
            email: "example@gmail.com"
        }
        ```

    Response

    -   If OK
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

2.  View user's profile

    `GET /api/user`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    Response

    -   If OK
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

3.  Update user's profile

    `PUT /api/user/profile`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Body

        ```js
        {
            email: "example@mail.com",
        }
        ```

    Response

    -   If OK

        ```js
        {
            ok: true,
            data: {
                profile: {
                    // Profile's data
                }
            }
        }
        ```

4.  Update user's profile picture

    `PUT /api/user/profile/picture`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Body

        `form-data`

              Key: profile_picture
              Value: pic.png

    Response

    -   If OK

        ```js
        {
            ok: true,
            data: {
                profile: {
                    // Profile's data
                }
            }
        }
        ```

5.  Update password

    `PUT /api/user/password`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Body

        ```js
        {
            password: "example",
            newPassword: "example",
        }
        ```
    Response

    -   If OK

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
