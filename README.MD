#### Setup

```bash
npm install && npm start
```

#### Routers

- auth.js
- task.js

#### Register User

- Validate - name, username, password - with Mongoose
- Find username
- If username exists, throw BadRequestError
- If username doesn't exists, create User
- Hash Password (with bcryptjs)
- Generate Token
- Send Response with Token

#### Login User

- Validate - username, password - in controller
- If username or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (username)
- Cast Error

#### Security

- cors
