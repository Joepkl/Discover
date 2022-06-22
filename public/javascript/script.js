

const radioButtonsD = document.querySelectorAll('input.dominant')
let puntenD = 0

// Interactief karakter variabele
const radioButtonsI = document.querySelectorAll('input.interactief')
let puntenI = 0

// Stabiel karakter variabele
const radioButtonsS = document.querySelectorAll('input.stabiel')
let puntenS = 0

// Conscientieus karakter variabele
const radioButtonsC = document.querySelectorAll('input.conscientieus')
let puntenC = 0




// Formulier eventlistener toevoegen
document.querySelector('#vragenlijst').addEventListener('submit', formVerzenden)

const resultaten = document.querySelectorAll('section.resultaten p')
resultaten.forEach(element => {
    element.classList.add('none')
})


// Functie form verzenden en resultaten renderen
function formVerzenden(event){
    event.preventDefault()
    document.querySelector('#resultaatTekst').classList.add('none')
    resultaten.forEach(element => {
        element.classList.remove('none')
    })

    radioButtonsD.forEach(element => {
        if(element.checked){
            puntenD += 1
            document.querySelector('#resultaatD').textContent = puntenD
        }
    })
    radioButtonsI.forEach(element => {
        if(element.checked){
            puntenI += 1
            document.querySelector('#resultaatI').textContent = puntenI
        }
    })
    radioButtonsS.forEach(element => {
        if(element.checked){
            puntenS += 1
            document.querySelector('#resultaatS').textContent = puntenS
        }
    })
    radioButtonsC.forEach(element => {
        if(element.checked){
            puntenC += 1
            document.querySelector('#resultaatC').textContent = puntenC
        }
    })

    if(document.querySelector('#resultaatD').textContent == ''){
        document.querySelector('#resultaatD').textContent = puntenD
    }

    if(document.querySelector('#resultaatI').textContent == ''){
        document.querySelector('#resultaatI').textContent = puntenI
    }

    if(document.querySelector('#resultaatS').textContent == ''){
        document.querySelector('#resultaatS').textContent = puntenS
    }

    if(document.querySelector('#resultaatC').textContent == ''){
        document.querySelector('#resultaatC').textContent = puntenC
    }
}

