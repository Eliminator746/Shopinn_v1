import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Message from '../../components/Message';
import { useGetUsersQuery, useDeleteUserMutation } from '../../features/userApiSlice';
import Loader from '../../components/Loader';
import useAutoHideScroll from '../../hooks/useAutoHideScroll';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const [isScrollVisible, setGridRef] = useAutoHideScroll({ hideDelay: 5000 });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
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
