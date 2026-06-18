import { useState, useEffect } from "react";
import axios from "../api/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("High");

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "/tasks",
        config
      );

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      await axios.post(
        "/tasks",
        {
          title,
          priority,
        },
        config
      );

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `/tasks/${id}`,
        config
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar">
        <h2>Student Task Manager</h2>
        <button onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard">
        <h1>My Tasks</h1>

        <div className="stats">
          <div className="stat-box">
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={addTask}>
            Add Task
          </button>
        </div>

        {tasks.map((task) => (
          <div
            className="task-card"
            key={task._id}
          >
            <h3>{task.title}</h3>

            <p>
             Priority:
             <span
              style={{
               color:
                task.priority === "High"
                  ? "red"
                  : task.priority === "Medium"
                  ? "orange"
                  : "green",
               fontWeight:"bold"
              }}
             >
              {" "}{task.priority}
             </span>
            </p>

            <button
              onClick={() =>
                deleteTask(task._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;