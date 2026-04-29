const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

connectDB();

// AI Reward Logic Simulator (used for initial seeding)
const calculateReward = (attendance, performance) => {
  if (attendance > 90 && performance > 85) {
    return { rewards: 100, badge: "Gold" };
  } else if (attendance > 75) {
    return { rewards: 50, badge: "Silver" };
  } else {
    return { rewards: 20, badge: "Bronze" };
  }
};

const baseUsers = [
  { name: "John Doe", gender: "Male", age: 28, designation: "Software Engineer", experience: "5 years", company: "T-System", attendance: 95, performance: 90 },
  { name: "Jane Smith", gender: "Female", age: 30, designation: "Software Engineer", experience: "7 years", company: "T-System", attendance: 80, performance: 88 },
  { name: "Alice Johnson", gender: "Female", age: 26, designation: "Software Engineer", experience: "3 years", company: "T-System", attendance: 70, performance: 65 },
  { name: "Bob Williams", gender: "Male", age: 35, designation: "Software Engineer", experience: "10 years", company: "T-System", attendance: 92, performance: 86 },
  { name: "Charlie Brown", gender: "Male", age: 29, designation: "Software Engineer", experience: "6 years", company: "T-System", attendance: 78, performance: 75 },
  { name: "Diana Prince", gender: "Female", age: 32, designation: "Software Engineer", experience: "8 years", company: "T-System", attendance: 98, performance: 95 },
  { name: "Evan Wright", gender: "Male", age: 27, designation: "Software Engineer", experience: "4 years", company: "T-System", attendance: 85, performance: 80 },
  { name: "Fiona Clark", gender: "Female", age: 31, designation: "Software Engineer", experience: "9 years", company: "T-System", attendance: 91, performance: 84 },
  { name: "George King", gender: "Male", age: 34, designation: "Software Engineer", experience: "11 years", company: "T-System", attendance: 76, performance: 70 },
  { name: "Hannah Scott", gender: "Female", age: 25, designation: "Software Engineer", experience: "2 years", company: "T-System", attendance: 65, performance: 60 }
];

const users = baseUsers.map(user => {
  const { rewards, badge } = calculateReward(user.attendance, user.performance);
  return { ...user, rewards, badge };
});

const seedData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log("Database Seeded with 10 Employees");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
