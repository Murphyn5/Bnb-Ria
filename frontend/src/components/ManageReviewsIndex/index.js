import { useDispatch, useSelector } from "react-redux"
import { getAllUserReviews, getUserReviews } from "../../store/reviews"
import { useEffect } from "react"
import OpenModalButton from "../OpenModalButton"
import EditReviewFormModal from "../EditReviewFormModal"
import DeleteReviewFormModal from "../DeleteReviewFormModal"
import './ManageReviewsIndex.css'

const ManageReviewsindex = () => {

    const dispatch = useDispatch()

    let reviews = useSelector(getAllUserReviews)
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const reviewRestore = async () => {
            await dispatch(getUserReviews())
        }
        reviewRestore()
    }, [dispatch])

    if (reviews.length === 0) {
        return (
            <>
            </>
        )
    } else {

        return (
            <section className="manage-reviews-container">
                <h1>Manage Reviews</h1>
                {reviews.map((review) => {

                    let reviewRating
                    let spot = review.Spot
                    let spotId = spot.id
                    let name = spot.name

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
                        <>
                            <br>
                            </br>
                            <div>
                                <div>
                                    {name} &nbsp;
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
                        </>

                    )
                })}
            </section>

        )


    }
}

export default ManageReviewsindex
