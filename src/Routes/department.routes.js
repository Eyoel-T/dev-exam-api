const express = require("express");
const { deleteAllDepartment } = require("../Controllers/deleteDeprtment");
const { insertDepartment } = require("../Controllers/insertDepartment");
const {
  getStructure,
  getDepartment,
  getDepartmentList,
} = require("../Controllers/readDepartment");
const { updateDepartment } = require("../Controllers/updateDepartment");

const router = express.Router();

router.get("/get-structure", getStructure);
router.get("/get-department/:name", getDepartment);
router.get("/get-department-list/", getDepartmentList);
router.post("/insert-department", insertDepartment);
router.put("/update-department", updateDepartment);
router.delete("/delete-all-department", deleteAllDepartment);

module.exports = router;
