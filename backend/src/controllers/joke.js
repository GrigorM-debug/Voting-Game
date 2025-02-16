import { Router } from "express";
import {
  getRandomJoke,
  voteForJoke,
  jokeExistsById,
} from "../services/joke.js";

const jokeRouter = Router();

//Fetch radom joke
jokeRouter.get("/api/joke", async (req, res) => {
  const randomJoke = await getRandomJoke();

  res.status(200).json(randomJoke);
});

//Vote for joke
jokeRouter.post("/api/joke/:id", async (req, res) => {
  const { id } = req.params;
  const { emoji } = req.body;

  const jokeExist = await jokeExistsById(id);

  if (!jokeExist) {
    res.status(404).send("Joke doesn't exist");
  }

  try {
    const joke = await voteForJoke(id, emoji);

    res.status(200).json(joke);
  } catch (err) {
    console.log(err.message);
    res.status(404).send(err.message);
  }
});

export default jokeRouter;
