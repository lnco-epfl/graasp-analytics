// Functions in this file manipulate data retrieved from the api to make it usable by the app's charts/components
import capitalize from 'lodash.capitalize';
import sortBy from 'lodash.sortby';
import truncate from 'lodash.truncate';

import {
  ACCESSED_STRING,
  AFTERNOON,
  EARLY_MORNING,
  EVENING,
  ITEM_NAME_MAX_LENGTH,
  LATE_NIGHT,
  LEARNING_ANALYTICS_USER_ID,
  MIN_PERCENTAGE_TO_SHOW_VERB,
  MORNING,
  NIGHT,
  OTHER_VERB,
  TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
} from '../config/constants';

const getActionDay = (action) => {
  const dateKey = 'createdAt';
  // createdAt should have the format "2020-12-31T23:59:59.999Z"
  const dateObject = action[dateKey];
  // extract only the date information
  const day = new Date(dateObject.toDateString());
  return day;
};

// Takes array of action objects and returns an object with {key: value} pairs of {date: #-of-actions}
export const getActionsByDay = (actions) => {
  const actionsByDayMap = actions?.countBy(getActionDay);
  const actionsByDayObject = Object.fromEntries(actionsByDayMap);
  return actionsByDayObject;
};

// Takes object with {key: value} pairs of {date: #-of-actions} and returns a date-sorted array in Recharts.js format
export const formatActionsByDay = (actionsByDayObject) => {
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

export const mapActionsToGeoJsonFeatureObjects = (actions) =>
  actions
    .filter((action) => action.geolocation)
    .map((action) => ({
      type: 'Feature',
      properties: { cluster: false, actionId: action.id },
      geometry: {
        type: 'Point',
        coordinates: [action.geolocation.ll[1], action.geolocation.ll[0]],
      },
    }));

// helper function used in getActionsByTimeOfDay below
const getActionHourOfDay = (action) => {
  const dateKey = 'createdAt';
  // createdAt should have the format "2020-12-31T23:59:59.999Z"
  const date = action[dateKey];
  const hours = date.getHours();
  return hours;
};

// Takes array of action objects and returns an object with {key: value} pairs of {hourOfDay: #-of-actions}
export const getActionsByTimeOfDay = (actions) => {
  const actionsByTimeOfDay = {
    [LATE_NIGHT]: 0,
    [EARLY_MORNING]: 0,
    [MORNING]: 0,
    [AFTERNOON]: 0,
    [EVENING]: 0,
    [NIGHT]: 0,
  };
  actions?.forEach((action) => {
    const actionHourOfDay = getActionHourOfDay(action);
    if (actionHourOfDay >= 0 && actionHourOfDay < 4) {
      actionsByTimeOfDay[LATE_NIGHT] += 1;
    } else if (actionHourOfDay >= 4 && actionHourOfDay < 8) {
      actionsByTimeOfDay[EARLY_MORNING] += 1;
    } else if (actionHourOfDay >= 8 && actionHourOfDay < 12) {
      actionsByTimeOfDay[MORNING] += 1;
    } else if (actionHourOfDay >= 12 && actionHourOfDay < 16) {
      actionsByTimeOfDay[AFTERNOON] += 1;
    } else if (actionHourOfDay >= 16 && actionHourOfDay < 20) {
      actionsByTimeOfDay[EVENING] += 1;
    } else if (actionHourOfDay >= 20 && actionHourOfDay < 24) {
      actionsByTimeOfDay[NIGHT] += 1;
    } else {
      // eslint-disable-next-line no-console
      console.error(`actionHourOfDay ${actionHourOfDay} is undefined`);
    }
  });
  return actionsByTimeOfDay;
};

// Takes object with {key: value} pairs of {timeOfDay: #-of-actions}
// returns a date-sorted array in Recharts.js format
export const formatActionsByTimeOfDay = (actionsByTimeOfDayObject) => {
  const actionsByTimeOfDayArray = Object.entries(actionsByTimeOfDayObject);
  return actionsByTimeOfDayArray.map((entry) => ({
    timeOfDay: entry[0],
    count: entry[1],
  }));
};

// helper function used in getActionsByWeekday below
const getActionWeekday = (action) => {
  const dateKey = 'createdAt';
  // createdAt should have the format "2020-12-31T23:59:59.999Z"
  const date = action[dateKey];
  const weekday = date.getDay();
  return weekday;
};

// Takes array of action objects and returns an object with {key: value} pairs of {weekday: #-of-actions}
export const getActionsByWeekday = (actions) => {
  const actionsByWeekday = { ...Array(7).fill(0) };
  const updatedActionsByWeekday = actions?.countBy(getActionWeekday).toJS();
  Object.assign(actionsByWeekday, updatedActionsByWeekday);
  return actionsByWeekday;
};

// Takes object with {key: value} pairs of {weekday: #-of-actions}
// returns an array in Recharts.js format
export const formatActionsByWeekday = (actionsByWeekdayObject) => {
  const weekdayEnum = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const actionsByWeekdayArray = Object.entries(actionsByWeekdayObject);
  return actionsByWeekdayArray.map(([day, count]) => ({
    day: weekdayEnum[day],
    count,
  }));
};

// Takes array of action objects and returns an object with {key: value} pairs of {verb: %-of-actions}
export const getActionsByVerb = (actions) => {
  const totalActions = actions.size;
  const actionsByVerb = {};
  actions.forEach((action) => {
    if (!actionsByVerb[action.type]) {
      // if type is still not in the actionsByVerb object, add it and assign it to (1 / totalActions)
      // we use (1 / totalActions) because in the end we want this object to be {verb: PERCENTAGE-of-total-actions}
      actionsByVerb[action.type] = 1 / totalActions;
    } else {
      actionsByVerb[action.type] += 1 / totalActions;
    }
  });
  return actionsByVerb;
};

export const formatActionsByVerb = (actionsByVerbObject) => {
  const actionsByVerbArray = Object.entries(actionsByVerbObject);
  // capitalize verbs (entry[0][0]), convert 0.0x notation to x% and round to two decimal places (entry[0][1])
  const formattedActionsByVerbArray = actionsByVerbArray
    .map((entry) => [
      capitalize(entry[0]),
      parseFloat((entry[1] * 100).toFixed(2)),
    ])
    .filter((entry) => entry[1] >= MIN_PERCENTAGE_TO_SHOW_VERB);

  // add ['other', x%] to cover all verbs that are filtered out of the array
  if (formattedActionsByVerbArray.length) {
    formattedActionsByVerbArray.push([
      OTHER_VERB,
      // ensure that it is a number with two decimal places
      parseFloat(
        (
          100 -
          formattedActionsByVerbArray.reduce(
            (acc, current) => acc + current[1],
            0,
          )
        ).toFixed(2),
      ),
    ]);
  }

  // convert to recharts required format
  return formattedActionsByVerbArray.map((entry) => ({
    type: entry[0],
    percentage: entry[1],
  }));
};

// 'actions' is an array in the format retrieved from the API: [ { id: 1, memberId: 2, ... }, {...} ]
export const filterActionsByUser = (actions, usersArray) =>
  actions.filter((action) =>
    usersArray.some((user) => user.id === action?.member?.id),
  );

export const filterActionsByActionTypes = (actions, actionsArray) => {
  // no selection return whole array
  if (!actionsArray || actionsArray.isEmpty()) {
    return actions;
  }
  return actions.filter((action) =>
    actionsArray.some((act) => act.value === action.type),
  );
};

// given an actionsByDay object, findYAxisMax finds max value to set on the yAxis in the graph in ActionsByDayChart.js
export const findYAxisMax = (actionsByDay) => {
  const arrayOfActionsCount = Object.values(actionsByDay);
  if (!arrayOfActionsCount.length) {
    return null;
  }
  const maxActionsCount = arrayOfActionsCount.reduce((a, b) => Math.max(a, b));
  let yAxisMax;
  // if maxActionsCount <= 100, round up yAxisMax to the nearest ten; else, to the nearest hundred
  if (maxActionsCount <= 100) {
    yAxisMax = Math.ceil(maxActionsCount / 10) * 10;
  } else {
    yAxisMax = Math.ceil(maxActionsCount / 100) * 100;
  }
  return yAxisMax;
};

// Extract main space name
export const extractMainSpace = (arrayOfSpaceObjects) =>
  arrayOfSpaceObjects.filter((item) => item.parentId === null)[0];

// Extract main space *immediate* children
export const extractMainSpaceChildren = (arrayOfSpaceObjects) => {
  const mainSpaceId = extractMainSpace(arrayOfSpaceObjects).id;
  return arrayOfSpaceObjects.filter((item) => item.parentId === mainSpaceId);
};

// remove user 'Learning Analytics' from users list retrieved by API
// this is an auto-generated 'user' that we don't want to display in the application
export const removeLearningAnalyticsUser = (usersArray) =>
  usersArray.filter((user) => user.id !== LEARNING_ANALYTICS_USER_ID);

// consolidate users with the same name into a single entry
// instead of users = [{id: 1, name: 'Augie March'}, {id: 2, name: 'augie march'}], users = [{ids: [1,2], name: 'augie march'}]
export const consolidateUsers = (usersArray) => {
  // remove trailing spaces from user names and turn them lower case
  const usersArrayWithTrimmedNames = usersArray.map((user) => ({
    ...user,
    name: user.name.trim().toLowerCase(),
  }));

  // group ids of matching user names under one object
  const consolidatedUsersArray = [];
  usersArrayWithTrimmedNames.forEach((user) => {
    const userIndex = consolidatedUsersArray.findIndex(
      (arrayUser) => arrayUser.name === user.name,
    );
    // if user doesn't exist in consolidatedUsersArray, push that user into the array
    if (userIndex === -1) {
      consolidatedUsersArray.push({
        ids: [user.id],
        name: user.name,
        type: user.type,
      });
    }
    // if user *does* exist in consolidatedUsersArray, push current user's id to that user's ids array
    else {
      consolidatedUsersArray[userIndex].ids.push(user.id);
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
        name: capitalize(user.name),
      };
    }
    // otherwise, reg exp below capitalizes first letter of each part of a user's space-delimited name
    return {
      ...user,
      name: user.name.replace(/\b(\w)/g, (char) => char.toUpperCase()),
    };
  });
  // return alphbatically sorted array of users
  return sortBy(usersArrayCapitalized, (user) => user.name);
};

// for react-select purposes, add a 'value' key to each element of the users array, holding the same value as the key 'name'
export const addValueKeyToUsers = (consolidatedUsersArray) =>
  consolidatedUsersArray.map((user) => ({ ...user, value: user.name }));

// takes array of action objects and array of itemTypes (e.g. ['Space', 'Resource'])
// keeps only actions with verb 'accessed'
// returns an array of objects {displayName, count, category} (corresponding to format required by Recharts)
export const getItemsByAccessedCount = (actions, itemTypes) => {
  let filteredActions;
  // when app is initially loaded, selected itemTypes (taken from the Select dropdown in the Most Viewed Items chart) is empty
  // in this case, we want to show all actions (with the verb 'accessed')
  if (!itemTypes || itemTypes.length === 0) {
    filteredActions = actions.filter(
      (action) => action.verb === ACCESSED_STRING,
    );
  }
  // otherwise, filter actions by selected item types
  else {
    filteredActions = actions.filter(
      (action) =>
        action.verb === ACCESSED_STRING &&
        itemTypes.includes(action.target.objectType),
    );
  }
  // determine the number of actions for each item type, keeping note of the item type (objectType/category)
  let itemsCount = [];
  filteredActions.forEach((action) => {
    const { displayName, objectType } = action.target;
    const displayNameIndex = itemsCount.findIndex(
      (item) => item.displayName === displayName,
    );
    if (displayNameIndex === -1) {
      itemsCount.push({ displayName, count: 1, category: objectType });
    } else {
      itemsCount = [
        ...itemsCount.slice(0, displayNameIndex),
        {
          ...itemsCount[displayNameIndex],
          count: itemsCount[displayNameIndex].count + 1,
        },
        ...itemsCount.slice(displayNameIndex + 1),
      ];
    }
  });
  return itemsCount;
};

// Takes array of objects {displayName, count, category} and returns a sorted array with only top items
export const formatItemsByAccessedCount = (itemsCount) => {
  const sortedItemsCountArray = itemsCount.sort(
    (itemA, itemB) => itemB.count - itemA.count,
  );
  // keep only top ten entries
  // reverse so that in the chart the most frequent item appears on the right
  const slicedItemsCountArray = sortedItemsCountArray
    .slice(0, TOP_NUMBER_OF_ITEMS_TO_DISPLAY)
    .reverse();
  return slicedItemsCountArray;
};

export const extractItemTypes = (actions) => {
  const filteredActions = actions.filter(
    (action) => action.verb === ACCESSED_STRING,
  );
  const items = [];
  filteredActions.forEach((action) => {
    const { objectType } = action.target;
    if (items.indexOf(objectType) === -1) {
      items.push(objectType);
    }
  });
  const itemsReactSelect = [];
  items.forEach((item) => itemsReactSelect.push({ name: item, value: item }));
  return itemsReactSelect;
};

export const findItemNameByPath = (path, items) => {
  const name =
    items?.find(({ path: thisPath }) => path === thisPath)?.name ?? 'Unknown';
  return truncate(name, { length: ITEM_NAME_MAX_LENGTH });
};

// group children of children under the same parent
export const groupByFirstLevelItems = (actions, item) => {
  if (!item) {
    return {};
  }

  const nbLevelParent = item.path.split('.').length;

  // compare first level only
  const d = actions.groupBy((a) =>
    a.item?.path
      ?.split('.')
      ?.slice(0, nbLevelParent + 1)
      ?.join('.'),
  );
  return d.toJS();
};
