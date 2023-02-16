import "./StarRating.css"

const StarRating = ({rating, hover, setRating, setHover}) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={"rating-button " +  (index <= ((rating && hover) || hover) ? "on" : "off")}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              onDoubleClick={() => {
                setRating(0);
                setHover(0);
                }}
            >
              <i className="star fas fa-star enlarge"></i>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating
