import Cookies from 'js-cookie';

// export const getAllReviews = (state) => Object.values(state.spots.??????)
export const getAllReviews = (state) => Object.values(state.reviews.spot)

const ADD_ONE = 'reviews/ADD_ONE';
const LOAD_ALL = 'reviews/LOAD_ALL';

const loadReviews = reviews => ({
    type: LOAD_ALL,
    reviews
});

const addReview = review => ({
    type: ADD_ONE,
    review
});

export const getReviews = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`);
    if (response.ok) {
        const reviewsObj = await response.json();
        dispatch(loadReviews(reviewsObj.Reviews));
    }
};

export const createReview = (payload) => async dispatch => {
    const response = await fetch(`/api/spots/${payload.id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-token": Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const review = await response.json()
        dispatch(addReview(review))
        return review
    }
}

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_ALL:
            const spotReviews = {};
            action.reviews.forEach(review => {
                spotReviews[review.id] = review;
            });
            return {
                spot: spotReviews,
                user: {...state.user}
            }
        case ADD_ONE:
            newState = {...state}
            newState.spot[action.review.id] = action.review
            return newState
        default:
            return state;
    }
};

export default reviewsReducer;
