const form = document.getElementById("github-form")
const git = ""
const userContainer = document.querySelector("#user-list")
const repoContainer = document.querySelector("#repos-list")

form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    const search = e.target.search.value
 console.log(search)
    fetch(`https://api.github.com/search/users?q=${search}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json'
            }})
    .then(res => res.json())
    .then(userData => {
        //console.log(userData)
        userData.items.forEach(user => {
            const li = document.createElement('li')
            const link = document.createElement('div')
            const div = document.createElement('div')
            div.innerHTML= `<img src="${user.avatar_url}">`
            link.innerHTML = `<a href="${user.html_url}">Profile</a>`
            li.textContent = `Username: ${user.login}`
            userContainer.append(li)
            li.append(link)
            li.append(div);

             li.addEventListener('click', function repos(){
                 return fetch(`https://api.github.com/users/${user.login}/repos`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/vnd.github.v3+json'
                    }})
                    .then(res => res.json())
                    .then(repoData =>
                     repoData.forEach(repo => {
                        const repoDiv = document.createElement('div')
                        const repoLi = document.createElement('li')
                        div.textContent= 'Repo Link:'
                        repoLi.innerHTML = `<a href="${repo.html_url}">${repo.html_url}</a>`
                        repoContainer.append(repoDiv)
                        repoDiv.append(repoLi)
                     }))
             })  
    }) 
});
}

