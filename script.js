import { countryList } from "./countries.js";
let change=document.querySelector(".exchange")
let dropdowns=document.querySelectorAll("select")
let interchange=document.querySelector("span")


//CONVERSION
async function exchange() {
    let inp = document.querySelector(".input-option").value;
    let oup = document.querySelector(".output-option").value;
    let promise = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${inp.toLowerCase()}.json`);
    let data = await promise.json();
    let rate=data[inp.toLowerCase()][oup.toLowerCase()]
    let Iamount= document.querySelector("#input-value").value
    if(Iamount===""){
        Iamount="1"
        document.querySelector("#input-value").value="1"
    }
    document.querySelector("#output-value").value=Iamount*rate;
    document.querySelector("#last").innerText=`Rate: 1 ${inp} = ${rate} ${oup}`
};


//DROPDOWNS
for(let select of dropdowns){
    for(let code in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=code;
        newOption.value=code;
        select.append(newOption);
        if(select.className==="input-option"&&code==="USD"){
            newOption.selected="selected";
        }
        else if(select.className==="output-option"&&code==="INR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(e)=>{
        flags(e.target)
    });
}

//UPDATE FLAGS
function flags(s){
    let curr=s.value;
    let coun=countryList[curr]
    let flag=s.parentElement.querySelector("img")
    flag.src=`https://flagsapi.com/${coun}/flat/64.png`
}

//CONVERT
change.addEventListener("click",()=>{
    exchange()
})

//INTERCHANGE
interchange.addEventListener("click",(e)=>{
    let tempflag=document.querySelector(".conversion-input img").src
    document.querySelector(".conversion-input img").src=document.querySelector(".conversion-output img").src
    document.querySelector(".conversion-output img").src=tempflag
    let tempselect=document.querySelector(".conversion-input select").value
    document.querySelector(".conversion-input select").value=document.querySelector(".conversion-output select").value
    document.querySelector(".conversion-output select").value=tempselect
})

