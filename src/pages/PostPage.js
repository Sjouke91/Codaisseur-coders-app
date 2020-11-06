import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, addComment } from "../store/postPage/actions";
import { selectFeedPost } from "../store/postPage/selector";
import ReactMarkdown from "react-markdown";
import { selectUser } from "../store/Auth/selector";

export default function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const postData = useSelector(selectFeedPost);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  function onClickSubmit(event) {
    console.log("comment", comment);
    event.preventDefault();
    dispatch(addComment(comment, id));
  }

  return (
    <div>
      {!postData ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{postData.post.title}</h1>
          <p className="meta">
            By <strong>{postData.post.developer.name}</strong> &bull;{" "}
            {moment(postData.post.createdAt).format("DD-MM-YYYY")} &bull;{" "}
            {/* {post.post_likes.length} likes &bull;{" "} */}
            <span className="tags">
              {postData.post.tags.map((tag) => {
                return (
                  <React.Fragment key={tag.id}>
                    <span className="Tag">{tag.tag}</span>{" "}
                  </React.Fragment>
                );
              })}
            </span>
          </p>
          <ReactMarkdown source={postData.post.content} />

          <h2>Comments</h2>
          {postData.comments.rows.length === 0 ? (
            <p>
              <em>No comments left behind yet :(</em>
            </p>
          ) : (
            postData.comments.rows.map((comment) => {
              return (
                <div key={comment.id}>
                  <p>{comment.text}</p>
                  <p className="meta">
                    By <strong>{comment.developer.name}</strong> &bull;{" "}
                    {moment(comment.createdAt).format("DD-MM-YYYY")}{" "}
                  </p>
                </div>
              );
            })
          )}
        </>
      )}
      <div className="addComment">
        <form>
          <label>
            Add comment:
            <input
              type="text"
              onChange={(e) =>
                setComment({
                  message: e.target.value,
                  user: user.name,
                  date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
                })
              }
            ></input>
          </label>
          <button onClick={(e) => onClickSubmit(e)}>Submit</button>
        </form>
      </div>
    </div>
  );
}
