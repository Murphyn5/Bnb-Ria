import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getOneSpot } from "../../store/spots"
import './SpotDetail.css'



const SpotDetail = () => {
    const dispatch = useDispatch()

    const { spotId } = useParams()

    let count = 0

    let spot = useSelector(state => state.spots.singleSpot)


    // useEffect(() => {
    //     const dispatchGetOneSpot = async () => {
    //         await dispatch(getOneSpot(spotId))
    //     }
    //     dispatchGetOneSpot()
    //     console.log(spot)
    // }, [])

    // let previewImage = spot.SpotImages.filter((image) => {
    //     if (image.preview === true) {
    //         return image
    //     }
    // })

    // let nonPreviewImages = spot.SpotImages.filter((image) => {
    //     if (image.preview === false) {
    //         return image
    //     }
    // })

    return (

        <section>
            <div className="spot-details-container">
                <h1>{spot.name}</h1>
                <h2>{spot.city}, {spot.state}, {spot.country}, {spot.price}</h2>

            </div>
        </section>
    )
}

export default SpotDetail
