// Device data
const deviceData = {
    'Arduino Uno': {
        description: 'The Arduino Uno is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz quartz crystal, a USB connection, a power jack, an ICSP header, and a reset button.',
        specs: {
            'Microcontroller': 'ATmega328P',
            'Operating Voltage': '5V',
            'Input Voltage': '7-12V',
            'Digital I/O Pins': '14',
            'Analog Input Pins': '6',
            'Flash Memory': '32 KB',
            'SRAM': '2 KB',
            'EEPROM': '1 KB',
            'Clock Speed': '16 MHz'
        }
    },
    'Servo Motor': {
        description: 'A servo motor is a rotary actuator that allows for precise control of angular position. It consists of a motor coupled to a sensor for position feedback.',
        specs: {
            'Operating Voltage': '4.8V - 6V',
            'Torque': '2.5kg/cm',
            'Speed': '0.12s/60°',
            'Weight': '9g',
            'Size': '23x12.2x29mm'
        }
    },
    'Breadboard': {
        description: 'A breadboard is a construction base for prototyping of electronics. It allows for easy connection of components without soldering.',
        specs: {
            'Size': '165x55mm',
            'Power Rails': '2',
            'Terminal Strips': '30',
            'Material': 'ABS Plastic',
            'Color': 'White'
        }
    },
    'Ultrasonic Sensor': {
        description: 'The HC-SR04 ultrasonic sensor uses sonar to determine distance to an object. It offers excellent non-contact range detection with high accuracy and stable readings.',
        specs: {
            'Operating Voltage': '5V',
            'Operating Current': '15mA',
            'Measuring Range': '2cm - 400cm',
            'Resolution': '0.3cm',
            'Measuring Angle': '15°'
        }
    },
    'Microcontroller': {
        description: 'A microcontroller is a compact integrated circuit designed to govern a specific operation in an embedded system.',
        specs: {
            'Architecture': '8-bit',
            'Flash Memory': '32KB',
            'SRAM': '2KB',
            'EEPROM': '1KB',
            'Operating Voltage': '5V'
        }
    },
    'Raspberry Pi': {
        description: 'The Raspberry Pi is a series of small single-board computers developed to promote teaching of basic computer science in schools and developing countries.',
        specs: {
            'Processor': 'Quad-core ARM Cortex-A72',
            'RAM': '4GB',
            'Storage': 'MicroSD',
            'Operating System': 'Linux',
            'Connectivity': 'WiFi, Bluetooth, Ethernet'
        }
    },
    'LCD Display': {
        description: 'An LCD display is a flat-panel display that uses the light-modulating properties of liquid crystals combined with polarizers.',
        specs: {
            'Size': '16x2 characters',
            'Backlight': 'LED',
            'Interface': 'I2C/Parallel',
            'Operating Voltage': '5V',
            'Viewing Angle': '180°'
        }
    }
};

let currentModal = null;

// Create modal HTML
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title"><i class="fas fa-microchip"></i> <span class="device-name"></span></h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="" alt="" class="device-image">
                </div>
                <div class="modal-details">
                    <div class="device-specs"></div>
                    <p class="modal-description"></p>
                    <div class="modal-price"></div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Show modal with device details
function showModal(deviceName, imageSrc, price) {
    // Remove existing modal if any
    if (currentModal) {
        currentModal.remove();
    }

    const modal = createModal();
    currentModal = modal;
    const deviceInfo = deviceData[deviceName];
    
    if (!deviceInfo) return;

    // Update modal content
    modal.querySelector('.device-name').textContent = deviceName;
    modal.querySelector('.device-image').src = imageSrc;
    modal.querySelector('.device-image').alt = deviceName;
    modal.querySelector('.modal-description').textContent = deviceInfo.description;

    // Create specs HTML
    const specsHtml = Object.entries(deviceInfo.specs)
        .map(([key, value]) => `
            <div class="detail-item">
                <i class="fas fa-info-circle"></i>
                <span><strong>${key}:</strong> ${value}</span>
            </div>
        `).join('');
    
    modal.querySelector('.device-specs').innerHTML = specsHtml;

    // Show modal with animation
    requestAnimationFrame(() => {
        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    });

    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => hideModal(modal);

    // Close on overlay click
    modal.onclick = (e) => {
        if (e.target === modal) hideModal(modal);
    };

    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') hideModal(modal);
    };
    document.addEventListener('keydown', escapeHandler);

    // Store the escape handler for cleanup
    modal.escapeHandler = escapeHandler;
}

// Hide modal with animation
function hideModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
        currentModal = null;
        document.removeEventListener('keydown', modal.escapeHandler);
    }, 300);
}

// Initialize view buttons
document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.item');
            const deviceName = item.querySelector('h3').textContent;
            const imageSrc = item.querySelector('img').src;
            const price = item.querySelector('.price').textContent.replace('₹', '');
            showModal(deviceName, imageSrc, price);
        });
    });
}); 