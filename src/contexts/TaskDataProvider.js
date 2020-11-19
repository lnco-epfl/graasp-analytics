import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  RESEARCH_API_ROUTE,
  TASKS_PARAMETER,
  buildTasksEndpoint,
  buildApiOptions,
} from '../api/graasp';
import { REACT_APP_BASE_URL } from '../config/env';
import { UserDataContext } from './UserDataProvider';
import { ViewDataContext } from './ViewDataProvider';

export const TaskDataContext = createContext();

const TaskDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [existingTask, setExistingTask] = useState();
  const [taskGetError, setTaskGetError] = useState(null);
  const [taskCreateError, setTaskCreateError] = useState(null);
  const { userId } = useContext(UserDataContext);
  const { view } = useContext(ViewDataContext);
  const { spaceId } = useParams();

  // build endpoints that are called in this context API
  const getTaskUrl = buildTasksEndpoint(
    REACT_APP_BASE_URL,
    RESEARCH_API_ROUTE,
    TASKS_PARAMETER,
    { userId, spaceId, requestedView: view },
  );
  const createTaskUrl = buildTasksEndpoint(
    REACT_APP_BASE_URL,
    RESEARCH_API_ROUTE,
    TASKS_PARAMETER,
  );

  // on component load and when view changes, check if a task already exists for this space/user/view combination
  useEffect(() => {
    const fetchTask = async () => {
      if (userId) {
        try {
          const response = await fetch(getTaskUrl, buildApiOptions('GET'));
          if (!response.ok) {
            throw response;
          }
          const resolvedResponse = await response.json();
          setExistingTask(resolvedResponse);
          setIsLoading(false);
        } catch (err) {
          setExistingTask();
          const resolvedErr = await err.json();
          setTaskGetError(resolvedErr);
          setIsLoading(false);
        }
      }
    };
    fetchTask();
  }, [userId, spaceId, getTaskUrl, view]);

  // function passed down to ExportData component, used to trigger dataset request
  const requestFullDataset = async () => {
    try {
      // requestBody as required by api endpoint
      const requestBody = JSON.stringify({
        userId,
        spaceId,
        view,
      });
      const createTask = await fetch(
        createTaskUrl,
        buildApiOptions('POST', { body: requestBody }),
      );
      if (!createTask.ok) {
        throw createTask;
      }
      const resolvedCreateTask = await createTask.json();
      // note here that resolvedCreateTask is a server response object with 'success', 'message', and 'task' props
      setExistingTask(resolvedCreateTask.task);
      // every 5 seconds, ping tasks endpoint to update status of task
      // this status is used by the ExportData component for conditional rendering
      // clear and exit setInterval if task status is 'completed' or MAX_TASK_QUERIES are made
      let taskQueriesMade = 0;
      const MAX_TASK_QUERIES = 100;
      const queryTaskStatus = setInterval(async () => {
        const response = await fetch(getTaskUrl, buildApiOptions('GET'));
        const resolvedResponse = await response.json();
        setExistingTask(resolvedResponse);
        taskQueriesMade += 1;
        if (resolvedResponse.completed || taskQueriesMade >= MAX_TASK_QUERIES) {
          clearInterval(queryTaskStatus);
        }
      }, 5000);
    } catch (err) {
      const resolvedErr = await err.json();
      setTaskCreateError(resolvedErr);
    }
  };

  return (
    <TaskDataContext.Provider
      value={{
        isLoading,
        existingTask,
        taskGetError,
        taskCreateError,
        requestFullDataset,
      }}
    >
      {children}
    </TaskDataContext.Provider>
  );
};

TaskDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TaskDataProvider;
