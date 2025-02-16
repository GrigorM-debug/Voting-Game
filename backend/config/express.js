import express from "express";
import cors from "cors";

export default function expressConfig(app) {
  app.use(express.json());
  апп.use(express.urlencoded({ extended: true }));
  app.use(express.static("static"));
  app.use(cors());
}
