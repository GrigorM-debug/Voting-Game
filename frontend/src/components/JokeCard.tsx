import { JokeCardProps } from "../types/JokeCardProps";
import { useNavigate } from "react-router-dom";

import { useVoteForJoke } from "../hooks/useVoteForJoke";
import { useDeleteJoke } from "../hooks/useDeleteJoke";

export default function JokeCard({ joke, refetchJoke }: JokeCardProps) {
  const navigate = useNavigate();

  const { voteForJokeMutationError, handleVoteButtonClick } = useVoteForJoke();

  const { deleteJokeMutationError, handleDeleteButtonClick } = useDeleteJoke();

  const handleEditButtonClick = () => {
    navigate(`joke/edit/${joke._id}`);
  };

  if (voteForJokeMutationError) {
    return (
      <div className="error-message">Error: {voteForJokeMutationError}</div>
    );
  }

  if (deleteJokeMutationError) {
    return (
      <div className="error-message">Error: {deleteJokeMutationError}</div>
    );
  }

  return (
    <div className="bg-[#242424]  p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold">Q: {joke.question}</h2>
      <p className="text-gray-500">A: {joke.answer}</p>
      <div className="flex justify-center space-x-4 mt-8">
        {joke.availableVotes.map((emoji) => {
          const vote = joke.votes.find((v) => v.label === emoji);
          const voteCount = vote ? vote.value : 0;

          return (
            <button
              key={emoji}
              onClick={() => handleVoteButtonClick(emoji, joke._id)}
              className="text-2xl mt-8 mb-6 border-2 border-[#242424] hover:border-cyan-600"
            >
              {emoji} {voteCount}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleEditButtonClick()}
          type="button"
          className="text-white font-bold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full px-5 py-2.5"
        >
          Edit Joke
        </button>
        <button
          onClick={() => handleDeleteButtonClick(joke._id)}
          type="button"
          className="font-bold text-white bg-red-600 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-full px-5 py-2.5"
        >
          Delete Joke
        </button>
        <button
          onClick={refetchJoke}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full font-medium"
        >
          Next Joke
        </button>
      </div>
    </div>
  );
}
