
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'twitter-rpg-save-v1';

export function useLocalStorage(initialState) {
  // Load initial state from local storage or use provided initial state
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? { ...initialState, ...JSON.parse(item) } : initialState;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialState;
    }
  });

  // Save to local storage
  const saveState = useCallback((value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Handle quota exceeded error specifically if needed
      if (error.name === 'QuotaExceededError') {
        alert('Local storage is full! Game progress cannot be saved.');
      }
    }
  }, [storedValue]);

  // Function to force load from storage (e.g., on reset)
  const loadState = useCallback(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        setStoredValue({ ...initialState, ...JSON.parse(item) });
      }
    } catch (error) {
      console.error('Error reloading from localStorage:', error);
    }
  }, [initialState]);

  // Clear storage
  const clearState = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setStoredValue(initialState);
      window.location.reload(); // Force reload to clear in-memory state effectively
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, [initialState]);

  return { storedValue, saveState, loadState, clearState };
}

export default useLocalStorage;
