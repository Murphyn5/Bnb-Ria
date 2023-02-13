import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem';
import './SpotIndex.css'

const SpotIndex = () => {
  const dispatch = useDispatch()
  const spots = useSelector(getAllSpots);
  console.log('asdasdasd', spots)
  return (
    <section>
      <ul className='spots-grid'>
        {
          spots.map(spot => (
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
