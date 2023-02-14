import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem';
import './SpotIndex.css'

const SpotIndex = () => {
  const dispatch = useDispatch()
  const spots = useSelector(getAllSpots);
  let sortedSpots = spots.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  return (
    <section>
      <ul className='spots-grid'>
        {
          sortedSpots.map(spot => (
            <SpotIndexItem
              spot={spot}
              key={spot.id}
            />
          ))
        }
      </ul>
    </section>
  );
}

export default SpotIndex;
