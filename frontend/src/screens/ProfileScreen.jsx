import { useEffect, useState } from 'react';
import { useProfileMutation } from '../features/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';
import { useGetMyOrdersQuery } from '../features/ordersApiSlice';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.data.user.name);
      setEmail(userInfo.data.user.email);
    }
  }, [userInfo.data.user.name, userInfo.data.user.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success('Profile Updated Successfully');
    } else {
      toast.error('Password do not matched');
    }
  };

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  // console.log("myOrders : ", orders);
  // console.log("paid : ", orders[0].isPaid); console can also create error. order takes time to display. in jsx, i've mentioned loading but not here after console, so i made whole page crash as order was loaded instanltly so log was not able to understand order so page crashed

  return (
    <>
      <div className="grid grid-cols-3 gap-8 p-4">
        {/* User Profile */}
        <div className="col-span-1 bg-white p-4">
          <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
          {loadingUpdateProfile ? (
            <div>Loading Profile...</div>
          ) : (
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Orders */}
        <div className="col-span-2 bg-white p-4">
          <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
          {isLoading ? (
            <div>Loading Orders...</div>
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className="grid text-sm border-t border-gray-300 ">
              {/* Table Headers */}
              <div className="grid grid-cols-8 text-center">
                <div className="font-semibold py-2 col-span-3">ID</div>
                <div className="font-semibold py-2 col-span-1">DATE</div>
                <div className="font-semibold py-2 col-span-1">TOTAL</div>
                <div className="font-semibold py-2 col-span-1">PAID</div>
                <div className="font-semibold py-2 col-span-1">DELIVERED</div>
                <div></div>
              </div>

              {/* Table Data */}
              {orders.map((items, index) => (
                <div
                  key={items._id}
                  className="grid grid-cols-8 border-b border-gray-300"
                >
                  <div
                    className={`profile-row col-span-3 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {items._id}
                  </div>
                  <div
                    className={`profile-row col-span-1 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {items.createdAt.substring(0, 10)}
                  </div>
                  <div
                    className={`profile-row col-span-1 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {items.totalPrice}
                  </div>
                  <div
                    className={`profile-row col-span-1 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {items.isPaid ? (
                      items.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </div>
                  <div
                    className={`profile-row col-span-1 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    {items.isDelivered ? (
                      items.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </div>
                  <Link to={`/order/${items._id}`}
                    className={`profile-row col-span-1 ${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                    }`}
                  >
                    Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProfileScreen;
