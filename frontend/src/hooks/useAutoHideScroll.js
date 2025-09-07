import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for auto-hiding scrollbars after a specified duration of inactivity
 * @param {Object} options - Configuration options for the hook
 * @param {number} options.hideDelay - Delay in milliseconds before hiding the scrollbar (default: 5000)
 * @param {string} options.targetSelector - CSS selector for the target element (default: null)
 * @returns {[boolean, (element: HTMLElement) => void]} Tuple containing isScrollVisible state and ref setter function
 */
const useAutoHideScroll = ({
  hideDelay = 5000,
  targetSelector = null,
} = {}) => {
  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const scrollTimer = useRef(null);
  const targetRef = useRef(null);

  // Memoized mouse move handler
  const handleMouseMove = useCallback(() => {
    setIsScrollVisible(true);

    // Clear existing timer
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }

    // Set new timer
    scrollTimer.current = setTimeout(() => {
      setIsScrollVisible(false);
    }, hideDelay);
  }, [hideDelay]);

  // Setup and cleanup effect
  useEffect(() => {
    let targetElement = null;

    // Get target element either from selector or ref
    if (targetSelector) {
      targetElement = document.querySelector(targetSelector);
    } else if (targetRef.current) {
      targetElement = targetRef.current;
    }

    if (targetElement) {
      targetElement.addEventListener('mousemove', handleMouseMove);

      // Initial timer
      scrollTimer.current = setTimeout(() => {
        setIsScrollVisible(false);
      }, hideDelay);
    }

    // Cleanup
    return () => {
      if (targetElement) {
        targetElement.removeEventListener('mousemove', handleMouseMove);
      }
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [handleMouseMove, hideDelay, targetSelector]);

  // Ref setter function
  const setTargetRef = useCallback((element) => {
    targetRef.current = element;
  }, []);

  return [isScrollVisible, setTargetRef];
};

export default useAutoHideScroll;
