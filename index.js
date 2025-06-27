// Create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
}

// Create multiple employee records
function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

// Add a TimeIn event to the employee's record (contextual 'this')
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
}

// Add a TimeOut event to the employee's record (contextual 'this')
function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
}

// Calculate hours worked on a specific date (contextual 'this')
function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(e => e.date === date);
    const timeOut = this.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date (contextual 'this')
function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Calculate all wages for this employee (contextual 'this')
function allWagesFor() {
    const dates = this.timeInEvents.map(e => e.date);
    return dates.reduce((total, date) => {
        return total + wagesEarnedOnDate.call(this, date);
    }, 0);
}

// Find employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

// Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor.call(employee);
    }, 0);
}

// Export for testing environments
if (typeof module !== 'undefined') {
    module.exports = {
        createEmployeeRecord,
        createEmployeeRecords,
        createTimeInEvent,
        createTimeOutEvent,
        hoursWorkedOnDate,
        wagesEarnedOnDate,
        allWagesFor,
        findEmployeeByFirstName,
        calculatePayroll
    };
}


