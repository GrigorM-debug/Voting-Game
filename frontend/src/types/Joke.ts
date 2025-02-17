type Vote = {
  value: number;
  lable: string;
};

export type Joke = {
  _id: string;
  question: string;
  answer: string;
  votes: Vote[];
  availableVotes: ("😂" | "👍" | "❤️")[];
};
