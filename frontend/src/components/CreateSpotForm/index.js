import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './CreateSpotForm.css'
import ColoredLine from '../ColoredLine';
import { createSpot, createSpotImage, getOneSpot} from '../../store/spots';


const CreateSpotForm = () => {

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();
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
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [imageUrl4, setImageUrl4] = useState('');
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
    const [showImageError1, setShowImageError1] = useState(false)
    const [showImageError2, setShowImageError2] = useState(false)
    const [showImageError3, setShowImageError3] = useState(false)
    const [showImageError4, setShowImageError4] = useState(false)
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
    const updateImageUrl1 = (e) => setImageUrl1(e.target.value);
    const updateImageUrl2 = (e) => setImageUrl2(e.target.value);
    const updateImageUrl3 = (e) => setImageUrl3(e.target.value);
    const updateImageUrl4 = (e) => setImageUrl4(e.target.value);

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
        setShowImageError1(false)
        setShowImageError2(false)
        setShowImageError3(false)
        setShowImageError4(false)

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


        if (latitude === '') {
            errors.push('latitude input error')
            setShowLatError(true)
        }


        if (longitude === '') {
            errors.push('longitude input error')
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

        if (imageUrl1 !== '') {
            if (!imageUrl1.endsWith('.png') && !imageUrl1.endsWith('.jpg') && !imageUrl1.endsWith('.jpeg')) {
                errors.push('image1 type error')
                setShowImageError1(true)
            }
        }

        if (imageUrl2 !== '') {
            if (!imageUrl2.endsWith('.png') && !imageUrl2.endsWith('.jpg') && !imageUrl2.endsWith('.jpeg')) {
                errors.push('image2 type error')
                setShowImageError2(true)
            }
        }

        if (imageUrl3 !== '') {
            if (!imageUrl3.endsWith('.png') && !imageUrl3.endsWith('.jpg') && !imageUrl3.endsWith('.jpeg')) {
                errors.push('image3 type error')
                setShowImageError3(true)
            }
        }

        if (imageUrl4 !== '') {
            if (!imageUrl4.endsWith('.png') && !imageUrl4.endsWith('.jpg') && !imageUrl4.endsWith('.jpeg')) {
                errors.push('image4 type error')
                setShowImageError4(true)
            }
        }

        if (errors.length > 0) {
            return
        }


        const spotPayload = {
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

        let createdSpot
        let createdPrevImg

        if (errors.length === 0) {
            createdSpot = await dispatch(createSpot(spotPayload));
        }

        const prevImagePayload = {
            url: previewImageUrl,
            preview: true,
            spotId: createdSpot.id
        }

        const image1Payload = {
            url: imageUrl1,
            preview: false,
            spotId: createdSpot.id
        }

        const image2Payload = {
            url: imageUrl2,
            preview: false,
            spotId: createdSpot.id
        }

        const image3Payload = {
            url: imageUrl3,
            preview: false,
            spotId: createdSpot.id
        }

        const image4Payload = {
            url: imageUrl4,
            preview: false,
            spotId: createdSpot.id
        }

        if (errors.length === 0) {
            createdPrevImg = await dispatch(createSpotImage(prevImagePayload))
        }

        if (imageUrl1 !== '') {
            await dispatch(createSpotImage(image1Payload))
        }

        if (imageUrl2 !== '') {
            await dispatch(createSpotImage(image2Payload))
        }

        if (imageUrl3 !== '') {
            await dispatch(createSpotImage(image3Payload))
        }

        if (imageUrl4 !== '') {
            await dispatch(createSpotImage(image4Payload))
        }

        if (createdSpot && createdPrevImg) {
            await dispatch(getOneSpot(createdSpot.id))
            history.push(`/spots/${createdSpot.id}`);
            <Redirect to={`/spots/${createdSpot.id}`} />
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

    }, [price, latitude, longitude, country, streetAddress, city, state, description, spotName, previewImageUrl, errors])

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

    const fillerBreakImg1 = () => {
        if (!showImageError1) {
            return <br></br>
        }
    }

    const fillerBreakImg2 = () => {
        if (!showImageError2) {
            return <br></br>
        }
    }

    const fillerBreakImg3 = () => {
        if (!showImageError3) {
            return <br></br>
        }
    }

    const fillerBreakImg4 = () => {
        if (!showImageError4) {
            return <br></br>
        }
    }

    let labelErrorClassName = 'create-spot-form-label-error'
    let inputErrorClassName = 'create-spot-form-input-error'
    let imageErrorClassName = 'create-spot-form-image-error'

    return (
        <section className="new-form-holder">
            <form className="create-spot-form" >
                <h1>Create a new Spot</h1>
                <h2>Where's your place located?</h2>
                <div>Guests will only get your exact address once they booked a reservation.</div>
                <br></br>
                <label>
                    <span className='create-spot-form-label-container'>
                        <span>Country</span>
                        <span className={labelErrorClassName + (showCountryError ? '' : ' hidden')}>Country is required</span>
                    </span>
                    <input
                        type="text"
                        required
                        placeholder='Country'
                        value={country}
                        onChange={updateCountry} />
                </label>
                <br></br>
                <label>
                    <span className='create-spot-form-label-container'>
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
                        <span className='create-spot-form-label-container'>
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
                        <span className='create-spot-form-label-container'>
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
                        <span className='create-spot-form-label-container'>
                            <span>Latitude</span>
                            <span className={labelErrorClassName + (showLatError ? '' : ' hidden')}>Latitude must be a number</span>
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
                        <span className='create-spot-form-label-container'>
                            <span>Longitude</span>
                            <span className={labelErrorClassName + (showLongError ? '' : ' hidden')}>Longitude must be a number</span>
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
                <textarea className='create-spot-form-description'
                    type="text"
                    required
                    placeholder='Description'
                    value={description}
                    onChange={updateDescription} />
                <span className={inputErrorClassName + (showDescError ? '' : ' hidden')}>Description needs a minimum of 30 characters</span>
                {fillerBreakDesc()}
                <ColoredLine />
                <h2>Create a title for your spot</h2>
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
                <div className='create-spot-form-priceset-container'>
                    <span>{"$"}</span>
                    <input
                        type="number"
                        className='create-spot-form-priceset-input'
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
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl1}
                    onChange={updateImageUrl1} />
                <span className={imageErrorClassName + (showImageError1 ? '' : ' hidden')}>Image Url must end in .png, .jpg, or .jpeg</span>
                {fillerBreakImg1()}
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl2}
                    onChange={updateImageUrl2} />
                <span className={imageErrorClassName + (showImageError2 ? '' : ' hidden')}>Image Url must end in .png, .jpg, or .jpeg</span>
                {fillerBreakImg2()}
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl3}
                    onChange={updateImageUrl3} />
                <span className={imageErrorClassName + (showImageError3 ? '' : ' hidden')}>Image Url must end in .png, .jpg, or .jpeg</span>
                {fillerBreakImg3()}
                <input
                    type="text"
                    placeholder="Image Url"
                    value={imageUrl4}
                    onChange={updateImageUrl4} />
                <span className={imageErrorClassName + (showImageError4 ? '' : ' hidden')}>Image Url must end in .png, .jpg, or .jpeg</span>
                {fillerBreakImg4()}
                <ColoredLine />
                <br></br>
                <button type="submit" onClick={handleSubmit} className={'create-spot-form-submitbutton enabled'}>Create Spot</button>
                <br></br>
                <br></br>
            </form>
        </section>
    );
};

export default CreateSpotForm;
