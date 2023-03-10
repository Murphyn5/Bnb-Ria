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
            </Route>
            {sessionUser && (
              <Route path='/spots/new'>
                <CreateSpotForm />
              </Route>
            )}
            <Route path='/spots/current'>
              <SpotManageIndex />
            </Route>
            <Route path='/spots/:spotId/edit'>
              <EditSpotForm />
            </Route>
            <Route path='/spots/:spotId'>
              <SpotDetail />
            </Route>
            <Route path='/reviews/current'>
              <ManageReviewsindex />
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
