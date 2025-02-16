import Joke from "../models/Joke.js";

export async function getRandomJoke() {
  const randomJoke = await Joke.aggregate([{ $sample: { size: 1 } }]);

  return randomJoke;
}

export async function voteForJoke(jokeId, emoji) {}
