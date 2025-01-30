const Message = ({ variant, children }) => {
    let variantClass;
  
    switch (variant) {
      case 'success':
        variantClass = 'bg-green-100 text-green-800 border border-green-400';
        break;
      case 'warning':
        variantClass = 'bg-yellow-100 text-yellow-800 border border-yellow-400';
        break;
      case 'danger':
        variantClass = 'bg-red-100 text-red-800 border border-red-400';
        break;
      case 'info':
      default:
        variantClass = 'bg-blue-100 text-blue-800 border border-blue-400';
        break;
    }
  
    return (
      <div className={`p-4 rounded-md ${variantClass}`}>
        {children}
      </div>
    );
  };
  
  Message.defaultProps = {
    variant: 'info', // Default variant is 'info'
  };
  
  export default Message;
  