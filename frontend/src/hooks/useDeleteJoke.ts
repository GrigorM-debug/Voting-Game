import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJoke } from "../api/jokes";
import { useState } from "react";

export function useDeleteJoke() {
  const [deleteJokeMutationError, setMutationError] = useState<string | null>(
    null
  );

  const queryClient = useQueryClient();

  //Delete Joke
  const { mutateAsync: deleteJokeMutation } = useMutation<
    void,
    Error,
    { jokeId: string }
  >({
    mutationFn: ({ jokeId }) => deleteJoke(jokeId),
    onError: (error) => {
      setMutationError(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["joke"] });
      setMutationError(null);
    },
  });

  const handleDeleteButtonClick = async (jokeId: string) => {
    try {
      console.log(jokeId);
      await deleteJokeMutation({ jokeId });
    } catch (err) {
      if (err instanceof Error) {
        setMutationError(err.message);
      } else {
        setMutationError("Unexpected Error");
      }
    }
  };

  return {
    deleteJokeMutationError,
    handleDeleteButtonClick,
  };
}
