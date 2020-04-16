const logger = (store: any) => (next: any) => (action: { type: string }) => {
  console.log(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export default logger;
