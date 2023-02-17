import Cookies from 'js-cookie';

// export const getAllReviews = (state) => Object.values(state.spots.??????)
export const getAllSpotReviews = (state) => Object.values(state.reviews.spot)
export const getAllUserReviews = (state) => Object.values(state.reviews.user)

const LOAD_ALL_SPOT_REVIEWS = 'reviews/LOAD_ALL_SPOT_REVIEWS';
const LOAD_ALL_USER_REVIEWS = 'reviews/LOAD_ALL_USER_REVIEWS';

const loadSpotReviews = reviews => ({
    type: LOAD_ALL_SPOT_REVIEWS,
    reviews
});

const loadUserReviews = reviews => ({
    type: LOAD_ALL_USER_REVIEWS,
    reviews
});


export const getSpotReviews = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}/reviews`);
    if (response.ok) {
        const reviewsObj = await response.json();
        await dispatch(loadSpotReviews(reviewsObj.Reviews));
    }
};

export const getUserReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews/current`);
    if (response.ok) {

        const reviewsObj = await response.json();
        await dispatch(loadUserReviews(reviewsObj.Reviews));
    }
};

export const deleteReview = (payload) => async dispatch => {
    const response = await fetch(`/api/reviews/${payload.reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "XSRF-token": Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const review = await response.json()
        await dispatch(getSpotReviews(payload.spotId))
        await dispatch(getUserReviews())
        return review
    }
}

export const editReview = (payload) => async dispatch => {
    const response = await fetch(`/api/reviews/${payload.reviewId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "XSRF-token": Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        await dispatch(getSpotReviews(payload.spotId))
        await dispatch(getUserReviews())
    }
}


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
        await dispatch(getSpotReviews(payload.id))
        return review
    }
}

const initialState = {
    spot: {},
    user: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_SPOT_REVIEWS:
            const spotReviews = {};
            action.reviews.forEach(review => {
                spotReviews[review.id] = review;
            });
            return {
                spot: spotReviews,
                user: { ...state.user }
            }
        case LOAD_ALL_USER_REVIEWS:
            const userReviews = {};
            action.reviews.forEach(review => {
                userReviews[review.id] = review;
            });
            return {
                spot: {...state.spot},
                user: userReviews
            }
        default:
            return state;
    }
};

export default reviewsReducer;
