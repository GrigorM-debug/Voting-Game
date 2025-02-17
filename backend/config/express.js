import express from "express";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

export default function expressConfig(app) {
  app.use(express.json());
  app.use(express.static("static"));
  app.use(cors(corsOptions));
}
