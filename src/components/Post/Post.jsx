import CardPost from "../CardPost/CardPost"

export default function Post({targetRef, posts}){

    return(
        <main ref={targetRef} className="wrapper-post">
            <h3>Advices</h3>
            {
                posts && posts.map((post) =><CardPost key={post.id} title={post.title} description={post.description} user_id={post.user_id} post_id={post.id} />)
            }
        </main>
    )
}