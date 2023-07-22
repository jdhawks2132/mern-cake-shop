import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { REMOVE_CAKE_FROM_USER } from '../../utils/mutations';
import { motion } from 'framer-motion';

const Cart = () => {
    const { loading, data: userData } = useQuery(QUERY_ME);
    const user = userData?.me || {};

    const [removeCakeFromUser] = useMutation(REMOVE_CAKE_FROM_USER);

    if (loading) {
      return <div>Loading...</div>;
    }

    const totalPrice = user.cakes.reduce((acc, cake) => acc + cake.cakePrice, 0);

    const handleRemoveFromCart = async (cakeId, cakeName) => {
        try {
            await removeCakeFromUser({
                variables: { cakeId: cakeId }
            });
            alert(`${cakeName} removed from cart!`);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <motion.div 
          className="flex flex-col items-center justify-start space-y-4 bg-gray-200 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl font-bold text-pink-500 mb-4 mt-10">Your Cart</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
              {user.cakes.map(cake => (
                <motion.div
                  key={cake._id}
                  className="bg-white shadow rounded-lg overflow-hidden transition-transform duration-500 transform-gpu hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <img className="w-full h-64 object-cover" src={cake.cakeImage} alt={cake.cakeName} />
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-800">{cake.cakeName}</h2>
                    <p className="text-gray-500">${cake.cakePrice}</p>
                  </div>
                    <div className="p-4 flex justify-end space-x-4">
                        <button onClick={() => handleRemoveFromCart(cake._id, cake.cakeName)} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg">Remove</button>
                    </div>
                </motion.div>
              ))}
            </div>
            {user.cakes.length === 0 ? (
              <h2 className="text-lg font-semibold text-gray-800">No cakes in cart yet!</h2>
            ) : (
              <h2 className="text-2xl font-bold text-pink-500">Total: ${totalPrice}</h2>
            )}
        </motion.div>
    );
};

export default Cart;
