type Vote = {
  value: number;
  label: string;
};

export type Joke = {
  _id: string;
  question: string;
  answer: string;
  votes: Vote[];
  availableVotes: ("😂" | "👍" | "❤️")[];
};
