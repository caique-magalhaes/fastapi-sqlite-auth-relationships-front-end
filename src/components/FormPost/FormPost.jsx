import { useFormik } from "formik"
import * as Yup from 'yup'
import useApi from "../../hooks/useApi"
import './FormPost.css'


export default function FormPost({onFormSubmitSuccess,user}){
    const {submit} = useApi()

    const formik = useFormik(
        {
            initialValues:{
                title:"",
                description:"",

            },
            onSubmit: async (values) => {
                await submit(values)
                formik.resetForm()
                onFormSubmitSuccess()
            },

            validationSchema:Yup.object().shape({
                title:Yup.string().required("Title is Required"),
                description:Yup.string().max(300, "The text must not exceed 300 characters.").required("Description Required")
            })

        }
    )

    return(
                <div className="wrapper-form">
                    {user ? "" : <div className="alert-login"><span>To post, you need to be logged in.</span></div>}
                    <form onSubmit={formik.handleSubmit}>
                        <h2>Advice a Mate</h2>
                        <div className=" form-field">
                            <label htmlFor="title">Title</label>
                            <input className={formik.touched.title && !!formik.errors.title ? "error-input" : "input-field"} id="title" name="title" type="text"
                            placeholder="Title"
                            {...formik.getFieldProps('title')}/>

                            {formik.touched.title && formik.errors.title && (<span className="error-description">{formik.errors.title}</span>)}
                        </div>

                        <div className="form-field">
                            <label htmlFor="description"></label>
                            <textarea height={250}
                            className={formik.touched.description && !!formik.errors.description ? "error-input" : "input-field"}
                            id="description"
                            name="description"
                            placeholder="Let your Advice"
                            {...formik.getFieldProps('description')}/>
                            {formik.touched.description && formik.errors.title && (
                                <span className="error-description">{formik.errors.description}</span>
                            )}
                        </div>

                        <button className="submit-btn" type="submit">Publish</button>
                    </form>
                </div>
    )
}