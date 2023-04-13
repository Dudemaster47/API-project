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
import Albums from "./components/Albums";

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
          <Route key={1} path="/signup">
            <SignupFormPage />
          </Route>
          <Route key={2} path="/songs/new">
            <CreateSongForm />
          </Route>
          <Route key={3} path="/songs/:songId/edit">
            <EditSongForm />
          </Route>
          <Route key={4} path="/songs/:songId/comments">
            <CreateCommentForm />
          </Route>
          <Route key={5} path="/songs/:songId">
            <SongDetail />
          </Route>
          <Route key={6} path="/comments/:commentId/edit">
            <EditCommentForm />
          </Route>
          <Route key={7} path="/albums">
            <Albums />
          </Route>
          <Route key={8} path="/albums/:albumId">
          </Route>
          <Route key={9} path="/albums/:albumId/edit">
          </Route>
          <Route key={10} path="/playlists">
          </Route>
          <Route key={11} path="playlists/:playlistId">
          </Route>
          <Route key={12} path="playlists/:playlistId/edit">
          </Route>
          <Route key={13} path="/">
            <Songs />
          </Route>
          <Route key={14}>
            <h3>404 not found</h3>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;