import React, { Fragment, MouseEvent } from "react";
import { useState } from "react";
import CommentReply from "./Comment-reply";
import ReplyBox from "./Reply-box";

type CommentProps = {
    name: string;
    comment: string;
}

interface IComments {
    name: string
    comment: string
}

function CommentBox(props: CommentProps) {
    let commentTemp: string = ''
    const [replyBox, setReplyBox] = useState<boolean>(false)
    const [postComments, setPostComments] = useState<IComments[]>([])
    const avatar = 'https://avatars.dicebear.com/api/human/'
    const name: string = JSON.parse(localStorage.getItem('user') + '')

    const commentToPost = (name: string, comment: string) => {
        const newComments: IComments[] = [...postComments, {
            name: name,
            comment: comment
        }]
        setPostComments(newComments)
        setReplyBox(false)
        console.log(newComments);

    }

    const newReply = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setReplyBox(true)
        console.log('newReply');

    }

    return (
        <Fragment>
            {/* <!-- Avatar --> */}
            <div className="comment-avatar"><img src={avatar + props.name + ".svg?background=%239b9b9b"} alt="" /></div>
            {/* <!-- Contenedor del Comentario --> */}
            <div className="comment-box">
                <div className="comment-head">
                    <h6 className="comment-name by-author">{props.name}</h6>
                    <i className="fa fa-reply" onClick={newReply}></i>
                </div>
                <div className="comment-content">
                    {props.comment}
                </div>
            </div>
            {(replyBox) ? <ReplyBox comment={commentTemp} getData={(x: string) => commentToPost(name, x)} /> : null}
            {(postComments.length !== 0) ?
                postComments.map(x =>
                    <Fragment>

                        <ul className="comments-list reply-list pt-10">
                            <li><CommentReply name={x.name} comment={x.comment} /></li>
                        </ul>
                    </Fragment>
                ) : null
            }
        </Fragment>
    )
}
export default CommentBox;