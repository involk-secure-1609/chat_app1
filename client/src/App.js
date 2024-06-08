import './App.css';
import Form from './modules/LogInSignIn';
import Dashboard from './modules/MainScreen';
import { Routes, Route,Navigate } from 'react-router-dom';
// import VidScreen from './videoscreen';
import LobbyScreen from './VideoCalling/screens/Lobby';
import RoomPage from './VideoCalling/screens/Rooms';
import EmailVerify from './modules/LogInSignIn/EmailVerification';
const ProtectedRoute = ({ children,auth=false }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null || false;

  if(!isLoggedIn && auth) {
    return <Navigate to={'/users/sign_in'} />
  }else if(isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)){
    console.log('object :>> ');
    return <Navigate to={'/'} />
  }

  return children
}

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute auth={true}>
          <Dashboard/>
        </ProtectedRoute>
      } />
      <Route path='/users/sign_in' element={
      <ProtectedRoute>
        <Form isSignInPage={true}/>
      </ProtectedRoute>
      } />
      <Route path='/users/sign_up' element={
        <ProtectedRoute>
        <Form isSignInPage={false}/>
      </ProtectedRoute>
      } />
        {/* <Route path='/video_call' element={
        <ProtectedRoute>
        <VidScreen/>
      </ProtectedRoute>
      } /> */}
      <Route path='/users/:id/verify/' element={
        <ProtectedRoute>
        <EmailVerify/>
      </ProtectedRoute>
      } />
      <Route path="/lobby/:fullname" element={
        <ProtectedRoute>
        <LobbyScreen />
      </ProtectedRoute>
      } />
      <Route path="/room/:roomId" element={
        <ProtectedRoute>
        <RoomPage />
      </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
