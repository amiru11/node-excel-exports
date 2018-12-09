# Express ES6 Boilerplate

## Getting started

Read this in other languages: [English](README.md), [한국어](README.ko.md)

```sh
# Clone the project
git clone https://github.com/edkimco/express-sequelize-boilerplate.git
cd express-sequelize-boilerplate

# Install dependencies
npm install

# or if you're using Yarn
yarn
```

```sh
yarn start # npm run start
```

## Basic APIs
### Normal
#### AUTH
| METHOD | URI | Purpose |
| ------ | --- | ------- |
| `POST` | /api/{VERSION}/signup            | Signup                        |
| `POST` | /api/auth/login                  | Login                         |

#### POSTS
| METHOD | URI | Purpose |
| ------ | --- | ------- |
| `GET` | /api/{VERSION}/posts                    | GET Posts with Pagination |
| `POST` | /api/{VERSION}/posts                   | CREATE a new post |
| `PUT` | /api/{VERSION}/posts/{POST_ID}          | UPDATE a post |
| `DELETE` | /api/{VERSION}/posts/{POST_ID}       | DELETE a post |

### Admin
#### Users
#### Posts
| METHOD | URI | Purpose |
| ------ | --- | ------- |
| `GET` | /api/{VERSION}/admin/posts                    | GET Posts with Pagination |
| `DELETE` | /api/{VERSION}/admin/posts/{POST_ID}       | DELETE a post |

## Features

- Versioning APIs
  - `/api/v1.0`, `/api/v1.1`...
- Initializing database for test or default models
  - check file named `db.js`
- ADD Indexing to `deleted` field on each models

## To-Dos
- [x] Test Code with Jest
- Normal APIs
  - Auth
    - [ ] to reset password
  - Users
  - Posts
    - [x] CRUD with pagination
- Admin APIs
  - Users
  - Posts
    - [x] RD

## License
MIT License. See the [LICENSE](LICENSE) file.

## Forked from
https://github.com/vmasto/express-babel
