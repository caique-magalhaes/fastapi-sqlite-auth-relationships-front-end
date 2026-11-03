import './CardPost.css'
import drawingHeart from '../../assets/drawing-heart.png'
import filledHeart from '../../assets/filled-heart.png'
import editIcon from '../../assets/edit.png'
import trashCan from '../../assets/trash-can.png'
import useApi from '../../hooks/useApi'
import { useState } from 'react'
import FormPost from '../FormPost/FormPost'
export default function CardPost({post, like_post_ids, user}){
    const {likePost,deletePost} = useApi()
    const [isEditing, setIsEditing] = useState(false)
    const likeAction = async (post_id) =>{
        await likePost(post_id)
    }

    function handleCancel(){
        setIsEditing(false)
    }
    if (isEditing){
        return(
            <>
                <FormPost onFormSubmitSuccess={()=> setIsEditing(false)} action='edit' post={post} user={user} />
                <button className='cancel-btn' onClick={handleCancel}>Cancelar</button>
            </>
        )
    }

    return (
        <section className="card">
            <h3 className="card-title">{post.title}</h3>
            <span className="card-info">id:{post.id}</span>
            <p className='card-description'>{post.description}</p>
            <div className='wrapper-like'>
                {
                    like_post_ids ? <img onClick={()=>likeAction(post.id)} src={filledHeart} className='icon-heart-filled' alt='icon heart filled' role='button'/> : <img  onClick={()=>likeAction(post.id)} src={drawingHeart} className='icon-heart-drawing' alt='icon heart drawing' role='button'/>
                }
                <span>{post.like_count}</span>
                {post.user_id == user?.id ? <img onClick={()=>setIsEditing(true)} src={editIcon} className='edit-icon' alt='icon edit' role='button'   /> : ""}
                {
                    post.user_id == user?.id ? < img src={trashCan} onClick={()=> deletePost(post.id)} className='trash-btn' alt='trash icon' role='button' /> : ""
                }
             </div>
        </section>
        )
}