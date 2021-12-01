/* JS Code to for REST API */

// Store the profile information  
const profileInfo = document.querySelector(".overview");
const username = "madjidiaw";
// Display the unordered list of repositories (repo(s)) in the profile 
const repoList = document.querySelector(".repo-list");
// Section where all repositories information will be displayed
const repoInformation = document.querySelector(".repos");
// show individual repository data
const individualRepoData = document.querySelector(".repo-data");
// Button used to click to go back to the repository gallery
const backToRepoGallery = document.querySelector(".view-repos");
// Search input field, accept input from use to search for a repo
const filterInput = document.querySelector(".filter-repos");

const getProfile = async function () {
    const fetchResponse = await fetch(`https://api.github.com/users/${username}`);
    const userinfo = await fetchResponse.json(); 
    displayUserInfo(userinfo);
};
getProfile();

// Fetch and Display the user information
const displayUserInfo = function(userData) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `
        <figure>
          <img alt="user avatar" src=${userData.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${userData.name}</p>
          <p><strong>Bio:</strong> ${userData.bio}</p>
          <p><strong>Location:</strong> ${userData.location}</p>
          <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
        </div>`;
    profileInfo.append(newDiv); 
    getRepos(username);  

};

// Fetch the repository data
const getRepos = async function (username) {
    const fetchResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoInfo = await fetchResponse.json();
    listRepoInfo(repoInfo);
};


// Display information about the repositories
const listRepoInfo = function(repo) {
    filterInput.classList.remove("hide");
    for (let project of repo) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${project.name}</h3>`; 
        repoList.append(li);   
    };
     
};

// Click event on the unordered list class 'repo-list'  
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        getSingleRepo(repoName);
    }
});

// Grab information about a specific repository
const getSingleRepo = async function(repoName) {
    const repoData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoData.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    }
    specificRepoInfo(repoInfo, languages);
};

// This function will display a specific repository information
const specificRepoInfo = function(repoInfo, languages) {
    individualRepoData.innerHTML = "";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
       <div>
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
       </div>
    `;
    individualRepoData.append(newDiv);
    individualRepoData.classList.remove("hide");
    repoInformation.classList.add("hide");  
    backToRepoGallery.classList.remove("hide"); 
};

// Click event listener to allow users to redirect to the repo gallery
backToRepoGallery.addEventListener("click", function() {
    repoInformation.classList.remove("hide");
    individualRepoData.classList.add("hide");
    backToRepoGallery.classList.add("hide"); 
});

// Attach an input event listern to activate the search field
filterInput.addEventListener("input", function(e) {
    const capturedSearch = e.target.value;
    const searchInputToLower = capturedSearch.toLowerCase();
    const repos = document.querySelectorAll(".repo");
    for (let repo of repos) {
        let lowercaseRepo = repo.innerText.toLowerCase();
        if (lowercaseRepo.includes(searchInputToLower)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    };
});
