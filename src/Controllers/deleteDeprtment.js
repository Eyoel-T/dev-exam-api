const Department = require("../Models/Department.model");

exports.deleteAllDepartment = async (req, res) => {
  try {
    await Department.deleteMany({});
    res
      .status(201)
      .json({ success: true, message: "successfully deleted all departments" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error?.message || "Server Error" });
  }
};
