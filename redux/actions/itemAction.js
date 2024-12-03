import axios from 'axios';

export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const fetchItems = () => async (dispatch) => {
  dispatch({ type: FETCH_ITEMS_REQUEST });
  try {
    const response = await axios.get('https://www.freetestapi.com/api/v1/cars');
    dispatch({ type: FETCH_ITEMS_SUCCESS, payload: response?.data });
  } catch (error) {
    dispatch({ type: FETCH_ITEMS_FAILURE, error: error.message });
  }
};


