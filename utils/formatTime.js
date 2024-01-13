module.exports = (milliseconds) => {
  if (milliseconds < 1000) {
    return milliseconds + " ms";
  } else if (milliseconds < 60000) {
    return (milliseconds / 1000).toFixed(2) + " seconds";
  } else {
    return (milliseconds / 60000).toFixed(2) + " minutes";
  }
};
