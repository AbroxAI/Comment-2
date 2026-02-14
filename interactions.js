// interactions.js

const pinBanner = document.getElementById('tg-pin-banner');

/**
 * Show a pinned broadcast
 * @param {Object} broadcast
 *   broadcast = {
 *     image: "assets/broadcast.jpg",
 *     caption: "Your caption text",
 *     duration: 5000 // optional, in ms
 *   }
 */
function showPinBanner(broadcast) {
  if (!broadcast || !broadcast.image) return;

  // Clear previous content
  pinBanner.innerHTML = '';

  // Create image
  const img = document.createElement('img');
  img.src = broadcast.image;
  img.alt = broadcast.caption || 'Pin';
  img.style.width = '36px';
  img.style.height = '36px';
  img.style.borderRadius = '8px';
  img.style.objectFit = 'cover';

  // Caption
  const caption = document.createElement('div');
  caption.textContent = broadcast.caption || '';
  caption.style.flex = '1';
  caption.style.fontSize = '13px';
  caption.style.overflow = 'hidden';
  caption.style.textOverflow = 'ellipsis';
  caption.style.whiteSpace = 'nowrap';

  // Assemble
  pinBanner.appendChild(img);
  pinBanner.appendChild(caption);

  // Show banner
  pinBanner.classList.remove('hidden');

  // Auto-hide after duration
  if (broadcast.duration) {
    setTimeout(() => {
      pinBanner.classList.add('hidden');
    }, broadcast.duration);
  }
}

/**
 * Example usage:
 * showPinBanner({
 *   image: 'assets/broadcast.jpg',
 *   caption: 'Admin pinned this message!',
 *   duration: 8000
 * });
 */

export { showPinBanner };
