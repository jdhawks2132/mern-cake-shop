import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CAKE, QUERY_ME } from '../../utils/queries';
import { ADD_CAKE_TO_USER} from '../../utils/mutations';
import { motion } from 'framer-motion';

const CakeDetail = () => {
  const { cakeId } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery(QUERY_SINGLE_CAKE, {
    variables: { cakeID : cakeId }
  });

  const { data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  const [addCakeToUser] = useMutation(ADD_CAKE_TO_USER);

  const cake = data?.cake || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = async () => {
   
    try {
      await addCakeToUser({
        variables: { cakeId: cakeId }
      });
    
      alert('Cake added to cart!');
      navigate('/cart')
    } catch (e) {
      console.error(e);
    }


  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center bg-pink-200 p-4 rounded-xl shadow-lg mt-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{cake.cakeName}</h1>
        <motion.img 
          className="w-1/2 mx-auto mb-4 rounded" 
          src={cake.cakeImage} 
          alt={cake.cakeName} 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        <p className="text-2xl font-bold text-gray-800 mb-4">${cake.cakePrice}</p>
      </div>
      <div className="bg-gray-200 text-gray-800 p-6 rounded shadow-lg max-w-2xl mx-auto text-center">
        <h2 className="font-bold text-xl mb-2">Description</h2>
        <p className="text-lg">{cake.cakeDescription}</p>
      </div>
      <div className="flex flex-row items-center justify-center mt-6">
        <button 
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mx-2 transition-colors duration-300"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        {/* check to see if the user already has this cake in user.cakes and conditionally render a button or a 'disabled' button that says already in cart */}
        {user.cakes.find(cake => cake._id === cakeId) ? (
          <p
            className="bg-black text-pink-400 font-bold py-2 px-4 rounded mx-2 transition-colors duration-300"
            disabled
          >
            Already in cart
          </p>
        ) : (
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mx-2 transition-colors duration-300"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CakeDetail;