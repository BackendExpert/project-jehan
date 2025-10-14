1. Design Patterns

A design pattern is a reusable solution to a common coding problem.
Example: Use the Repository pattern to separate database logic from business logic — keeps code clean and testable.

2. Data Transfer Objects (DTOs)

A DTO defines how data is sent between client, server, and DB.
Why useful: Ensures consistent data format, adds validation, and hides sensitive fields.

3. Security Best Practices

Store secrets like API keys in environment variables (.env) — never in code.
Use secret managers (AWS, GCP, etc.), secure permissions, and never log secrets.

4. Authentication (JWT)

JWT is a signed token given after login.
Client sends it with each request → server verifies signature to authenticate user.
Why good: Stateless, scalable, and works well with APIs.

5. Database Comparison

SQL: Fixed schema, strong relations, good for transactions.

NoSQL (MongoDB): Flexible schema, JSON-like data, easy scaling.
Why MongoDB: Fits dynamic user profiles and fast development.

6. State Management

Use React Query for API (server) data + Zustand or Redux Toolkit for local state.
Why: Simple, fast, and handles caching & refetching automatically.

7. Real-Time Features (WebSockets)

WebSockets keep a live two-way connection between client and server.
Advantage: Real-time updates (chat, notifications) without constant HTTP polling.

8. Testing Approach

Backend: Jest + Supertest for unit & integration tests.

Frontend: React Testing Library + Jest for components, Cypress/Playwright for E2E.
Goal: Verify logic, API behavior, and user flows.

