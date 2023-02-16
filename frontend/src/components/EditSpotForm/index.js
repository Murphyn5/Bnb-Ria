import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import './EditSpotForm.css'
import ColoredLine from '../ColoredLine';
import { createSpotImage, editSpot, getOneSpot} from '../../store/spots';


const EditSpotForm = () => {
    const { spotId } = useParams()
    let spot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const spotRestore = async () => {
            await dispatch(getOneSpot(spotId))

        }
        spotRestore()
    }, [dispatch, spotId])

    const history = useHistory();
    const [country, setCountry] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [spotName, setSpotName] = useState('');
    const [price, setPrice] = useState('')
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [showCountryError, setShowCountryError] = useState(false)
    const [showAddressError, setShowAddressError] = useState(false)
    const [showCityError, setShowCityError] = useState(false)
    const [showStateError, setShowStateError] = useState(false)
    const [showLatError, setShowLatError] = useState(false)
    const [showLongError, setShowLongError] = useState(false)
    const [showDescError, setShowDescError] = useState(false)
    const [showNameError, setShowNameError] = useState(false)
    const [showPriceError, setShowPriceError] = useState(false)
    const [showPreviewImageError1, setShowPreviewImageError1] = useState(false)
    const [showPreviewImageError2, setShowPreviewImageError2] = useState(false)
    const [errors, setErrors] = useState([])
    const updateCountry = (e) => setCountry(e.target.value);
    const updateStreetAddress = (e) => setStreetAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateLatitude = (e) => setLatitude(e.target.value);
    const updateLongitude = (e) => setLongitude(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateSpotName = (e) => setSpotName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImageUrl = (e) => setPreviewImageUrl(e.target.value)

    useEffect(() => {
        setCountry(spot.country)
        setState(spot.state)
        setStreetAddress(spot.address)
        setCity(spot.city)
        setLatitude(spot.lat)
        setLongitude(spot.lng)
        setDescription(spot.description)
        setSpotName(spot.name)
        setPrice(spot.price)
        if(spot.country){
            if(spot.SpotImages.length > 0) {
                let spotImages = spot.SpotImages
                let previewImageArray = spotImages.filter((image) => {
                    if (image.preview === true) {
                        return image
                    }
                })
                if (previewImageArray) {
                    let previewImage = previewImageArray[previewImageArray.length - 1]
                    setPreviewImageUrl(previewImage.url)
                }
            }
        }
    }, [spot])

    const handleSubmit = async (e) => {
        setErrors([])
        e.preventDefault();
        setShowCountryError(false)
        setShowAddressError(false)
        setShowCityError(false)
        setShowStateError(false)
        setShowLatError(false)
        setShowLongError(false)
        setShowDescError(false)
        setShowNameError(false)
        setShowPriceError(false)
        setShowPreviewImageError1(false)
        setShowPreviewImageError2(false)


        if (country.length === 0) {
            errors.push('country input error')
            setShowCountryError(true)
        }

        if (streetAddress.length === 0) {
            errors.push('address input error')
            setShowAddressError(true)
        }

        if (city.length === 0) {
            errors.push('city input error')
            setShowCityError(true)
        }

        if (state.length === 0) {
            errors.push('state input error')
            setShowStateError(true)
        }

        console.log('lat', typeof parseFloat(latitude), parseFloat(latitude))

        console.log('lng', typeof parseFloat(longitude), parseFloat(longitude))

        if(longitude !== '' && latitude === '') {
            errors.push('latitude input error')
            setShowLatError(true)
        }

        if(longitude === '' && latitude !== '') {
            errors.push('latitude input error')
            setShowLongError(true)
        }

        if (description.length < 30) {
            errors.push('description input error')
            setShowDescError(true)
        }


        if (spotName.length === 0) {
            errors.push('name input error')
            setShowNameError(true)
        }


        if (price < 0 || price === '') {
            errors.push('price input error')
            setShowPriceError(true)
        }

        if (previewImageUrl.length === 0) {
            errors.push('previewImage required error')
            setShowPreviewImageError1(true)
        }

        if (previewImageUrl.length !== 0) {
            if (!previewImageUrl.endsWith('.png') && !previewImageUrl.endsWith('.jpg') && !previewImageUrl.endsWith('.jpeg')) {
                errors.push('previewImage type error')
                setShowPreviewImageError2(true)
            }
        }


        if (errors.length > 0) {
            return
        }

        const spotPayload = {
            id: spotId,
            user: sessionUser,
            address: streetAddress,
            city,
            state,
            country,
            lat: latitude,
            lng: longitude,
            description,
            price,
            name: spotName
        };

        let editedSpot

        if (errors.length === 0) {
            editedSpot = await dispatch(editSpot(spotPayload));
        }

        const prevImagePayload = {
            url: previewImageUrl,
            preview: true,
            spotId: editedSpot.id
        }

        if (errors.length === 0) {
            await dispatch(createSpotImage(prevImagePayload))
        }

        if (editedSpot) {
            await dispatch(getOneSpot(editedSpot.id))
            history.push(`/spots/${editedSpot.id}`);
            <Redirect to={`/spots/${editedSpot.id}`} />
        }

    };

    useEffect(() => {
        if (price < 0) {
            setPrice('')
        }

        if (latitude < -90) {
            setLatitude(-90)
        }

        if (latitude > 90) {
            setLatitude(90)
        }

        if (longitude < -180) {
            setLongitude(180)
        }

        if (longitude > 180) {
            setLongitude(180)
        }

    }, [price, latitude, longitude])

    const fillerBreakDesc = () => {
        if (!showDescError) {
            return <br></br>
        }
    }

    const fillerBreakName = () => {
        if (!showNameError) {
            return <br></br>
        }
    }

    const fillerBreakPrice = () => {
        if (!showPriceError) {
            return <br></br>
        }
    }

    const fillerBreakPrevImg = () => {
        if (!showPreviewImageError1 && !showPreviewImageError2) {
            return <br></br>
        }
    }

    let labelErrorClassName = 'edit-spot-form-label-error'
    let inputErrorClassName = 'edit-spot-form-input-error'
    let imageErrorClassName = 'create-spot-form-image-error'

    return (
        <section className="new-form-holder">
            <form className="edit-spot-form" >
                <h1>Update your Spot</h1>
                <h2>Where's your place located?</h2>
                <div>Guests will only get your exact address once they booked a reservation.</div>
                <br></br>
                <label>
                    <span className='edit-spot-form-label-container'>
                        <span>Country</span>
                        <span className={labelErrorClassName + (showCountryError ? '' : ' hidden')}>Country is required</span>
                    </span>
                    <input
                        type="text"
                        required
                        placeholder={'Country'}
                        value={country}
                        onChange={updateCountry} />
                </label>
                <br></br>
                <label>
                    <span className='edit-spot-form-label-container'>
                        <span>Street Address</span>
                        <span className={labelErrorClassName + (showAddressError ? '' : ' hidden')}>Address is required</span>
                    </span>
                    <input
                        type="text"
                        required
                        placeholder='Street Address'
                        value={streetAddress}
                        onChange={updateStreetAddress} />
                </label>
                <br></br>
                <div className='city-state-container'>
                    <label>
                        <span className='edit-spot-form-label-container'>
                            <span>City</span>
                            <span className={labelErrorClassName + (showCityError ? '' : ' hidden')}>City is required</span>
                        </span>
                        <input
                            className='city-state-input'
                            type="text"
                            min="0"
                            max="100"
                            required
                            placeholder='City'
                            value={city}
                            onChange={updateCity} />
                    </label>
                    <span className='style-comma'>,</span>
                    <label>
                        <span className='edit-spot-form-label-container'>
                            <span>State</span>
                            <span className={labelErrorClassName + (showStateError ? '' : ' hidden')}>State is required</span>
                        </span>
                        <input
                            className='city-state-input'
                            type="text"
                            min="0"
                            max="100"
                            required
                            placeholder='State'
                            value={state}
                            onChange={updateState} />
                    </label>
                </div>
                <br></br>
                <div className='long-lat-container'>
                    <label>
                        <span className='edit-spot-form-label-container'>
                            <span>Latitude (optional)</span>
                            <span className={labelErrorClassName + (showLatError ? '' : ' hidden')}>Latitude required</span>
                        </span>
                        <input
                            className='long-lat-input'
                            type="number"
                            min="-90"
                            max="90"
                            required
                            placeholder='Latitude'
                            value={latitude}
                            onChange={updateLatitude} />
                    </label>
                    <span className='style-comma'>,</span>
                    <label>
                        <span className='edit-spot-form-label-container'>
                            <span>Longitude (optional)</span>
                            <span className={labelErrorClassName + (showLongError ? '' : ' hidden')}>Longitude required</span>
                        </span>
                        <input
                            className='long-lat-input'
                            type="number"
                            min="-180"
                            max="180"
                            required
                            placeholder='Longitude'
                            value={longitude}
                            onChange={updateLongitude} />
                    </label>
                </div>
                <br></br>
                <ColoredLine />
                <h2>Describe your place to guests</h2>
                <div>Mention the best features of your space, any special ammenities like fast
                    wifi or parking, and what you love about the neighborhood.
                </div>
                <br></br>
                <textarea className='edit-spot-form-description'
                    type="text"
                    required
                    placeholder='Description'
                    value={description}
                    onChange={updateDescription} />
                <span className={inputErrorClassName + (showDescError ? '' : ' hidden')}>Description needs a minimum of 30 characters</span>
                {fillerBreakDesc()}
                <ColoredLine />
                <h2>edit a title for your spot</h2>
                <div>Catch guest's attention with a spot title that highlights what makes your
                    place special.
                </div>
                <br></br>
                <input
                    type="text"
                    placeholder="Name your spot"
                    value={spotName}
                    onChange={updateSpotName} />
                <span className={inputErrorClassName + (showNameError ? '' : ' hidden')}>Name is required</span>
                {fillerBreakName()}
                <ColoredLine />
                <h2>Set a base price for your spot</h2>
                <div>Competitive pricing can help your listing stand out and rank higher in search results.
                </div>
                <br></br>
                <div className='edit-spot-form-priceset-container'>
                    <span>{"$"}</span>
                    <input
                        type="number"
                        className='edit-spot-form-priceset-input'
                        placeholder="Price per night (USD)"
                        value={price}
                        min={0}
                        onChange={updatePrice} />
                </div>
                <span className={inputErrorClassName + (showPriceError ? '' : ' hidden')}>Price is required</span>
                {fillerBreakPrice()}
                <ColoredLine />
                <h2>Liven up your spot with photos</h2>
                <div>Submit a link to at least one photo to publish your spot.
                </div>
                <br></br>
                <input
                    type="text"
                    placeholder="Preview Image Url"
                    required
                    value={previewImageUrl}
                    onChange={updatePreviewImageUrl} />
                <span >
                    <span className={imageErrorClassName + (showPreviewImageError1 ? '' : ' hidden')}>Preview image is required.</span>
                    <span className={imageErrorClassName + (showPreviewImageError2 ? '' : ' hidden')}>Image Url must end in .png, .jpg, or .jpeg</span>
                </span>
                {fillerBreakPrevImg()}
                <br></br>
                <button type="submit" onClick={handleSubmit} className={'edit-spot-form-submitbutton enabled'}>Update Spot</button>
                <br></br>
                <br></br>
            </form>
        </section>
    );
};

export default EditSpotForm;
