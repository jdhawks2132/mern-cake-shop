import { Link } from 'react-router-dom'

const CakeCard = ({cake}) => {
  return (
    <div className='border-2 border-pink-200 rounded-2xl p-4 m-4 shadow-md transform hover:scale-105 transition-transform duration-200'>
      <Link to={`/cake/${cake._id}`} className='text-decoration-none flex flex-col items-center'>
        <img src={cake.cakeImage} alt={cake.cakeName} className='w-11/12 h-64 object-cover rounded-2xl' />
        <h2 className='text-2xl font-bold text-pink-600'>{cake.cakeName}</h2>
        <h3 className='text-xl font-bold text-gray-700'>${cake.cakePrice}</h3>
        <p className='text-lg text-gray-600'>{cake.cakeDescription}</p>
      </Link>
    </div>
  )
}

export default CakeCard