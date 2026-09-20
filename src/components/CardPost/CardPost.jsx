import './CardPost.css'

export default function CardPost({title, description,user_id,post_id}){
    return (

        <section className="card">
            <h3 className="card-title">{title}</h3>
            <span className="card-info">User id:{user_id} - {post_id}</span>
            <p className='card-description'>{description}</p>
        </section>
        )
}