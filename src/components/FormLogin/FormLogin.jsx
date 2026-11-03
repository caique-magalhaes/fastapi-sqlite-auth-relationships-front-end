import { useFormik } from "formik"
import * as Yup from 'yup'
import {useAuthContext } from "../../context/AuthContext"
import useApi from "../../hooks/useApi"
import './FormLogin.css'

export default function FormLogin(){
    const {submitLogin} = useApi()

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit: async (values)=>{
            await submitLogin(values)
            formik.resetForm()

        },

        validationSchema:Yup.object().shape({
            email:Yup.string().email("Email Inválido").required("Email é Obrigatório"),
            password:Yup.string().min(6).required("Senha é Obrigatória")
        })
    })
    return(
        <div className="wrapper-form">

            <form onSubmit={formik.handleSubmit}>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email" 
                    className={formik.touched.email && !!formik.errors.email ? "error-input" : "input-field"}
                    {...formik.getFieldProps("email")}
                    />

                    {formik.touched.email && formik.errors.email && (<span className="error-description">{formik.errors.email}</span>)}
                </div>
                <div className="form-field">
                    <label htmlFor="password">Senha</label>
                     <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Senha" 
                    className={formik.touched.password && !!formik.errors.password ? "error-input" : "input-field"}
                    {...formik.getFieldProps("password")}
                    />

                    {formik.touched.password && formik.errors.password && (<span className="error-description">{formik.errors.password}</span>)}
                </div>
                <button className="submit-btn" type="submit">Enviar</button>
            </form>
        </div>
    )
}