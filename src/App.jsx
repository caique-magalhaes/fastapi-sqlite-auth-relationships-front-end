import { useEffect, useRef } from 'react'
import './App.css'
import Post from './components/Post/Post'
import { usePostContext } from './context/PostContext'
import FormPost from './components/FormPost/FormPost'
import useApi from './hooks/useApi'
import { useAuthContext } from './context/AuthContext'


export default function  App(){
    const postSectionRef = useRef(null)
    const {posts} = usePostContext()
    const {getAllPosts,getUSer} = useApi()
    const {user, setUser} = useAuthContext()

   useEffect( () =>{const verifyUser = async() =>{
          try {
            await getUSer(setUser)
          } catch (error) {
            setUser(null)
          }}
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
          <Post posts={posts} targetRef={postSectionRef} />
        </main>
  )
}