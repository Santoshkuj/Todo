export const getFromLocalStorage = () => {
    try {
      const savedState = localStorage.getItem('userState');
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (err) {
      console.error("Error reading from localStorage", err);
    }
    return null;
  };
  
  export const saveToLocalStorage = (state) => {
    try {
      localStorage.setItem('userState', JSON.stringify(state));
    } catch (err) {
      console.error("Error saving to localStorage", err);
    }
  };
  