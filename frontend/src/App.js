// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/SpotIndex";
import CreateSpotForm from "./components/CreateSpotForm"
import SpotDetail from "./components/SpotDetail";
import SpotManageIndex from "./components/SpotManageIndex";
import EditSpotForm from "./components/EditSpotForm";
import ManageReviewsindex from "./components/ManageReviewsIndex";
import Footer from "./components/Footer";
import BookingsCurrent from "./components/ManageBookingsIndex";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div className="page-content">
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <SpotIndex />
              <Footer></Footer>
            </Route>
            {sessionUser && (
              <Route path='/spots/new'>
                <CreateSpotForm />
                <Footer></Footer>
              </Route>
            )}
            <Route path='/spots/current'>
              <SpotManageIndex />
              <Footer></Footer>
            </Route>
            <Route path='/spots/:spotId/edit'>
              <EditSpotForm />
              <Footer></Footer>
            </Route>
            <Route path='/spots/:spotId'>
              <SpotDetail />
              <Footer></Footer>
            </Route>
            <Route path='/reviews/current'>
              <ManageReviewsindex />
              <Footer></Footer>
            </Route>
            <Route path="/bookings/current">
                <BookingsCurrent />
                <Footer></Footer>
              </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
