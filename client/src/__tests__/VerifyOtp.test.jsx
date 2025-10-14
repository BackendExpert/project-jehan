import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VerifyOtp from "../components/auth/VerifyOtp";
import { setupServer } from "msw/node";
import { rest } from "msw";

const BASE_URL = "http://localhost:5000/api/auth";

const server = setupServer(
    rest.post(`${BASE_URL}/verify-otp`, (req, res, ctx) => {
        return res(ctx.json({ message: "OTP verified successfully" }));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("verifies OTP successfully", async () => {
    render(<VerifyOtp />);

    fireEvent.change(screen.getByPlaceholderText(/otp/i), {
        target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /verify/i }));

    await waitFor(() =>
        expect(screen.getByText(/otp verified successfully/i)).toBeInTheDocument()
    );
});
