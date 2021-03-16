const dateToInputDate = (date) => {
    const year = `${date.getFullYear()}`;
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    
    const dateString = [year, month, day].join("-")
    
    return dateString;
}

const dateToInputTime = (date) => {
    const dateString =
        `${(date.getHours()).toString().padStart(2, "0")}:${(date.getMinutes()).toString().padStart(2, "0")}`;
    return dateString;
}

const inputsToDate = (date, time) => {
    //[ '2021', '03', '19' ]
    //[ 'year', 'month', 'day' ]
    const dateArray = date.split("-");
    const timeArray = time.split(":");
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    //Note: JavaScript counts months from 0 to 11.
    //January is 0. December is 11.
    console.log("date array:");
    console.log(dateArray);
    console.log("time array:");
    console.log(timeArray);
    
    const datetime = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], timeArray[0], timeArray[1]);
    console.log(datetime);
    return datetime;
}

module.exports = { dateToInputTime, dateToInputDate, inputsToDate }