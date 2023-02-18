import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SpotIndexItem.css'
const SpotIndexItem = ({ spot }) => {

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
    <div>
      <Link to={`/spots/${spot.id}`} className='spot-index-item-container' >

        <img src={spot.previewImage} className="spot-preview-image" alt="spot-preview" />

        <div className='spot-index-item-description-container'>
          <div>
            {spot.city}, {spot.state}
          </div>
          <div>
            {rating} {ratingType} {ratingNum}
          </div>
        </div>
        <div className='spot-index-item-price-container'>
          ${spot.price}/night
        </div>
      </Link>
    </div>

  );
};

export default SpotIndexItem;
