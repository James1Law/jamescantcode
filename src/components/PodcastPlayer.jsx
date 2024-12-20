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
            <span className="skip-text">-10</span>
          </button>
          <button onClick={togglePlayPause} className="play-button">
            {isPlaying ? 
              <svg viewBox="0 0 24 24" className="control-icon">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              : 
              <svg viewBox="0 0 24 24" className="control-icon">
                <path d="M8 5v14l11-7z" />
              </svg>
            }
          </button>
          <button onClick={() => skipTime(10)} className="control-button">
            <span className="skip-text">+10</span>
          </button>
          <button onClick={handlePlaybackRate} className="speed-button">
            {playbackRate}x
          </button>
        </div>
      </div>
      
      <button onClick={handleReset} className="floating-reset-button">
        <svg viewBox="0 0 24 24" className="reset-icon">
          <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>
      </button>

      <LinkedInPost />
      <CVViewer />
    </div>
  );
}

export default PodcastPlayer; 