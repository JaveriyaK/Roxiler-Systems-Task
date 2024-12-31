const Transaction = require("../models/Transaction");

async function getStatistics(month) {
  const soldItems = await Transaction.countDocuments({
    dateOfSale: { $regex: `${month}`, $options: "i" },
    sold: true,
  });

  const notSoldItems = await Transaction.countDocuments({
    dateOfSale: { $regex: `${month}`, $options: "i" },
    sold: false,
  });

  const totalSaleAmount = await Transaction.aggregate([
    { $match: { dateOfSale: { $regex: `${month}`, $options: "i" }, sold: true } },
    { $group: { _id: null, total: { $sum: "$price" } } }
  ]);

  return {
    totalSaleAmount: totalSaleAmount[0]?.total || 0,
    soldItems,
    notSoldItems,
  };
}

module.exports = { getStatistics };
