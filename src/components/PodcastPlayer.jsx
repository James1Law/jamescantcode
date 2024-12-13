import { useState, useRef, useEffect } from 'react';
import CVViewer from './CVViewer';
import LinkedInPost from './LinkedInPost';
import '../styles/PodcastPlayer.css';

function PodcastPlayer({ audioSrc, onReset }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
    };
  }, [isDragging]);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    setProgress(value);
    const time = (value * duration) / 100;
    setCurrentTime(time);
    if (!isDragging) {
      audioRef.current.currentTime = time;
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => {
    setIsDragging(false);
    audioRef.current.currentTime = currentTime;
  };

  const skipTime = (seconds) => {
    const newTime = audioRef.current.currentTime + seconds;
    audioRef.current.currentTime = Math.max(0, Math.min(newTime, duration));
  };

  const handlePlaybackRate = () => {
    const rates = [1, 1.5, 2, 0.75];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    audioRef.current.playbackRate = nextRate;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setPlaybackRate(1);
    audioRef.current.playbackRate = 1;
    onReset();
  };

  return (
    <div className="podcast-container">
      <div className="podcast-player">
        <audio 
          ref={audioRef}
          src={audioSrc}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="progress-container">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            className="progress-slider"
            onChange={handleProgressChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
          />
        </div>
        <div className="controls-container">
          <button onClick={() => skipTime(-10)} className="control-button">
            -10s
          </button>
          <button onClick={togglePlayPause} className="play-button">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={() => skipTime(10)} className="control-button">
            +10s
          </button>
          <button onClick={handlePlaybackRate} className="speed-button">
            {playbackRate}x
          </button>
          <button onClick={handleReset} className="reset-button">
            ↺
          </button>
        </div>
      </div>
      <LinkedInPost />
      <CVViewer />
    </div>
  );
}

export default PodcastPlayer; 