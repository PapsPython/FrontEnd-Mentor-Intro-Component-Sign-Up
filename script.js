//const trialBtn = document.getElementById("freetrialbtn")
const inputs = document.querySelectorAll("input")
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const form = document.getElementById("signup")
const smalls = document.querySelectorAll("small")
let passwordResultArray = []
let txt = ""

console.log(passwordResultArray)

const APP = {
  init(){
   APP.addListeners()
  },
  addListeners(){
   

    firstName.addEventListener("input",APP.testName)
    lastName.addEventListener("input",APP.testName)
    email.addEventListener("input",APP.testEmail)
    password.addEventListener("input",APP.testPassword)

    firstName.addEventListener("change",APP.testName)
    lastName.addEventListener("change",APP.testName)
    email.addEventListener("change",APP.testEmail)
    password.addEventListener("change",APP.testPassword)

    email.addEventListener("invalid",APP.fail)
    lastName.addEventListener("invalid",APP.fail)
    firstName.addEventListener("invalid",APP.fail)
    password.addEventListener("invalid",APP.failedPass)
    
    form.addEventListener("submit",APP.validateform)
  },
    // validateform(){
    // smalls.forEach(small => small.textContent = "")
    // },
  
    testName(ev){
     
    let name = ev.target
    let span = name.parentElement.querySelector("small")
      span.textContent = ""
    let userResponse = name.value
    userResponse = userResponse.toUpperCase()
    name.value = userResponse
    name.setCustomValidity("")
    let isValid = name.checkValidity()
    if(isValid === false) {
      document.querySelector(`input #${ev.target.id}`).classList.add("errbackground")
    }
 },
  
  testEmail(ev){
    let email = ev.target
    let span = email.parentElement.querySelector("small")
    span.textContent = ""
    email.setCustomValidity("")
    let isValid = email.checkValidity()
    if(isValid){
      APP.regExCheck()
    }
  }, 
  
  testPassword(ev){
    let input = ev.target
   let smalls = input.parentElement.querySelectorAll("small")
    console.log(smalls)
    smalls.forEach(small => small.textContent = "")
   
   const result = {
     upper:false, //why set the property key to false and not true
     lower:false,
     number:false,
     lenth:false,
     matches:null,
     invalid:true
   };
    
    txt = input.value.trim() 
    result.upper = /[A-Z]/.test(txt)
    result.lower = /[a-z]/.test(txt)
    result.number = /[0-9]/.test(txt)
    result.lenth = txt.length >= 10
    result.matches = txt.match(/[A-Za-z0-9_!@#$%^&*().,?;:~]/)
    
    if(result.matches && result.matches.length >= 10){
        result.invalid = false
        input.setCustomValidity("")
      }else{
       input.setCustomValidity("Password needs a few changes")
       input.checkValidity()
       input.reportValidity()
    }
   
    passwordResultArray.push(result); 
    
    },

 regExCheck() {
    let regex= /^([a-zA-Z0-9\.-]+)@([a-zA-Z]+).([a-z]{2,6})([\.a-z]{2,6}?)$/
    if (regex.test(email.value) === false){
      email.setCustomValidity("Not a Valid email Address")
      email.reportValidity()
    }
  },
  
 fail(ev){
   let field = ev.target
   switch (field.id){
     case "email":
  let span = field.parentElement.querySelector("small")  
  span.textContent = "Looks like this is not an email"
   field.placeholder = "email@example/com" 
        
     
     inputs.forEach(input => 
       input.classList.add("errbackground") 
                     )
      break; 
     case "firstname":
   let pan = field.parentElement.querySelector("small") 
    pan.textContent = "Firstname is required"
    break;
     case "lastname":
    let an = field.parentElement.querySelector("small") 
       an.textContent = "Lastname is required"
     break;  
   }
},
  failedPass(ev){
    let pass = ev.target   
   let nodeOfSmalls = pass.parentElement.querySelectorAll("small")
    //cantBeEmpty.textContent = "Password Cannot Be Empty"    
    let arrayOfSmalls = Array.from(nodeOfSmalls)  
    let lastPasswordIndex = passwordResultArray.length - 1
    let passwordResult = passwordResultArray[lastPasswordIndex]
    
    arrayOfSmalls.forEach( function(small) { 
      small.textContent = ""
        let passwordResultProperty = small.id
      //console.log(typeof passwordResultProperty)
     // console.log(passwordResult[passwordResultProperty]) 
      
     switch (false){
         
       case passwordResult["upper"]:
     
         document.getElementById("upper").textContent= `Password needs an uppercase letter`
        break;
         
        case passwordResult["lower"] :
         document.getElementById("lower").textContent= `Password needs a lowercase letter` 
         break;

         case passwordResult["number"] :
         document.getElementById("number").textContent= `Password needs a number` 
         break;
        
    case passwordResult["lenth"] :
       
  document.getElementById(`lenth`).textContent= `Password is currently ${txt.length} characters add ${11-txt.length} or more characters`
        break; 
    }
      
      })
       

   
       
    // switch(passwordResult[passWord.id]) {
    //      case passwordResult["upper"] === false:
    //     console.log(passWord.id)
    // passWord.id.textContent = "Password Needs An Uppercase"
    //   break;
    //  }
   }

  
}

//APP.testPassword()

//console.log(response)


document.addEventListener("DOMContentLoaded",APP.init)



  //My attempt

// function errorBtn(e){
//   e.preventDefault()
//   console.log("clicked")
//   inputs.forEach(function(input){
    
//      if(input.value){
//        input.classList.remove("errbackground")
//      }
//     else{
//       input.classList.add("errbackground")
//        errMessages.forEach(function(errmsg){
//        errmsg.dataset.name == input.id ? errmsg.textContent =`${input.id} cannot be empty` : errmsg.textContent = "" 
//        })
//        errmsg.textContent=""
//       }
//    })
 // }

  
// inputs.forEach(input => input.addEventListener("keyup",errorBtn))