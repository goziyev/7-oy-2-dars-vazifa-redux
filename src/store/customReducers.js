const defaultState = {
  customers: [],
};

export const customeReducer = (state = defaultState, actions) => {
  switch (actions.type) {
    case "Add_customer":
      return { ...state, customers: [...state.customers, actions.payload] };
    case "Remove_customer":
      return {...state,customers: [],};
    default:
      return state;
  }
};
