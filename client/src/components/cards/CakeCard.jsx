import { Link } from 'react-router-dom'

const CakeCard = ({cake}) => {
  return (
    <div className='border-2 border-pink-200 rounded-2xl p-4 m-4 shadow-md transform hover:scale-105 transition-transform duration-200'>
      <Link to={`/cake/${cake._id}`} className='text-decoration-none'>
        <h1 className='text-2xl font-bold text-pink-600'>{cake.cakeName}</h1>
        <h2 className='text-xl font-bold text-gray-700'>${cake.cakePrice}</h2>
        <p className='text-lg text-gray-600'>{cake.cakeDescription}</p>
      </Link>
    </div>
  )
}

export default CakeCard