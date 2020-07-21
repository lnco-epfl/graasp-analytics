import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  RESEARCH_API_ROUTE,
  TASKS_PARAMETER,
  buildTasksEndpoint,
  buildApiOptions,
} from '../api/graasp';
import { UserDataContext } from './UserDataProvider';

export const TaskDataContext = createContext();

const TaskDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [existingTask, setExistingTask] = useState();
  const [error, setError] = useState(null);
  const { userId } = useContext(UserDataContext);
  const { spaceId } = useParams();

  // build endpoints that are called
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchTaskUrl = buildTasksEndpoint(
    baseUrl,
    RESEARCH_API_ROUTE,
    TASKS_PARAMETER,
    { userId, spaceId },
  );

  const createTaskUrl = buildTasksEndpoint(
    baseUrl,
    RESEARCH_API_ROUTE,
    TASKS_PARAMETER,
  );

  // on component load, check if a task already exists on this space
  useEffect(() => {
    const fetchTask = async () => {
      if (userId) {
        try {
          const response = await fetch(fetchTaskUrl, buildApiOptions('GET'));
          if (!response.ok) {
            throw response;
          }
          const resolvedResponse = await response.json();
          setExistingTask(resolvedResponse);
          setIsLoading(false);
        } catch (err) {
          setError(err);
          setIsLoading(false);
        }
      }
    };
    fetchTask();
  }, [userId, spaceId, fetchTaskUrl]);

  // function passed down to ExportData component; used to trigger dataset request
  const requestFullDataset = async () => {
    const requestBody = JSON.stringify({ userId, spaceId });
    const response = await fetch(
      createTaskUrl,
      buildApiOptions('POST', { body: requestBody }),
    );
    const resolvedResponse = await response.json();
    setExistingTask(resolvedResponse.task);
    // edit this setInterval call code below/make it more concise
    setInterval(async () => {
      const taskRequestResponse = await fetch(
        fetchTaskUrl,
        buildApiOptions('GET'),
      );
      const taskResolvedResponse = await taskRequestResponse.json();
      setExistingTask(taskResolvedResponse);
    }, 5000);
  };

  return (
    <TaskDataContext.Provider
      value={{ isLoading, existingTask, error, requestFullDataset }}
    >
      {children}
    </TaskDataContext.Provider>
  );
};

TaskDataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default TaskDataProvider;
