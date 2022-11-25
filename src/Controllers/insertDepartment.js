const Department = require("../Models/Department.model");

exports.insertDepartment = async (req, res) => {
  const { departmentName, departmentDescription, managingDepartment, parent } =
    req.body;
  try {
    if (parent === true) {
      const findParent = await Department.findOne({ parent: true });
      if (findParent) {
        return res.status(403).json({
          success: false,
          message: "Only one department can be parent",
        });
      }
    }
    if (managingDepartment === "none" && parent === false) {
      return res.status(403).json({
        success: false,
        message: "the first department must have parent true property.",
      });
    }

    if (managingDepartment === "") {
      return res.status(403).json({
        success: false,
        message: "please provide managing department field",
      });
    }

    const newDepartment = new Department({
      departmentName,
      departmentDescription,
      managingDepartment,
      parent,
    });

    const savedDep = await newDepartment.save();
    await Department.findOneAndUpdate(
      { departmentName: savedDep.managingDepartment },
      { $push: { children: savedDep._id } }
    );
    res.status(201).json("successfully added new todo");
  } catch (error) {
    res.status(500).json("serverError");
  }
};
