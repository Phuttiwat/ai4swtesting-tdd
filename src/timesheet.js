class Timesheet {
  constructor() {
    this.timesheets = new Map();
  }

  submitTimesheet(projectName, hours) {
    this.timesheets.set(projectName, hours);
    return true;
  }

  getTimesheets() {
    return Array.from(this.timesheets, ([projectName, hours]) => ({ projectName, hours }));
  }
}

module.exports = Timesheet;
