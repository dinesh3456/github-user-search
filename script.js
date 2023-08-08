const searchButton = document.getElementById("search-btn");
const userName = document.getElementById("username");
const errorMessage = document.getElementById("error-message");

searchButton.addEventListener("click", async () => {
  const userNameInput = userName.value;
  try {
    const userData = await getUserData(userNameInput);
    display(userData);
    errorMessage.textContent = "";
  } catch (error) {
    displayError("User not found");
  }
});

async function getUserData(userName) {
  try {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    if (response.status != 200) {
      throw new Error("User not found");
    } else {
      const userData = await response.json();
      return userData;
    }
  } catch (error) {
    throw error;
  }
}

function display(userData) {
  const image = document.getElementById("avatar");
  const usernameDisplay = document.getElementById("username-display");
  const followers = document.getElementById("followers");
  const repositories = document.getElementById("repositories");

  image.src = userData.avatar_url;
  usernameDisplay.textContent = userData.login;
  followers.textContent = `Followers: ${userData.followers}`;
  repositories.textContent = "Repositories: ";
  const repoList = document.createElement("ul");
  fetch(userData.repos_url)
    .then((response) => response.json())
    .then((repositoriesData) => {
      repositoriesData.forEach((repo) => {
        // Create a list item for each repository
        const repoItem = document.createElement("li");

        // Set the text content of the list item to the repository name
        repoItem.textContent = repo.name;

        // Append the list item to the repository list
        repoList.appendChild(repoItem);
      });

      // Append the list of repository names to the "repositories" element
      repositories.appendChild(repoList);
    })
    .catch((error) => {
      console.error("Error fetching repositories:", error);
    });
}

function displayError(message) {
  errorMessage.textContent = message;
}
