import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false }) => {
    return (
        <div className="flex items-center justify-center mt-8 mb-2">
            <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {/* Previous Button */}
                <Link
                    to={page > 1 && !isAdmin ? `/page/${page - 1}`  : `/admin/productlist/${page - 1}`}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border text-sm font-medium
                        ${page <= 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'
                        }`}
                >
                    <FaChevronLeft className="h-4 w-4" />
                </Link>

                {/* Page Numbers */}
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={ !isAdmin ? `/page/${x+1}`  : `/admin/productlist/${x+1}` }
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                            ${x + 1 === page
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        {x + 1}
                    </Link>
                ))}

                {/* Next Button */}
                <Link
                    to={page < pages && !isAdmin ? `/page/${page+1}`  : `/admin/productlist/${page+1}`}
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border text-sm font-medium
                        ${page >= pages 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'
                        }`}
                >
                    <FaChevronRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
};

export default Paginate;
