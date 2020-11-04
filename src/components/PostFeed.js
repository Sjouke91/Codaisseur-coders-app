// src/components/PostsFeed.js
import React, { useEffect } from "react";

import moment from "moment";
import "./PostFeed.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchNext5Posts } from "../store/feed/actions";
import { selectFeedLoading, selectFeedPost } from "../store/feed/selector";
import { Link } from "react-router-dom";

export default function PostsFeed() {
  const data = useSelector(selectFeedPost);
  const loading = useSelector(selectFeedLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNext5Posts);
  }, []);

  return (
    <div className="PostsFeed">
      <h2>Recent posts</h2>

      {data.map((p) => {
        console.log("this is id", p.id);
        return (
          <div className="postCard" key={p.id}>
            <Link to={`/post/${p.id}`}>
              <h3>{p.title}</h3>
            </Link>
            <div className="dateAndTags">
              <p>{moment(p.createdAt).format("DD-MM-YYYY")}</p>

              {p.tags.map((tag) => {
                return (
                  <p key={tag.id} className="tag">
                    {tag.tag}
                  </p>
                );
              })}
            </div>
          </div>
        );
      })}
      {loading ? (
        <p>loading...</p>
      ) : (
        <button onClick={(e) => dispatch(fetchNext5Posts)}>
          Load more pages
        </button>
      )}
    </div>
  );
}
