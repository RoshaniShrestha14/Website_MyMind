 
  // JavaScript to handle collapsible FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.toggle-icon');

        if (content.style.display === 'block') {
            content.style.display = 'none';
            icon.textContent = '+';
        } else {
            content.style.display = 'block';
            icon.textContent = '-';
        }
    });
});

// Function to display blog posts from localStorage
function displayBlogs() {
    const blogPostsContainer = document.getElementById('blogPosts');
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    
    // Clear the existing posts
    blogPostsContainer.innerHTML = '<h3>Recent Blogs:</h3>';
    
    // Loop through saved blogs and display them
    savedBlogs.forEach(blog => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog-post');
        blogDiv.innerHTML = `
            <h4>${blog.title}</h4>
            <p>${blog.content}</p>
        `;
        blogPostsContainer.appendChild(blogDiv);
    });
}

// Function to save the blog post
function saveBlogPost(title, content) {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    
    // Add the new blog to the array
    savedBlogs.push({ title, content });
    
    // Save the updated array to localStorage
    localStorage.setItem('blogs', JSON.stringify(savedBlogs));
    
    // Display updated blogs
    displayBlogs();
}
// Handle form submission
document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const blogTitle = document.getElementById('blog-title').value;
    const blogContent = document.getElementById('blogContent').value;

    if (blogTitle && blogContent) {
        saveBlogPost(blogTitle, blogContent);
        document.getElementById('blogForm').reset(); // Reset the form after submission
    }
});

// Display blogs on page load
window.onload = function() {
    displayBlogs();
};


//Stress Management
// audio.js
function playAudio(audioId) {
    const audioElement = document.getElementById(audioId);
    if (audioElement) {
        audioElement.play().catch(error => {
            console.error("Audio playback failed: ", error);
        });
    }
}

// Function to start or restart the timer
function startTimer(timerId, buttonId, initialTime) {
    let time = initialTime;
    let intervalId;
    const timerElement = document.getElementById(timerId);
    const buttonElement = document.getElementById(buttonId);
    // Function to start or restart the timer
    function start() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        time = initialTime;
        timerElement.textContent = time;
        buttonElement.textContent = 'Restart';
        buttonElement.style.display = 'none'; // Hide the button initially while the timer is running

        playAudio('start-sound');
        
        intervalId = setInterval(() => {
            if (time <= 0) {
                clearInterval(intervalId);
                timerElement.textContent = 'Time\'s up!';
                buttonElement.textContent = 'Restart'; // Change button text to Restart after time is up
                buttonElement.style.display = 'inline'; // Show the Restart button

                
            } else {
                timerElement.textContent = time;
                time--;
            }
        }, 1000);
    }

    // Start the timer on button click
    buttonElement.addEventListener('click', start);
}

// Initialize timers for each flashcard with restart functionality
startTimer('timer-1', 'start-timer-1', 20);
startTimer('timer-2', 'start-timer-2', 20);
startTimer('timer-3', 'start-timer-3', 20);
startTimer('timer-4', 'start-timer-4', 20);
startTimer('timer-5', 'start-timer-5', 20);


