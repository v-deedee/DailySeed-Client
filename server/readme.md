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
            "username": "example",
            "password": "example"
        }
        ```

## User

1.  Create user

    `POST /api/user`

    Request

    -   Body
        ```js
        {
            "username": "example",
            "password": "example",
            "email": "example@gmail.com"
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
            "email": "example@mail.com",
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
            "password": "example",
            "newPassword": "example",
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
            "habit": {
                "name": "DSA",
                "icon": ":computer:",
                "duration": 7 // Optional
            },
            "criteria": [
                {
                    "name": "0 Problem",
                    "icon": ":zero:",
                    "score": 0
                },
                {
                    "name": "1 Problem",
                    "icon": ":one:",
                    "score": 1
                },
                // Min 2 criterion, max 5 criterion
            ]

        }
        ```

2.  View Habit

    `GET /api/habit/:id`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

3.  Update Habit

    `PUT /api/habit/:id`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Body

        ```js
        {
            // Only provide the fields that need to be updated
            "habit": {
                "name": "example",
                "icon": ":smile:",
                "duration": 7 // Day
                "active": false // Set false if want to delete this habit
            },
            criteria: [
                {
                    "id": 4 // If update criterion, specify id
                    "name": "test",
                    "icon": "test",
                    "score": 5,
                    "active": false // Set false if want to delete this criterion
                },
                {
                    // If create criterion, specify all fieds below (exclude id)
                    "name": "new",
                    "icon": "new",
                    "score": 6
                }
                // More criterion
            ]
        }
        ```
