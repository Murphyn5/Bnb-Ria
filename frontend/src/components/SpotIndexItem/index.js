import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SpotIndexItem.css'
import { getOneSpot } from '../../store/spots';
import { getReviews } from '../../store/reviews';

const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch()

  let rating

  if (spot.avgRating === 1) {
    rating =
      <span>
        <i className="fas fa-star"></i>
      </span>
  }

  if (spot.avgRating === 1.5) {
    rating =
      <span>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half"></i>
      </span>
  }

  if (spot.avgRating === 2) {
    rating =
      <span>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </span>
  }

  if (spot.avgRating === 2.5) {
    rating =
      <span>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half"></i>
      </span>
  }

  if (spot.avgRating === 3) {
    rating =
      <span>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </span>
  }

  if (spot.avgRating === 3.5) {
    rating =
      <span>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half"></i>
      </span>
  }

  if (spot.avgRating === 4) {
    rating =
      <span>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </span>
  }

  if (spot.avgRating === 4.5) {
    rating =
      <span>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star-half"></i>
      </span>
  }
  if (spot.avgRating === 5) {
    rating =
      <span>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </span>
  }

  const handleClick = async () => {
    await dispatch(getOneSpot(spot.id))
    await dispatch(getReviews(spot.id))
  }

  return (
    <div>
      <Link to={`/spots/${spot.id}`} onMouseEnter={handleClick} className='spot-index-item-container' >

        <img src={spot.previewImage} className="spot-preview-image" alt="spot-preview" />

        <div className='spot-index-item-description-container'>
          <div>
            {spot.city}, {spot.state}
          </div>
          <div>
            {rating}
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
