import { usePostContext } from "../context/PostContext"
import { useNavigate } from "react-router-dom"

export default function useApi(){
    const {setPost} = usePostContext()
    const navigate = useNavigate()
    async function submitLogin (values, setUser){
            try {
                const formData = new URLSearchParams()
                formData.append('username', values.email)
                formData.append('password', values.password)
                const response = await fetch('http://localhost:8000/user/login/token',{
                    method:"POST",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    credentials:"include",
                    body:formData
                })
                if(response.ok){
                    const data = await response.json()
                    setUser({
                        id:data.id,
                        email: data.email,
                        name: data.name
                    })
                    navigate('/')
                }
            } catch (error) {
                console.error(`Error: ${error.message}`)
                setUser(null)
            }
    }

    async function getAllPosts(){
        try {
            const response = await  fetch('http://localhost:8000/')
            if (response.ok){
            const data = await response.json()
            setPost([...data].reverse())
            navigate('/')
        }
        } catch (error) {
            console.error(`Error:${error.message}`)
        }
    }

    async function submit(data) {
        try {
            const response = await fetch("http://localhost:8000/post/create-post",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            credentials:'include',

            body:JSON.stringify({
                title: data.title,
                description: data.description
            })
        })
        if(response.ok){
            const savePost = await response.json()

            setPost((prevPost) => [{
                id:savePost.id, title: savePost.title, description: savePost.description, user_id: savePost.user_id}, ...prevPost])
        }
        } catch (err) {
            console.error(`Failed to save post to backend: ${err})`)
        }
    }

    async function getUSer(setUser){
        try {
            const response = await fetch('http://localhost:8000/user/me',{
                method:"GET",
                credentials:'include'
            })

            if (response.ok){
                const data = await response.json()
                setUser(data)
            }
        } catch (error) {
            console.error(`Failed to get the user: ${error}`)
        }
    }

    async function getUserPost(id){
        try {
             const response = await fetch(`http://localhost:8000/post/get-post/${id}`)

            if (response.ok) {
                const data = await response.json()
                setPost([...data].reverse())
            }
        } catch (error) {
            console.error(`Error:${error.message}`)
        }
    }


    return{submitLogin, getAllPosts, submit, getUserPost,getUSer}
}