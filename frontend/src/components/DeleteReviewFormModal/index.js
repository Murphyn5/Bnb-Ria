// frontend/src/components/deleteFormModal/index.js
import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteReviewForm.css";
import { deleteReview } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";

function DeleteReviewFormModal({spotId, reviewId}) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
        spotId,
        reviewId
    }
    await dispatch(deleteReview(payload))
    await dispatch(getOneSpot(spotId))
    closeModal()
  };

  return (
    <>
      <div className="delete-form-container">
        <form className={"delete-form"} onSubmit={handleSubmit}>
          <h2 className="delete-form-title">Confirm Delete</h2>
          <span>
            Are you sure you want to delete this Review?
          </span>
          <button type="submit" onClick={handleSubmit} className={"enabled"}>Yes (Delete Review)</button>
          <button type="submit" onClick={closeModal} className={"accent"}>No (Keep Review)</button>
        </form>
      </div>
    </>
  );
}

export default DeleteReviewFormModal;
