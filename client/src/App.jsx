import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from './utils/queries';

import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Navbar from './components/nav/Navbar';
import Goodbye from './pages/auth/Goodbye';
import CakeDetail from './pages/details/CakeDetail';
import Cart from './pages/cart/Cart';

function App() {

  const { loading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  console.log(user);

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }


  return (
    <Router>
      <Navbar currentUser={user}/>
      <div >
        <Routes>
          <Route path="/" element={!isEmpty(user) ? <Home currentUser={user}/> : <Login />} />
          <Route path='/cake/:cakeId' element={ !isEmpty(user) ? <CakeDetail currentUser={user} /> : <Login /> } />
          <Route path='/cart' element={ !isEmpty(user) ? <Cart currentUser={user} /> : <Login /> } />
          <Route path='/login' element={ isEmpty(user) ? <Login /> : <Home currentUser={user} /> } />
          <Route path='/signup' element={  isEmpty(user) ? <Signup /> : <Home currentUser={user} />} />
          <Route path='/goodbye' element={ <Goodbye /> } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
