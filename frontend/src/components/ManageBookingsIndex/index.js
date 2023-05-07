import "./ManageBookings.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { getUserBookingsThunk } from "../../store/bookings";
import moment from "moment";
import BookingsDeleteModal from "../DeleteBookingsModal";

const BookingsCurrent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const bookings = useSelector(
        (state) => state.bookings.userBookings?.Bookings
    );

    const currentUser = useSelector((state) => state.session.user);
    if (!currentUser) history.push("/");

    useEffect(() => {
        dispatch(getUserBookingsThunk());
    }, [dispatch]);

    if (!bookings) return null;

    bookings.sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate))

    if (bookings.length === 0) {
        return (
            <section>
                <div className="manage-reviews-container">
                    <h1>Manage Bookings</h1>
                    <h2>No bookings to show!</h2>
                </div>
            </section>
        )
    }
    return (
        <section className="manage-reviews-container-outer">
            <div>
                <h1>Manage Bookings</h1>
                <div className="manage-reviews-cards-container">
                    {bookings.map((booking) => (
                        <div className="manage-reviews-card" key={booking.id}>
                            <Link className="tile-link" to={`/spots/${booking.spotId}`}>
                                <h4>{booking.Spot.name}</h4>
                                <img
                                    style={{ margin: "10px 0px" }}
                                    className="manage-reviews-img"
                                    src={booking.Spot.previewImage}
                                    alt="Preview"
                                />
                                <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
                                    Dates Booked:
                                </p>
                                <p>
                                    {moment(booking.startDate).calendar()} -{" "}
                                    {moment(booking.endDate).calendar()}
                                </p>
                            </Link>
                            <div
                                className="manage-reviews-button"
                                style={{ justifyContent: "flex-end", marginTop: "15px" }}
                            >
                                {/* Populate bookings edit */}
                                {/* <button className="buttons-update-delete update-button">
                  <OpenModalMenuItem
                    itemText="Edit"
                    // modalComponent={
                    //   <ReviewsEditModal
                    //     reviewId={review.id}
                    //     populateStars={review.stars}
                    //     populateReview={review.review}
                    //   />
                    // }
                  />
                </button> */}
                                {/* Populate bookings delete */}
                                <button
                                    className="buttons-update-delete"
                                    style={{ marginBottom: "5px" }}
                                >
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        modalComponent={
                                            <BookingsDeleteModal bookingId={booking.id} />
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookingsCurrent;
