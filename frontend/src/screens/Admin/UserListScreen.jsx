import { FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import Message from '../../components/Message';
import { useGetUsersQuery, useDeleteUserMutation } from '../../features/userApiSlice';
import Loader from '../../components/Loader';
import useAutoHideScroll from '../../hooks/useAutoHideScroll';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const UserListScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [filterAdmin, setFilterAdmin] = useState('');
    const [queryParams, setQueryParams] = useState({
        search: '',
        sortBy: 'newest',
        filterAdmin: ''
    });

    const { data: users, isLoading, error, refetch } = useGetUsersQuery(queryParams);
    const [isScrollVisible, setGridRef] = useAutoHideScroll({ hideDelay: 5000 });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((value) => {
            setQueryParams(prev => ({ ...prev, search: value }));
        }, 500),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        setQueryParams(prev => ({ ...prev, sortBy: value }));
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterAdmin(value);
        setQueryParams(prev => ({
            ...prev,
            filterAdmin: value // This will be 'true', 'false', or ''
        }));
        refetch(); // Force a refetch when filter changes
    };

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteUser(userToDelete._id)
            await refetch()
            setUserToDelete(null)
            setIsDeleteModalOpen(false);
            toast.success("User deleted successfully")
        } catch (error) {
            toast.error(error?.data?.message || error.data)
        }
    };

    return (
        <div className="p-4">
            {/* Header */}
            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
                </div>
                
                {/* Search, Sort, and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="min-w-[200px]">
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                        >
                            <option value="nameAsc">Name (A → Z)</option>
                            <option value="nameDesc">Name (Z → A)</option>
                            <option value="newest">Newest Created</option>
                            <option value="oldest">Oldest Created</option>
                            <option value="recentlyUpdated">Recently Updated</option>
                            <option value="leastRecentlyUpdated">Earliest Updated</option>
                        </select>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="min-w-[180px]">
                        <select
                            value={filterAdmin}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white"
                        >
                            <option value="">All Users</option>
                            <option value="true">Admins Only</option>
                            <option value="false">Regular Users</option>
                        </select>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    {/* Grid Header */}
                    <div className="grid gap-4 bg-gray-100 p-4 rounded-t-lg font-semibold text-gray-700"
                        style={{ gridTemplateColumns: '1fr 1.5fr 2fr 1fr 100px' }}>
                        <div className="truncate">ID</div>
                        <div>NAME</div>
                        <div>EMAIL</div>
                        <div className="text-center">ADMIN</div>
                        <div className="text-center">ACTIONS</div>
                    </div>

                    {loadingDelete && <Loader />}
                    {/* Grid Body */}
                    <div
                        ref={setGridRef}
                        className={`bg-white rounded-b-lg shadow-sm h-[63vh] overflow-y-auto transition-all duration-300 ${
                            isScrollVisible ? 'scrollbar-visible' : 'scrollbar-hidden'
                        }`}
                    >
                        <style>
                            {`
                                .scrollbar-visible::-webkit-scrollbar {
                                    width: 8px;
                                }
                                .scrollbar-visible::-webkit-scrollbar-track {
                                    background: #f1f1f1;
                                }
                                .scrollbar-visible::-webkit-scrollbar-thumb {
                                    background: #888;
                                    border-radius: 4px;
                                }
                                .scrollbar-hidden::-webkit-scrollbar {
                                    width: 0;
                                    background: transparent;
                                }
                                .scrollbar-visible {
                                    scrollbar-width: thin;
                                    scrollbar-color: #888 #f1f1f1;
                                }
                                .scrollbar-hidden {
                                    scrollbar-width: none;
                                    -ms-overflow-style: none;
                                }
                            `}
                        </style>
                        {users?.map((user) => (
                            <div
                                key={user._id}
                                className="grid gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center"
                                style={{ gridTemplateColumns: '1fr 1.5fr 2fr 1fr 100px' }}
                            >
                                <div className="text-sm text-gray-600 truncate">{user._id}</div>
                                <div className="text-gray-800 text-sm truncate">{user.name}</div>
                                <div className="text-gray-600 truncate">
                                    <a href={`mailto:${user.email}`} className="hover:text-blue-600">
                                        {user.email}
                                    </a>
                                </div>
                                <div className="flex justify-center">
                                    {user.isAdmin ? (
                                        <FaCheck className="text-green-600 text-xl" />
                                    ) : (
                                        <FaTimes className="text-red-600 text-xl" />
                                    )}
                                </div>
                                <div className="flex space-x-3 justify-center">
                                    <button
                                        onClick={() => {
                                            toast.info('Edit functionality coming soon');
                                        }}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                        disabled={user.isAdmin}
                                    >
                                        <FaEdit className="text-xl" />
                                    </button>
                                    <button
                                       className={`transition-colors text-red-600 ${
                                            user.isAdmin
                                            ? "cursor-not-allowed"
                                            : "hover:text-red-800"
                                        }`}
                                        onClick={() => handleDeleteClick(user)}
                                        disabled={user.isAdmin}
                                    >
                                        <FaTrash className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setUserToDelete(null);
                        }}
                        onDelete={handleDeleteConfirm}
                        itemName={userToDelete?.name || ''}
                    />
                </>
            )}
        </div>
    );
};

export default UserListScreen;
