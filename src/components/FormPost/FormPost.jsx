import { useFormik } from "formik"
import * as Yup from 'yup'
import useApi from "../../hooks/useApi"
import './FormPost.css'


export default function FormPost({onFormSubmitSuccess,user,action,post}){
    const {submit,editPost} = useApi()

    const formik = useFormik(
        {
            initialValues:{
                title:post?.title || "",
                description:post?.description || "",

            },
            enableReinitialize: true, //updates fields
            onSubmit: async (values) => {
                if(action === 'edit'){
                    await editPost(values,post.id)
                }

                if (action === 'submitPost'){
                    await submit(values)
                }
                formik.resetForm()
                if (onFormSubmitSuccess) {
                onFormSubmitSuccess()
            }
            },

            validationSchema:Yup.object().shape({
                title:Yup.string().required("Título é obrigatório"),
                description:Yup.string().max(300, "The text must not exceed 300 characters.").required("Descrição é obrigatória")
            })

        }
    )

    return(
                <div className="wrapper-form">
                    {user ? "" : <div className="alert-login"><span>Para postar Voce precisa estar logado.</span></div>}
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className="form-subtitle">Deixe Seu Conselho</h2>
                        <div className=" form-field">
                            <label htmlFor="title">Titulo</label>
                            <input className={formik.touched.title && !!formik.errors.title ? "error-input" : "input-field"} id="title" name="title" type="text"
                            placeholder="Título"
                            {...formik.getFieldProps('title')}/>

                            {formik.touched.title && formik.errors.title && (<span className="error-description">{formik.errors.title}</span>)}
                        </div>

                        <div className="form-field">
                            <label htmlFor="description">Descrição</label>
                            <textarea height={250}
                            className={formik.touched.description && !!formik.errors.description ? "error-input" : "input-field"}
                            id="description"
                            name="description"
                            placeholder="Deixe seu Conselho"
                            {...formik.getFieldProps('description')}/>
                            {formik.touched.description && formik.errors.description && (
                                <span className="error-description">{formik.errors.description}</span>
                            )}
                        </div>

                       { user ?  <button className="submit-btn" type="submit">Publicar</button> : ""}
                    </form>
                </div>
    )
}