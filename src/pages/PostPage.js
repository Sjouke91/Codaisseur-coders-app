import React, { useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../store/postPage/actions";
import { selectFeedPost } from "../store/postPage/selector";
import ReactMarkdown from "react-markdown";

export default function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const postData = useSelector(selectFeedPost);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  console.log("this is postdata", postData);

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
    </div>
  );
}
