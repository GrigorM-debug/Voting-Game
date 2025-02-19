import { Joke } from "../types/Joke";
import { EditJokeForm } from "../types/EditJokeForm";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

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
    const errorData = await response.json();

    throw new Error(errorData.error || "Something went wrong");
  }

  const data = await response.json();
  console.log(data);

  return data;
}

export async function deleteJoke(jokeId: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${jokeId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error || "Something went wrong");
  }
}

export async function getJokeById(jokeId: string): Promise<Joke> {
  const response = await fetch(`${BASE_URL}/${jokeId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  const data = await response.json();

  return data;
}

export async function updateJoke(
  id: string,
  updatedJokeData: EditJokeForm
): Promise<Joke> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedJokeData),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Something went wrong");
  }

  const data = await response.json();
  console.log(data);

  return data;
}
