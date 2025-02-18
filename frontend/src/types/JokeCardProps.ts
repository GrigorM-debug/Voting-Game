import { Joke } from "./Joke";

export type JokeCardProps = {
  joke: Joke;
  refetchJoke: () => void;
};
