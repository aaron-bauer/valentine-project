// ===== EDITABLE: Change the name here =====
let personName = 'Shaleene'; // Change this to the person's name
// ==========================================

let noClickCount = 0;
const maxScaleSteps = 10;

// Handle Yes button click
function handleYes() {
    console.log('YES button clicked!');
    const proposal = document.getElementById('proposal');
    const successMessage = document.getElementById('successMessage');
    
    console.log('Proposal element:', proposal);
    console.log('Success message element:', successMessage);
    
    proposal.style.display = 'none';
    successMessage.classList.add('show');
    
    // Update success message with name
    const successTitle = document.getElementById('successTitle');
    successTitle.textContent = `${personName}, You Make Me The Happiest Person! 🎉`;
    
    // Trigger massive celebration animations
    createConfetti();
    playRoseAnimation();
    playCelebrationSounds();
    
    // Send to backend
    sendProposalResult('YES');
}

// Play celebration effects
function playCelebrationSounds() {
    // Create visual effects - screen shake and light burst
    const container = document.getElementById('mainContainer');
    const audio = document.getElementById('backgroundMusic');
    
    // Continue playing music (don't reset it) - just make sure it's playing
    if (audio.paused) {
        audio.play().catch(() => console.log('Music playback failed'));
    }
    
    // Shake effect
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const shake = Math.random() * 10 - 5;
            container.style.transform = `translate(${shake}px, 0px)`;
        }, i * 50);
    }
    
    setTimeout(() => {
        container.style.transform = 'translate(0, 0)';
    }, 250);
    
    // Create fireworks effect synced with beats
    createFireworks();
    
    // Create music-synced confetti bursts
    const musicSyncInterval = setInterval(() => {
        if (audio.paused) {
            clearInterval(musicSyncInterval);
        }
        createMusicSyncedConfetti();
    }, 400); // Sync with music beats (600ms intervals)
}

// Handle No button - shrinks the container progressively
function handleNo() {
    console.log('NO button clicked!');
    noClickCount++;
    const container = document.getElementById('mainContainer');
    const kittenContainer = document.getElementById('kittenContainer');
    
    console.log('No clicked! Count:', noClickCount);
    
    // Calculate new scale (shrinks by 15% each click)
    const newScale = Math.max(0.2, 1 - (noClickCount * 0.15));
    container.style.transform = `scale(${newScale})`;
    
    if (noClickCount >= 5) {
        console.log('5 clicks reached! Showing kitten');
        
        // Hide the proposal after a short delay
        setTimeout(() => {
            document.getElementById('proposal').style.display = 'none';
            kittenContainer.style.display = 'block';
        }, 300);
    }
    
    // Send to backend
    sendProposalResult('NO', noClickCount);
}

// Handle heart click (acts as yes)
function handleHeartClick() {
    console.log('Heart clicked!');
    document.getElementById('kittenContainer').style.display = 'none';
    handleYes();
}

// Create confetti animation
function createConfetti() {
    const confettiCount = 150; // Increased for huge celebration
    const colors = ['#ff1744', '#ff5252', '#ff6e40', '#ffd700', '#ff69b4', '#ff1493', '#ff4500'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.width = (5 + Math.random() * 10) + 'px';
        confetti.style.height = confetti.style.width;
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling with more movement
        const duration = 2.5 + Math.random() * 1.5;
        const xMove = (Math.random() - 0.5) * 400; // More horizontal spread
        const rotation = Math.random() * 720; // More spinning
        
        confetti.animate([
            {
                transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)',
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 10}px) translateX(${xMove}px) rotate(${rotation}deg) scale(0.5)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove element after animation
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Music-synced confetti bursts (smaller bursts in sync with beats)
function createMusicSyncedConfetti() {
    const confettiCount = 30;
    const colors = ['#ff1744', '#ff5252', '#ff6e40', '#ffd700', '#ff69b4'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * 30 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.width = (3 + Math.random() * 6) + 'px';
        confetti.style.height = confetti.style.width;
        
        document.body.appendChild(confetti);
        
        const duration = 1.5 + Math.random();
        const xMove = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            {
                transform: 'translateY(0) translateX(0) scale(1)',
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight}px) translateX(${xMove}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Rose floating animation
function playRoseAnimation() {
    const roses = ['🌹', '💐', '🌷', '🌺', '💕', '💖', '💝'];
    const roseCount = 25; // Increased for bigger celebration
    
    for (let i = 0; i < roseCount; i++) {
        setTimeout(() => {
            const rose = document.createElement('div');
            rose.className = 'rose-animation';
            rose.textContent = roses[Math.floor(Math.random() * roses.length)];
            rose.style.position = 'fixed';
            rose.style.left = Math.random() * window.innerWidth + 'px';
            rose.style.top = window.innerHeight + 'px';
            rose.style.fontSize = (40 + Math.random() * 40) + 'px'; // Varied sizes
            rose.style.zIndex = '9999';
            
            document.body.appendChild(rose);
            
            setTimeout(() => {
                rose.remove();
            }, 2500);
        }, i * 100);
    }
}

// Send proposal result to Python backend
async function sendProposalResult(response) {
    try {
        const result = await fetch('http://localhost:5000/proposal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                response: response,
                timestamp: new Date().toISOString()
            })
        });
        
        if (result.ok) {
            const data = await result.json();
            console.log('Proposal logged:', data);
        }
    } catch (error) {
        console.log('Backend connection not available (run Python server for logging)');
    }
}

// Create fireworks effect
function createFireworks() {
    const fireworkCount = 20;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.width = '20px';
            firework.style.height = '20px';
            firework.style.borderRadius = '50%';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '10000';
            
            const colors = ['#ff1744', '#ffd700', '#ff69b4', '#00ff00', '#00bfff'];
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            firework.style.left = window.innerWidth / 2 + 'px';
            firework.style.top = window.innerHeight / 2 + 'px';
            
            document.body.appendChild(firework);
            
            // Burst animation
            const angle = (Math.PI * 2 * i) / fireworkCount;
            const velocity = 5 + Math.random() * 5;
            const endX = Math.cos(angle) * velocity * 100;
            const endY = Math.sin(angle) * velocity * 100;
            
            firework.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX}px, ${endY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 50);
    }
}

// Add page load animation
window.addEventListener('load', () => {
    const container = document.querySelector('.container');
    container.style.animation = 'slideUp 0.8s ease-out';
});
