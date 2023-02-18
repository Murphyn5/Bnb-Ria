import { useEffect } from 'react';
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
                    spots.map(spot => (
                        <SpotManageIndexItem
                            spot={spot}
                            key={spot.id}
                        />
                    ))
                }
            </ul>
        </section>
    );
}

export default SpotManageIndex;
