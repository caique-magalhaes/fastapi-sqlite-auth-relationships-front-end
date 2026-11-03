import { createContext, useContext, useEffect, useState } from "react"


const PostContext = createContext(undefined)

export const PostProvider = ({children,initialPost = []}) =>{
    const [posts, setPost] = useState(initialPost)
    
    return (
        <PostContext.Provider value={{posts,setPost}}>
            {children}
        </PostContext.Provider>
    )
}

export const  usePostContext = () => useContext(PostContext)