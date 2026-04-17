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

    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navInner  = document.querySelector('.nav-inner');
    const headerEl  = document.querySelector('header');

    function pinDropdown() {
        if (navInner && headerEl) {
            navInner.style.top = headerEl.offsetHeight + 'px';
        }
    }
    pinDropdown();
    window.addEventListener('resize', pinDropdown);

    if (hamburger && navInner) {
        hamburger.addEventListener('click', () => {
            const open = hamburger.classList.toggle('open');
            navInner.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', open);
        });
        navInner.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navInner.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Skeleton Loading ---
    function skeletonForImg(img, skeletonClass) {
        if (img.complete && img.naturalWidth > 0) return;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.4s ease';
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton-box ' + skeletonClass;
        img.parentNode.insertBefore(skeleton, img);
        const reveal = () => { skeleton.remove(); img.style.opacity = '1'; };
        img.addEventListener('load',  reveal, { once: true });
        img.addEventListener('error', reveal, { once: true });
    }

    // Team member photos
    document.querySelectorAll('.team-member-card img').forEach(img => {
        skeletonForImg(img, 'skeleton-team-img');
    });

    // Carousel images
    document.querySelectorAll('.carousel-slide img').forEach(img => {
        skeletonForImg(img, 'skeleton-carousel-img');
    });

    // Hero video
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        const videoSkeleton = document.createElement('div');
        videoSkeleton.className = 'skeleton-box skeleton-video-box';
        heroVideo.style.opacity = '0';
        heroVideo.style.transition = 'opacity 0.4s ease';
        heroVideo.parentNode.insertBefore(videoSkeleton, heroVideo);
        if (heroVideo.readyState >= 2) {
            videoSkeleton.remove();
            heroVideo.style.opacity = '1';
        } else {
            const revealVideo = () => { videoSkeleton.remove(); heroVideo.style.opacity = '1'; };
            heroVideo.addEventListener('loadeddata', revealVideo, { once: true });
            heroVideo.addEventListener('error',      revealVideo, { once: true });
        }
    }

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