import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  console.log(user);
  return (
    <div>
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
  </div>
  )
}
export default Home