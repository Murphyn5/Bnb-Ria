


import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteBookingsThunk } from "../../store/bookings";

import "./DeleteBookingsModal.css";

const BookingsDeleteModal = ({ bookingId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(deleteBookingsThunk(bookingId)).then(closeModal);
  };

  return (
    <>
      <div className="delete-form-container">
        <form className={"delete-form"} onSubmit={handleSubmit}>
          <h2 className="delete-form-title">Confirm Delete</h2>
          <span>
            Are you sure you want to delete this Booking?
          </span>
          <button type="submit" onClick={handleSubmit} className={"enabled"}>Yes (Delete Booking)</button>
          <button type="submit" onClick={closeModal} className={"accent"}>No (Keep Booking)</button>
        </form>
      </div>
    </>
  );
};

export default BookingsDeleteModal;
