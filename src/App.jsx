import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [errors,setErrors]=useState("")
  const[profile,setProfile]=useState(null)
  const [repos, setRepos] = useState([]);
  async function handleSearch(){
    setErrors("")
  const response = await fetch(`https://api.github.com/users/${username}`);
  if(!response.ok){
    setProfile(null)
    setErrors("user not found❌")
    return
  }
  const re=await fetch(`https://api.github.com/users/${username}/repos`)
  const data = await response.json();
  const redata=await re.json()
  console.log(redata)
  const sortedRepos = [...redata].sort((a, b) =>
    b.stargazers_count - a.stargazers_count
  );
  

  setRepos(sortedRepos)
  
 
  
  setProfile(data)


  }

  return (
    <div className="app">
      <h1>GitHub Profile Finder 🔍</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={handleSearch}disabled={!username}>
          Search
        </button>
      </div>


      {errors &&<p className="error">{errors}</p>}
      {profile &&(<><div className="card">
        <img
        
          src={profile.avatar_url}
          alt="avatar"
        />

        <h2>User Name</h2>
        <p>@{username}</p>
        <a href={profile.html_url} target="_blank">go to profile🌎</a>
        <div className="stats">
          <div>
            <strong>Followers</strong>
            <p>{profile.followers}</p>
          </div>

          <div>
            <strong>Following</strong>
            <p>{profile.following}</p>
          </div>

          <div>
            <strong>Repos</strong>
            <p>{profile.public_repos}</p>
          </div>
        </div>
      </div>
      <div className="repos">
       <h3>Latest Repositories</h3>
       
        {repos.slice(0, 5).map((repo) => (
        <div key={repo.id} className="repo-card">
          <a href={repo.html_url} target="_blank">
        {repo.name}
        </a>
         <p>{repo.description}</p>
        </div>
  ))}
</div> </>)}
    </div>
  );
}

export default App;