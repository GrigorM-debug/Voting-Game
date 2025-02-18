import { Joke } from "../types/Joke";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export async function fetchJoke(): Promise<Joke> {
  const response = await fetch(`${BASE_URL}`);

  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }

  const data = await response.json();

  return data;
}

export async function voteForJoke(
  jokeId: string,
  emoji: "😂" | "👍" | "❤️"
): Promise<Joke> {
  const response = await fetch(`${BASE_URL}/${jokeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emoji }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      navigate("/404");
    }

    const errorData = await response.json();

    throw new Error(errorData.error || "Something went wrong");
  }

  const data = await response.json();

  return data;
}
