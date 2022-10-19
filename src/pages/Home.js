import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { appContext } from "../App";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase";
import Post from "../components/post/Post";

export default function Home() {
  const { user } = useContext(appContext);
  const [posts, setPosts] = useState(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const sortedData = query(postsRef, orderBy("createdAt", "desc"));
    const data = await getDocs(sortedData);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), postId: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);
  //redirect user if not auth
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container">
      <div>
        {posts == null ? (
          "Loading"
        ) : posts.length === 0 ? (
          <div>
            <h1 className="text-center">No Posts Yet</h1>
            <p>
              Create your first post <Link to="/create-post">Here: </Link>
            </p>
          </div>
        ) : (
          <div>
            {posts?.map((post) => {
              return <Post post={post} key={post.postId} getPosts={getPosts} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
