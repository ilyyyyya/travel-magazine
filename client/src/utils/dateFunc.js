export const isUnavailable = (path, datesToCompare) => {

    return path.unavailableDates.some((date) =>
        datesToCompare.includes(new Date(date).getTime())
    );
    // return datesToCompare.some(date => path.unavailableDates.hasOwnProperty(date));

};


export const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateInMilliseconds = new Date(start.getTime());

    const dates = [];

    while (dateInMilliseconds <= end) {
        dates.push(new Date(dateInMilliseconds).getTime());
        dateInMilliseconds.setDate(dateInMilliseconds.getDate() + 1);
    }

    return dates;
};