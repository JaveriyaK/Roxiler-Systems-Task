const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  const { search = "", page = 1, perPage = 10, month } = req.query;
  const regex = new RegExp(search, "i");

  const startDate = new Date(`${month} 1, 2023`);
  const endDate = new Date(`${month} 31, 2023`);

  try {
    const query = {
      dateOfSale: { $gte: startDate, $lte: endDate },
      $or: [
        { title: regex },
        { description: regex },
        { price: regex },
      ],
    };

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions.", error });
  }
};

exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  const startDate = new Date(`${month} 1, 2023`);
  const endDate = new Date(`${month} 31, 2023`);

  try {
    const totalSale = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lte: endDate }, sold: true } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const soldCount = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: true,
    });

    const unsoldCount = await Transaction.countDocuments({
      dateOfSale: { $gte: startDate, $lte: endDate },
      sold: false,
    });

    res.status(200).json({
      totalSale: totalSale[0]?.total || 0,
      soldCount,
      unsoldCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics.", error });
  }
};
