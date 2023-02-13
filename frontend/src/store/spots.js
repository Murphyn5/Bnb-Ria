export const getAllSpots = (state) => Object.values(state.spots.allSpots)

const LOAD = 'spots/LOAD';

const load = spots => ({
    type: LOAD,
    spots
});

export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
        const spotsObj = await response.json();
        console.log('??????', spotsObj.Spots)
        dispatch(load(spotsObj.Spots));
    }
};

const initialState = {
    allSpots: {},
    singleSpot: {}
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allSpots = {};
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot;
            });
            return {
                allSpots,
                singleSpot: {...state.singleSpot}
            };
        default:
            return state;
    }
};

export default spotsReducer;
