exports.createRecord = async (req, res) => {
    try {
      const { amount, type, category, note } = req.body;
      
      if (!amount || !type || !category) {
        return res.status(400).json({
          message: "Amount, type, and category are required",
        });
      }
      
      if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({
          message: "Amount must be a positive number",
        });
      }
      
      if (!["income", "expense"].includes(type)) {
        return res.status(400).json({
          message: "Type must be 'income' or 'expense'",
        });
      }
      const record = await Record.create({
        amount,
        type,
        category,
        note,
        user: req.user.id,
      });
  
      res.status(201).json(record);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
  exports.updateRecord = (req, res) => {
    res.send("Update record working");
  };
  
  exports.deleteRecord = (req, res) => {
    res.send("Delete record working");
  };
  const Record = require("../models/Record");

// 📊 GET SUMMARY
const mongoose = require("mongoose");

exports.getSummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // 🔥 FIX

    const records = await Record.find({
      user: userId,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach((record) => {
      if (record.type === "income") totalIncome += record.amount;
      if (record.type === "expense") totalExpense += record.amount;
    });

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCategoryBreakdown = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // 🔥 FIX

    const data = await Record.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getRecords = async (req, res) => {
    try {
      const { page = 1, limit = 10, type, category } = req.query;
  
      const filter = {
        user: req.user.id,
      };
  
      // 🔍 Filtering
      if (type) filter.type = type;
      if (category) filter.category = category;
  
      const records = await Record.find(filter)
        .sort({ createdAt: -1 }) // newest first
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Record.countDocuments(filter);
  
      res.status(200).json({
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        data: records,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error fetching records",
        error: err.message,
      });
    }
    if (req.query.search) {
        filter.category = {
          $regex: req.query.search,
          $options: "i",
        };
      }
  };
  exports.getMonthlyTrends = async (req, res) => {
    try {
      const data = await Record.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(req.user.id),
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalIncome: {
              $sum: {
                $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
              },
            },
            totalExpense: {
              $sum: {
                $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
              },
            },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.getRecentActivity = async (req, res) => {
    try {
      const records = await Record.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .limit(5);
  
      res.json(records);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.getDashboard = async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.user.id);
  
      // 🔹 Fetch all records for calculations
      const records = await Record.find({ user: userId });
  
      // 🔹 Totals
      let totalIncome = 0;
      let totalExpense = 0;
  
      records.forEach((r) => {
        if (r.type === "income") totalIncome += r.amount;
        if (r.type === "expense") totalExpense += r.amount;
      });
  
      // 🔹 Category breakdown
      const categoryData = await Record.aggregate([
        { $match: { user: userId } },
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);
  
      // 🔹 Monthly trends
      const trends = await Record.aggregate([
        { $match: { user: userId } },
        {
          $group: {
            _id: { $month: "$createdAt" },
            income: {
              $sum: {
                $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
              },
            },
            expense: {
              $sum: {
                $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
              },
            },
          },
        },
        { $sort: { "_id": 1 } },
      ]);
  
      // 🔹 Recent activity
      const recent = await Record.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5);
  
      // 🔥 FINAL RESPONSE
      res.json({
        summary: {
          totalIncome,
          totalExpense,
          netBalance: totalIncome - totalExpense,
        },
        categoryBreakdown: categoryData,
        trends,
        recentActivity: recent,
      });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };