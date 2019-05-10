export default (state = 1000, action) => {
  switch (action.type) {
    case "ADD_MONEY":
      return state + action.amount;
    case "DEDUCT_MONEY":
      return state - action.amount;
    case "SET_MONEY":
      return action.amount;
    default:
      return state;
  }
};
