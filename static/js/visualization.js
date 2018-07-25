queue()
    .defer(d3.json, "/videoGames/videoGameSales")
    .await(createGraphs);

function createGraphs(error, videoGameSales) {
    if (error) {
        console.error("createGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    // Create a Crossfilter instance
    var ndx = crossfilter(videoGameSales);

    // Define Dimensions
    var yearReleaseDim = ndx.dimension(function (d) {
        return d["Year"];
    });
    var genreDim = ndx.dimension(function (d) {
        return d["Genre"];
    });
    var publisherDim = ndx.dimension(function (d) {
        return d["Publisher"];
    });
    var platformDim = ndx.dimension(function (d) {
        return d["Platform"];
    });
    var totalNumEUSales = ndx.dimension(function (d) {
        return d["EU_Sales"];
    });
    var totalNumGames = ndx.dimension(function (d) {
        return d["Rank"];
    });
    var totalNumGlobalSales = ndx.dimension(function (d) {
        return d["Global_Sales"];
    });
    var totalNumJPSales = ndx.dimension(function (d) {
        return d["JP_Sales"];
    });
    var totalNumNASales = ndx.dimension(function (d) {
        return d["NA_Sales"];
    });
    var totalNumOtherSales = ndx.dimension(function (d) {
        return d["Other_Sales"];
    });
    // TODO world sales dim

    // Add the Metrics

    var numVideoGameSalesByDate = yearReleaseDim.group();
    var numVideoGameGenres = genreDim.group();
    var numVideoGamePublishers = publisherDim.group();
    var numVideoGameSalesByPlatform = platformDim.group();

    // Not sure if required?
    // var all = ndx.groupAll();
    var totalEUSales = totalNumEUSales.groupAll().reduceSum(function (d) {
        return d["EU_Sales"];
    });
    var totalGames = totalNumGames.groupAll().reduceSum(function (d) {
        return d["Rank"];
    });
    var totalGlobalSales = totalNumGlobalSales.groupAll().reduceSum(function (d) {
        return d["Global_Sales"];
    });
    var totalJPSales = totalNumJPSales.groupAll().reduceSum(function (d) {
        return d["JP_Sales"];
    });
    var totalNASales = totalNumNASales.groupAll().reduceSum(function (d) {
        return d["NA_Sales"];
    });
    var totalOtherSales = totalNumOtherSales.groupAll().reduceSum(function (d) {
        return d["Other_Sales"];
    });

    // Values for charts
    var minYear = yearReleaseDim.bottom(1)[0]["Year"];
    var maxYear = yearReleaseDim.top(1)[0]["Year"];

    // Charts
    var yearChart = dc.barChart("#year-release-bar-chart");
    var genreChart = dc.rowChart("#genre-row-chart");
    var publisherChart = dc.rowChart("#publisher-row-chart");
    // TODO insert world map var here
    var platformChart = dc.pieChart("#platform-pie-chart");

    // Metric Counters
    var euSalesND = dc.numberDisplay("#number-eu-sales-nd");
    var videoGamesND = dc.numberDisplay("#number-video-games-nd");
    var globalSalesND = dc.numberDisplay("#number-global-sales-nd");
    var jpSalesND = dc.numberDisplay("#number-japan-sales-nd");
    var naSalesND = dc.numberDisplay("#number-na-sales-nd");
    var otherSalesND = dc.numberDisplay("#number-other-sales-nd")

    // Chart properties and values
    euSalesND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalEUSales);

    videoGamesND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalGames);

    globalSalesND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalGlobalSales);

    jpSalesND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalJPSales);

    naSalesND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalNASales);

    otherSalesND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalOtherSales);

    yearChart
        // amend values to own spec
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(yearReleaseDim)
        .group(numVideoGameSalesByDate)
        .xAxis().ticks(4);

    genreChart
        // amend values to own spec
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(genreDim)
        .group(numVideoGameGenres)
        .xAxis().ticks(4)

    publisherChart
        // amend values to own spec
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(publisherDim)
        .group(numVideoGamePublishers)
        .xAxis().ticks(4)

    // TODO world Map properties and values

    platformChart
        // amend values to own spec
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(platformDim)
        .group(numVideoGameSalesByPlatform)
        .xAxis().ticks(4)

    dc.renderAll();
};