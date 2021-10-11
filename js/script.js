// Store the profile information  
const profileInfo = document.querySelector(".overview");
const username = "madjidiaw";
// Display the unordered list of repos 
const repoList = document.querySelector(".repo-list");

const getProfile = async function () {
    const fetchResponse = await fetch(`https://api.github.com/users/${username}`);
    const userinfo = await fetchResponse.json();
    //console.log(userinfo);  
    displayUserInfo(userinfo);
};
getProfile();

// Fetch and Display the user information
const displayUserInfo = function(userData) {
    const newDiv = document.createElement("div");
    newDiv.className = "user-info";
    //newDiv.classList.add("user-info");
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
};

// Fetch repo data
const getRepos = async function () {
    const fetchResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoInfo = await fetchResponse.json();
    //console.log(repoInfo);  
    listRepoInfo(repoInfo);
};
getRepos();

// Display information about the repos
const listRepoInfo = function(repo) {
    for (let project of repo) {
        let li = document.createElement("li");
        li.innerHTML = `
           <li class="repo"> <h3>${project.name}</h3></li>`; 
        repoList.append(li);   
    }
};