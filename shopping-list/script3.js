const item_form = document.querySelector('#item-form')
const list = document.querySelector('#item-list')
const input_bar = document.querySelector('#item-input')
const clearAll = document.querySelector('#clear')
const filter = document.querySelector('#filter')
const addBtn = item_form.querySelector('.btn')
let isEditMode = false;


function addPreviouslyStored(){
    itemsFromStorage=getItemsFromStorage();
    itemsFromStorage.forEach(item => {
        addToDOM(item);
    });
    checkUI();
}

function toAddItem (e){
    e.preventDefault();
    if (input_bar.value === ''){
        alert('Kosh lekh ty ly, hath tutty ny tere')
        return;
    } 
    let itemsFromStorage = getItemsFromStorage();
    
    //I can use else mode with fuction next to it instead of using it as a new function
    if(isEditMode ===false && itemsFromStorage.some(item=> item.toLowerCase() ===input_bar.value.toLowerCase())){
        alert( `Pehle ${input_bar.value.toLowerCase()} lekh ty lya, pagal ho gya?`)
        return;
    }
    //checking whether in edit mode or not.
    if(isEditMode===true){
        let editedItem = list.querySelector('.editMode')
        
        removeFromStorage(editedItem);
        editedItem.classList.remove('editMode')
        editedItem.remove()
        isEditMode = false;
    }
    // const newList = document.createElement('li')
    // list.appendChild(newList);
    // newList.innerHTML =`${input_bar.value}
    // <button class="remove-item btn-link text-red">
    //   <i class="fa-solid fa-xmark"></i>
    // </button>`
    addToDOM(input_bar.value);
    
    addToStorage(input_bar.value);
    input_bar.value = '';
    // input_bar.addEventListener('keypress', function (h){
    //     if (h.key==='Enter'){
    //         input_bar.value=''
    //     }
    // })
    checkUI();
}
function addToDOM (item){
    const newList = document.createElement('li')
    list.appendChild(newList);
    newList.innerHTML =`${item}
    <button class="remove-item btn-link text-red">
      <i class="fa-solid fa-xmark"></i>
    </button>`

}


function getItemsFromStorage(){
    let itemsFromStorage;
    if(localStorage.getItem('items')===null){
        itemsFromStorage =[];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function addToStorage(items) {
    itemsFromStorage= getItemsFromStorage();
    itemsFromStorage.push(items)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function onClickRemoveButton(e){
    if(e.target.classList.contains('fa-solid')){
     //Remove item from DOM
     removeFromStorage(e.target.parentElement.parentElement)
        removeItem(e.target.parentElement.parentElement);
    
        //remove from local storage
    } else{
        isEditMode = true;
        e.target.classList.add('editMode');
        input_bar.value = e.target.innerText  
        addBtn.innerText = 'Update Item'
        addBtn.style.background = '#36802d'
        
        
        // createUpdateIcon(item_form.childrens.classList.contains('btn'));
    }
    checkUI();
}
function removeItem(item){
    item.remove();
}

function createUpdateIcon(icon){
    icon.classList.add('btnUpdate');
}

function removeFromStorage(item){
    let itemsFromStorage=getItemsFromStorage();
    itemsFromStorage= itemsFromStorage.filter(element=>element!==item.innerText)
   
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function removeAll() {
    if(confirm('Ki gal piti a? sari kiti krai khu ch pan lga?')){
        list.innerHTML='';
        //remove from storage
        // let itemsFromStorage= getItemsFromStorage();
        // itemsFromStorage=[];
        // localStorage.setItem('items', JSON.stringify(itemsFromStorage));
        localStorage.removeItem('items')

    }
    
    // for (i=0; i<(list.children.length); i++){
    //     // console.log(list.children[i]);
    //     list.children[i].remove();
    // }
    //-----------------------------------------------------
        checkUI();

}
function checkUI(){
    const itemNo = list.querySelectorAll('li')
    if (itemNo.length===0){
        isEditMode = false;
        filter.style.display='none';
        clearAll.style.display='none';    
    } else{
        filter.style.display='block';
        clearAll.style.display='block';
    }
    if (isEditMode ===false){
        addBtn.innerText = 'Add Item'
        addBtn.style.background= '#444'
    }
}
function filterItems(b){
    const itemNo = list.querySelectorAll('li')
    itemNo.forEach(item => {
        if(item.innerText.toLowerCase().includes(b.target.value.toLowerCase())){
            item.style.display='flex';
        } else{item.style.display = 'none'}
    });
}

// Event listeners
item_form.addEventListener('submit', toAddItem)
list.addEventListener('click', onClickRemoveButton)
clearAll.addEventListener('click', removeAll)
filter.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', addPreviouslyStored)

checkUI();

