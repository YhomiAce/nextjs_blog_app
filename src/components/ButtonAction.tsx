"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import Spinner from "./Spinner";

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => {
      return await axios.delete(`/api/posts/${id}`);
    },
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div>
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil /> Edit
      </Link>
      <button
        className="btn btn-error text-slate-200"
        onClick={() => deletePost()}
      >
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <Trash /> Delete
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonAction;
