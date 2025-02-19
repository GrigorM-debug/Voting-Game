import { Joke } from "../types/Joke";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voteForJoke } from "../api/jokes";
import { useState } from "react";

export function useVoteForJoke() {
  const [voteForJokeMutationError, setMutationError] = useState<string | null>(
    null
  );
  const queryClient = useQueryClient();

  //Vote for joke
  const { mutateAsync: voteForJokeMutation } = useMutation<
    Joke,
    Error,
    { jokeId: string; emoji: "😂" | "👍" | "❤️" }
  >({
    mutationFn: ({ jokeId, emoji }) => voteForJoke(jokeId, emoji),
    onError: (error) => {
      setMutationError(error.message);
    },
    onSuccess: (jokeUpdated) => {
      //   queryClient.invalidateQueries({ queryKey: ["joke"] }); // this also work but it load the next joke
      queryClient.setQueryData(["joke"], jokeUpdated);
      setMutationError(null);
    },
  });

  const handleVoteButtonClick = async (
    emoji: "😂" | "👍" | "❤️",
    jokeId: string
  ) => {
    try {
      await voteForJokeMutation({
        jokeId: jokeId,
        emoji,
      });
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
    voteForJokeMutationError,
    handleVoteButtonClick,
  };
}
