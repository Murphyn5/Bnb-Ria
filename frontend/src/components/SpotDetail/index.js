import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
import OpenModalButton from "../OpenModalButton"
import ColoredLine from "../ColoredLine"
import CreateReviewFormModal from "../CreateReviewFormModal"
import DeleteReviewFormModal from "../DeleteReviewFormModal"
import EditReviewFormModal from "../EditReviewFormModal"
import './SpotDetail.css'
import { getSpotReviews, getAllSpotReviews } from "../../store/reviews"



const SpotDetail = () => {
    const dispatch = useDispatch()

    const { spotId } = useParams()

    let spot = useSelector(state => state.spots.singleSpot)

    const reviews = useSelector(getAllSpotReviews)

    const reviewUserIdArray = reviews.map((review) => {
        return review.User.id
    })

    console.log(reviewUserIdArray)

    reviews.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const spotRestore = async () => {
            await dispatch(getOneSpot(spotId))
            await dispatch(getSpotReviews(spotId))
        }
        spotRestore()
    }, [dispatch, spotId])

    if (!spot.country) {
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

    if (spot.SpotImages.length > 0) {
        previewImageArray = spot.SpotImages.filter((image) => {
            if (image.preview === true) {
                return image
            }
        })
    }

    let previewImage

    if (previewImageArray) {
        previewImage = previewImageArray[previewImageArray.length - 1]
    } else {
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

    let rating = <span><i className="fas fa-star"></i></span>
    let ratingTitle = <span><i className="fas fa-star enlarge"></i></span>

    const handleSubmit = () => {
        window.alert('Feature coming soon!')
    }

    const renderReviewAction = () => {
        if (reviewType === 'New' && sessionUser && sessionUser.id !== spot.ownerId) {
            return (
                <>
                    <br></br>
                    <span>Be the first to post a review!</span>
                </>

            )
        }
    }

    const renderReviewButton = () => {
        if (sessionUser && sessionUser.id !== spot.ownerId && !reviewUserIdArray.includes(sessionUser.id)) {
            return (
                <>
                    <br></br>
                    <div>
                        <OpenModalButton
                            buttonText={"Post Your Review"}
                            modalComponent={<CreateReviewFormModal id={spotId} />}
                        >
                            {/* <button type="submit" className={'post-review-button accent'}>Post Your Review</button> */}
                        </OpenModalButton>
                    </div>
                </>
            )
        }
    }
    
    const spotAvgRatingRounded = () => {
        if (spot.avgRating !== null) {
            return spot.avgRating.toFixed(1)
        }
        return spot.avgRating
    }


    const renderReviews = () => {
        if (reviews.length === 0) {
            return (
                <>
                </>
            )
        } else {
            let name = spot.name
            return reviews.map((review) => {

                let reviewRating

                if (review.stars === 1) {
                    reviewRating =
                        <span>
                            <i className="fas fa-star"></i>
                        </span>
                }

                if (review.stars === 2) {
                    reviewRating =
                        <span>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                }

                if (review.stars === 3) {
                    reviewRating =
                        <span>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                }

                if (review.stars === 4) {
                    reviewRating =
                        <span>
                            <i className="fas fa-star" ></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                }

                if (review.stars === 5) {
                    reviewRating =
                        <span>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </span>
                }

                let date = new Date(review.createdAt);

                let year = date.toLocaleString("default", { year: "numeric" });
                let month = date.toLocaleString("default", { month: "2-digit" });
                let day = date.toLocaleString("default", { day: "2-digit" });

                let formattedDate = year + "-" + month + "-" + day;

                const renderDeleteButton = () => {
                    if (sessionUser && sessionUser.id === review.userId) {
                        return (
                            <>
                                <br></br>
                                <div>
                                    <OpenModalButton
                                        buttonText={"Delete"}
                                        modalComponent={<DeleteReviewFormModal spotId={spotId} reviewId={review.id} />}
                                    >
                                        {/* <button type="submit" className={'post-review-button accent'}>Post Your Review</button> */}
                                    </OpenModalButton>
                                    &nbsp; &nbsp;
                                    <OpenModalButton
                                        buttonText={"Update"}
                                        modalComponent={<EditReviewFormModal name={name} reviews={reviews} spotId={spotId} reviewId={review.id} />}
                                    >
                                        {/* <button type="submit" className={'post-review-button accent'}>Post Your Review</button> */}
                                    </OpenModalButton>
                                </div>
                            </>
                        )
                    }
                }

                return (
                    <div key={review.id}>
                        <br>
                        </br>
                        <div>
                            <div>
                                {review.User.firstName} &nbsp;
                                {reviewRating}
                            </div>
                            <div className="text-color-gray">
                                {formattedDate}

                            </div>
                            <div>
                                {review.review}
                            </div>
                            {renderDeleteButton()}
                        </div>
                        <br>
                        </br>
                    </div>

                )
            })
        }
    }

    const isNewChecker = () => {
        if (reviewType === 'New') {
            return (
                <span className="spot-details-reviews-summary-info">{reviewType}</span>
            )
        } else {
            return (
                <span className="spot-details-reviews-summary-info">&nbsp;&bull;&nbsp;{reviewCount} {reviewType}</span>
            )
        }
    }

    const isNewCheckerSmall = () => {
        if (reviewType === 'New') {
            return (
                <span>{reviewType}</span>
            )
        } else {
            return (
                <span>&nbsp;&bull;&nbsp;{reviewCount} {reviewType}</span>
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
                                    {rating}&nbsp;{spotAvgRatingRounded()}
                                    <span> {isNewCheckerSmall()}</span>
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
                        <span className="spot-details-reviews-summary-avgRating">
                            {ratingTitle} &nbsp;
                            {spotAvgRatingRounded()}

                        </span>
                    </span>
                    {isNewChecker()}
                </div>

                {renderReviewButton()}

                {renderReviewAction()}

                <div>
                    {renderReviews()}
                </div>


            </div>
        </section>
    )
}

export default SpotDetail
