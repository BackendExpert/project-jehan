import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/auth/Login";
import { server, rest } from "msw";
import { setupServer } from "msw/node";

const BASE_URL = "http://localhost:5000/api/auth";

// Mock backend API
const server = setupServer(
    rest.post(`${BASE_URL}/login`, (req, res, ctx) => {
        return res(ctx.json({ token: "mock-token", message: "Login successful" }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders login form and submits successfully", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "jehan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
        expect(screen.getByText(/login successful/i)).toBeInTheDocument()
    );
});
