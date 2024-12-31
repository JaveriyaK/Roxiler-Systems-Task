import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const TransactionTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions?month=${selectedMonth}&search=${searchQuery}&page=${page}&perPage=${perPage}`
      );
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [selectedMonth, searchQuery, page, perPage]); 

  
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); 
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="transaction-table">
      <div className="controls">
        <input
          type="text"
          placeholder="Search transaction"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div>
          Page No: {page}
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? "Yes" : "No"}</td>
                <td>
                  {transaction.image ? (
                    <img src={transaction.image} alt={transaction.title} width="50" />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

