import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repoName = `Repo ${Date.now()}`;

    const response = await api.post("repositories", {
      title: repoName,
    });
    const newRepo = response.data;

    setRepositories([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`/repositories/${id}`);

    if (result.status !== 204) {
      alert("Ocorreu um erro na exclusão");
      return;
    }

    const repoIndex = repositories.findIndex((repo) => repo.id === id);
    const newRepo = [...repositories];

    newRepo.splice(repoIndex, 1);
    setRepositories([...newRepo]);
  }

  useEffect(() => {
    api.get("/repositories").then(({ data }) => {
      const repos = data.map((repo) => ({
        id: repo.id,
        title: repo.title,
      }));

      setRepositories([...repos]);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
