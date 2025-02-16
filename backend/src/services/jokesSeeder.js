import Joke from "../models/Joke.js";

export default async function seedJokes() {
  try {
    console.log("Fetching jokes...");

    let jokes = [];

    for (let i = 0; i < 10; i++) {
      const jokesApiUrl = process.env.JOKES_API;
      const response = await fetch(jokesApiUrl);
      const data = await response.json();

      jokes.push({
        question: data.question,
        answer: data.answer,
        votes: [],
        availableVotes: ["😂", "👍", "❤️"],
      });

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    await Joke.insertMany(jokes);
    console.log("Successfully seeded jokes!");
  } catch (err) {
    console.log("Error seading jokes: ", err);
  }
}
