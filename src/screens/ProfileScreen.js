import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Nav from '../components/Nav';
import { selectSubs, setCurrentSubscription } from '../features/subsSlice';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import PlansScreen from './PlansScreen';
import './ProfileScreen.css';

function ProfileScreen() {
  const user = useSelector(selectUser);
  const currentSubs = useSelector(selectSubs);
  const dispatch = useDispatch();
  const SignOut = () => {
    auth.signOut();
    dispatch(
      setCurrentSubscription("")
  );
}
return (
  <div className="profileScreen">
    <Nav />
    <div className="profileScreen__body">
      <h1>Edit Profile</h1>
      <div className="profileScreen__info">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
        />
        <div className="profileScreen__details">
          <h2>{user.email}</h2>
          <div className="profileScreen__plans">
            <h3>Plans: {currentSubs?(<span>{`Current plan is ${currentSubs.role}`}</span>):null}</h3>
            <PlansScreen />

            <button
              onClick={SignOut}
              className="profileScreen__signOut"
            >
              Sign Out
                </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ProfileScreen
