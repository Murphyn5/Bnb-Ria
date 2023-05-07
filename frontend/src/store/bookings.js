import { csrfFetch } from "./csrf";
import Cookies from 'js-cookie';

/* ------- CONSTANTS ------- */
const POST_BOOKING = "bookings/POST_BOOKING";
const GET_BOOKINGS = "bookings/GET_BOOKINGS";
const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

/* ------- ACTIONS ------- */
const postBookingAction = (booking) => {
  return {
    type: POST_BOOKING,
    booking,
  };
};

const getBookingsAction = (bookings) => {
  return {
    type: GET_BOOKINGS,
    bookings,
  };
};

const getUserBookingsAction = (bookings) => {
  return {
    type: GET_USER_BOOKINGS,
    bookings,
  };
};

const deleteBookingsAction = (booking) => {
  return {
    type: DELETE_BOOKING,
    booking,
  };
};

/* ------- THUNKS ------- */

export const postBookingThunk = (booking) => async (dispatch) => {
  const { spotId, userId, startDate, endDate } = booking;

  const res = await fetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "XSRF-token": Cookies.get('XSRF-TOKEN')
    },
    body: JSON.stringify({ spotId, userId, startDate, endDate }),
  });
  if (res.ok) {
    const newBooking = await res.json();
    dispatch(postBookingAction(newBooking));
    return { success: true };
  } else {
    const err = await res.json();
    return { success: false, error: err };
  }
};

export const getBookingsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (res.ok) {
    const bookings = await res.json();
    dispatch(getBookingsAction(bookings));
    return bookings;
  }
};

export const getUserBookingsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/current`);
  if (res.ok) {
    const bookings = await res.json();
    dispatch(getUserBookingsAction(bookings));
    return bookings;
  }
};

export const deleteBookingsThunk = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(getUserBookingsThunk());
  }
};

/* ------- INITIAL STATE ------- */
const initialState = {
  bookings: null,
  singleBooking: null,
  userBookings: null,
};

/* ------- REDUCER ------- */
const bookingsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case POST_BOOKING:
      newState.singleBooking = action.booking;
      return newState;
    case GET_BOOKINGS:
      newState.bookings = action.bookings;
      return newState;
    case GET_USER_BOOKINGS:
      newState.userBookings = action.bookings;
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
