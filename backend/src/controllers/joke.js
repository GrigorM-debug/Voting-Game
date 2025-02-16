import { Router } from "express";
import { getRandomJoke } from "../services/joke.js";

const jokeRouter = Router();

//Fetch radom joke
jokeRouter.get("/api/joke", async (req, res) => {
  const randomJoke = await getRandomJoke();

  res.status(200).json(randomJoke);
});

export default jokeRouter;
