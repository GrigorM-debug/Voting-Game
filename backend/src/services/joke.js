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
}

export async function deleteJoke(id) {
  await Joke.findByIdAndDelete(id);
}

export async function updateJoke(id, question, answer) {
  if (!question) {
    throw new Error("Question is required");
  }

  if (!answer) {
    throw new Error("Answer is required");
  }

  const options = { new: true };

  const joke = await Joke.findByIdAndUpdate(id, { question, answer }, options);

  return joke;
}
