import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
export default function FormRegister(){
    const navigate = useNavigate()

    const submitLogin = async (values) =>{

    try {

        const response = await fetch('http://localhost:8000/user/register',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: values.email,
                password: values.password,
                name: values.name,
                confirm_password: values.confirm_password,
                country: values.country

            })
        })

        if(response.ok){
            const token = await response.json()
            localStorage.setItem('access_token', token.access_token)
            navigate('/login')

        }
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
    }

    const forbiddenPasswords = [
    'Abc12345',
    'ABc12345',
    'aBc12345',
    'abC12345',
]

    const formik = useFormik({
        initialValues:{
            email:'',
            password:'',
            name:'',
            confirm_password:'',
            country:''

        },
        onSubmit: async (values)=>{
            await submitLogin(values)
            formik.resetForm()

        },

        validationSchema:Yup.object().shape({
            email:Yup.string().email("Email Inválido").required("Email é Obrigatório"),
            password:Yup.string().min(8,"A senha deve ter ao menos 8 caracteres")
            .notOneOf(forbiddenPasswords, "Esse senha e muito comum escolha uma mais forte.")
            .matches(/^(?!.*password).*$/i, "A senha nao pode conter a palavra 'password'")
            .matches(/[A-Z]/,"Deve conter ao menos uma letra maiúscula")
            .matches(/[a-z]/, "Deve conter ao menos uma letra minúscula ")
            .matches(/[0-9]/, "Deve conter ao menos um número")
            .required("A senha é obrigatória"),
            name:Yup.string().required("Nome é Obrigatório"),
            confirm_password:Yup.string().oneOf([Yup.ref('password')], 'As senhas não coincidem').required("Confirmação de senha deve ser preenchida"),
            country:Yup.string().required("País deve ser selecionado")
        })
    })
    return(
        <div className="wrapper-form">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Nome</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className={formik.touched.name && !!formik.errors.name ? "error-input" : "input-field"}
                    {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (<span className="error-description">{formik.errors.name}</span>)}
                </div>

                <div className="form-field">
                    <label htmlFor="country">País</label>
                    <select
                    type="country"
                    id="country"
                    name="country"
                    placeholder="country" 
                    className={formik.touched.country && !!formik.errors.country ? "error-input" : "input-field"}
                    {...formik.getFieldProps("country")}>
                        <option value="" disabled> Selecione seu País</option>
                        <option value="Brazil">Brazil</option>
                        <option value="United Kingdom">United Kingdom</option>
                    </select>
                    {formik.touched.country && formik.errors.country && (<span className="error-description">{formik.errors.country}</span>)}
                </div>

                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input 
                    className={formik.touched.email && !!formik.errors.email ? "error-input" : "input-field"}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email" 
                    {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (<span className="error-description">{formik.errors.email}</span>)}
                </div>
                 <div className="form-field">
                    <label htmlFor="password">Senha</label>
                    <input 
                    className={formik.touched.password && !!formik.errors.password ? "error-input" : "input-field"}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password" 
                    {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (<span className="error-description">{formik.errors.password}</span>)}
                </div>

                <div className="form-field">
                    <label htmlFor="confirm-password">Confirme a Senha</label>
                    <input 
                    className={formik.touched.confirm_password && !!formik.errors.confirm_password ? "error-input" : "input-field"}
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Password" 
                    {...formik.getFieldProps("confirm_password")}
                    />
                    {formik.touched.confirm_password && formik.errors.confirm_password && (<span className="error-description">{formik.errors.confirm_password}</span>)}
                </div>
                <button className="submit-btn">Registrar</button>
            </form>
        </div>
    )
}