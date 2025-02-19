import Joke from "../src/models/Joke.js";
import { expect } from "chai";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import {
  getRandomJoke,
  jokeExistsById,
  jokeExistByQuestionAndAnswer,
  deleteJoke,
  getJokeById,
  updateJoke,
  voteForJoke,
} from "../src/services/joke.js";

let mongodbServer;

const joke1 = {
  _id: new mongoose.Types.ObjectId(),
  question: "Where is the best place to write JS?",
  answer: "Underwater. Because no one will see you crying",
  votes: [],
  availableVotes: ["😂", "👍", "❤️"],
};

const joke2 = {
  _id: new mongoose.Types.ObjectId(),
  question: "Testing",
  answer: "Testing",
  votes: [],
  availableVotes: ["😂", "👍", "❤️"],
};

describe("Joke service tests", () => {
  before(async () => {
    mongodbServer = await MongoMemoryServer.create();
    const serverUrl = mongodbServer.getUri();
    await mongoose.connect(serverUrl);

    await Joke.insertMany(joke1, joke2);
  });

  //Close the connection after each test
  after(async () => {
    await mongoose.connection.close();
    await mongodbServer.stop();
  });

  it("getRandomJoke() Should return random joke", async () => {
    const joke = await getRandomJoke();

    expect(joke).to.not.be.null;
    expect(joke).to.has.property("question").to.be.equal(joke1.question);
    expect(joke).to.has.property("answer").to.be.equal(joke1.answer);
  });

  it("jokeExistById() Should return true if joke exists", async () => {
    const isJokeExists = await jokeExistsById(joke1._id);

    expect(isJokeExists).to.be.true;
  });

  it("jokeExistsById() Should return false if joke doesn't exists", async () => {
    const id = new mongoose.Types.ObjectId();

    const isJokeExists = await jokeExistsById(id);

    expect(isJokeExists).to.be.false;
  });

  it("jokeExistsByQuestionAndAnswer() Should return true if joke exists", async () => {
    const isJokeExists = await jokeExistByQuestionAndAnswer(
      joke1.question,
      joke1.answer
    );

    expect(isJokeExists).to.be.true;
  });

  it("jokeExistsByQuestionAndAnswer() Should return false if joke doesn't exists", async () => {
    const isJokeExists = await jokeExistByQuestionAndAnswer("test", "test");

    expect(isJokeExists).to.be.false;
  });

  it("deleteJoke() Should delete the joke", async () => {
    await deleteJoke(joke2._id);

    const isJokeExists = await jokeExistsById(joke2._id);

    expect(isJokeExists).to.be.false;
  });

  it("getJokeById() Should return the joke", async () => {
    const joke = await getJokeById(joke1._id);

    expect(joke).to.not.be.null;
    expect(joke).to.has.property("question").to.be.equal(joke1.question);
    expect(joke).to.has.property("answer").to.be.equal(joke1.answer);
  });

  it("updateJoke() Should throw exceptin if question is not provided", async () => {
    try {
      const joke = await updateJoke(joke1._id, "", "test");
    } catch (err) {
      expect(err.message).to.not.be.null;
      expect(err.message).to.be.equal("Question is required");
    }
  });

  it("updateJoke() Should throw exception if answer is not provided", async () => {
    try {
      const joke = await updateJoke(joke1._id, "Test", "");
    } catch (err) {
      expect(err.message).to.not.be.null;
      expect(err.message).to.be.equal("Answer is required");
    }
  });

  it("updateJoke() Should return updated joke", async () => {
    const expectedQuestion = "Updated question";
    const expectedAnswer = "Updated answer";

    const joke = await updateJoke(joke1._id, expectedQuestion, expectedAnswer);

    expect(joke).to.not.be.null;
    expect(joke).to.has.property("question").to.be.equal(expectedQuestion);
    expect(joke).to.has.property("answer").to.be.equal(expectedAnswer);
  });

  it("voteForJoke() should throw exception if emoji is not provided", async () => {
    try {
      const joke = await voteForJoke(joke1._id, "");
    } catch (err) {
      expect(err.message).to.not.be.null;
      expect(err.message).to.be.equal("Emoji is required for voting");
    }
  });

  it("voteForJoke() Should throw exception if emoji is not evaiable", async () => {
    const emoji = "👌";

    try {
      const joke = await voteForJoke(joke1._id, emoji);
    } catch (err) {
      expect(err.message).to.not.be.null;
      expect(err.message).to.be.equal("Emoji is not available");
    }
  });

  it("voteForJoke() Should add new vote if vote doesn't exists", async () => {
    const emoji = joke1.availableVotes[0];

    const joke = await voteForJoke(joke1._id, emoji);

    expect(joke.votes).to.be.have.lengthOf(1);
    expect(joke.votes[0].label).to.be.equal(emoji);
    expect(joke.votes[0].value).to.be.equal(1);
  });

  it("voteForJoke() Should increase the value if vote exists", async () => {
    const emoji = joke1.availableVotes[0];

    const joke = await voteForJoke(joke1._id, emoji);
    expect(joke.votes[0].label).to.be.equal(emoji);
    expect(joke.votes[0].value).to.be.equal(2);
  });
});
