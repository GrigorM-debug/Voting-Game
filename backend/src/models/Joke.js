import { SchemaTypes, model, Schema } from "mongoose";

const jokeSchema = new Schema({
  _id: SchemaTypes.ObjectId,
  question: String,
  answer: String,
  votes: [{ value: Number, label: String }],
  availableVotes: [String],
});

const Joke = model("Joke", jokeSchema);

export default Joke;
