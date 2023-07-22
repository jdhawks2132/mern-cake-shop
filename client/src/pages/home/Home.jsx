import { useQuery } from '@apollo/client'
import { QUERY_CAKES} from '../../utils/queries'

import CardContainer from '../../components/cards/CardContainer'

const Home = ({currentUser}) => {

  const { loading, data : cakeData } = useQuery(QUERY_CAKES)
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {/* Create a div using tailwindcss as a welcome header for the home page - make it it cute and use pink and gray */}
      <div className="text-4xl font-bold text-center text-pink-500 my-11">
        <h2>Welcome to Wustl Bakes!</h2>
        <p className="text-2xl font-bold text-center text-gray-500">The best place to find cakes in St. Louis</p>
        {/* welcome back, currentUser.username */}
        <p className="text-lg font-bold text-center text-gray-500">🧁 Welcome back, {currentUser.username} 🧁</p>
      </div>
        <CardContainer cakes={cakeData?.cakes || []} />
  </div>
  )
}
export default Home