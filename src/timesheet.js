const MAX_HOURS_PER_ENTRY = 24;
const PRECISION = 100; // hours are stored as integer hundredths to avoid float drift

class Timesheet {
  constructor() {
    // key: normalized project name -> { projectName, units }
    this.timesheets = new Map();
  }

  static normalizeName(projectName) {
    if (typeof projectName !== 'string') return null;
    const trimmed = projectName.trim();
    if (trimmed === '') return null;
    return { key: trimmed.toLowerCase(), display: trimmed };
  }

  static isValidHours(hours) {
    return (
      typeof hours === 'number' &&
      Number.isFinite(hours) &&
      hours > 0 &&
      hours <= MAX_HOURS_PER_ENTRY
    );
  }

  submitTimesheet(projectName, hours) {
    const name = Timesheet.normalizeName(projectName);
    if (!name || !Timesheet.isValidHours(hours)) {
      return false;
    }

    const units = Math.round(hours * PRECISION);
    const existing = this.timesheets.get(name.key);
    if (existing) {
      existing.units += units;
    } else {
      this.timesheets.set(name.key, { projectName: name.display, units });
    }
    return true;
  }

  getTimesheets() {
    return Array.from(this.timesheets.values(), ({ projectName, units }) => ({
      projectName,
      hours: units / PRECISION,
    }));
  }

  getTotalTimesheetHours(projectName) {
    const name = Timesheet.normalizeName(projectName);
    if (!name) return 0;
    const entry = this.timesheets.get(name.key);
    return entry ? entry.units / PRECISION : 0;
  }
}

module.exports = Timesheet;
