import React from "react";
//form imports
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//firebase imports
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
  const navigate = useNavigate()
  //grabing the user
  const [user] = useAuthState(auth);
  //form schema
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("This Field Is Required")
      .min(4, "Min 4 Characters"),
    description: yup.string().required("This Field Is Required"),
  });
  //useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");
  //create post
  const createPost = async (data) => {
    navigate('/')
    await addDoc(postsRef, {
      ...data,
      username: user.displayName,
      userId: user.uid,
      userPhotoURL:user.photoURL,
      createdAt: new Date().toLocaleString()
    });
  };
  return (
    <form
      className="mx-auto col-lg-5 p-5"
      onSubmit={handleSubmit(createPost)}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          {...register("title")}
          type="text"
          className="form-control"
          id="title"
          aria-describedby="titleHelp"
          placeholder="Title.."
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          {...register("description")}
          type="text"
          className="form-control"
          placeholder="Description.."
          id="description"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Add Post
      </button>
    </form>
  );
}
