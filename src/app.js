const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const id = uuid();

  const newRepo = {
    id,
    title,
    url,
    techs: [...techs],
    likes: 0,
  };

  repositories.push(newRepo);

  return response.status(201).json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex((r) => r.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const updatedRepo = { ...repositories[repoIndex] };

  if (title) {
    updatedRepo.title = title;
  }

  if (url) {
    updatedRepo.url = url;
  }

  if (techs) {
    updatedRepo.techs = [...techs];
  }

  repositories[repoIndex] = updatedRepo;

  return response.json(updatedRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const updatedRepo = { ...repositories[repoIndex] };

  updatedRepo.likes += 1;

  repositories[repoIndex] = updatedRepo;

  return response.json(updatedRepo);
});

module.exports = app;
