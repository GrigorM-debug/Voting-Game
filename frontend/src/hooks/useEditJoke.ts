import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditJokeForm } from "../types/EditJokeForm";
import { Joke } from "../types/Joke";
import { getJokeById, updateJoke } from "../api/jokes";

export function useEditJoke() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [errors, setErrors] = useState({
    questionError: "",
    answerError: "",
  });
  const [mutationError, setMutationError] = useState<string | null>(null);

  const {
    data: joke,
    isLoading,
    error,
  } = useQuery<Joke>({
    queryFn: () => getJokeById(id!),
    queryKey: ["joke", id],
  });

  const [formData, setFormData] = useState<EditJokeForm>({
    question: joke?.question || "",
    answer: joke?.answer || "",
  });

  if (
    joke &&
    formData.question.trim() === "" &&
    formData.answer.trim() === ""
  ) {
    setFormData({ question: joke.question, answer: joke.answer });
  }

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
      setFormData({
        question: "",
        answer: "",
      });
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

  return {
    isLoading,
    error,
    errors,
    mutationError,
    formData,
    handleChange,
    handleFormSubmit,
    navigate,
  };
}
