//this displays all of the current user's playlists

import { getAllPlaylists } from "../../store/playlists";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";