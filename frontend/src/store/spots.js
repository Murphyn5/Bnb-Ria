import Cookies from 'js-cookie';

export const getAllSpots = (state) => Object.values(state.spots.allSpots)

const LOAD_ALL = 'spots/LOAD_ALL';
const LOAD_ONE = 'spots/LOAD_ONE';
const ADD_ONE = 'spots/ADD_ONE';
const ADD_ONE_PREVIEW_IMAGE = 'spots/ADD_ONE_PREVIEW_IMAGE'
const DELETE_ONE = 'spots/DELETE_ONE'

const loadAllSpots = spots => ({
    type: LOAD_ALL,
    spots
});

const loadSingleSpot = spot => ({
    type: LOAD_ONE,
    spot
})


const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
});

const deleteOneSpot = id => ({
    type: DELETE_ONE,
    id
});

const addOneSpotPreviewImage = image => ({
    type: ADD_ONE_PREVIEW_IMAGE,
    image
})

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
        const spotsObj = await response.json();
        dispatch(loadAllSpots(spotsObj.Spots));
    }
};

export const getCurrentSpots = () => async dispatch => {
    const response = await fetch(`/api/spots/current`);
    if (response.ok) {
        const spotsObj = await response.json();
        dispatch(loadAllSpots(spotsObj.Spots));
    }
};

export const getOneSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSingleSpot(spot));
        return spot
    }
};

export const createSpot = (payload) => async dispatch => {
    const response = await fetch(`/api/spots`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-token": Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const spot = await response.json()
        dispatch(addOneSpot({...spot, avgRating: payload.avgRating}))
        return spot
    }
}

export const editSpot = (payload) => async dispatch => {
    const response = await fetch(`/api/spots/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "XSRF-token": Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const spot = await response.json()
        dispatch(addOneSpot({...spot, avgRating: payload.avgRating}))
        return spot
    }
}

export const deleteSpot = (payload) => async dispatch => {
    const response = await fetch(`/api/spots/${payload.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "XSRF-token": Cookies.get('XSRF-TOKEN')
        }
    })
    if (response.ok) {
        dispatch(deleteOneSpot(payload.id))
    }
}

export const createSpotImage = (payload) => async dispatch => {
    const response = await fetch(`/api/spots/${payload.spotId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "XSRF-token": Cookies.get('XSRF-TOKEN')
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const image = await response.json()
        if (image.preview) {
            dispatch(addOneSpotPreviewImage({ ...image, spotId: payload.spotId }))
        }
        return image
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_ALL:
            const allSpots = {};
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            return {
                allSpots,
                singleSpot: { ...state.singleSpot }
            };
        case LOAD_ONE:
            newState = {...state}
            newState.singleSpot = action.spot
            return newState;
        case ADD_ONE:
            newState = { ...state }
            newState.allSpots[action.spot.id] = action.spot
            return newState
        case ADD_ONE_PREVIEW_IMAGE:
            newState = { ...state }
            newState.allSpots[action.image.spotId].previewImage = action.image.url
            return newState
        case DELETE_ONE:
            newState = {...state}
            delete newState.allSpots[action.id]
            return newState
        default:
            return state;
    }
};

export default spotsReducer;
