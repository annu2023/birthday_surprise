document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loaderWrapper');
    const mainContent = document.getElementById('mainContent');
    const countdownElement = document.getElementById('countdown');
    const countdownMessageElement = document.getElementById('countdownMessage');

    // --- Flip Card Logic (Runs immediately) ---
    const flipCardContainer = document.querySelector('.flip-card-container');
    if (flipCardContainer) {
        flipCardContainer.addEventListener('click', () => {
            flipCardContainer.classList.toggle('flipped');
        });
    }

    // Set the target date for November 30, 2025
    const targetDate = new Date('2025-11-06T00:00:00').getTime();

    // --- Function to initialize Balloons and Carousel ---
    // We call this function later to ensure content is ready.
    function initMainContent() {
        // --- Balloon Pop Logic ---
        const balloonContainer = document.getElementById('balloonContainer');
        const hiddenMessages = [
            "Wishing you a day filled with joy!",
            "May all your dreams come true!",
            "Here's to a year of amazing adventures!",
            "You're simply the best!",
            "Sending you lots of love!",
            "Have a fantastic birthday!",
            "Cheers to another year!",
            "You light up every room!",
            "So glad you're in my life!",
            "A little wish just for you!"
        ];
        const balloonColors = [
            '#ff8a80', '#a7ffeb', '#c8e6c9', '#ffe082', '#b388ff', '#80cbc4'
        ];

        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            
            // Random positioning
            // Ensure balloons are placed within the container dimensions
            const containerWidth = balloonContainer.offsetWidth || 800; 
            const containerHeight = balloonContainer.offsetHeight || 480; 
            const leftPos = Math.random() * (containerWidth - 100); 
            const topPos = Math.random() * (containerHeight - 100);
            balloon.style.left = `${leftPos}px`;
            balloon.style.top = `${topPos}px`;
            
            // Random animation delay and duration
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            balloon.style.animationDuration = `${5 + Math.random() * 5}s`; 

            // Assign a message
            const messageIndex = Math.floor(Math.random() * hiddenMessages.length);
            const message = hiddenMessages[messageIndex];
            balloon.dataset.message = message;
            
            balloon.addEventListener('click', () => {
                if (!balloon.classList.contains('popped')) {
                    balloon.classList.add('popped');
                    // Display message
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('balloon-message');
                    messageElement.textContent = balloon.dataset.message;
                    messageElement.style.left = `${balloon.offsetLeft + balloon.offsetWidth / 2}px`;
                    messageElement.style.top = `${balloon.offsetTop - 30}px`;
                    balloonContainer.appendChild(messageElement);

                    // Remove message after a few seconds
                    setTimeout(() => {
                        messageElement.remove();
                    }, 3000);

                    // Remove balloon after animation
                    setTimeout(() => {
                        balloon.remove();
                        createBalloon(); // Replace with a new balloon
                    }, 500); 
                }
            });
            balloonContainer.appendChild(balloon);
        }

        // Create initial balloons (Run only if container exists)
        if(balloonContainer) {
            for (let i = 0; i < 15; i++) {
                createBalloon();
            }
        }


        // --- Photo Carousel Logic ---
        const carousel = document.querySelector('.carousel');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        let currentIndex = 0;

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
                updateCarousel();
            });
        }
    }
    
    // ------------------------------------------------------------------
    // 🔥 CRUCIAL FIX: CALL initMainContent HERE to populate the page immediately!
    initMainContent(); 
    // ------------------------------------------------------------------


    // --- Countdown Timer Logic ---
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Happy Birthday!";
            countdownMessageElement.textContent = "It's finally here! Get ready for your surprise!";
            
            // Hide the loader and show main content when countdown is passed
            setTimeout(() => {
                loaderWrapper.style.opacity = '0';
                loaderWrapper.style.visibility = 'hidden';
                mainContent.classList.remove('hidden');
            }, 1000); 
        } else {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); 
});
