import React, {useState, useRef, useEffect} from "react";
import {IoMdPlay, IoMdPause, IoIosSkipBackward, IoIosSkipForward} from "react-icons/io"
import "./AudioPlayer.css"

const AudioPlayer = ({song}) => {
    //state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    //references
    const audioPlayer = useRef(); // ref the audio component
    const progressBar = useRef(); // ref the progress bar
    const animationRef = useRef(); // ref the animation

    const onDurationChangeHandler = (e) => {
        const seconds = Math.floor(e.target.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    };

    const calcTime = (secs) => {
        const minutes = Math.floor(secs/60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const toggleAudio = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current?.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
        setCurrentTime(progressBar.current.value);
    }

    const backThirty = () => {
        progressBar.current.value = Number(progressBar.current.value) - 10;
        changeRange();
    }

    const fwdThirty = () => {
        progressBar.current.value = Number(progressBar.current.value) + 10;
        changeRange();
    }
    //the back and next buttons SHOULD load up the next or previous song in the playlist/album.
    //however... album and playlist functionality aren't implemented yet.
    //so! they'll just be skip forward/back for now.
    return (
        <div className="audioPlayer">
            <audio 
            ref={audioPlayer} 
            src={song?.url} 
            preload="metadata"
            onDurationChange={onDurationChangeHandler}
            ></audio>
            <button className="forwardBackward" onClick={backThirty}><IoIosSkipBackward />10</button>
            <button onClick={toggleAudio} className="playPause"> 
                { isPlaying ? <IoMdPause className="pause" /> : <IoMdPlay className="play" />}
            </button>
            <button className="forwardBackward" onClick={fwdThirty}><IoIosSkipForward />10</button>

            {/* current time */}
            <div className="currentTime">{calcTime(currentTime)} </div>

            {/* progress bar */}
            <div>
                <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
            </div>

            {/* duration */}
            <div className="duration">{!isNaN(duration) && calcTime(duration)}</div>
        </div>
    );
}

export default AudioPlayer;