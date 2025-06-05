window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    // Start the typing animation after the loading screen disappears
    setTimeout(() => {
      animateMottoText();
    }, 500);
  }, 800); // short delay to ensure smooth transition
});

function animateMottoText() {
  const mottoElement = document.getElementById('dynamic-text');
  const words = ["Community", "Communiti"];
  let currentWordIndex = 0;
  
  function typeAndUntypeWords() {
    const currentWord = words[currentWordIndex];
    const nextWordIndex = (currentWordIndex + 1) % words.length;
    const nextWord = words[nextWordIndex];
    
    // Type current word
    let charIndex = 0;
    let typeInterval = setInterval(() => {
      if (charIndex < currentWord.length) {
        mottoElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        
        // Pause with full word visible
        setTimeout(() => {
          // Delete the current word
          let deleteIndex = currentWord.length;
          let deleteInterval = setInterval(() => {
            if (deleteIndex > 0) {
              mottoElement.textContent = currentWord.substring(0, deleteIndex - 1);
              deleteIndex--;
            } else {
              clearInterval(deleteInterval);
              
              // Move to next word
              currentWordIndex = nextWordIndex;
              
              // Small delay before starting next word
              setTimeout(typeAndUntypeWords, 500);
            }
          }, 150);
        }, 2000); // Pause with word fully visible
      }
    }, 150);
  }
  
  // Start the animation loop
  typeAndUntypeWords();
}

// Load environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

// Initialize Supabase client correctly
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Add the rest of your JavaScript here
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Hide loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
    
    // Handle the waitlist form submission
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const messageDiv = document.getElementById('message');
            const email = emailInput.value.trim();
            
            // Show loading indicator
            messageDiv.textContent = 'Submitting...';
            
            try {
                // Insert email to Supabase
                const { data, error } = await supabase
                    .from('waitlist')
                    .insert([{ email: email }]);
                
                if (error) throw error;
                
                // Success message
                messageDiv.textContent = 'Thanks for joining our waitlist!';
                messageDiv.style.color = '#5BE28F';
                emailInput.value = '';
            } catch (error) {
                // Error message
                messageDiv.textContent = 'Something went wrong. Please try again.';
                messageDiv.style.color = '#FF6B6B';
                console.error('Error:', error);
            }
        });
    }
    
    // Add any other functionality that was in your bundled JS
});
