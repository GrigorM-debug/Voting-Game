import Joke from "../models/Joke.js";

export async function getRandomJoke() {
  const randomJoke = await Joke.aggregate([{ $sample: { size: 1 } }]);

  return randomJoke;
}

export async function jokeExistsById(id) {
  const existingJoke = await Joke.findById(id);

  if (!existingJoke) {
    return false;
  }

  return true;
}

export async function voteForJoke(id, emoji) {
  if (!emoji) {
    throw new Error("Emoji is required for voting");
  }

  const joke = await Joke.findById(id);

  const isEmojiAvaiable = joke.availableVotes.find((av) => av === emoji);

  if (!isEmojiAvaiable) {
    throw new Error("Emoji is not avaiable");
  }

  const vote = joke.votes.find((v) => v.label === emoji);

  if (vote) {
    vote.value += 1;
  } else {
    const newVote = {
      value: 1,
      label: emoji,
    };

    joke.votes.push(newVote);
  }

  await joke.save();

  return joke;
}
