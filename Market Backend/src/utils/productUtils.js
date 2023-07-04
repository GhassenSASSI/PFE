function validatePhotoFileFormat(value) {
    // Basic file extension check
    const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = value.substr(value.lastIndexOf('.')).toLowerCase();
    return supportedExtensions.includes(fileExtension);
}

// Function to shuffle the array in place using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
  
  module.exports = {
    validatePhotoFileFormat,
    shuffleArray
  };
  