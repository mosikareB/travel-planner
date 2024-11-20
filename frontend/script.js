async function getRecommendations() {
  const userLoc = document.getElementById("userLocation").value;
  const responseDiv = document.getElementById("response");

  // Show loading message
  responseDiv.textContent = "Fetching recommendations...";

  if (!userLoc) {
    responseDiv.textContent = "Please enter a location.";
    return;
  }

  try {
    const response = await fetch("https://travel-planner-1um0.onrender.com/getRecommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: userLoc }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations.");
    }

    const data = await response.json();
    responseDiv.innerHTML = `<p>${data.recommendations}</p>`;
  } catch (error) {
    console.error("Error:", error);
    responseDiv.textContent = "An error occurred while fetching recommendations.";
  }
}
