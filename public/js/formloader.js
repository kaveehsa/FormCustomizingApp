var currentform;

function setCurrentForm(event){
    currentform = event.target.id;
    fetForm();
    
}


function fetForm(){
    
    $.get("http://localhost:3000/Customerforms/"+currentform, function(data, status){
            
            var dataString = JSON.stringify(data);
            var formDOM = toDOM(data);
            var formloaddiv = document.getElementById("formload");
            formloaddiv.appendChild(formDOM);

            var submitbtn = document.getElementById("submitb").cloneNode(true);
            formloaddiv.appendChild(submitbtn);

        });
}

function submitb(){
    alert("All data loaded successfully");
}