const initialState = {
  items: [],
  loading: false,
  error: null,
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_ITEMS_SUCCESS":
      return { ...state, loading: false, items: action.payload };
    case "FETCH_ITEMS_FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default itemsReducer;
