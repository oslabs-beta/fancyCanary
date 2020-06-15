import * as types from '../constants/actionTypes';

const initialState = {
  pods: [],
  nodes: [],
  deployments: [],
  services: [],
  context: 'pods',
  isDataAvailable: false,
};

const clusterData = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PODS:
      return {
        ...state,
        pods: action.payload,
        context: 'pods',
        isDataAvailable: true,
      };
    case types.GET_NODES:
      return {
        ...state,
        nodes: action.payload,
        context: 'nodes',
        isDataAvailable: true,
      };
    case types.GET_DEPLOYMENTS:
      return {
        ...state,
        deployments: action.payload,
        context: 'deployments',
        isDataAvailable: true,
      };
    case types.GET_SERVICES:
      return {
        ...state,
        services: action.payload,
        context: 'services',
        isDataAvailable: true,
      };
    case types.SET_DEPLOYMENT:
      // console.log(state);
      console.log('Action Payload: ', action.payload);
      // console.log('Action.payload.index: ', action.payload.index);
      // console.log('Old State: ', state.deployments);
      const newDeployments = JSON.parse(JSON.stringify(state.deployments));
      newDeployments[action.payload.index] = JSON.parse(
        JSON.stringify(action.payload.deployment)
      );
      console.log('newDeployments: ', newDeployments);
      return {
        ...state,
        deployments: newDeployments,
      };
    default:
      return state;
  }
};

export default clusterData;
