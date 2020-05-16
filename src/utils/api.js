// Takes array of action objects and returns an object with {key: value} pairs of {date: #-of-actions}
export const getActionsByDay = (spaceData) => {
  const actionsByDay = {};
  spaceData.forEach((action) => {
    const actionDate = new Date(action.postedAt.slice(0, 10));
    if (!actionsByDay[actionDate]) {
      actionsByDay[actionDate] = 1;
    } else {
      actionsByDay[actionDate] += 1;
    }
  });
  return actionsByDay;
};

// Takes object with {key: value} pairs of {date: #-of-actions} and returns a date-sorted array in Recharts.js format
export const formatActions = (actionsByDayObject) => {
  const actionsByDayArray = Object.entries(actionsByDayObject);
  const sortedActionsByDay = actionsByDayArray.sort(
    (entryA, entryB) => Date.parse(entryA[0]) - Date.parse(entryB[0]),
  );
  return sortedActionsByDay.map((entry) => {
    const entryDate = new Date(entry[0]);
    return {
      date: `${entryDate.getDate()}-${
        entryDate.getMonth() + 1
      }-${entryDate.getFullYear()}`,
      count: entry[1],
    };
  });
};
