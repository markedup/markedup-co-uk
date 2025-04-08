(() => {
  // --- Configuration Constants ---
  const MIN_FONT_SIZE_VMIN = 7;
  const MAX_FONT_SIZE_VMIN = 13;
  const UPDATE_INTERVAL_MS = 3500;
  const FADE_IN_DURATION_MS = 500; // Duration for the fade-in effect

  const FONT_WEIGHTS = ['normal', 'bold'];
  const FONT_FAMILIES = ['serif', 'sans-serif', 'monospace'];
  const TEXT_TRANSFORMS = ['lowercase', 'uppercase'];

  // --- State Variables ---
  let headingElement = null;
  let letterElements = null;
  let animationStartTime = 0;
  let animationFrameId = null;

  // --- Helper Functions ---

  /**
   * Generates a random integer up to (but not including) `max`.
   * @param {number} max - The upper bound (exclusive).
   * @returns {number} A random integer between 0 and max - 1.
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Selects a random font weight.
   * @returns {string} 'normal' or 'bold'.
   */
  function getRandomWeight() {
    return FONT_WEIGHTS[getRandomInt(FONT_WEIGHTS.length)];
  }

  /**
   * Generates a random font size string in vmin units.
   * @returns {string} A font size like '10vmin'.
   */
  function getRandomSize() {
    const size = getRandomInt(MAX_FONT_SIZE_VMIN - MIN_FONT_SIZE_VMIN + 1) + MIN_FONT_SIZE_VMIN;
    return `${size}vmin`;
  }

  /**
   * Selects a random font family.
   * @returns {string} 'serif', 'sans-serif', or 'monospace'.
   */
  function getRandomFamily() {
    return FONT_FAMILIES[getRandomInt(FONT_FAMILIES.length)];
  }

  /**
   * Selects a random text transformation.
   * @returns {string} 'lowercase' or 'uppercase'.
   */
  function getRandomTransform() {
    return TEXT_TRANSFORMS[getRandomInt(TEXT_TRANSFORMS.length)];
  }

  // --- Animation Functions ---

  /**
   * Handles the fade-in animation frame by frame.
   * @param {number} currentTime - The current time provided by requestAnimationFrame.
   */
  function fadeIn(currentTime) {
    if (!animationStartTime) {
      animationStartTime = currentTime;
    }

    const elapsedTime = currentTime - animationStartTime;
    const progress = Math.min(elapsedTime / FADE_IN_DURATION_MS, 1); // Ensure progress doesn't exceed 1

    headingElement.style.opacity = progress;

    if (progress < 1) {
      animationFrameId = window.requestAnimationFrame(fadeIn);
    } else {
      // Reset for the next potential animation cycle if needed, though setInterval handles the loop
      animationStartTime = 0;
    }
  }

  // --- Main Drawing Function ---

  /**
   * Applies random styles to each letter and initiates the fade-in.
   */
  function drawStyles() {
    // Cancel any ongoing fade animation before starting a new draw
    if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    animationStartTime = 0; // Reset start time for the new fade

    headingElement.style.opacity = 0; // Start fully transparent

    for (let i = 0; i < letterElements.length; i += 1) {
      const letter = letterElements[i];
      letter.style.fontWeight = getRandomWeight();
      letter.style.fontSize = getRandomSize();
      letter.style.fontFamily = getRandomFamily();
      letter.style.textTransform = getRandomTransform();
    }

    // Start the fade-in animation
    animationFrameId = window.requestAnimationFrame(fadeIn);
  }

  // --- Initialization ---

  /**
   * Initializes the script, finds elements, and starts the interval.
   */
  function init() {
    headingElement = document.querySelector('h1');
    letterElements = document.getElementsByTagName('b'); // Consider a more specific selector if needed

    if (!headingElement || letterElements.length === 0) {
        console.error("Required elements (h1 or b tags) not found.");
        return; // Stop if elements aren't present
    }

    drawStyles(); // Initial draw
    setInterval(drawStyles, UPDATE_INTERVAL_MS); // Subsequent draws at intervals
  }

  // --- Script Execution ---
  // Run init function once the DOM is fully loaded
  if (document.readyState === 'loading') { // Make sure the DOM is ready
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init(); // DOM is already ready
  }

})();
