import { useEffect, useRef } from 'react'
import './App.css'
import Post from './components/Post/Post'
import { usePostContext } from './context/PostContext'
import FormPost from './components/FormPost/FormPost'
import useApi from './hooks/useApi'
import { useAuthContext } from './context/AuthContext'


export default function  App(){
    const postSectionRef = useRef(null)
    const {getAllPosts,getUSer} = useApi()
    const {user} = useAuthContext()

   useEffect( () =>{const verifyUser = async() =>{
          await getUSer()
          }
          verifyUser()
        }, [])

    useEffect(() =>{
        getAllPosts()
    },[])
    const scrollToPost = () => {
      setTimeout(() => {
        if (postSectionRef.current){
            postSectionRef.current.scrollIntoView({
                behavior:"smooth",
                block:"start"
            })
          }else{
            console.error("The ref is still null!");
          }
      }, 100);
      }

  return(
        <main>
          <FormPost user={user} onFormSubmitSuccess={scrollToPost}/>
          <Post action='submitPost' targetRef={postSectionRef} />
        </main>
  )
}