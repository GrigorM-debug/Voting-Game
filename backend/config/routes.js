import jokeRouter from "../src/controllers/joke.js";

export default function routes(app) {
  app.use(jokeRouter);
}
