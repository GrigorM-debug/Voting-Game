import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditJokeForm } from "../types/EditJokeForm";
import { Joke } from "../types/Joke";
import { getJokeById, updateJoke } from "../api/jokes";

export default function EditForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [mutationError, setMutationError] = useState<string | null>(null);

  const {
    data: joke,
    isLoading,
    error,
  } = useQuery<Joke>({
    queryFn: () => getJokeById(id!),
    queryKey: ["joke", id],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  if (mutationError) {
    return <div className="error-message">Error: {mutationError}</div>;
  }

  const [formData, setFormData] = useState<EditJokeForm>({
    question: joke?.question || "",
    answer: joke?.answer || "",
  });

  const [errors, setErrors] = useState({
    questionError: "",
    answerError: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { mutateAsync: updateJokeMutation } = useMutation<
    Joke,
    Error,
    { id: string; formData: EditJokeForm }
  >({
    mutationFn: ({ id, formData }) => updateJoke(id, formData),
    onError: (error) => {
      setMutationError(error.message);
    },
    onSuccess: (jokeUpdated) => {
      queryClient.setQueryData(["joke"], jokeUpdated);
      setMutationError(null);
    },
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    const newErrors = {
      questionError: "",
      answerError: "",
    };

    if (!formData.question || formData.question.trim() === "") {
      newErrors.questionError = "Question is required";
      hasError = true;
    }

    if (!formData.answer || formData.answer.trim() === "") {
      newErrors.answerError = "Answer is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateJokeMutation({ id: id!, formData });
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        setMutationError(err.message);
      } else {
        setMutationError("Unexpected error");
      }
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
      <div className="mb-5">
        <label
          htmlFor="question"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Question
        </label>
        <input
          type="text"
          id="question"
          name="question"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={formData.question}
          onChange={(e) => handleChange(e)}
        />
        {errors.questionError !== "" && (
          <p className="text-red-600">{errors.questionError}</p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="answer"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Answer
        </label>
        <input
          type="text"
          id="answer"
          name="answer"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={formData.answer}
          onChange={(e) => handleChange(e)}
        />
        {errors.answerError !== "" && (
          <p className="text-red-600">{errors.answerError}</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium font-bold ounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
