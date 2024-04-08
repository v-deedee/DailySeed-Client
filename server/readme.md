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

2.  View user's profile

    `GET /api/user`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

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

4.  Update user's profile picture

    `PUT /api/user/profile/picture`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Body

        `form-data`

              Key: profile_picture
              Value: pic.png

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

## Habit

1.  Create habit

    `POST /api/habit`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Body

        ```js
        {
            name: "DSA",
            icon: ":computer:",
            criteria: [
                {
                    name: "0 Problem",
                    icon: ":zero:",
                    score: 0
                },
                {
                    name: "1 Problem",
                    icon: ":one:",
                    score: 1
                },
                // Min 2 criterion, max 5 criterion
            ]

        }
        ```
