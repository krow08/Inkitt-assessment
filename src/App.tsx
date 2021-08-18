import React, { useState, MouseEvent, Fragment } from 'react';
import { useEffect } from 'react';
import './App.css';
import CommentBox from './Components/Comment-box';


interface IComments {
  name: string
  comment: string
}

function App() {
  const [name, setName] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [showComments, setShowComments] = useState<IComments[]>([])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(name))
  },[name])

  const handlePost = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    addComment(name, comment)
    
    console.log('showComments', showComments)
  }

  const addComment = (name: string, comment: string) => {
    const newComments: IComments[] = [...showComments, {
      name: name,
      comment: comment
    }]
    setShowComments(newComments)
  }

  return (
    // <!-- Contenedor Principal -->
    <div className="comments-container">
      <h1>Comments</h1>
      <form>
        <div className='comment-box'>
          <div className='new-comment-username margins'>
            <label>Write your username</label>
            <input type="text" placeholder="Username" onChange={e => setName(e.target.value)} />
          </div>
        </div>
      </form>
      <div className='comment-box'>
        <div className='comment-head'>
          <h6 className='comment-name'>New Comment</h6>
          <h6 className="comment-name by-author">{name}</h6>
        </div>
        <div className='comment-content'>
          <textarea className='new-comment-content' onChange={e => setComment(e.target.value)} />
          <div className='align-right'>
            <button className='btn' type='button' onClick={handlePost}>Post</button>
          </div>
        </div>
      </div>

      <ul id="comments-list" className="comments-list">
        <li>
          <div className="comment-main-level">
            <ul className='comments-list'>
              {(showComments.length !== 0) ?
                showComments.map(x =>
                  <Fragment>
                    <li><CommentBox name={x.name} comment={x.comment} /></li>
                    <ul className="comments-list reply-list">

                    </ul>
                  </Fragment>
                ) : null
              }
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
