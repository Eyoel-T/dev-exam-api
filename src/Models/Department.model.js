const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({

  departmentName: {
    type: String,
    unique: true,
  },
  departmentDescription: {
    type: String,
  },
  managingDepartment: {
    type: String,
    required: true,
  },
  parent: {
    type: Boolean,
    default: false,
  },
  children: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        autopopulate: true,
      },
    ],
  },
});

DepartmentSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Department", DepartmentSchema);
