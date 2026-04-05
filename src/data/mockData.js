export const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Housing",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Salary",
  "Freelance",
  "Investment",
];

export const CATEGORY_ICONS = {
  "Food & Dining": "🍜",
  Transport: "🚌",
  Shopping: "🛍️",
  Housing: "🏠",
  Entertainment: "🎬",
  Healthcare: "💊",
  Utilities: "⚡",
  Salary: "💼",
  Freelance: "💻",
  Investment: "📈",
};

export const generateTransactions = () => {
  const now = new Date();
  const txns = [];

  const templates = [
    {
      description: "Monthly Salary",
      category: "Salary",
      type: "income",
      amount: 85000,
    },
    {
      description: "Freelance Project — UI Design",
      category: "Freelance",
      type: "income",
      amount: 22000,
    },
    {
      description: "Swiggy Order",
      category: "Food & Dining",
      type: "expense",
      amount: 480,
    },
    {
      description: "Zomato Order",
      category: "Food & Dining",
      type: "expense",
      amount: 620,
    },
    {
      description: "Ola Cab",
      category: "Transport",
      type: "expense",
      amount: 340,
    },
    {
      description: "Metro Card Recharge",
      category: "Transport",
      type: "expense",
      amount: 500,
    },
    {
      description: "Amazon Purchase",
      category: "Shopping",
      type: "expense",
      amount: 3200,
    },
    {
      description: "Myntra Order",
      category: "Shopping",
      type: "expense",
      amount: 1800,
    },
    {
      description: "Rent Payment",
      category: "Housing",
      type: "expense",
      amount: 18000,
    },
    {
      description: "Netflix Subscription",
      category: "Entertainment",
      type: "expense",
      amount: 649,
    },
    {
      description: "Movie Tickets",
      category: "Entertainment",
      type: "expense",
      amount: 800,
    },
    {
      description: "Pharmacy",
      category: "Healthcare",
      type: "expense",
      amount: 950,
    },
    {
      description: "Electricity Bill",
      category: "Utilities",
      type: "expense",
      amount: 2100,
    },
    {
      description: "Mutual Fund SIP",
      category: "Investment",
      type: "income",
      amount: 5000,
    },
    {
      description: "Dividend Received",
      category: "Investment",
      type: "income",
      amount: 3200,
    },
    {
      description: "Restaurant Dinner",
      category: "Food & Dining",
      type: "expense",
      amount: 1400,
    },
    {
      description: "Petrol Fill",
      category: "Transport",
      type: "expense",
      amount: 2200,
    },
    {
      description: "Grocery Store",
      category: "Food & Dining",
      type: "expense",
      amount: 2800,
    },
    {
      description: "Water Bill",
      category: "Utilities",
      type: "expense",
      amount: 400,
    },
    {
      description: "Gym Membership",
      category: "Healthcare",
      type: "expense",
      amount: 1500,
    },
  ];

  let id = 1;
  for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
    const monthDate = new Date(
      now.getFullYear(),
      now.getMonth() - monthOffset,
      1,
    );
    // Random frequency multiplier for each month (0.6 to 1.8) to create varying bar heights
    const frequencyMultiplier = 0.6 + Math.random() * 1.2;

    templates.forEach((t, i) => {
      // Randomly add 1-3 transactions per template per month based on frequency
      const count =
        Math.random() < frequencyMultiplier ? (Math.random() < 0.5 ? 1 : 2) : 1;

      for (let j = 0; j < count; j++) {
        const day = (((i * 1.4 + 1 + j * 3) * frequencyMultiplier) % 28) + 1;
        const date = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          Math.round(day),
        );
        txns.push({
          id: id++,
          description: t.description,
          category: t.category,
          type: t.type,
          amount: t.amount + Math.round((Math.random() - 0.5) * t.amount * 0.2),
          date: date.toISOString().split("T")[0],
        });
      }
    });
  }

  return txns.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const INITIAL_TRANSACTIONS = generateTransactions();
