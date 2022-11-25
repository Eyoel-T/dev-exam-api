const Department = require("../Models/Department.model");

exports.updateDepartment = async (req, res) => {
  const { _id, departmentName, departmentDescription, managingDepartment } =
    req.body;

  try {
    const oldData = await Department.findById(_id);
    if (departmentName !== oldData.departmentName) {
      await Department.updateMany(
        { managingDepartment: oldData.departmentName },
        { managingDepartment: departmentName }
      );
      oldData.departmentName = departmentName;
    }
    if (
      managingDepartment !== oldData.managingDepartment &&
      managingDepartment !== oldData.departmentName
    ) {
      await Department.findOneAndUpdate(
        { departmentName: oldData.managingDepartment },
        { $pull: { children: oldData._id } }
      );
      await Department.findOneAndUpdate(
        { departmentName: managingDepartment },
        { $push: { children: oldData._id } }
      );
      oldData.managingDepartment = managingDepartment;
    }
    oldData.departmentDescription = departmentDescription;
    const updatedDepartment = await oldData.save();
    res.status(200).json({ success: true, updatedDepartment });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: true, message: error?.message });
  }
};
