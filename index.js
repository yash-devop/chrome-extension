// JSON.parse() is used to convert the string in object.
// JSON.stringify() is used to convert the object into string   
let myLeads = []
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el"); 
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

//localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if(leadsFromLocalStorage){ //if truthy means it is checking whether their is some key:value exist or not
    // means if we refresh our page. it will be their even after we close the browser.
    myLeads = leadsFromLocalStorage;
    render(myLeads); //saving the elements in the localStorage.
}
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true , currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url);
        // localStorage.setItem ("key","value")
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads);
    })
})
// rendering the element to the HTML page.
function render(Leads){
    let listItems = ""
    for(let i=0;i<myLeads.length;i++){
        //1st Way
        // ulEl.innerHTML += "<li>"+ myLeads[i] + "</li>";
        // 2nd way
        //create element;   
        // set text content;
        // append to ul
        // const li = document.createElement("li")
        // li.textContent = myLeads[i];
        // ulEl.append(li);
        // listItems += "<li><a href='' target='_blank'>"+ myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a href='${Leads[i]}' target='_blank'>${Leads[i]}</a>
            </li>`
    }
    ulEl.innerHTML = listItems;
}

// this adds the inputdata to the myleads .
inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value); //inputEl.value gets the value from the Input  to myLeads = []
    // clearing the input field value once button is pressed.
    inputEl.value = '' //clearing the input once button is pressed.
    // localStorage.setItem ("key","value")
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads);
});

deleteBtn.addEventListener("click",function(){
    console.log("Deleted!")
    if(confirm("Do you want to Delete all this?")){
        localStorage.clear(); //clearing the localStorage.
        myLeads = []; // reassigning the array to []
        render(myLeads);
    }
});





