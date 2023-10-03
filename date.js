export const getDate = () => {
    const today = new Date();
  
    const options = {
      weekday: "long",
      day: 'numeric',
      month: "long",
      year: "long"
    };
  
    return today.toLocaleDateString("en-US", options);
  }
  
  
export const getDay = () => {
    const today = new Date();
  
    const options = {
      weekday: "long",
    };
  
    return today.toLocaleDateString("en-US", options);
  }
  