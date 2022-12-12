

const url = 'http://localhost:3000/users'
const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const numberInput = document.querySelector('#number');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const btn = document.getElementById('btn')

window.addEventListener('DOMContentLoaded', showUserDetails);


// Listen for form submit
btn.addEventListener('click', onSubmit);


async function onSubmit(e) {
  
  e.preventDefault()
  if(nameInput.value === '' || emailInput.value === '' || numberInput.value === '') {

    // alert('Please enter all fields');
    
    const span = document.createElement('span')
    msg.appendChild(span)
    span.classList.add('error');
    span.textContent = 'Please Enter All the Fields'
    setTimeout(()=> span.remove() ,3000)
    
  } 
  else {


    let myObj = {
        name : nameInput.value,
        email : emailInput.value,
        number : numberInput.value
    }
   
    const response = await axios.post(url +'/post-user/', myObj)
    alert(response.data.message)
    
    showUserDetails()

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
    numberInput.value = '';
  }
}


async function showUserDetails(){
    userList.innerHTML = "";
    const userDetails = await axios.get(url + '/get-users')
    userDetails.data.forEach(element => {
        const li = document.createElement('li')
        li.textContent = `${element.name} : ${element.email} : ${element.number}`
        li.id = element.id
        const deleteBtn = document.createElement('button');
        
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.backgroundColor = 'red';
        deleteBtn.style.margin = '0 20px'
        deleteBtn.style.padding = '0 20px'
        deleteBtn.style.float = 'right'
        const editBtn = document.createElement('button')
        editBtn.style.backgroundColor = 'skyblue'
        editBtn.style.float = 'right';
        editBtn.textContent = 'Edit' ;
        editBtn.style.padding = '0 20px'
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        const id = element.id;
        deleteBtn.addEventListener('click' , ()=>deleteUser(id))
        editBtn.addEventListener('click' , ()=>editUser(id))
        userList.appendChild(li) 
        
   })
};

async function deleteUser(id){
    
    const deleteUser = await axios.delete(url+'/delete-user/'+id)
    alert(deleteUser.data.message)

    showUserDetails()
}


async function editUser(id){
    const userDetails = await axios.get(url+'/get-users/' +id)
    nameInput.value = userDetails.data.name;
    emailInput.value = userDetails.data.email;
    numberInput.value = userDetails.data.number
    btn.style.display = 'none'
    const editBtnForm = document.createElement('button')
    editBtnForm.textContent = "EDIT CHANGES"
    editBtnForm.className = 'btn'
    myForm.appendChild(editBtnForm)
    editBtnForm.addEventListener('click' , (e)=>editUserDetails(e,id , editBtnForm))

}

async function editUserDetails(e , id ,editBtnForm){
    e.preventDefault();
    
    const obj = {
        name : nameInput.value ,
        email : emailInput.value ,
        number : numberInput.value
    }
    const response = await axios.patch(url +'/edit-user/'+id , obj)
    showUserDetails()
    alert(response.data.message)
    btn.value = 'Submit'
    nameInput.value = ""
    emailInput.value = ""
    numberInput.value = ""
    
    myForm.removeChild(editBtnForm)
    btn.style.display = 'inline'
    
}



