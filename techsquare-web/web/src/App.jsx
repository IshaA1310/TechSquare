import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./NavBar"
import Base from "./Base"
import Login from "./Login"
import Profile from "./Profile"
import appStore from "./utils/appStore"
import { Provider } from "react-redux"

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Base/>}>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      {/* <NavBar/> */}
      {/* <h1 className="text-4xl">Hello World!</h1> */}
    </>
  )
}

export default App
