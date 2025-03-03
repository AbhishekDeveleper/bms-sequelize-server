//function to get today date
export const todayDateFN = () => {
    const today = new Date();
    // Get the year, month, and day
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = today.getDate().toString().padStart(2, '0');
    // Format the date in YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
