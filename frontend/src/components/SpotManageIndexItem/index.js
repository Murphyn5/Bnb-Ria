import React from 'react';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotFormModal from '../DeleteSpotFormModal';
import './SpotManageIndexItem.css'

const SpotManageIndexItem = ({ spot }) => {
    let rating =
        <span>
            <i className="fas fa-star medium"></i>
        </span>
    let ratingType
    let ratingNum

    if(!spot){
        return
      }

    if (spot.avgRating === null) {
        ratingType = "New"
    } else {
        ratingNum = <span className='avg-rating-num'>
            {spot.avgRating.toFixed(1)}
        </span>
    }

    return (
        <div className='spot-index-item-container'>
            <Link to={`/spots/${spot.id}`} className={'spot-preview-image'}>
                <img src={spot.previewImage} className="spot-preview-image" alt="spot-preview" />
            </Link>
            <div className='spot-index-item-description-container'>
                <div>
                    {spot.city}, {spot.state}
                </div>
                <div>
                    {rating} {ratingType} {ratingNum}
                </div>
            </div>
            <div className='spot-manage-index-item-price-container'>
                ${spot.price}/night
                <Link to={`/spots/${spot.id}/edit`}>
                    <button className='spot-manage-index-item-button'>Update</button>
                </Link>
                <OpenModalButton
                    buttonText={"Delete"}
                    modalComponent={<DeleteSpotFormModal id={spot.id} />}
                >
                    Delete
                </OpenModalButton>
            </div>
        </div>

    );
};

export default SpotManageIndexItem;
