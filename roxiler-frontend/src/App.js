import React, { useState } from "react";
import TransactionTable from "./components/TransactionTable";
import StatisticsBox from "./components/StatisticsBox";
import BarChartStats from "./components/BarChart";
import PieChartStats from "./components/PieChart";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="App">
      <h1>Transaction Dashboard</h1>
      <div>
        <label htmlFor="month">Select Month: </label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
            (month) => (
              <option key={month} value={month}>
                {month}
              </option>
            )
          )}
        </select>
      </div>
      <TransactionTable selectedMonth={selectedMonth} />
      <StatisticsBox selectedMonth={selectedMonth} />
      <BarChartStats selectedMonth={selectedMonth} />
      <PieChartStats selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;

