let col = document.getElementsByClassName("col");
let darkmode = document.getElementById("darkmode");
darkmode.addEventListener("click", function(){
    document.getElementsByTagName("body")[0].classList.toggle("body");
    document.getElementsByClassName("screen")[0].classList.toggle("screenDark");
    for(let i=0; i<col.length; i++){
        col[i].classList.toggle("colDark");
    };
});

let screenOps = document.getElementsByClassName("screenOps")[0];
var result;
// Inserting numbers operations into screen
const insert=(num)=>{
  // Initial Value
  if(screenOps.textContent == "0"){
    screenOps.textContent = "";
    screenOps.textContent += num;
  }
  else if(screenOps.textContent == result){
    screenOps.textContent = "";
    screenOps.textContent += num;
  }
  else{
    screenOps.textContent += num;
  }
  return screenOps.textContent;
};

// Calculating Value
const equal=()=>{
  screenOps.textContent = screenOps.textContent.replaceAll("×", "*");
  screenOps.textContent = screenOps.textContent.replaceAll("%", "*0.01");
  let values = screenOps.textContent.replaceAll("÷", "/");
  result = Function("return " + values)();
  // result = result.toFixed(7)
  // console.log(typeof result)
  return screenOps.textContent = result;
}
// function equal() {
//   screenOps.textContent = screenOps.textContent.replaceAll("×", "*");
//   screenOps.textContent = screenOps.textContent.replaceAll("%", "*0.01");
//   let values = screenOps.textContent.replaceAll("÷", "/");
//   let result = Function("return " + values)();
//   // result = result.toFixed(7)
//   console.log(typeof result)
//   return screenOps.textContent = result;
// }

// Clearing content
const allClear=()=>{
  return screenOps.textContent = "0"
}

// Clearing Entry
const ClearEntry=()=>{
  stringResult = screenOps.textContent.slice(0, screenOps.textContent.length-1);
  return screenOps.textContent = stringResult;
}