const Card = ({ children }) => {
    return (
      <div className="bg-white w-150 border shadow-sm rounded-sm hover:shadow-lg transition-all duration-300">
        <div className="p-3">
        {children}
        </div>
      </div>
    );
  };
  
  export default Card;