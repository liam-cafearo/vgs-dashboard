var loaderVar;

function loaderFunction() {
    loaderVar = setTimeout(displayPage, 45000);
}

function displayPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("load-message").style.display = "none";
    document.getElementById("load-div").style.display = "block";
}