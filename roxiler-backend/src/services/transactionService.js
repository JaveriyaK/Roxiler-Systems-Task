const Transaction = require("../models/Transaction");

async function getTransactions(month, search = "", page, perPage) {
  const regex = new RegExp(search, "i");
  const query = {
    dateOfSale: { $regex: `${month}`, $options: "i" },
    $or: [
      { title: regex },
      { description: regex },
      { price: regex }
    ]
  };

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));

  return transactions;
}

module.exports = { getTransactions };
