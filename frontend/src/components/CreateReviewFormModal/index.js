// frontend/src/components/deleteFormModal/index.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import StarRating from "../StarRating";
import "./CreateReviewForm.css";

function CreateReviewFormModal({id}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const updateReview = (e) => setReview(e.target.value);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
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


        let createdReview = await dispatch();


        // if (createdReview) {
        //     await dispatch(getOneSpot(createdSpot.id))
        //     history.push(`/spots/${createdSpot.id}`);
        //     <Redirect to={`/spots/${createdSpot.id}`} />
        // }

        const payload = {
            id,
            rating,
            review
        }
        // await dispatch(deleteSpot(payload))
        // await dispatch(getCurrentSpots())
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

    let inputErrorClassName = 'create-spot-form-image-error'

    return (
        <>
            <div className="create-review-form-container">
                <form className={"create-review-form"} onSubmit={handleSubmit}>
                    <h2 className="create-review-form-title">How was your stay?</h2>
                    <br></br>
                    <textarea
                        type="text"
                        className="create-review-form-textarea"
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

export default CreateReviewFormModal;
