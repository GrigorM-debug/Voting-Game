import { Joke } from "../types/Joke";
import { QueryObserverResult } from "@tanstack/react-query";

type JokeCardProps = {
  joke: Joke;
  refetchJoke: () => Promise<QueryObserverResult<Joke, Error>>;
};

export default function JokeCard({ joke, refetchJoke }: JokeCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold">{joke.question}</h2>
      <p className="text-gray-500">{joke.answer}</p>
      <div className="flex space-x-4 mt-4">
        {joke.availableVotes.map((emoji) => (
          <button key={emoji} className="text-2xl">
            {emoji}
          </button>
        ))}
      </div>
      <button
        onClick={refetchJoke}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Next Joke
      </button>
    </div>
  );
}
