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

const dateToEsObj = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const esDateComplete = date.toLocaleDateString("es-MX", options);
    const esDateDay = date.toLocaleDateString("es-MX", { day: 'numeric' });
    const esDateMonth = date.toLocaleDateString("es-MX", { month: 'short' });
    const esDateYear = date.toLocaleDateString("es-MX", { year: 'numeric' });
    const hour = date.toLocaleTimeString("es-MX", { hour: '2-digit', minute: '2-digit' });

    return {
        complete: esDateComplete,
        day: esDateDay,
        month: esDateMonth,
        year: esDateYear,
        hour: hour
    }
}

const sortEventDates = (dates) => {
    // Implementation: Buble Sort
    let intercambios = 0;
    let comparaciones = 0;
    for (let i = 0; i < dates.length - 1; i++) {
        for (let j = 0; j < dates.length - i - 1; j++) {
            comparaciones++
            if (dates[j].datetime > dates[j + 1].datetime) {
                intercambios++
                //Swap of values
                const temp = dates[j + 1];
                dates[j + 1] = dates[j];
                dates[j] = temp;
            }
        }
    }
    // console.log("Comparaciones: ", comparaciones);
    // console.log("Intercambios", intercambios);
}

module.exports = { dateToInputTime, dateToInputDate, inputsToDate, sortEventDates, dateToEsObj }