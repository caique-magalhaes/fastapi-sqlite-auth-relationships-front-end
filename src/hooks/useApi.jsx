import { useAuthContext } from "../context/AuthContext"
import { usePostContext } from "../context/PostContext"
import { useNavigate } from "react-router-dom"

export default function useApi(){
    const {posts,setPost} = usePostContext()
    const {setUser,user} = useAuthContext()

    const navigate = useNavigate()
    async function submitLogin (values){
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
                id:savePost.id, title: savePost.title, description: savePost.description, user_id: savePost.user_id, like_count:0}, ...prevPost])
        }
        } catch (error) {
            console.error(`Failed to save post to backend: ${error})`)
        }
    }

    async function editPost(data,post_id){
        try {
            const response = await fetch(`http://localhost:8000/post/post-change/${post_id}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body:JSON.stringify({
                title: data.title,
                description: data.description
            })

            })

            if(response.ok){
                const savePost = await response.json()

                setPost((prevPost)=>prevPost.map((post)=>post.id === post_id ? {...post, title:savePost.title, description:savePost.description} : post))
            }else {
            console.error(`Failed to edit post: Status ${response.status}`);
        }

        } catch (error) {
            console.error(`Failed to edit post to backend: ${error})`)
        }
    }

    async function getUSer(){
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
            setUser(null)
        }
    }

    async function getUserPost(id){
        try {
             const response = await fetch(`http://localhost:8000/post/get-post/${id}`)

            if (response.ok) {
                const data = await response.json()
                setPost([...data].reverse())
            }else{
              setPost(null)
            }
        } catch (error) {
            console.error(`Error:${error.message}`)
        }
    }
    async  function likePost(post_id){
        if (!user) return
        const previousPosts = posts
        const previousUser = user
        const isLiked = user.like_post_ids.includes(post_id)

            setUser((prevUser) => ({
                ...prevUser,
                like_post_ids: isLiked ? prevUser.like_post_ids.filter((id)=> id !== post_id) : [...prevUser.like_post_ids, post_id]
            }))
            setPost((prevPost) => prevPost.map(post =>{
                if (post.id === post_id){
                    return {
                        ...post,
                        like_count: isLiked ? post.like_count -1 : post.like_count + 1
                    }
                }
                return post
            }))

        try {
            const response = await fetch(`http://localhost:8000/post/post-like/${post_id}`,{
                method:'POST',
                credentials:'include'
            })

            if (!response.ok){
                setUser(previousUser)
                setPost(previousPosts)
                console.error(`Failed to Like the Post: ${response.status}`)
            }
        } catch (error) {
            setUser(previousUser)
            setPost(previousPosts)
            console.error(`Error:${error.message}`)
        }
    }

    async function logout(){

    try {
        const response = await  fetch("http://localhost:8000/user/logout",{
                method:"POST",
                credentials:'include'
            })
            if(response.ok){
                setUser(null)
                navigate('/login')
            }
    } catch (error) {
        console.error(`error: ${error}`)
    }
    }

    async function deletePost(post_id){

        const previousPosts = posts

        setPost((prevPost)=>(prevPost.filter((post)=> post.id !== post_id)))

        try {
            const response = await fetch(`http://localhost:8000/post/post-delete/${post_id}`, {
                method:"DELETE",
                credentials:'include'
            })
            if(!response.ok){
                setPost(previousPosts)
                console.error(`Failed to delete post: ${response.status}`)
            }
        } catch (error) {
            console.error(`Error deleting post: ${error.message}`)
            setPost(previousPosts)
        }
    }
    return {submitLogin, getAllPosts, submit, getUserPost,getUSer, likePost, logout, editPost, deletePost}
}