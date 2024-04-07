"use client";

import BackButton from "@/components/BackButton";
import FormPost from "@/components/FormPost";
import { PostFormType } from "@/types/PostFormType";
import { SubmitHandler } from "react-hook-form";

const EditBlogPage = () => {
  const submit: SubmitHandler<PostFormType> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-2xl my-4 font-bold text-center">Edit post</h1>
      <FormPost submit={submit} isEdting />
    </div>
  );
};

export default EditBlogPage;
