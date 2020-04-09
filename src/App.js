import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const owner = "Mayconn";

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("repositories");
      setProjects(data);
    };
    load();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("repositories", {
      title: inputValue,
      owner,
    });

    setProjects([...projects, data]);
    setInputValue("");
  }

  async function handleRemoveRepository(id) {
    const foundProject = projects.find((item) => item.id === id);
    if (foundProject) {
      await api.delete(`repositories/${id}`);
      setProjects(projects.filter((item) => item.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(({ title, id }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <input
        className="input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
