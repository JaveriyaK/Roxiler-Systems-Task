import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const StatisticsBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  
  const fetchStatistics = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/statistics?month=${selectedMonth}`);
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }, [selectedMonth]); 

  
  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <div className="statistics-box">
      <h3>Statistics - {selectedMonth}</h3>
      <div className="statistics">
        <div>
          <strong>Total Sale:</strong> {statistics.totalSale}
        </div>
        <div>
          <strong>Total Sold Items:</strong> {statistics.totalSoldItems}
        </div>
        <div>
          <strong>Total Not Sold Items:</strong> {statistics.totalNotSoldItems}
        </div>
      </div>
    </div>
  );
};

export default StatisticsBox;

