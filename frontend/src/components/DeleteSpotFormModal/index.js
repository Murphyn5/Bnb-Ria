// frontend/src/components/deleteFormModal/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSpotForm.css";

import { deleteSpot, getCurrentSpots } from "../../store/spots";

function DeleteSpotFormModal({id}) {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
        id
    }
    await dispatch(deleteSpot(payload))
    await dispatch(getCurrentSpots())
    closeModal()
  };

  return (
    <>
      <div className="delete-form-container">
        <form className={"delete-form"} onSubmit={handleSubmit}>
          <h2 className="delete-form-title">Confirm Delete</h2>
          <span>
            Are you sure you want to remove this spot from the listings?
          </span>
          <button type="submit" onClick={handleSubmit} className={"enabled"}>Yes (Delete Spot)</button>
          <button type="submit" onClick={closeModal} className={"accent"}>No (Keep Spot)</button>
        </form>
      </div>
    </>
  );
}

export default DeleteSpotFormModal;
