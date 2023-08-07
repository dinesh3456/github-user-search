const searchButton = document.getElementById('search-btn');
const userName = document.getElementById('username');
searchButton.addEventListener("click",async ()=>{
    const userNameInput = userName.value;
    try{
        const userData = await getUserData(userNameInput);
        display(userData);
    }catch(e){
        displayError("User not found");
    }
    setTimeout(()=>{
        displayError("Enter the user name");
    })

})

async function getUserData(userName){
    try{
        const response = await fetch(`https://api.github.com/users/${username}`);
        if(!response.ok){
            throw new Error("User not found");
        }
        const userData = await response.json();
        return userData;
    }catch(e){
        throw e;
    }
}