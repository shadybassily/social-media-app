import React from 'react'
import PostForm from './PostForm'
import { Navigate } from 'react-router-dom'
export default function CreatePost({user}) {
  if(!user){
    return <Navigate to="/login" replace/>
  }
  return (
    <PostForm />
  )
}
