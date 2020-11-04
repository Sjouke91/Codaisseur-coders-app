// src/components/PostsFeed.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./PostFeed.scss";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export default function PostsFeed() {
  const [data, setData] = useState({
    loading: true,
    posts: [],
  });
  const [loadData, setLoadData] = useState(false);

  async function fetchNext5Posts() {
    setData({ ...data, loading: true });

    try {
      const res = await axios.get(
        `${API_URL}/posts?offset=${data.posts.length}&limit=5`
      );

      const morePosts = res.data.rows;
      setData({
        loading: false,
        posts: [...data.posts, ...morePosts],
      });
      console.log("this is moreposts", morePosts);
    } catch (e) {
      console.log("this is error:", e.message);
    }
  }

  useEffect(() => {
    fetchNext5Posts();
  }, [loadData]);

  function onClickLoad() {
    loadData === false ? setLoadData(true) : setLoadData(false);
  }

  function loadingButton() {
    if (data.loading === true) {
      console.log("this is true");
      return <h3>Loading posts...</h3>;
    }
    return <button onClick={onClickLoad}> give me more of that sh*t</button>;
  }

  return (
    <div className="PostsFeed">
      <h2>Recent posts</h2>

      {data.posts.map((p) => {
        return (
          <div className="postCard" key={p.id}>
            <h3>{p.title}</h3>
            <div className="dateAndTags">
              <p>{moment(p.createdAt).format("DD-MM-YYYY")}</p>

              {p.tags.map((tag) => {
                return <p className="tag">{tag.tag}</p>;
              })}
            </div>
          </div>
        );
      })}
      {data.loading ? (
        <p>loading...</p>
      ) : (
        <button onClick={onClickLoad}>Load more pages</button>
      )}
    </div>
  );
}
