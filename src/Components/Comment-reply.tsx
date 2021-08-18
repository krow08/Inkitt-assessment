import React, { Fragment, MouseEvent } from "react";
import { useState } from "react";
import ReplyBox from "./Reply-box";

type CommentProps = {
    name: string;
    comment: string;
}

interface IComments {
    name: string
    comment: string
}

function CommentReply(props: CommentProps) {
    const [replyBox, setReplyBox] = useState<boolean>(false)
    const [postComments, setPostComments] = useState<IComments[]>([])
    const avatar = 'https://avatars.dicebear.com/api/human/'
    const name: string = JSON.parse(localStorage.getItem('user')+'')

    const newReply = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setReplyBox(true)
        console.log('newReply');
    }

    const commentToPost = (name: string, comment: string) => {
        const newComments: IComments[] = [...postComments, {
            name: name,
            comment: comment
        }]
        setPostComments(newComments)
        setReplyBox(false)
        console.log(newComments);
    }

    return (
        <li>
            <section className='avatar-comment'>
                {/* <!-- Avatar --> */}
                <div className="comment-avatar"><img src={avatar + props.name+".svg?background=%239b9b9b"} alt="" /></div>
                {/* <!-- Contenedor del Comentario --> */}
                <div className="comment-box width-reply">
                    <div className="comment-head">
                        <h6 className="comment-name">{props.name}</h6>
                        <i className="fa fa-reply" onClick={newReply}></i>
                    </div>
                    <div className="comment-content">
                        {props.comment}
                    </div>
                </div>
            </section>
            {(replyBox) ? <ReplyBox comment={''} getData={(x: string) => commentToPost(name, x)} /> : null}
            {(postComments.length !== 0) ?
                postComments.map(x =>
                    <Fragment>

                        <ul className="comments-list reply-list pt-10">
                            <li><CommentReply name={x.name} comment={x.comment} /></li>
                        </ul>
                    </Fragment>
                ) : null
            }
        </li>
    )
} export default CommentReply