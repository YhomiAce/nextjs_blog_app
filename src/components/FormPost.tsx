"use client";

import { PostFormType } from "@/types/PostFormType";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormPostProps {
  submit: SubmitHandler<PostFormType>;
  isEdting?: boolean;
}

const FormPost: FC<FormPostProps> = ({ submit, isEdting }) => {
  const { register, handleSubmit } = useForm<PostFormType>();

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-5 mt-10"
    >
      <input
        type="text"
        placeholder="Post title.."
        className="input input-bordered w-full max-w-lg"
        {...register("title", { required: true })}
      />
      <textarea
        className="textarea textarea-bordered w-full max-w-lg"
        placeholder="Post content.."
        {...register("content", { required: true })}
      ></textarea>
      <select
        className="select select-bordered w-full max-w-lg"
        {...register("tag", { required: true })}
        defaultValue=""
      >
        <option disabled value="">
          Select tag
        </option>
        <option value={"Javascript"}>Javascript</option>
        <option value={"PHP"}>PHP</option>
        <option value={"Java"}>Java</option>
        <option value={"Python"}>Python</option>
        <option value={"Typescript"}>Typescript</option>
        <option value={"Dart"}>Dart</option>
      </select>
      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isEdting ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default FormPost;
