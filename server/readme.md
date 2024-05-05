<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

# Table of Contents

-   [Commands](#commands)
-   [Cloud URL](#cloud-url)
-   [APIs](#apis)
    -   [Auth](#auth)
    -   [User](#user)
    -   [Habit](#habit)
    -   [Tree](#tree)
    -   [Seed](#seed)

<!-- TOC end -->

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

    Request

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

        Form-data:

            picture
            email

4.  Update password

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
            "criteria": [
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

4.  List Tracking Habit

    `GET /api/habit/tracking/:treeId`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

5.  Track Habit

    `POST /api/habit/tracking/:treeId`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Body

        ```js
        {
            "criteria": [ // All today habit tracked
                {
                    "id": 26,
                    "score": 50
                },
                {
                    "id": 29,
                    "score": 100
                }
            ]
        }
        ```

## Tree

1.  Create Tree

    `POST /api/tree`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Body

        ```js
        {
            "seedId": 2
        }
        ```

2.  View Tree

    `GET /api/tree/:id`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

3.  List Tree

    `GET /api/tree`

    Request

    -   Header

        `Authorization: Bearer <user's token>`

    -   Param

        ```
        date=20240425; // For a specific date
        date=[20230425,20240501]; // For a range of date
        ```

## Seed

1.  Create Seed

    `POST /api/seed`

    Request

    -   Header

        `Authorization: Bearer <admin's token>`

    -   Body

        Form-data:

            name
            price
            assets

2.  Update Seed

    `PUT /api/seed/:id`

    Request

    -   Header

        `Authorization: Bearer <admin's token>`

    -   Body

        Form-data:

              name
              price
              assets

3.  List Seed

    `GET /api/seed`

    Request

    -   Header

        `Authorization: Bearer <token>`
