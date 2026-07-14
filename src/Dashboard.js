import "./App.css";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaTint,
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

function Dashboard() {
  const [waterData, setWaterData] = useState({});
  const [chartData, setChartData] = useState([]);

  const fetchWaterData = () => {
    fetch("http://127.0.0.1:5000/water-data")
      .then((res) => res.json())
      .then((data) => {
        setWaterData(data);

        setChartData((prev) => [
          ...prev.slice(-9),
          {
            time: new Date().toLocaleTimeString(),
            level: data.waterLevel,
          },
        ]);
      });
  };

  useEffect(() => {
    fetchWaterData();

    const interval = setInterval(fetchWaterData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>🌊 Real-Time Groundwater Resource Evaluation Using DWLR Data</h1>

      <button className="refresh-btn" onClick={fetchWaterData}>
        🔄 Refresh Data
      </button>

      <div className="card">
        <h2><FaTint /> Water Level : {waterData.waterLevel} m</h2>

        <h3 style={{ color: waterData.status === "Danger" ? "red" : "green" }}>
          <FaExclamationTriangle /> Status : {waterData.status}
        </h3>

        <p><FaMapMarkerAlt /> Location : {waterData.location}</p>

        <p><FaClock /> Last Updated : {waterData.lastUpdated}</p>
      </div>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="level"
              stroke="#007bff"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p style={{ textAlign: "center" }}>
  System auto-refreshes every 5 seconds.
</p>
    </div>
  );
}

export default Dashboard;