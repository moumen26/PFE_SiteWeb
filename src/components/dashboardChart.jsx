import { HiEllipsisVertical } from "react-icons/hi2";

import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MyChart() {
  const data = [
    {
      name: "Week 1",
      Boy: 40,
      Girl: 24,
    },
    {
      name: "Week 2",
      Boy: 30,
      Girl: 13,
    },
    {
      name: "Week 3",
      Boy: 20,
      Girl: 48,
    },
    {
      name: "Week 4",
      Boy: 22,
      Girl: 5,
    },
  ];

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Nouveau-ne</h2>
        <div className="select-chart">
          <select
            class="nouveau-ne-chart"
            name="nouveau-ne-chart"
            id="nouveau-ne-chart"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
          <HiEllipsisVertical
            className="chart-select-icon"
            size="24px"
            fill="#3889c1"
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} width={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Boy" fill="#4f81ff" width="16px" />
          <Bar dataKey="Girl" fill="#ff4d9d" width="16px" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
