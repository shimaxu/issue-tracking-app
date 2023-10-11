"use client";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { IssueSchema } from "../IssueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof IssueSchema>;

const IssueForm = () => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(IssueSchema),
  });

  const createIssue = handleSubmit(async (data) => {
    let response;
    try {
      setSubmitting(true);
      response = await fetch("/api/issues", {
        method: "post",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }

    if (response?.ok) {
      router.push("/issues");
    } else {
      setError("Unexpected error occured!");
      setSubmitting(false);
    }
  });

  return (
    <form className="space-y-4" onSubmit={createIssue}>
      {error && (
        <Callout.Root variant="surface" color="red">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}

      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button disabled={submitting} type="submit">
        Submit Issue
        {submitting && <Spinner />}
      </Button>
      
    </form>
  );
};

export default IssueForm;
