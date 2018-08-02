var removeAttribute = document.getElementById("load-div")

removeAttribute.style.display = '';

var tabledData = dc.dataTable("#data-table");
tabledData
    // TODO figure out what dimension to place in here.
    .dimension()
    .columns([
        function (d) {
            return d.Name;
        },
        function (d) {
            return d.Platform;
        },
        function (d) {
            return d.Year;
        },
        function (d) {
            return d.Genre;
        },
        function (d) {
            return d.Publisher;
        },
        function (d) {
            return d.NA_Sales;
        },
        function (d) {
            return d.EU_Sales;
        },
        function (d) {
            return d.JP_Sales;
        },
        function (d) {
            return d.Other_Sales;
        },
        function (d) {
            return d.Global_Sales;
        }
    ]);

dc.renderAll();