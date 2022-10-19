import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart} from "@fortawesome/free-solid-svg-icons";

//styling
import './post.style.css'

const trash = <FontAwesomeIcon icon={faTrash} />;
const like = <FontAwesomeIcon icon={faRegularHeart} />;
const liked = <FontAwesomeIcon icon={faSolidHeart} />;



export default function Post({ post, getPosts }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);
  const [user] = useAuthState(auth);
  const isLiked = likes.find((like) => like.userId === user.uid);
  const likesRef = collection(db, "likes");
  //
  const addLike = async () => {
    try {
      await addDoc(likesRef, {
        userId: user.uid,
        postId: post.postId,
      });
      setLikes((prev) => [...prev, { userId: user.uid }]);
    } catch (err) {
      console.log(err);
    }
  };
  //
  const getLikes = async () => {
    const likesDoc = query(likesRef, where("postId", "==", post.postId));
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };
  //
  const removeLike = async () => {
    const likesToDeleteQuery = query(
      likesRef,
      where("postId", "==", post.postId),
      where("userId", "==", user.uid)
    );
    const likesToDeleteData = await getDocs(likesToDeleteQuery);
    const likeToDelete = doc(db, "likes", likesToDeleteData.docs[0].id);
    await deleteDoc(likeToDelete);
    getLikes();
  };
  //
  const deletePost = async () => {
    try {
      if(likes.length !== 0) {removeLike()};
      const postToDelete = doc(db, "posts", post.postId);
      await deleteDoc(postToDelete);
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLikes();
  }, []);
  return (
    <div className=" col-8 mx-auto my-3 p-3 position-relative shadow bg-body rounded">
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <div>
          <img
            src={post.userPhotoURL}
            alt="Profile pic"
            className="profile-photo"
          />
          <p>
            <small>@{post.username}</small>
          </p>
        </div>
      </div>
      <h3 className="border-bottom py-2">{post.title}</h3>

      <p>{post.description}</p>
      <div className="d-flex justify-content-between">
        <div>
          <p className="like-unlike" onClick={isLiked ? removeLike : addLike}>
            {isLiked ? <span className="">{liked}</span> : <span>{like}</span>}
          </p>
          <small>{likes.length !== 0 && <>{likes.length}</>}</small>
        </div>
        {post.userId === user.uid && (
          <button className="btn btn-danger p-2 h-50" onClick={deletePost}>
            {trash}
          </button>
        )}
      </div>
    </div>
  );
}
