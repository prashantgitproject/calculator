let cell = document.getElementsByClassName("cell");
let darkmode = document.getElementById("lightmode");
// –––––––––––Enabling Light Mode––––––––––––––––
darkmode.addEventListener("click", function(){
    document.getElementsByTagName("body")[0].classList.toggle("bodyLight");
    document.getElementsByClassName("screen")[0].classList.toggle("screenLight");
    document.getElementsByClassName("input")[0].classList.toggle("inputLight");
    for(let i=0; i<cell.length; i++){
        cell[i].classList.toggle("cellLight");
    };
});

let input = document.getElementsByClassName("input")[0];
let inputValue = input.value 
let result;
let equalClicked = false;


// ––––––––––Inserting numbers into screen–––––––––––––
const insert=(num)=>{
  let start = input.selectionStart
  let end = input.selectionEnd
  let text = input.value
  let before = text.substring(0, start)
  let after  = text.substring(end, text.length)
    //removing text after result
  if(input.value == result){
    input.value = (num + after)
  }
  else if(input.value == "NaN"){
    input.value = (num + after)
  }
  else{
    input.value = (before + num + after) 
  }
  input.selectionStart = input.selectionEnd = start + num.length
  // input.focus()
};

//––––––––––Inserting operations into screen–––––––––––––––––––
let operation = document.getElementsByClassName("operation");
  for(let i=0; i<operation.length; i++){
    operation[i].addEventListener("click", function(){
      // console.log("operation "+ i + " clicked");
      let start = input.selectionStart
      let end = input.selectionEnd
      let text = input.value
      let before = text.substring(0, start)
      let after  = text.substring(end, text.length)
      if(text == "NaN" || text == ""){
        input.value = ("0" + operation[i].textContent + after)
      }
      else{
        input.value = (before + operation[i].textContent + after) 
      }
    })
  } 
  


//––––––––––Inserting number in especial functions like log, sin, tan–––––––––––––
const espFunc=(func)=>{
  if(func == "log"){
    insert("log()")
  }
  else if(func == "sin"){
    insert("sin(θ=)")
  }
  else if(func == "tan"){
    insert("tan(θ=)")
  }
  else if(func == "cos"){
    insert("cos(θ=)")
  }
  else if(func == "ln"){
    insert("ln()")
  }
  else if(func == "Inv"){
    insert("Inv()")
  }
  else if(func == "√"){
    insert("√()")
  }
  else if(func == "!"){
    insert("Fac()")
  }
  else if(func == "e^"){
    insert("e^()")
  }
  else if(func == "^"){
    insert("Pow(x, y)")
  }
  inBracket()
}

// ––––––––––Calculating Value–––––––––––
const equal= ()=>{
  input.value = input.value.replaceAll("Ans", result);
  if(input.value == ""){
    return input.value = "NaN"
  }
  else if (input.value.match(/\d+!/g)){
    FacNew();
  }
  input.value = input.value.replaceAll("×", "*");
  input.value = input.value.replaceAll("%", "*0.01");
  input.value = input.value.replaceAll("√", "sqRoot");
  input.value = input.value.replaceAll("θ=", "(π/180)*");
  input.value = input.value.replaceAll("e^(", "Exp(");

  input.value = input.value.replaceAll("e", "Math.E");
  input.value = input.value.replaceAll("π", "Math.PI");
  let values = input.value.replaceAll("÷", "/");
  result = Function("return " + values)();
  // result = evaluate(values)
  return input.value = result;
}

// –––––Clearing All Content–––––––
const allClear=()=>{
  return input.value = ""
}

// –––––––Clearing Entry––––––––––
const clearEntry=()=>{
  let start = input.selectionStart
  let end = input.selectionEnd
  let text = input.value
  let before = text.substring(0, start)
  let after  = text.substring(end, text.length)
  let newBefore = input.value.substring(0, before.length-1);
  input.value = (newBefore + after);
  // console.log(input.value)
  // input.focus()
  input.selectionStart = input.selectionEnd = before.length -1
}

// –––––––––Taking text cursor inside bracket––––––––––
const inBracket=()=>{
  let pos = input.value.length - 1;
    input.focus();
    input.setSelectionRange(pos, pos);
  }


// ––––DEFINING VARIOUS FUNCTIONS!–––––

//log function
const log=(x)=>{
  let logValue =  Math.log10(x);
  return logValue
}

//ln function
const ln=(x)=>{
  let lnValue =  Math.log(x);
  return  lnValue
}

//Root function
const sqRoot=(x)=>{
  let Value =  Math.sqrt(x);
  return  Value
}

//sin function
const sin=(x)=>{
  let Value =  Math.sin(x);
  return  Value
}

//cos function
const cos=(x)=>{
  let Value =  Math.cos(x);
  return  Value
}

//tan function
const tan=(x)=>{
  let Value =  Math.tan(x);
  return  Value
}

//exp function
const Exp=(x)=>{
  let Value =  Math.exp(x);
  return  Value
}

//power function
const Pow=(x, y)=>{
  let Value =  Math.pow(x, y);
  return  Value
}

//Factorial function
const Fac=(num)=>{
  if (num === 0 || num === 1)
  return 1;
for (let i = num - 1; i >= 1; i--) {
  num *= i;
}
return num;
}
// –––––––––––Calculating factorial by ! notation––––––––
const FacNew=()=>{
let numWithFac = input.value.match(/\d+!/g);

  let numWithoutFac = numWithFac.map((x)=>{
    return parseInt(x);
  }) 

  let numWithoutFacResult = numWithoutFac.map((x)=>{
    return Fac(x);
  })
  
for(let i=0; i<numWithoutFacResult.length; i++){
 input.value = input.value.replaceAll(numWithFac[i], numWithoutFacResult[i].toString());
}
return input.value
}



// –––––––––-Session storage of the result–––––––––––––––
let eql = document.getElementsByClassName("equal")[0]
eql.addEventListener("click", function(){

let sessionValue = result;
if(input.value == sessionValue){
  sessionStorage.removeItem("ans")
  sessionStorage.setItem("ans", sessionValue)
  console.log("ans stored = " + sessionValue)
  equalClicked = true;
}
else{
  // console.log(sessionValue)
  console.log("Session value is not stored")
}
})

const ans=()=>{
  let ans = sessionStorage.getItem("ans");
  insert("Ans");
  return ans
}