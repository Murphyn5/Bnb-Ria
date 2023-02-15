import { useEffect } from "react"
import { render } from "react-dom"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
import ColoredLine from "../ColoredLine"
import './SpotDetail.css'



const SpotDetail = () => {
    const dispatch = useDispatch()

    const { spotId } = useParams()

    let spot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const spotRestore = async () => {
            await dispatch(getOneSpot(spotId))
        }
        spotRestore()
        console.log(spot)
    }, [])

    if(!spot.country) {
        return
    }

    let reviewType
    let reviewCount = spot.numReviews


    if (spot.numReviews === 1) {
        reviewType = "review"
    } else if (spot.numReviews === 0) {
        reviewType = "New"
        reviewCount = ''
    }
    else {
        reviewType = ' reviews'
    }

    let previewImageArray

    if(spot.SpotImages.length > 0){
        previewImageArray = spot.SpotImages.filter((image) => {
            if (image.preview === true) {
                return image
            }
        })
    }

    let previewImage

    if(previewImageArray){
         previewImage = previewImageArray[0]
    } else{
        previewImage = {
            url: null
        }
    }


    let nonPreviewImages = spot.SpotImages.filter((image) => {
        if (image.preview === false) {
            return image
        }
    })

    const nonPreviewImage = (index) => {
        if (!nonPreviewImages[index]) {
            return (
                <img src="https://static.wikia.nocookie.net/dexterslab/images/9/93/Dexter%27s_House.png/revision/latest?cb=20150503084954" className={"spot-details-nonpreview-image"} alt={`${index}`} />
            )
        }
        else {
            return (
                <img src={nonPreviewImages[index].url} className={"spot-details-nonpreview-image"} alt={`${index}`} />
            )
        }
    }

    let rating



    if (spot.avgRating === 1 || spot.avgRating === null) {
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
            <span >
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half"></i>
            </span>
    }

    if (spot.avgRating === 4) {
        rating =
            <span>
                <i className="fas fa-star" ></i>
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

    let ratingTitle

    console.log(spot.avgRating)

    if (spot.avgRating === 1 || spot.avgRating === null) {
        ratingTitle =
            <span>
                <i className="fas fa-star enlarge"></i>
            </span>
    }

    if (spot.avgRating === 1.5) {
        ratingTitle =
            <span>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star-half enlarge"></i>
            </span>
    }

    if (spot.avgRating === 2) {
        ratingTitle =
            <span>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
            </span>
    }

    if (spot.avgRating === 2.5) {
        ratingTitle =
            <span>
                <i className="fas fa-star enlarge" ></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star-half enlarge"></i>
            </span>
    }

    if (spot.avgRating === 3) {
        ratingTitle =
            <span>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
            </span>
    }

    if (spot.avgRating === 3.5) {
        ratingTitle =
            <span >
                <i className="fas fa-star enlarge" ></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star-half enlarge"></i>
            </span>
    }

    if (spot.avgRating === 4) {
        ratingTitle =
            <span>
                <i className="fas fa-star enlarge" ></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
            </span>
    }

    if (spot.avgRating === 4.5) {
        ratingTitle =
            <span>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star-half enlarge"></i>
            </span>
    }
    if (spot.avgRating === 5) {
        ratingTitle =
            <span>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
                <i className="fas fa-star enlarge"></i>
            </span>
    }

    const handleSubmit = () => {
        window.alert('Feature coming soon!')
    }

    const renderReviewAction = () => {
        if(reviewType === 'New' && sessionUser) {
            return (
                <span>Be the first to post a review!</span>
            )
        }
    }

    const renderReviewButton = () => {
        if (sessionUser) {
            return (
                <div>
                    <button type="submit" className={'post-review-button accent'}>Post Your Review</button>
                </div>
            )
        }
    }



    return (
        <section>
            <div className="spot-details-container">
                <h1>{spot.name}</h1>
                <h2>{spot.city}, {spot.state}, {spot.country}</h2>
                <div className="spot-details-image-container">
                    <img src={previewImage.url} className={"spot-details-preview-image"} alt={`preview`} />
                    <div>
                    </div>
                    <div className="spot-details-nonPreview-image-container">
                        {nonPreviewImage(0)}
                        {nonPreviewImage(1)}
                        {nonPreviewImage(2)}
                        {nonPreviewImage(3)}
                    </div>
                </div >
                <div className="spot-details-information-container">
                    <div className="spot-details-information-text hyphenate">
                        <h2>
                            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
                        </h2>
                        <h3 className="spot-details-information-description">
                            {spot.description}
                        </h3>
                    </div>
                    <div className="spot-details-information-button-container-wrapper">
                        <div className="spot-details-information-button-container">
                            <div className="spot-details-information-button-information">
                                <div className="spot-details-information-button-price">
                                    <h2>${spot.price}</h2>
                                    <span>/night</span>
                                </div>
                                <div>
                                </div>
                                <div className="spot-details-information-button-reviews">
                                    {rating}
                                    <span>&nbsp; {reviewCount} {reviewType}</span>
                                </div>
                            </div>

                            <button type="submit" onClick={handleSubmit} className={'spot-details-information-button enabled'}>Reserve</button>
                        </div>
                    </div>
                </div>
                <br></br>
                <ColoredLine />
                <div className="spot-details-reviews-summary-info">
                    <span>
                        {ratingTitle}
                    </span>

                    <span className="spot-details-reviews-summary-info">&nbsp; {reviewCount} {reviewType}</span>
                </div>
                <br></br>
                {renderReviewButton()}
                <br></br>
                {renderReviewAction()}

            </div>
        </section>
    )
}

export default SpotDetail
