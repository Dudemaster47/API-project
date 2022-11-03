// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Songs from "./components/Songs";
import SongDetail from "./components/Songs/SongInfo";
import CreateSongForm from "./components/Songs/CreateSongForm";
import EditSongForm from "./components/Songs/EditSongForm";
import CreateCommentForm from "./components/Comments/CreateCommentForm";
import EditCommentForm from "./components/Comments/EditCommentForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs/new">
            <CreateSongForm />
          </Route>
          <Route path="/songs/:songId/edit">
            <EditSongForm />
          </Route>
          <Route path="/songs/:songId/comments">
            <CreateCommentForm />
          </Route>
          <Route path="/songs/:songId">
            <SongDetail />
          </Route>
          <Route path="/songs">
            <Songs />
          </Route>
          <Route path="/comments/:commentId/edit">
            <EditCommentForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;