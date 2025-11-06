document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loaderWrapper');
    const mainContent = document.getElementById('mainContent');
    const countdownElement = document.getElementById('countdown');
    const countdownMessageElement = document.getElementById('countdownMessage');

    
    // --------------------------------------------------------

    // Set the target date for November 30, 2025
    const targetDate = new Date('2025-11-06T00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Happy Birthday!";
            countdownMessageElement.textContent = "It's finally here! Get ready for your surprise!";
            
            setTimeout(() => {
                loaderWrapper.style.opacity = '0';
                loaderWrapper.style.visibility = 'hidden';
                mainContent.classList.remove('hidden');
                initMainContent(); // Initialize time-sensitive content
            }, 1000); 
        } else {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); 


    // Function to initialize main content features (Balloon and Carousel remain here)
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
            const containerWidth = balloonContainer.offsetWidth || 800; 
            const containerHeight = balloonContainer.offsetHeight || 480; 
            const leftPos = Math.random() * (containerWidth - 100); 
            const topPos = Math.random() * (containerHeight - 100);
            balloon.style.left = `${leftPos}px`;
            balloon.style.top = `${topPos}px`;

            // Random animation delay and duration
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            balloon.style.animationDuration = `${5 + Math.random() * 5}s`; 

            // Assign a message to the balloon
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

        // Create initial balloons
        for (let i = 0; i < 15; i++) {
            createBalloon();
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

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
		
    }
});
