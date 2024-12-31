import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", 
  "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
];

const PieChartStats = ({ selectedMonth }) => {
  const [data, setData] = useState([]);

  
  const fetchPieChartData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/pie-chart?month=${selectedMonth}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  }, [selectedMonth]); 

  
  useEffect(() => {
    fetchPieChartData();
  }, [fetchPieChartData]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartStats;


