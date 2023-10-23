export const formatDateArray = (dateArray) => {
    const formattedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
        .toLocaleDateString("en-GB")
        .slice(0, 10)
        .replaceAll("/", "-");
    return formattedDate;
};
