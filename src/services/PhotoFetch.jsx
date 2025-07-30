export async function fetchPhotos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
}
