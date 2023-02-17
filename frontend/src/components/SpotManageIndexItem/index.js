import React from 'react';
import { Link } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotFormModal from '../DeleteSpotFormModal';
import './SpotManageIndexItem.css'
import { getOneSpot } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import { useDispatch } from 'react-redux';

const SpotManageIndexItem = ({ spot }) => {
    const dispatch = useDispatch()

    let rating
    let ratingType

    if (spot.avgRating === null) {
        rating =
        <span>
          <i className="fas fa-star"></i>
        </span>
        ratingType = "New"
      }

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
                    {rating} {ratingType}
                </div>
            </div>
            <div className='spot-manage-index-item-price-container'>
                ${spot.price}/night
                <Link to={`/spots/${spot.id}/edit`}>
                    <button className='spot-manage-index-item-button'>Update</button>
                </Link>
                <OpenModalButton
                    buttonText={"Delete"}
                    modalComponent={<DeleteSpotFormModal id={spot.id}/>}
                >
                    Delete
                </OpenModalButton>
            </div>
        </div>

    );
};

export default SpotManageIndexItem;
