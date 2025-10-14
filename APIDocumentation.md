# 📝 Project Jehan API Documentation

Base URL: `http://localhost:5000/api`

All endpoints requiring authentication must include the header:  
`Authorization: Bearer <token>`

---

## 1️⃣ Auth Routes

### 1.1 Registration
- **Endpoint:** `/auth/registation`
- **Method:** POST
- **Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": { "userId": "12345" }
}
```

### 1.2 Verify Email
- **Endpoint:** `/auth/verify-email`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{ "otp": "123456" }
```
- **Response:**
```json
{ "success": true, "message": "Email verified" }
```

### 1.3 Login
- **Endpoint:** `/auth/login`
- **Method:** POST
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": "12345", "username": "john_doe" }
}
```

### 1.4 Forget Password
- **Endpoint:** `/auth/forget-password`
- **Method:** POST
- **Request Body:** `{ "email": "john@example.com" }`
- **Response:** `{ "success": true, "message": "OTP sent to email" }`

### 1.5 Verify OTP
- **Endpoint:** `/auth/verify-otp`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** `{ "otp": "123456" }`
- **Response:** `{ "success": true, "message": "OTP verified" }`

### 1.6 Update Password
- **Endpoint:** `/auth/update-password`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** `{ "newpassword": "newpass123" }`
- **Response:** `{ "success": true, "message": "Password updated successfully" }`

---

## 2️⃣ Admin Routes

### 2.1 Create Permission
- **Endpoint:** `/admin/:id`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `permission:create`
- **Request Body:** `{ "permisson": ["permission_name"] }`
- **Response:**
```json
{ "success": true, "message": "Permission created" }
```

### 2.2 Get All Permissions
- **Endpoint:** `/admin/`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `permission:getall`
- **Response:**
```json
[ { "roleId": "123", "permissions": ["note:create"] } ]
```

### 2.3 Get All Activities
- **Endpoint:** `/admin/all-activities`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `activity:getall`
- **Response:**
```json
[ { "activityId": "1", "name": "Activity 1" } ]
```

### 2.4 Get One Activity
- **Endpoint:** `/admin/one-activity/:id`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `activity:getone`
- **Response:**
```json
{ "activityId": "1", "name": "Activity 1", "details": "..." }
```

---

## 3️⃣ Note Routes

### 3.1 Create Note
- **Endpoint:** `/note/`
- **Method:** POST
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `note:create`
- **Form Data:** `title`, `content`, `notefile` (file upload)
- **Response:**
```json
{ "success": true, "message": "Note created", "data": { "noteId": "1" } }
```

### 3.2 Update Note
- **Endpoint:** `/note/:id`
- **Method:** PUT
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `note:update`
- **Form Data:** `title`, `content`, optional `notefile`
- **Response:** `{ "success": true, "message": "Note updated" }`

### 3.3 Delete Note
- **Endpoint:** `/note/:id`
- **Method:** DELETE
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `note:delete`
- **Response:** `{ "success": true, "message": "Note deleted" }`

### 3.4 Get My Notes
- **Endpoint:** `/note/my-notes`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `note:mynotes`
- **Response:** `[ { "noteId": "1", "title": "My Note" } ]`

### 3.5 Get All Notes
- **Endpoint:** `/note/`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `note:getall`
- **Response:** `[ { "noteId": "1", "title": "Note 1" } ]`

### 3.6 Get One Note
- **Endpoint:** `/note/:id`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `note:getone`
- **Response:**
```json
{ "noteId": "1", "title": "Note 1", "content": "..." }
```

---

## 4️⃣ User Routes

### 4.1 Get All Users
- **Endpoint:** `/user/`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `user:getall`
- **Response:**
```json
[ { "id": "1", "username": "John" } ]
```

### 4.2 Get All Roles
- **Endpoint:** `/user/roledata`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `user:roledata`
- **Response:** `[ { "roleId": "1", "name": "Admin" } ]`

### 4.3 Get One User
- **Endpoint:** `/user/getoneuser/:id`
- **Method:** GET
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `user:getone`
- **Response:**
```json
{ "id": "1", "username": "John", "email": "john@example.com" }
```

### 4.4 Update User Role
- **Endpoint:** `/user/updateRole/:id`
- **Method:** PUT
- **Headers:** `Authorization: Bearer <token>`
- **Permissions:** `user:updaterole`
- **Request Body:** `{ "roleId": "2" }`
- **Response:** `{ "success": true, "message": "User role updated" }`

---

**All responses follow this pattern:**  
```json
{ "success": true|false, "message": "Description", "data": {} }
```

