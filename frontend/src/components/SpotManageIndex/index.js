import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { getAllSpots, getCurrentSpots } from '../../store/spots';
import SpotManageIndexItem from '../SpotManageIndexItem';
import './SpotManageIndex.css'

const SpotManageIndex = () => {
    const dispatch = useDispatch()
    const spots = useSelector(getAllSpots);
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Calculate start & end indices for items slice array
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const itemDisplay = spots?.slice(startIndex, endIndex);

    // Calculate total # of pages
    const totalPages = Math.ceil(spots?.length / itemsPerPage);

    // Handle page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };



    useEffect(() => {
        const spotRestore = async () => {
            await dispatch(getCurrentSpots())
        }
        spotRestore()
    }, [dispatch])

    if (!user) {
        history.push(`/`);
        <Redirect to={`/`} />
    }



    spots.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    if (!spots[0]) {
        return (
            <section className="manage-reviews-container">
                <h1>Manage Your Spots</h1>
                <Link to='/spots/new'>
                    <button type="submit" className='manage-spots-create-new-spot-button accent'>Create a New Spot</button>
                </Link>
                <h2>No spots to show!</h2>
            </section>
        )
    }



    return (
        <section >
            <div className='manage-spots-header-grid'>
                <div className='manage-spots-header-container'>
                    <h1 className='manage-spots-title'>Manage Your Spots</h1>
                    <Link to='/spots/new'>
                        <button type="submit" className='manage-spots-create-new-spot-button accent'>Create a New Spot</button>
                    </Link>
                </div>

            </div>
            <br></br>
            <br></br>
            <br></br>

            <ul className='spots-grid'>
                {
                    itemDisplay.map(spot => (
                        <SpotManageIndexItem
                            spot={spot}
                            key={spot.id}
                        />
                    ))
                }
            </ul>

            <br></br>

            {/* Pagination buttons */}
            <div className="pagination-container">
                {/* Handle previous */}
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="pagination-buttons"
                >
                    &lt; Prev
                </button>

                {/* Handle page display */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                        className="pagination-buttons"
                    >
                        {index + 1}
                    </button>
                ))}

                {/* Handle next */}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="pagination-buttons"
                >
                    Next &gt;
                </button>
            </div>
        </section>
    );
}

export default SpotManageIndex;
