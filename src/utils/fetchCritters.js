export const fetchCritters = async () => {
  try {
    const response = await fetch('/json/allCrittersCache.json');
    if (!response.ok) {
      throw new Error('Failed to load critters data');
    }
    const critters = await response.json(); 
    return critters; 
  } catch (error) {
    console.error('Error fetching critters data:', error);
    return []; 
  }
};
