// Takes array of action objects and returns an object with {key: value} pairs of {date: #-of-actions}
export const getActionsByDay = (actions) => {
  const actionsByDay = {};
  actions.forEach((action) => {
    const actionDate = new Date(action.createdAt.slice(0, 10));
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

// 'usersArray' has the form [ { ids: [1, 2], name: 'Augie March', type: 'light', value: 'Augie March'}, {...}, ... ]
// i.e. a user (identified by their name) can have multiple ids (due to different sign-in sesions)
// 'actions' is an array in the format retrieved from the API: [ { id: 1, user: 2, ... }, {...} ]
// therefore note: id is the id of the action, and user is the userId of the user performing the action
export const filterActionsByUser = (actions, usersArray) => {
  return actions.filter((action) => {
    return usersArray.some((user) => {
      return user.ids.includes(action.user);
    });
  });
};

// given an actionsByDay object, findYAxisMax finds max value to set on the yAxis in the graph in ActionsChart.js
export const findYAxisMax = (actionsByDay) => {
  const arrayOfActionsCount = Object.values(actionsByDay);
  if (!arrayOfActionsCount.length) {
    return null;
  }
  const maxActionsCount = arrayOfActionsCount.reduce((a, b) => Math.max(a, b));
  let yAxisMax;
  if (maxActionsCount <= 100) {
    yAxisMax = Math.ceil(maxActionsCount / 10) * 10;
  } else {
    yAxisMax = Math.ceil(maxActionsCount / 100) * 100;
  }
  return yAxisMax;
};

// Extract main space name
export const extractMainSpace = (arrayOfSpaceObjects) => {
  return arrayOfSpaceObjects.filter((space) => space.parentId === null)[0];
};

// Extract main space *immediate* children
export const extractMainSpaceChildren = (arrayOfSpaceObjects) => {
  const mainSpaceId = extractMainSpace(arrayOfSpaceObjects).id;
  return arrayOfSpaceObjects.filter((space) => space.parentId === mainSpaceId);
};

// consolidate users with the same name into a single entry
// instead of users = [{id: 1, name: 'Augie March'}, {id: 2, name: 'augie march'}], users = [{ids: [1,2], name: 'augie march'}]
export const consolidateUsers = (usersArray) => {
  // remove trailing spaces from user names and turn them lower case
  const usersArrayWithTrimmedNames = usersArray.map((user) => {
    return { ...user, name: user.name.trim().toLowerCase() };
  });

  // group ids of matching user names under one object
  const consolidatedUsersArray = [];
  usersArrayWithTrimmedNames.forEach((user) => {
    const userIndex = consolidatedUsersArray.findIndex(
      (arrayUser) => arrayUser.name === user.name,
    );
    // if user doesn't exist in consolidatedUsersArray, push that user into the array
    if (userIndex === -1) {
      consolidatedUsersArray.push({
        ids: [user._id],
        name: user.name,
        type: user.type,
      });
    }
    // if user *does* exist in consolidatedUsersArray, push current user's id to that user's ids array
    else {
      consolidatedUsersArray[userIndex].ids.push(user._id);
    }
  });
  return consolidatedUsersArray;
};

// for presentation purposes, format user names, then sort them alphabetically
// proper names are recapitalized ('Augie March'), and only the first letter of emails is capitalized
export const formatConsolidatedUsers = (consolidatedUsersArray) => {
  const usersArrayCapitalized = consolidatedUsersArray.map((user) => {
    // if user name includes @ symbol, only capitalize first letter
    if (user.name.indexOf('@') !== -1) {
      return {
        ...user,
        name: user.name[0].toUpperCase() + user.name.slice(1),
      };
    }
    // otherwise, reg exp below capitalizes first letter of each part of a user's space-delimited name
    return {
      ...user,
      name: user.name.replace(/\b(\w)/g, (char) => char.toUpperCase()),
    };
  });
  // return alphbatically sorted array of users
  return usersArrayCapitalized.sort((user1, user2) =>
    user1.name > user2.name ? 1 : -1,
  );
};

// for react-select purposes, add a 'value' key to each element of the users array, holding the same value as the key 'name'
export const addValueKeyToUsers = (consolidatedUsersArray) => {
  return consolidatedUsersArray.map((user) => {
    return { ...user, value: user.name };
  });
};
