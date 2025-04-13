const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

// Function to create circuit animation
function createCircuitAnimation() {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        const circuit = document.createElement('div');
        circuit.className = 'circuit-decoration';
        container.appendChild(circuit);
    });
}

// Function to handle form switching with animation
function switchForm(hideForm, showForm) {
    // Add fade out animation to the form being hidden
    hideForm.style.opacity = '0';
    hideForm.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        hideForm.style.display = 'none';
        showForm.style.display = 'block';
        
        // Trigger reflow to ensure the animation works
        showForm.offsetHeight;
        
        // Add fade in animation to the form being shown
        showForm.style.opacity = '1';
        showForm.style.transform = 'translateY(0)';
    }, 300);
}

// Add click event listeners with smooth transitions
signUpButton.addEventListener('click', function() {
    switchForm(signInForm, signUpForm);
});

signInButton.addEventListener('click', function() {
    switchForm(signUpForm, signInForm);
});

// Add input focus effects with circuit animation
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
        // Add circuit animation effect
        const circuit = this.parentElement.querySelector('.circuit-decoration');
        if (circuit) {
            circuit.style.opacity = '1';
            circuit.style.transform = 'scale(1)';
        }
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
            const circuit = this.parentElement.querySelector('.circuit-decoration');
            if (circuit) {
                circuit.style.opacity = '0';
                circuit.style.transform = 'scale(0.8)';
            }
        }
    });
});

// Add button hover effects with electronic pulse
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.classList.add('pulse');
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.classList.remove('pulse');
    });
});

// Add social icons hover effects with rotation
const socialIcons = document.querySelectorAll('.icons i');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add loading animation to submit buttons
const submitButtons = document.querySelectorAll('#submitSignUp, #submitSignIn');
submitButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 2000);
    });
});

// Initialize forms with proper display and animations
document.addEventListener('DOMContentLoaded', function() {
    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
    
    // Add initial animation to the visible form
    signInForm.style.opacity = '1';
    signInForm.style.transform = 'translateY(0)';
    
    // Create circuit decorations
    createCircuitAnimation();
    
    // Add random circuit animations
    setInterval(() => {
        const circuits = document.querySelectorAll('.circuit-decoration');
        const randomCircuit = circuits[Math.floor(Math.random() * circuits.length)];
        randomCircuit.style.opacity = '1';
        setTimeout(() => {
            randomCircuit.style.opacity = '0.5';
        }, 1000);
    }, 3000);
});