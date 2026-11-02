// @vitest-environment jsdom
import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import FormLogin from "./components/FormLogin/FormLogin"
import { AuthProvider } from "./context/AuthContext"
import { PostProvider } from "./context/PostContext"
import {expect, test, vi } from 'vitest';
import FormPost from "./components/FormPost/FormPost"
import FormRegister from "./components/FormRegister/FormRegister";
import CardPost from "./components/CardPost/CardPost"
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";

const mockNavigate = vi.fn()

const mockUser = {
    id:1,
    name:"Bryan Adams",
    email:"bryan@gmail.com",
    country:"Brazil",
    like_post_ids: [],
    password:"Abc123456"
}

const mockPost = {
    id:10,
    title:'Test',
    description:'Just a Test',
    user_id:1,
    like_count:0
}

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
    test("FormLogin - display validation erros", async ()=>{
        render(
        <AuthProvider >
            <PostProvider>
                <FormLogin/>
            </PostProvider>
        </AuthProvider>
    )

        const submitButton = screen.getByRole("button",{
            name: /Enviar/i,
        })

        fireEvent.click(submitButton)
        const requiredEmail = await screen.findByText(/Email é Obrigatório/i)
        expect(requiredEmail).toBeInTheDocument()

        const requiredPassword = await screen.findByText(/Senha é Obrigatória/i)
        expect(requiredPassword).toBeInTheDocument()
    })

     test("FormLogin - Clear Input", async ()=>{
        render(
        <AuthProvider >
            <PostProvider>
                <FormLogin/>
            </PostProvider>
        </AuthProvider>
    )

        const submitButton = screen.getByRole("button",{
            name: /Enviar/i,
        })

        const emailInput = screen.getByLabelText(/Email/i)
        const passwordInput = screen.getByLabelText(/Senha/i)

        fireEvent.change(emailInput, {target:{value:mockUser.email}})
        fireEvent.change(passwordInput, {target:{value:mockUser.password}})

        expect(emailInput).toHaveValue("bryan@gmail.com")
        expect(passwordInput).toHaveValue("Abc123456")

        fireEvent.click(submitButton)

        await waitFor(()=>{
            expect(emailInput).toHaveValue("")
            expect(passwordInput).toHaveValue("")
        })

    })

    test("FormPost - display validations errors", async ()=>{
        render(
        <AuthProvider>
            <PostProvider>
                <FormPost user={mockUser}/>
            </PostProvider>
        </AuthProvider>
        )

        const publishBtn = screen.getByRole("button", {
            name: /Publicar/i,
        })

        fireEvent.click(publishBtn)
        const requireTitle = await screen.findByText(/Título é obrigatório/i)
        expect(requireTitle).toBeInTheDocument()
        const requireDescription = await screen.findByText(/Descrição é obrigatória/i)
        expect(requireDescription).toBeInTheDocument()
    })

    test("FormPost - Clear Input", async ()=>{
        render(
        <AuthProvider >
            <PostProvider>
                <FormPost user={mockUser}/>
            </PostProvider>
        </AuthProvider>
    )

        const submitButton = screen.getByRole("button",{
            name: /Publicar/i,
        })

        const title = screen.getByRole('textbox', {
            name: /Titulo/i
        })
        const description = screen.getByRole('textbox', {
            name: /Descrição/i
        })

        fireEvent.change(title, {target:{value:mockPost.title}})
        fireEvent.change(description, {target:{value:mockPost.description}})

        expect(title).toHaveValue("Test")
        expect(description).toHaveValue("Just a Test")

        fireEvent.click(submitButton)

        await waitFor(()=>{
            expect(title).toHaveValue("")
            expect(description).toHaveValue("")
        })

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
            name: /Registrar/i
        })

        fireEvent.click(registerButton)

        const emailRequired = await screen.findByText(/Email é Obrigatório/i)
        const passwordRequired = await screen.findByText(/A senha é obrigatória/i)
        const nameRequired = await screen.findByText(/Nome é Obrigatório/i)
        const confirmPasswordRequired = await screen.findByText(/Confirmação de senha deve ser preenchida/i)
        const countryRequired = await screen.findByText(/País deve ser selecionado/i)

        await waitFor(()=>{
            expect(emailRequired).toBeInTheDocument()
            expect(passwordRequired).toBeInTheDocument()
            expect(nameRequired).toBeInTheDocument()
            expect(confirmPasswordRequired).toBeInTheDocument()
            expect(countryRequired).toBeInTheDocument()
        })
    })

    test("FormRegister - Clear Input", async ()=>{
        render(
        <AuthProvider >
            <PostProvider>
                <FormRegister/>
            </PostProvider>
        </AuthProvider>
    )

        const submitButton = screen.getByRole("button",{
            name: /Registrar/i,
        })

        const emailInput = screen.getByLabelText(/Email/i)
        const nameInput = screen.getByLabelText(/Nome/i)

        const countryInput = screen.getByLabelText(/País/i)
        const passwordInput = screen.getByLabelText(/^senha$/i)
        const confirmPasswordInput = screen.getByLabelText(/Confirme a Senha/i)

        fireEvent.change(nameInput, {target:{value:mockUser.name}})
        fireEvent.change(emailInput, {target:{value:mockUser.email}})
        fireEvent.change(passwordInput, {target:{value:mockUser.password}})
        fireEvent.change(confirmPasswordInput, {target:{value:mockUser.password}})
        fireEvent.change(countryInput, {target:{value: mockUser.country}})
        

        expect(nameInput).toHaveValue("Bryan Adams")
        expect(emailInput).toHaveValue("bryan@gmail.com")
        expect(passwordInput).toHaveValue("Abc123456")
        expect(countryInput).toHaveValue("Brazil")
        expect(confirmPasswordInput).toHaveValue("Abc123456")
        
        

        fireEvent.click(submitButton)

        await waitFor(()=>{
            expect(nameInput).toHaveValue("")
            expect(emailInput).toHaveValue("")
            expect(passwordInput).toHaveValue("")
            expect(countryInput).toHaveValue("")
            expect(confirmPasswordInput).toHaveValue("")
        })

    })

    test("CardPost - test like button", async () =>{
        render(
            <AuthProvider initialUser={mockUser}>
                <PostProvider>
                    <CardPost post={mockPost}/>
                </PostProvider>
            </AuthProvider>
        )

        const likeButton = screen.getByAltText('icon heart drawing')
        //test if like is working
        fireEvent.click(likeButton)

        const filledHeart = await screen.findByAltText(/icon heart drawing/i)

        expect(filledHeart).toBeInTheDocument()

        //test if unlike is working
        fireEvent.click(filledHeart)
        expect(likeButton).toBeInTheDocument()
    })

     test("CardPost - test edit button", async () =>{
        render(
            <AuthProvider initialUser={mockUser}>
                <PostProvider>
                    <CardPost user={mockUser} post={mockPost}/>
                </PostProvider>
            </AuthProvider>
        )


        const titleInputBeforeClick = screen.queryByRole('textbox', {
            name: /Titulo/i
        })

        const descriptionInputBeforeClick = screen.queryByRole('textbox', {
            name: /Descrição/i
        })

        const publishButtonsBeforeClick = screen.queryByRole('button', {
            name: /publicar/i
        })

        const cancelButtonBeforeClick = screen.queryByRole('button', {
            name: /cancelar/i
        })


        expect(titleInputBeforeClick).not.toBeInTheDocument()
        expect(descriptionInputBeforeClick).not.toBeInTheDocument()
        expect(publishButtonsBeforeClick).not.toBeInTheDocument()
        expect(cancelButtonBeforeClick).not.toBeInTheDocument()

        const editButton = screen.getByAltText('icon edit')
        //test if like is working
        fireEvent.click(editButton)


        const titleInputs = screen.getByRole('textbox', {
            name: /Titulo/i
        })

        const descriptionInputs = screen.getByRole('textbox', {
            name: /Descrição/i
        })

        const publishButtons = screen.getByRole('button', {
            name: /publicar/i
        })

        const cancelButton = screen.getByRole('button', {
            name: /cancelar/i
        })


        //test if show FormPost to edit the post
        expect(titleInputs).toBeInTheDocument()
        expect(descriptionInputs).toBeInTheDocument()
        expect(publishButtons).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()
    })

    test("CardPost - test edit cancel button", async () =>{
        render(
            <AuthProvider initialUser={mockUser}>
                <PostProvider>
                    <CardPost user={mockUser} post={mockPost}/>
                </PostProvider>
            </AuthProvider>
        )


        const editButton = screen.getByAltText('icon edit')
        fireEvent.click(editButton)
        const cancelButton = screen.getByRole('button', {
            name: /cancelar/i
        })
        const titleInputs = screen.getByRole('textbox', {
            name: /Titulo/i
        })

        const descriptionInputs = screen.getByRole('textbox', {
            name: /Descrição/i
        })

        const publishButtons = screen.getByRole('button', {
            name: /publicar/i
        })
        //test cancel button
        fireEvent.click(cancelButton)

        expect(titleInputs).not.toBeInTheDocument()
        expect(descriptionInputs).not.toBeInTheDocument()
        expect(publishButtons).not.toBeInTheDocument()
        expect(cancelButton).not.toBeInTheDocument()

        const postTitleText = screen.getByText(mockPost.title)
        const postDescriptionText = screen.getByText(mockPost.description)

        expect(postTitleText).toBeInTheDocument()
        expect(postDescriptionText).toBeInTheDocument()

    })

})