const Transaction = require("../models/Transaction");

async function getBarChartData(month) {
  const ranges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "401-500", min: 401, max: 500 },
    { range: "501-600", min: 501, max: 600 },
    { range: "601-700", min: 601, max: 700 },
    { range: "701-800", min: 701, max: 800 },
    { range: "801-900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  const results = await Promise.all(
    ranges.map(async ({ range, min, max }) => {
      const count = await Transaction.countDocuments({
        dateOfSale: { $regex: `${month}`, $options: "i" },
        price: { $gte: min, $lt: max === Infinity ? undefined : max },
      });
      return { range, count };
    })
  );

  return results;
}

async function getPieChartData(month) {
  const data = await Transaction.aggregate([
    { $match: { dateOfSale: { $regex: `${month}`, $options: "i" } } },
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);

  return data.map((item) => ({ category: item._id, count: item.count }));
}

module.exports = { getBarChartData, getPieChartData };
