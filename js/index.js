document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
  
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== "") {
        searchUsers(searchTerm);
      }
    });
  
    function searchUsers(searchTerm) {
      const url = `https://api.github.com/search/users?q=${searchTerm}`;
      fetch(url, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => displayUsers(data.items))
      .catch(error => console.error("Error fetching users:", error));
    }
  
    function displayUsers(users) {
      searchResults.innerHTML = "";
      users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.innerHTML = `
          <div>
            <img src="${user.avatar_url}" alt="Avatar" style="width: 50px;">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          </div>
        `;
        userCard.addEventListener("click", () => {
          getUserRepositories(user.login);
        });
        searchResults.appendChild(userCard);
      });
    }
  
    function getUserRepositories(username) {
      const url = `https://api.github.com/users/${username}/repos`;
      fetch(url, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
      .then(response => response.json())
      .then(data => displayRepositories(data))
      .catch(error => console.error("Error fetching repositories:", error));
    }
  
    function displayRepositories(repos) {
      searchResults.innerHTML = "";
      const reposList = document.createElement("ul");
      repos.forEach(repo => {
        const repoItem = document.createElement("li");
        repoItem.textContent = repo.name;
        reposList.appendChild(repoItem);
      });
      searchResults.appendChild(reposList);
    }
  });
  