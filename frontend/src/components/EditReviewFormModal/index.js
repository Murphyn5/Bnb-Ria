import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import StarRating from "../StarRating";
import "./EditReviewForm.css";
import { editReview } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";

function EditReviewFormModal({reviews, spotId, reviewId, name}) {
    const stateReview = reviews.find((review) => {
        if(review.id === reviewId){
            return review
        }
    })
    const dispatch = useDispatch();
    const [review, setReview] = useState(stateReview.review)
    const updateReview = (e) => setReview(e.target.value);
    const [rating, setRating] = useState(stateReview.stars);
    const [hover, setHover] = useState(stateReview.stars);
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [showReviewError, setShowReviewError] = useState(false)
    const [showRatingError, setShowRatingError] = useState(false)
    const [postReviewClassName, SetPostReviewClassName] = useState("disabled")

    const { closeModal } = useModal();

    useEffect(() => {
        if (review.length < 10 || rating === 0) {
          setDisabled(true)
          SetPostReviewClassName("disabled")
          return
        }
        SetPostReviewClassName("enabled")
        setDisabled(false)
      }, [review, rating])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        setShowReviewError(false)
        setShowRatingError(false)


        if (review.length < 10) {
            errors.push('review input error')
            setShowReviewError(true)
        }

        if (rating === 0) {
            errors.push('rating input error')
            setShowRatingError(true)
        }

        if (errors.length > 0) {
            return
        }

        const payload = {
            reviewId,
            stars: rating,
            spotId,
            review
        }

        await dispatch(editReview(payload));
        await dispatch(getOneSpot(spotId))
        closeModal()
    };

    const fillerBreaReview = () => {
        if (!showReviewError) {
            return <br></br>
        }
    }

    const fillerBreakRating = () => {
        if (!showRatingError) {
            return <br></br>
        }
    }

    let inputErrorClassName = 'edit-spot-form-image-error'

    return (
        <>
            <div className="edit-review-form-container">
                <form className={"edit-review-form"} onSubmit={handleSubmit}>
                    <h2 className="edit-review-form-title">How was your stay at {name}?</h2>
                    <br></br>
                    <textarea
                        type="text"
                        className="edit-review-form-textarea"
                        required
                        placeholder='Leave your review here...'
                        value={review}
                        onChange={updateReview} />
                    <span className={inputErrorClassName + (showReviewError ? '' : ' hidden')}>Review is required.</span>
                    {fillerBreaReview()}
                    <div className="stars-container">
                        <StarRating rating={rating} hover={hover} setRating={setRating} setHover={setHover} />
                        <h2>Stars</h2>
                    </div>
                    <span className={inputErrorClassName + (showRatingError ? '' : ' hidden')}>Rating is required.</span>
                    {fillerBreakRating()}
                    <button type="submit" onClick={handleSubmit} disabled={disabled} className={postReviewClassName}>Submit Your Review</button>
                </form>
            </div>
        </>
    );
}

export default EditReviewFormModal;
