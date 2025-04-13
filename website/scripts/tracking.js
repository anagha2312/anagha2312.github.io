/**
 * Event tracking script to capture all click events and page views
 * across HTML tags and CSS objects on the website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Track initial page view
    logEvent('view', 'page', document.title);

    // Set up click event tracking for the entire document
    document.addEventListener('click', (event) => {
        // Get the clicked element
        const clickedElement = event.target;
        
        // Determine the type of element that was clicked
        let elementType = determineElementType(clickedElement);
        
        // Log the click event
        logEvent('click', elementType, getElementDescription(clickedElement));
    });

    // Set up tracking for section views using Intersection Observer
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Log section view when it becomes visible
                const sectionId = entry.target.id || 'unnamed-section';
                logEvent('view', 'section', sectionId);
            }
        });
    }, { threshold: 0.5 }); // Trigger when at least 50% of the section is visible

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Track image loading
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            logEvent('view', 'image', img.alt || 'unnamed-image');
        });
    });
});

/**
 * Determines the type of the DOM element
 * @param {HTMLElement} element - The DOM element to analyze
 * @return {string} The type of the element
 */
function determineElementType(element) {
    const tagName = element.tagName.toLowerCase();
    
    // Check for specific HTML elements
    if (tagName === 'a') return 'link';
    if (tagName === 'button') return 'button';
    if (tagName === 'img') return 'image';
    if (tagName === 'input') {
        return element.type ? `input-${element.type}` : 'input';
    }
    if (tagName === 'select') return 'dropdown';
    if (tagName === 'textarea') return 'textarea';
    
    // Check for navigation elements
    if (element.closest('nav')) return 'navigation';
    
    // Check for list items
    if (tagName === 'li') return 'list-item';
    
    // Check for headings
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) return 'heading';
    
    // Check if it's part of a form
    if (element.closest('form')) return 'form-element';
    
    // For elements with class or id, use that for better identification
    if (element.className) {
        if (element.className.includes('btn')) return 'button';
        if (element.className.includes('card')) return 'card';
        if (element.className.includes('icon')) return 'icon';
    }
    
    // Default to the tag name if no specific type is identified
    return tagName;
}

/**
 * Gets a description of the element for logging purposes
 * @param {HTMLElement} element - The DOM element to describe
 * @return {string} A description of the element
 */
function getElementDescription(element) {
    // Try to get a meaningful description in order of specificity
    
    // 1. If it has an id, use that
    if (element.id) return `#${element.id}`;
    
    // 2. If it has text content, use a snippet
    if (element.textContent) {
        const textContent = element.textContent.trim();
        if (textContent) {
            return textContent.length > 30 
                ? textContent.substring(0, 27) + '...' 
                : textContent;
        }
    }
    
    // 3. If it has a class name, use that
    if (element.className && typeof element.className === 'string') {
        return `.${element.className.split(' ').join('.')}`;
    }
    
    // 4. For images, use alt text or src
    if (element.tagName.toLowerCase() === 'img') {
        return element.alt || element.src.split('/').pop();
    }
    
    // 5. Default to tag name
    return element.tagName.toLowerCase();
}

/**
 * Logs an event to the console and writes to a tracking file
 * @param {string} eventType - The type of event (click/view)
 * @param {string} objectType - The type of object involved
 * @param {string} objectDescription - Description of the object
 */
function logEvent(eventType, objectType, objectDescription) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}, ${eventType}, ${objectType}:${objectDescription}`;
    
    // Log to console for debugging
    console.log(logEntry);
    
    // Save to file using Beacon API
    saveEventToFile(logEntry);
}

/**
 * Saves event data to a file using the Beacon API
 * @param {string} eventData - The formatted event data to save
 */
function saveEventToFile(eventData) {
    // Create a blob with the event data
    const blob = new Blob([eventData + '\n'], { type: 'text/plain' });
    
    // Use the Beacon API to send the data asynchronously
    navigator.sendBeacon('/tracking-endpoint', blob);
    
    // As we're running this locally without a server, also store in localStorage
    const storedEvents = localStorage.getItem('trackingEvents') || '';
    localStorage.setItem('trackingEvents', storedEvents + eventData + '\n');
    
    // If localStorage is getting too large, download the file
    if (storedEvents.length > 10000) {
        downloadTrackingData();
    }
}

/**
 * Downloads the tracking data as a text file
 */
function downloadTrackingData() {
    const trackingData = localStorage.getItem('trackingEvents') || '';
    
    // Create a download link
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(trackingData));
    element.setAttribute('download', `tracking_data_${new Date().toISOString().slice(0,10)}.txt`);

    // Hide the element and add to the DOM
    element.style.display = 'none';
    document.body.appendChild(element);

    // Trigger the download
    element.click();

    // Clean up
    document.body.removeChild(element);
    
    // Reset the stored events
    localStorage.setItem('trackingEvents', '');
}