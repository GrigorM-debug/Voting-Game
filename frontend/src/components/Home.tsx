import JokeCard from "./JokeCard";
import { fetchJoke } from "../api/jokes";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const {
    data: joke,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["joke"],
    queryFn: () => fetchJoke(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      {joke && <JokeCard joke={joke} refetchJoke={refetch} />}
    </div>
  );
}
