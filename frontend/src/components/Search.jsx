import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const Search = () => {

    const { keyword: urlKeyword } = useParams()
    const [keyword, setKeyword] = useState(urlKeyword || '');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(keyword){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center max-w-xl mx-auto">
            <div className="relative flex-1 mr-2">
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent"
                />
            </div>
            <button
                type="submit"
                className="px-6 py-3 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent transition-colors"
            >
                <FaSearch className="w-4 h-4" />
            </button>
        </form>
    );
};

export default Search;