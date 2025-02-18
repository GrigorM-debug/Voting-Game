import JokeCard from "./JokeCard";
import { fetchJoke } from "../api/jokes";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Joke } from "../types/Joke";
import ErrorMessage from "./Error";

export default function Home() {
  const {
    data: joke,
    isLoading,
    error,
    refetch,
  }: UseQueryResult<Joke, Error> = useQuery({
    queryKey: ["joke"],
    queryFn: fetchJoke,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    <ErrorMessage message={error.message} />;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      {joke ? (
        <JokeCard joke={joke} refetchJoke={refetch} />
      ) : (
        <div>No joke available</div>
      )}
    </div>
  );
}
