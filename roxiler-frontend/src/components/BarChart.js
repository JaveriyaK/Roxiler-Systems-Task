import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChartStats = ({ selectedMonth }) => {
  const [data, setData] = useState([]);

  // Wrap fetchBarChartData with useCallback
  const fetchBarChartData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bar-chart?month=${selectedMonth}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  }, [selectedMonth]); 
  

  useEffect(() => {
    fetchBarChartData();
  }, [fetchBarChartData]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartStats;

