import { useAuthContext } from "../../context/AuthContext"
import { usePostContext } from "../../context/PostContext"
import CardPost from "../CardPost/CardPost"
import './Post.css'

export default function Post({targetRef}){
    const {user} = useAuthContext()
    const {posts} = usePostContext()

    const likedIds = user?.like_post_ids ?? []
    return(
        <main ref={targetRef} className="wrapper-post">
            <h3 className="post-subtitle">Conselhos</h3>
            {
                posts && posts.map((post) =><CardPost key={post.id} post={post} like_post_ids={(likedIds).includes(post.id) ? likedIds : null} user={user}  />)
            }
        </main>
    )
}