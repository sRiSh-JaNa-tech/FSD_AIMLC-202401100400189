const express = require("express");
const Employee = require("../models/employee");

const router = express.Router();

// GET – All Employees
router.get("/get", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST – Add Employee
router.post("/post", async (req, res) => {
  try {
    console.log(req.body); // DEBUG LINE

    const employee = new Employee(req.body);
    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT – Update Employee
router.put("/put/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // const updatedEmployee = await Employee.findOneAndUpdate({
    //     empId: req.params.empId
    //   },
    //   req.body,
    //   { new: true }
    // );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE – Remove Employee
router.delete("/delete/:id", async (req, res) => {
  try {
   await Employee.findByIdAndDelete(req.params.id);
    //await Employee.findOneAndDelete(req.params.empId);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;