let checkBoxCount = 0;
let passwordLength = 10;
let password = "";
const allCheckBox = document.querySelectorAll('input[type=checkbox');
const inputLen = document.querySelector('[data-sliderValue]');
const displayLen = document.querySelector('[data-passwordLength]');
const indicator = document.querySelector('[data-indicator]');
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const generateBtn = document.querySelector("#generate-btn");
const passwordDisplay = document.querySelector("[data-password]");
const symbolString = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const passwordText = document.querySelector('#display');
const copyBtn = document.querySelector('#copy-btn');
const copiedMsg = document.querySelector('[data-copiedMsg]');
//slider function
inputLen.value = 10;
displayLen.textContent = inputLen.value;
const handleSlider = () => {
    inputLen.value = passwordLength;
    displayLen.textContent = passwordLength;
};
inputLen.addEventListener('input', (event) => {
    passwordLength = event.target.value;
    handleSlider();
});

//strength indicator
function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow
};
setIndicator('white');

//random number and char generator
function getRandomInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRandomInt(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInt(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInt(65,91));
}
function generateSymbol(){
    const randNum = getRandomInt(0, symbolString.length);
    return symbolString.charAt(randNum);
}

//strength check
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
//copy text function
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copiedMsg.innerText = 'Copied';

    }catch(e){
        copiedMsg.innerText = 'Error';
    }
    copiedMsg.classList.remove("hidden");
    setTimeout(() => {
        copiedMsg.classList.add('hidden');
    }, 2000);
}
copyBtn.addEventListener('click', () => {
    if(passwordText.value) copyContent();
});
function handleCheckBoxChange(){
    checkBoxCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked) checkBoxCount++;
    })

    //special condition
    if(passwordLength < checkBoxCount){
        passwordLength = checkBoxCount;
        handleSlider();
    }
}
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

//shuffle password
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

//generate password function
generateBtn.addEventListener('click',()=>{
    //none of the check box is ticked
    if(checkBoxCount <=0) return;

    if(passwordLength < checkBoxCount){
        passwordLength = checkBoxCount;
        handleSlider();
    }

    //main logic
    password = "";

    // if(uppercaseCheck.checked) password += generateUpperCase();
    
    // if(lowercaseCheck.checked) password += generateLowerCase();

    // if(numbersCheck.checked) password += generateRandomNumber();

    // if(symbolsCheck.checked) password += generateSymbol();

    let funcArr = [];
    
    if(uppercaseCheck.checked) funcArr.push(generateUpperCase);
    if(lowercaseCheck.checked) funcArr.push(generateLowerCase);
    if(numbersCheck.checked) funcArr.push(generateRandomNumber);
    if(symbolsCheck.checked) funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
        
    }

    //remaining addition
    for(let i=0;i<(passwordLength - funcArr.length);i++){
        let randomIdx = getRandomInt(0,funcArr.length);
        password += funcArr[randomIdx]();
        
    }

    //shuffle the password
    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;

    //calculate strength
    calcStrength();
})

