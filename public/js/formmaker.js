//alert("hi");

var currentGroupNo = 1;
var currentGroup;
var cols=1;
var rows=1;
var groupId=1;

setSizeShow();

function setSizeShow(){
    //document.getElementById("size").innerHTML = "size is " + rows" x " + cols;
}


function createButton(){
    alert("clicked");
    var div = document.createElement("div");
    div.classList.add("container");
    var btn = document.createElement("button");
    //btn.setAttribute(type, button);
    btn.innerHTML = "btn";
    btn.classList.add("btn");
    btn.classList.add("btn-primary");

    div.appendChild(btn);

    var element = document.getElementById("formzone");
    element.appendChild(div);
}

function createGroup(){
    //this function is to create a form group

    //formgroup div
    var formGroupDiv = document.createElement("div");
    formGroupDiv.classList.add("form-group");

    //controll label
    var controllLabel = document.createElement("label");
    controllLabel.classList.add("col-sm-3");
    controllLabel.classList.add("control-label");
    controllLabel.innerHTML = "Label"

    //form container
    var formContainerDiv = document.createElement("div");
    formContainerDiv.classList.add("container-fluid");
    formContainerDiv.classList.add("col-sm-8");

    formGroupDiv.appendChild(controllLabel);
    formGroupDiv.appendChild(formContainerDiv);


    var container = document.getElementById("formzone");
    container.appendChild(formGroupDiv);
}

function createCheckBox(){
    currentGroup = "group-"+currentGroupNo;

    var checkBox = document.createElement("label");


    var input = document.createElement("input");
}

function setCols(thiscols){
    cols = thiscols;
}

function setRows(thisrows){
    rows = thisrows;
}

function add(){

    var colSize = 12/cols;
    var containerDiv = document.getElementById("containerDiv")

    for(var i = 0;i<rows;i++){
        var rowDiv = document.createElement("div");
        rowDiv.name = "rd";
        rowDiv.classList.add("row");

        for (var j = 0; j < cols; j++){
            var colDiv = document.createElement("div");
            colDiv.name = "cd";
            colDiv.classList.add("col-sm-"+colSize);
            var elementNew = document.getElementById("addNew").cloneNode(true);
            colDiv.appendChild(elementNew);
            rowDiv.appendChild(colDiv);
        }

        containerDiv.appendChild(rowDiv);
    }
}

function reset(){
    cols = 1;
    rows = 1;

    var containerParentDiv = document.getElementById("containerParentDiv");
    var containerChildDiv = document.getElementById("containerDiv");
    containerParentDiv.removeChild(containerChildDiv);

    containerChildDiv = document.createElement("div");
    containerChildDiv.name = "contadiv";
    containerChildDiv.id = "containerDiv";
    containerChildDiv.classList.add("col-sm-9");
    containerParentDiv.appendChild(containerChildDiv);

    document.getElementById("labelText").value = "";

}

function addToForm(){
    var labelText = document.getElementById("labelText").value;
    var formElements = document.getElementById("containerDiv").cloneNode(true);
    formElements.id = "group-"+groupId;

    //this function is to create a form group

    //formgroup div
    var formGroupDiv = document.createElement("div");
    formGroupDiv.name = "fgdiv";
    formGroupDiv.classList.add("form-group");

    //controll label
    var controllLabel = document.createElement("label");
    controllLabel.name = "clab";
    controllLabel.classList.add("col-sm-3");
    controllLabel.classList.add("control-label");
    controllLabel.innerHTML = labelText

    //form container
    var formContainerDiv = document.createElement("div");
    formContainerDiv.name = "fcdiv";
    formContainerDiv.classList.add("container-fluid");
    formContainerDiv.classList.add("col-sm-8");
    formContainerDiv.appendChild(formElements);

    formGroupDiv.appendChild(controllLabel);
    formGroupDiv.appendChild(formContainerDiv);


    var container = document.getElementById("formzone");
    container.appendChild(formGroupDiv);

    reset();
}

function changeToText(event){
    var oldNodeParent = event.target.parentElement.parentElement.parentElement.parentElement;

    var oldNode = event.target.parentElement.parentElement.parentElement;

    var inputNode = document.createElement("input");
    inputNode.name = "innd";
    inputNode.type="text";
    inputNode.classList.add("form-control");

    oldNodeParent.replaceChild(inputNode, oldNode);
}

function changeToOther(event,type){
    var oldNodeParent = event.target.parentElement.parentElement.parentElement.parentElement;

    var oldNode = event.target.parentElement.parentElement.parentElement;

    var inputNode = document.getElementById("inputGroup").cloneNode(true);
    inputNode.children[0].name = type;
    inputNode.id = "";

    oldNodeParent.replaceChild(inputNode, oldNode);
}

function replaceElement(event){

    var oldNodeParent = event.target.parentElement.parentElement.parentElement;

    var oldNode = event.target.parentElement.parentElement;

    var inputNode = document.createElement("div");
    inputNode.name = "inpnode";

    if(oldNode.children[0].name=="label"){
        var inputLabel = document.createElement("label");
        inputNode.name = "inplab"; 
        var tnode = document.createTextNode(oldNode.children[0].value);
        tnode.name = "tnd";
        inputLabel.appendChild(tnode);
        inputNode.appendChild(inputLabel);
    }
    else{
        inputNode.classList.add(oldNode.children[0].name);

        var inputLabel = document.createElement("label");
        inputLabel.name = "inpultable";

        var inputElement = document.createElement("input");
        inputElement.type = oldNode.children[0].name;
        inputElement.name = "rand";
        inputElement.name = document.getElementById("labelText").value;

        var tnode = document.createTextNode(oldNode.children[0].value);
        tnode.name = "tnd";

        inputLabel.appendChild(inputElement);
        inputLabel.appendChild(tnode);
        inputNode.appendChild(inputLabel);
    }    

    oldNodeParent.replaceChild(inputNode,oldNode);
}

function sendFile(){
    var read = document.getElementById("formzone");
    var readjson = toJSON(read);
    var strifile = JSON.stringify(readjson);
    var formname = document.getElementById("formname").value;

    var urltxt = "http://localhost:3000/newform/"+formname+"/"+strifile;
    //alert(urltxt);

    //var print = document.getElementById("print");
    //print.innerHTML = urltxt;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET",urltxt);
    xhttp.send();

    //var filed = JSON.parse(strifile);
    //var newe = toDOM(filed);

    //print.appendChild(newe);
    alert("Form sent successfully!");
}

function removeGroup(){
    var fz = document.getElementById("formzone");
    var len = fz.children.length;
    document.removeChild(fz.children[len]);
}

