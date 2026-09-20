import { useAuthContext} from "../../context/AuthContext"
import { usePostContext } from "../../context/PostContext"
import CardPost from "../CardPost/CardPost"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react"
import useApi from "../../hooks/useApi";

export default function Profile(){
    const {user,setUser} = useAuthContext()
    const {posts} = usePostContext()
    const {getUserPost,getUSer} = useApi()
    useEffect(()=>{
        const loadProfileData = async () => {
            if (!user){
                await getUSer(setUser)
            }
    }
     loadProfileData()
    },[])

    useEffect(()=>{
        const loadPost = async() =>{
            if(user){
                await getUserPost(user.id)
            }
        }
        loadPost()
    },[user])
    return(
        <>
            {
                user ?
                    <main className="wrapper-post">
                        <h2>@{user.name}  <FontAwesomeIcon icon={faUser} size="75px" /></h2>
                        <h3>Your posts</h3>
                        {
                            posts.length > 0 ? posts.map((post)=>(<CardPost key={post.id} title={post.title} description={post.description} user_id={post.user_id} />)):
                            (
                                <p>You haven't created any posts yet!</p>
                            )
                        }
                    </main>
                :
                    <main className="wrapper-post">
                        <div className="alert-error">
                            <h4>You're not logged in</h4>
                                <p>
                                    You must be logged in to see this page
                                </p>
                        </div>
                    </main>
            }
        </>
    )
}