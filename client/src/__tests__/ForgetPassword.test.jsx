import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgetPassword from "../components/auth/ForgetPassword";
import { setupServer } from "msw/node";
import { rest } from "msw";

const BASE_URL = "http://localhost:5000/api/auth";

const server = setupServer(
    rest.post(`${BASE_URL}/forget-password`, (req, res, ctx) => {
        return res(ctx.json({ message: "Reset token sent to email" }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("submits email for password reset successfully", async () => {
    render(<ForgetPassword />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: "jehan@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send reset link/i }));

    await waitFor(() =>
        expect(screen.getByText(/reset token sent/i)).toBeInTheDocument()
    );
});
