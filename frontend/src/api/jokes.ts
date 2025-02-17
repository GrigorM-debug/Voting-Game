import { Joke } from "../types/Joke";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export async function fetchJoke(): Promise<Joke> {
  const response = await fetch(`${BASE_URL}`);

  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }

  const data = await response.json();

  return data;
}
