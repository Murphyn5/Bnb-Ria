import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SpotIndexItem.css'
const SpotIndexItem = ({ spot }) => {

  let rating
  let ratingType
  let ratingNum

  if (spot.avgRating === null) {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
    ratingType = "New"
  } else {
    ratingNum = <span className='avg-rating-num'>
      {spot.avgRating.toFixed(1)}
    </span>
  }

  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '1.0') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
  }

  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '1.5') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
  }

  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '2.0') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
  }

  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '2.5') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
  }

  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '3.0') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
  }

  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '3.5') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
  }

  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '4.0') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
  }

  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '4.5') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
      </span>
  }
  if ((Math.round(spot.avgRating * 2) / 2).toFixed(1) === '5.0') {
    rating =
      <span>
        <i className="fas fa-star medium"></i>
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
