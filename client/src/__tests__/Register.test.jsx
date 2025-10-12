import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../components/auth/Register";
import { setupServer } from "msw/node";
import { rest } from "msw";

const BASE_URL = "http://localhost:5000/api/auth";

const server = setupServer(
    rest.post(`${BASE_URL}/registation`, (req, res, ctx) => {
        return res(ctx.json({ message: "Registration successful. Verification email sent." }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("registers a new user successfully", async () => {
    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
        target: { value: "Jehan" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "jehan@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
        expect(
            screen.getByText(/registration successful/i)
        ).toBeInTheDocument()
    );
});
