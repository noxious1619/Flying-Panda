import { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.png";

const API = "https://flying-panda-tnha.vercel.app";

export default function App() {

  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({
    country: "",
    city: "",
    visaType: "",
  });

  const fetchAlerts = async () => {
    const res = await fetch(`${API}/alerts`);
    const data = await res.json();
    setAlerts(data);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const createAlert = async () => {
    if (!form.country || !form.city || !form.visaType) return;

    await fetch(`${API}/alerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ country: "", city: "", visaType: "" });
    fetchAlerts();
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/alerts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchAlerts();
  };

  const deleteAlert = async (id) => {
    await fetch(`${API}/alerts/${id}`, {
      method: "DELETE",
    });

    fetchAlerts();
  };

  return (
    <div className="app">
      {/* Top Bar */}
      <nav className="navbar">
        <img src={logo} alt="Flying Panda Logo" className="logo"></img>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1>Visa Slot Alerts</h1>
        <p>Track, update and manage visa slot availability</p>
      </section>

      {/* Create Alert */}
      <section className="card">
        <h4>Create Alert</h4>
        <div className="form">
          <input
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
          <input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            placeholder="Visa Type"
            value={form.visaType}
            onChange={(e) => setForm({ ...form, visaType: e.target.value })}
          />
          <button onClick={createAlert}>Create Alert</button>
        </div>
      </section>

      {/* Alerts List */}
      <section className="list">
        {alerts.map((a) => (
          <div key={a.id} className="alert-card">
            <div>
              <strong>{a.country}</strong> · {a.city}
              <br />
              <span className="muted">{a.visaType}</span>
            </div>

            <div className="actions">
              <span className={`status ${a.status.toLowerCase()}`}>
                {a.status}
              </span>
              <button onClick={() => updateStatus(a.id, "Booked")}>Book</button>
              <button onClick={() => updateStatus(a.id, "Expired")}>
                Expire
              </button>
              <button className="danger" onClick={() => deleteAlert(a.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
