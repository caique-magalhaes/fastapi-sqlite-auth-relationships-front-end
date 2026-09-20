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
                city: values.city,
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
            city:'',
            country:''

        },
        onSubmit: async (values)=>{
            await submitLogin(values)
            formik.resetForm()

        },

        validationSchema:Yup.object().shape({
            email:Yup.string().email("Invalid email address").required("Email is Required"),
            password:Yup.string().min(8,"Must be at least 8 characters long")
            .notOneOf(forbiddenPasswords, "That password is too common! Choose a stronger one.")
            .matches(/^(?!.*password).*$/i, "Password cannot contain the word 'password'")
            .matches(/[A-Z]/,"Must contain at least one uppercase letter")
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/[0-9]/, "Must contain at least one number")
            .required("Password is required"),
            name:Yup.string().required("Name is Required"),
            confirm_password:Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required("Confirm Password must be filled"),
            city:Yup.string().required("City is Required"),
            country:Yup.string().required("Country is Required")
        })
    })
    return(
        <div className="wrapper-form">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Name</label>
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
                    <label htmlFor="country">Country</label>
                    <input
                    type="country"
                    id="country"
                    name="country"
                    placeholder="country" 
                    className={formik.touched.country && !!formik.errors.country ? "error-input" : "input-field"}
                    {...formik.getFieldProps("country")}
                    />
                    {formik.touched.country && formik.errors.country && (<span className="error-description">{formik.errors.country}</span>)}
                </div>

                <div className="form-field">
                    <label htmlFor="city">City</label>
                    <input 
                    className={formik.touched.city && !!formik.errors.city ? "error-input" : "input-field"}
                    type="text"
                    id="city"
                    name="city"
                    placeholder="city" 
                    {...formik.getFieldProps("city")}
                    />
                    {formik.touched.city && formik.errors.city && (<span className="error-description">{formik.errors.city}</span>)}
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
                    <label htmlFor="password">Password</label>
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
                    <label htmlFor="confirm-password">Cofirm Password</label>
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
                <button className="submit-btn">Register</button>
            </form>
        </div>
    )
}