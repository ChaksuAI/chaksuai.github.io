// script.js

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    // Add a 'scrolled' class to the header when the page is scrolled more than 10px
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Page Load Scripts ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Video Controls ---
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        const video = document.getElementById('hero-video');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const muteBtn = document.getElementById('mute-btn');
        const seekBackwardBtn = document.getElementById('seek-backward-btn');
        const seekForwardBtn = document.getElementById('seek-forward-btn');

        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');
        const muteIcon = muteBtn.querySelector('.mute-icon');
        const unmuteIcon = muteBtn.querySelector('.unmute-icon');

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
        });

        seekBackwardBtn.addEventListener('click', () => {
            video.currentTime -= 10;
        });

        seekForwardBtn.addEventListener('click', () => {
            video.currentTime += 10;
        });

        video.addEventListener('play', () => {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            playPauseBtn.setAttribute('aria-label', 'Pause');
        });

        video.addEventListener('pause', () => {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            playPauseBtn.setAttribute('aria-label', 'Play');
        });

        video.addEventListener('volumechange', () => {
            if (video.muted) {
                unmuteIcon.style.display = 'none';
                muteIcon.style.display = 'block';
                muteBtn.setAttribute('aria-label', 'Unmute');
            } else {
                unmuteIcon.style.display = 'block';
                muteIcon.style.display = 'none';
                muteBtn.setAttribute('aria-label', 'Mute');
            }
        });
    }
});