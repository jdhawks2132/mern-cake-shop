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
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
        {currentUser !== {} && <h2>
          Welcome Back, {currentUser.username}!
        </h2>}
        <CardContainer cakes={cakeData?.cakes || []} />
  </div>
  )
}
export default Home