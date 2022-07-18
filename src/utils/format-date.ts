export const getFormatDate = (date: string): string => {
    let newDate: Date | string = new Date(date);
    const yearNow = new Date().getFullYear();
    newDate = newDate.toLocaleDateString("ru-Ru",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
            minute: "numeric",
            hour: "numeric",
        });
    return newDate;
}
