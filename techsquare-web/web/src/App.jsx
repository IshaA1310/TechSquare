import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Base from "./components/Base"
import Login from "./components/Login"
import Profile from "./components/Profile"
import appStore from "./utils/appStore"
import { Provider } from "react-redux"
import Feed from "./components/Feed"
import Signup from "./components/Signup"
import EditProfile from "./components/EditProfile"
import UserList from "./components/UserList"
import Connections from "./components/Connections"
import Requests from "./components/Requests"

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Base/>}>
              <Route path='/' element={<Feed/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path="/signup" element={<Signup/>}></Route>
              <Route path="/editProfile" element={<EditProfile/>}></Route>
              <Route path="/userList" element={<UserList/>}></Route>
              <Route path="/connections" element={<Connections/>}></Route>
              <Route path="/requests" element={<Requests/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      {/* <NavBar/> */}
      {/* <h1 className="text-4xl">Hello World!</h1> */}
    </>
  )
}

export default App;
