const imageInput = document.querySelector(".image-display-preview input");
const imagePreviewElement = document.querySelector(
  ".image-display-preview img"
);

function displayPreview() {
  const files = imageInput.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = 'block';
}

imageInput.addEventListener("change", displayPreview);
