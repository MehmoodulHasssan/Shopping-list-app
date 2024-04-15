const fifthBar = document.createElement('li')
fifthBar.innerText = 'Shaker'
const button = document.createElement('button')
fifthBar.appendChild(button)
button.className = 'remove-item btn-link text-red'
const icon = document.createElement('i')
icon.className ='fa-solid fa-xmark'
button.appendChild(icon)

console.log(fifthBar);

document.querySelector('#item-list').appendChild(fifthBar)

// -------------------------------------------------------------

function addNewItem (item) {
    const li = document.createElement('li')
    li.innerHTML = `${item}
    <button class="remove-item btn-link text-red">
      <i class="fa-solid fa-xmark"></i>
    </button>`
    
    return document.querySelector('#item-list').appendChild(li)
}

console.log(addNewItem('Maalta'));

//------------------------------------------------------------------
const clearbtn = document.querySelector('#clear')
// clearbtn.onclick() = function () {
//     alert('na bond pangy lao yr')
// }

clearbtn.addEventListener('click', ()=> alert('ki bond pangy le rya'))

const inputitems = document.querySelector('#item-input')
inputitems.addEventListener('keypress', (l)=> l.key==='Enter' ? alert('enter amb lyn lai napya e') : console.log(l.key))