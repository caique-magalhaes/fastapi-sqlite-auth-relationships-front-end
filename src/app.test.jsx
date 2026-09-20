// @vitest-environment jsdom
import {render, screen, fireEvent} from "@testing-library/react"
import FormLogin from "./components/FormLogin/FormLogin"
import { AuthProvider } from "./context/AuthContext"
import { PostProvider } from "./context/PostContext"
import { expect, vi } from 'vitest';
import FormPost from "./components/FormPost/FormPost"
import FormRegister from "./components/FormRegister/FormRegister";

const mockNavigate = vi.fn()

vi.mock("react-router-dom", ()=>{
    const actual = vi.importActual("react-router-dom")

    return{
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({pathname: "/"}),
        useParams: () => ({})
    }
})

describe("Forms Test", () =>{
    test("form login - display validation erros", async ()=>{
        render(
        <AuthProvider>
            <PostProvider>
                <FormLogin />
            </PostProvider>
        </AuthProvider>
    )

        const submitButton = screen.getByRole("button",{
            name: /Submit/i,
        })

        fireEvent.click(submitButton)
        const requiredEmail = await screen.findByText(/Email is Required/i)
        expect(requiredEmail).toBeInTheDocument()

        const requiredPassword = await screen.findByText(/Password is required/i)
        expect(requiredPassword).toBeInTheDocument()
    })

    test("FormPost - display validations errors", async ()=>{
        render(
        <AuthProvider>
            <PostProvider>
                <FormPost />
            </PostProvider>
        </AuthProvider>
        )

        const publishBtn = screen.getByRole("button", {
            name: /Publish/i,
        })

        fireEvent.click(publishBtn)
        const requireTitle = await screen.findByText(/Title is Required/i)
        expect(requireTitle).toBeInTheDocument()
        const requireDescription = await screen.findByText(/Description Required/i)
        expect(requireDescription).toBeInTheDocument()
    })

    test("FormRegister - display validations errors", async ()=>{
        render(
            <AuthProvider>
                <PostProvider>
                    <FormRegister/>
                </PostProvider>
            </AuthProvider>
        )

        const registerButton = screen.getByRole("button", {
            name: /Register/i
        })

        fireEvent.click(registerButton)

        const emailRequired = await screen.findByText(/Email is Required/i)
        expect(emailRequired).toBeInTheDocument()

        const passwordRequired = await screen.findByText(/Password is required/i)
        expect(passwordRequired).toBeInTheDocument()

        const NameRequired = await screen.findByText(/Name is Required/i)
        expect(NameRequired).toBeInTheDocument()

        const confirmPasswordRequired = await screen.findByText(/Confirm Password must be filled/i)
        expect(confirmPasswordRequired).toBeInTheDocument()

        const cityRequired = await screen.findByText(/City is Required/i)
        expect(cityRequired).toBeInTheDocument()

        const countryRequired = await screen.findByText(/Country is Required/i)
        expect(countryRequired).toBeInTheDocument()
    })
})