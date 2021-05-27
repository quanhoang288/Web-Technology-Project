export const int_to_time = (schedule_item) => {
  const weekday = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const shift_option = [
      {
        id: 0,
        duration: "6h-9h",
      },
      {
        id: 1,
        duration: "9h-12h",
      },
      {
        id: 2,
        duration: "12h-15h",
      },
      {
        id: 3,
        duration: "15h-18h",
      },
    ];
  
  var res = {name: schedule_item.name};
  res['weekday'] = weekday[schedule_item.weekday_id - 2];
  res['time'] = shift_option[schedule_item.time_id].duration;
  return res;
}
