import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer>
        <div className="container text-center">
            Shopinn &copy; {currentYear}
        </div>
    </footer>
  )
}

export default Footer