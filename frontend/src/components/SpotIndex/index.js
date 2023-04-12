import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots, getSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem';
import './SpotIndex.css'

const SpotIndex = () => {
  const dispatch = useDispatch()
  const spots = useSelector(getAllSpots);
  const user = useSelector(state => state.session.user)

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
