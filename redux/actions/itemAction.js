import axios from 'axios';

export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const fetchItems = () => async (dispatch) => {
  dispatch({ type: FETCH_ITEMS_REQUEST });

  try {
    const response = await axios.get('https://www.freetestapi.com/api/v1/cars');
    const dataWithCategories = response.data.map((item, index) => ({
      ...item,
      category: index % 2 === 0 ? 'SUV' : 'Sedan',
    }));
    dispatch({ type: FETCH_ITEMS_SUCCESS, payload: dataWithCategories });
  } catch (error) {
    dispatch({ type: FETCH_ITEMS_FAILURE, error: error.message });
  }
};


