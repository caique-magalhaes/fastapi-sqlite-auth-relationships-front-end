import { useAuthContext} from "../../context/AuthContext"
import { usePostContext } from "../../context/PostContext"
import CardPost from "../CardPost/CardPost"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react"
import useApi from "../../hooks/useApi";
import './Profile.css'

export default function Profile(){
    const {user} = useAuthContext()
    const {posts} = usePostContext()
    const {getUserPost,getUSer} = useApi()
    useEffect(()=>{
        const loadProfileData = async () => {
            if (!user){
                await getUSer()
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

    const likedIds = user?.like_post_ids ?? []
    return(
        <>
            {
                user ?
                    <main className="wrapper-post">
                        <h2>@{user.name}  <FontAwesomeIcon icon={faUser} size="75px" /></h2>
                        <h3 className="wrapper-post-subtitle">Your posts</h3>
                        {
                            posts ? posts.map((post)=>(<CardPost post={post} key={post.id} user_id={user.id} post_like_count={post.like_count} like_post_ids={(likedIds).includes(post.id) ? likedIds : null }/>)):
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