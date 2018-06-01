export default ({ dispatch }) => next => action => {
  //check if action has a promise on its payload property

  //if it doesn't, then send the action on the next middleware
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  //if it does, then wait for it to ressolve, then create a new action with that data
  //and dispatch it
  action.payload.then(function(response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};
