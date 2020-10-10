
document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1

  const getMonsters = (numOfMonsters, pageNum) => {
    fetch(`http://localhost:3000/monsters/?_limit=${numOfMonsters}&_page=${pageNum}`)
    .then( response => response.json() )
    .then( monster => renderMonsters(monster) )
  }
  
  const renderMonster = monsterObj => {
    const monsterContainer = document.querySelector('#monster-container')
    const monsterDiv = document.createElement('div')
    
    monsterDiv.innerHTML = `
    <div>
    <h2> ${monsterObj.name} </h2>
    <h4> Age: ${monsterObj.age} </h4>
    <p> <strong>Bio:</strong> ${monsterObj.description}</p>
    </div>
    `
    
    monsterContainer.append(monsterDiv)
  }
  
  const renderMonsters = monsters => {
    for(const monster of monsters) {
      renderMonster(monster)
    }
  }
  

  document.addEventListener("click", e => {
    
    if (e.target.id === 'forward') {
      currentPage += 1
      getMonsters(50, currentPage)
    } else if (e.target.id === 'back') {
      currentPage -= 1
      getMonsters(50, currentPage)
    } else if (e.target.id === 'show-form') {
      const monsterForm = document.querySelector('#monster-form')
      monsterForm.style.display = 'block'

      e.target.id = 'hide-form'
      e.target.textContent = 'Hide Form'
    } else if (e.target.id === 'hide-form') {
      const monsterForm = document.querySelector('#monster-form')
      monsterForm.style.display = 'none'

      e.target.id = 'show-form'
      e.target.textContent = 'Show Form'
    }
  })

  const submitHandler = () => {
    document.addEventListener("submit", e => {
      e.preventDefault()
      const form = e.target
      
      const newMonster = {
        name: form.name.value,
        age: form.age.value,
        description: form.description.value
      }
    
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(newMonster)
      }  

      fetch('http://localhost:3000/monsters/', options)
        .then( response => response.json() )
        .then( monster => renderMonster(monster) )

    })
  }
  
  submitHandler()
  getMonsters(50, currentPage)
})