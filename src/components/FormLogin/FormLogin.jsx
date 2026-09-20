import { useFormik } from "formik"
import * as Yup from 'yup'
import {useAuthContext } from "../../context/AuthContext"
import useApi from "../../hooks/useApi"

export default function FormLogin(){
    const {setUser} = useAuthContext()
    const {submitLogin} = useApi()

    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit: async (values)=>{
            await submitLogin(values,setUser)
            formik.resetForm()

        },

        validationSchema:Yup.object().shape({
            email:Yup.string().email("Invalid email address").required("Email is Required"),
            password:Yup.string().min(6).required("Password is required")
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
                    <label htmlFor="password">Password</label>
                     <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password" 
                    className={formik.touched.password && !!formik.errors.password ? "error-input" : "input-field"}
                    {...formik.getFieldProps("password")}
                    />

                    {formik.touched.password && formik.errors.password && (<span className="error-description">{formik.errors.password}</span>)}
                </div>
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}