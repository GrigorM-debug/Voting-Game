import { Router } from "express";
import {
  getRandomJoke,
  voteForJoke,
  jokeExistsById,
  deleteJoke,
  updateJoke,
  getJokeById,
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
    return res.status(404).send({ error: "Joke doesn't exist" });
  }

  try {
    const joke = await voteForJoke(id, emoji);

    res.status(201).json(joke);
  } catch (err) {
    console.log(err.message);
    res.status(400).send({ error: err.message });
  }
});

//Delete Joke by Id
jokeRouter.delete("/api/joke/:id", async (req, res) => {
  const { id } = req.params;
  const jokeExist = await jokeExistsById(id);

  if (!jokeExist) {
    res.status(404).send({ error: "Joke doesn't exist" });
  }

  try {
    await deleteJoke(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//Get Joke by Id
jokeRouter.get("/api/joke/:id", async (req, res) => {
  const { id } = req.params;

  const jokeExists = await jokeExistsById(id);

  if (!jokeExists) {
    return res.status(404).send({ error: "Joke doesn't exist" });
  }

  try {
    const joke = await getJokeById(id);

    res.status(200).json(joke);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//Update joke by id
jokeRouter.put("/api/joke/:id", async (req, res) => {
  const { id } = req.params;
  const { answer, question } = req.body;

  const jokeExist = await jokeExistsById(id);

  if (!jokeExist) {
    res.status(404).send({ error: "Joke doesn't exist" });
  }

  try {
    const joke = await updateJoke(id, question, answer);

    res.status(200).json(joke);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default jokeRouter;
