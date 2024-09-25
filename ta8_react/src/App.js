import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null); // Índice de la tarea que se está editando

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  // Maneja agregar una nueva tarea o editar una existente
  const handleAddOrUpdateTask = () => {
    if (task.trim() === "") return;

    if (isEditing) {
      // Si estamos editando, actualiza la tarea en lugar de agregar una nueva
      const updatedTasks = tasks.map((t, index) =>
        index === currentTaskIndex ? task : t
      );
      setTasks(updatedTasks);
      setIsEditing(false); // Deja de editar después de actualizar
      setCurrentTaskIndex(null);
    } else {
      setTasks([...tasks, task]); // Agrega la nueva tarea a la lista
    }

    setTask(""); // Limpia el input después de agregar o editar
  };

  // Función para eliminar una tarea por índice
  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  // Función para editar una tarea
  const handleEditTask = (indexToEdit) => {
    setTask(tasks[indexToEdit]); // Carga la tarea en el input
    setIsEditing(true); // Cambia a modo de edición
    setCurrentTaskIndex(indexToEdit); // Guarda el índice de la tarea que se está editando
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Ingresa una tarea"
        style={{ padding: "5px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleAddOrUpdateTask} style={{ padding: "5px 10px" }}>
        {isEditing ? "Actualizar" : "Agregar"}
      </button>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {task}
            <button
              onClick={() => handleEditTask(index)}
              style={{ marginLeft: "10px", padding: "3px 6px" }}
            >
              Editar
            </button>
            <button
              onClick={() => handleDeleteTask(index)}
              style={{ marginLeft: "10px", padding: "3px 6px" }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
