import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots, getSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem';
import './SpotIndex.css'

const SpotIndex = () => {
  const dispatch = useDispatch()
  const spots = useSelector(getAllSpots);
  const user = useSelector(state => state.session.user)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

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
      await dispatch(getSpots())
    }
    spotRestore()
  }, [])


  spots.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  if (!spots[0]) {
    return
  }
  spots.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  return (
    <section>

      <ul className="spots-grid">
        {itemDisplay.map(spot => (
          <SpotIndexItem
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
      {/* <ul className='spots-grid'>
        {
          spots.map(spot => (
            <SpotIndexItem
              spot={spot}
              key={spot.id}
            />
          ))
        }
      </ul> */}
    </section>
  );
}

export default SpotIndex;
