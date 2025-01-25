import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

//-----------------------------------------------------------------------------
//                        Rating + Review
//-----------------------------------------------------------------------------
const Rating = ({ value, text }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-2">
        
      <span className="flex">
        {stars.map((_, index) => {
          if (value >= index + 1) {
            return (
              <span key={index} className="text-yellow-500 text-xl">
                <FaStar />
              </span>
            );
          } else if (value >= index + 0.5) {
            return (
              <span key={index} className="text-yellow-500 text-xl">
                <FaStarHalfAlt />
              </span>
            );
          } else {
            return (
              <span key={index} className="text-gray-300 text-xl">
                <FaRegStar />
              </span>
            );
          }
        })}
      </span>
      <span className="text-gray-600 text-sm font-medium">{ text && text }</span>
    </div>
  );
};

export default Rating;
