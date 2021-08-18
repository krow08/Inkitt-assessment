import React, { Fragment, ChangeEvent, MouseEvent } from "react";
import { useState } from "react";

interface IComments {
    comment: string
    getData: Function
}

function ReplyBox(props: IComments) {
    const [liveComment, setLiveComment] = useState<string>(props.comment)
    const avatar = 'https://avatars.dicebear.com/api/human/'
    const name: string = JSON.parse(localStorage.getItem('user') + '')

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        setLiveComment(e.target.value)
    }

    const handlePost = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        props.getData(liveComment)
    }

    return (
        <Fragment>
            <ul className="comments-list reply-list pt-10">
                <li>
                    <div className='avatar-comment'>
                        {/* <!-- Avatar --> */}
                        <div className="comment-avatar"><img src={avatar + name + ".svg?background=%239b9b9b"} alt="" /></div>
                        {/* <!-- Contenedor del Comentario --> */}
                        <div className="comment-box width-reply">
                            <div className="comment-head">
                                <h6 className="comment-name">{name}</h6>
                                <i className="fa fa-reply"></i>
                            </div>
                            <div className="comment-content">
                                <textarea className='new-comment-content' onChange={handleChange} value={liveComment} />
                                <div className='align-right'>
                                    <button className='btn' type='button' onClick={handlePost}>Post</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </li>
            </ul>
        </Fragment>
    )
} export default ReplyBox