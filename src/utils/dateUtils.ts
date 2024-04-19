export const formatDate = (isoString: string): string => {
  // Extract the time part before the " UTC" suffix
  const timePart = isoString.split(' ')[1]; // Splits the string by spaces and picks the second element, which is the time
  const [hours, minutes] = timePart.split(':'); // Further splits the time part to get hours and minutes

  return `${hours}:${minutes}`; // Returns the formatted time in HH:MM format
}
