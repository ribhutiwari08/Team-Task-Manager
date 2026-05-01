import { useEffect, useState } from "react";
import API from "../services/api";
import "./dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role");
  const userEmail = localStorage.getItem("email");

  
  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: ""
  });

  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/task");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const createTask = async () => {
    if (!form.title || !form.description || !form.assignedTo) {
      alert("Please fill all required fields");
      return;
    }

    await API.post("/task", {
      ...form,
      status: "pending"
    });

    setForm({
      title: "",
      description: "",
      dueDate: "",
      assignedTo: ""
    });

    fetchTasks();
  };

  
  const updateStatus = async (id, status) => {
    await API.put(`/task/${id}`, { status });
    fetchTasks();
  };

  
  const visibleTasks =
    role === "admin"
      ? tasks
      : tasks.filter((t) => t.assignedTo === userEmail);

  
  const filteredTasks =
    filter === "all"
      ? visibleTasks
      : visibleTasks.filter((t) => t.status === filter);

  
  const total = visibleTasks.length;
  const done = visibleTasks.filter(t => t.status === "done").length;
  const pending = visibleTasks.filter(t => t.status === "pending").length;

  return (
    <div className="dashboard">

      {/* 🔥 HEADER */}
      <div className="topbar">
        <div>
          <h1>Team Manager</h1>
          <p>Welcome, {userEmail}</p>
        </div>

        <div className="right-section">
          <span className="role">Role: {role}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="stats">
        <div>Total: {total}</div>
        <div>Done: {done}</div>
        <div>Pending: {pending}</div>
      </div>

      {/* 🔍 FILTER */}
      <div className="filter">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>

      {/* 🛠 ADMIN FORM */}
      {role === "admin" && (
        <div className="task-form">
          <h3>Create Task</h3>

          <div className="form-row">
            <input
              placeholder="Task Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
            />

            <input
              placeholder="Assign To (email)"
              value={form.assignedTo}
              onChange={(e) =>
                setForm({ ...form, assignedTo: e.target.value })
              }
            />
          </div>

          <button className="create-btn" onClick={createTask}>
            + Create Task
          </button>
        </div>
      )}

      {/* 📦 TASK LIST */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks available 🚀</p>
      ) : (
        <div className="task-grid">
          {filteredTasks.map((task) => {
            const overdue =
              new Date(task.dueDate) < new Date() &&
              task.status !== "done";

            return (
              <div
                key={task._id}
                className={`card ${
                  overdue
                    ? "overdue"
                    : task.status === "done"
                    ? "done"
                    : "pending"
                }`}
              >
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <p><b>Assigned:</b> {task.assignedTo}</p>
                <p><b>Status:</b> {task.status}</p>

                <select
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                >
                  <option>Update Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}