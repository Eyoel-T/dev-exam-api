const Department = require("../Models/Department.model");
exports.getStructure = async (req, res) => {
  try {
    const structure = await Department.findOne({ parent: true });
    if (structure) {
      res.status(200).json({
        success: true,
        message: "This are the lists found on the db",
        structure,
      });
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "no department found" });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({
      departmentName: req.params.name,
    });
    console.log(department);
    if (department) {
      return res.status(200).json({
        success: true,
        department,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

exports.getDepartmentList = async (req, res) => {
  try {
    const departments = await Department.find({});
    let departmentsNameList = [];
    departments.forEach(({ departmentName }) => {
      departmentsNameList.push({ value: departmentName });
    });

    res.status(200).json({
      success: true,
      message: "This are the lists found on the db",
      departmentsNameList,
    });
  } catch (error) {
    if (error) {
      console.log(error.message);
    }
    res.status(400).json({ success: false, message: "no list founded" });
  }
};
