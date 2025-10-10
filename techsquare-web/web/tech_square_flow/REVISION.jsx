import { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, BrowserRouter, Routes, Route, Link } from "react-router-dom";

const dispatch = useDispatch();
const navigate = useNavigate();
const [email, setEmailId] = useState('');
const user = useSelector((store) => {});
const effect = useEffect({},[]);

// <Outlet/>

<Provider store={appStore}>
  <BrowserRouter basename="/">
    <Routes>
      <Route>
        <Link></Link>
      </Route>
    </Routes>
  </BrowserRouter>
</Provider>
