import { Joke } from "../types/Joke";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voteForJoke } from "../api/jokes";
import { useState } from "react";
import ErrorMessage from "./Error";

type JokeCardProps = {
  joke: Joke;
  refetchJoke: () => void;
};

export default function JokeCard({ joke, refetchJoke }: JokeCardProps) {
  const [mutationError, setMutationError] = useState<string | null>(null);
  const queryClient = useQueryClient();

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

  const handleVoteButtonClick = async (emoji: "😂" | "👍" | "❤️") => {
    try {
      await voteForJokeMutation({
        jokeId: joke._id,
        emoji,
      });
    } catch (err) {
      if (err instanceof Error) {
        setMutationError(err.message);
      } else {
        setMutationError("Unexpected error");
      }
    }
  };

  if (mutationError) {
    <ErrorMessage message={mutationError} />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold">{joke.question}</h2>
      <p className="text-gray-500">{joke.answer}</p>
      <div className="flex justify-center space-x-4 mt-8">
        {joke.availableVotes.map((emoji) => {
          const vote = joke.votes.find((v) => v.label === emoji);
          const voteCount = vote ? vote.value : 0;

          return (
            <button
              key={emoji}
              onClick={() => handleVoteButtonClick(emoji)}
              className="text-2xl mt-8 mb-6"
            >
              {emoji} {voteCount}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5"
        >
          Edit Joke
        </button>
        <button
          type="button"
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5"
        >
          Delete Joke
        </button>
        <button
          onClick={refetchJoke}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Next Joke
        </button>
      </div>
    </div>
  );
}
