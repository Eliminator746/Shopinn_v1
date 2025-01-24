const Card = ({ children }) => {
    return (
      <div className="flex flex-col flex-grow bg-white border shadow-sm rounded-sm hover:shadow-lg transition-all duration-300">
        {children}
      </div>
    );
  };
  
  export default Card;