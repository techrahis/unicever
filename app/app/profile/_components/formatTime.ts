
export const formatTime = (date: Date)=>{
    const timestamp = date.getTime();

    const time = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      time
    );

    return formattedDate;
}