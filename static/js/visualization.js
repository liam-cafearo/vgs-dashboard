queue()
    .defer(d3.json, "/vgsJson")
    .await(createGraphs);

function createGraphs(error, videoGameSales) {
    if (error) {
        console.error("createGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    // Create a Crossfilter instance
    var ndx = crossfilter(videoGameSales);

    // Dimensions start

    var yearReleaseDim = ndx.dimension(function (d) {
        return d["Year"] ? d["Year"] : 0;
    });
    var genreDim = ndx.dimension(function (d) {
        return d["Genre"] ? d["Genre"] : "";
    });
    var publisherDim = ndx.dimension(function (d) {
        return d["Publisher"] ? d["Publisher"] : "";
    });
    var platformDim = ndx.dimension(function (d) {
        return d["Platform"] ? d["Platform"] : "";
    });
    var totalNumEUSales = ndx.dimension(function (d) {
        return d["EU_Sales"] ? d["EU_Sales"] : 0;
    });
    // TODO - No longer a Rank column so need to figure out how to work this out.
    // var totalNumGames = ndx.dimension(function (d) {
    //     return d["Rank"];
    // });
    var totalNumGlobalSales = ndx.dimension(function (d) {
        return d["Global_Sales"] ? d["Global_Sales"] : 0;
    });
    var totalNumJPSales = ndx.dimension(function (d) {
        return d["JP_Sales"] ? d["JP_Sales"] : 0;
    });
    var totalNumNASales = ndx.dimension(function (d) {
        return d["NA_Sales"] ? d["NA_Sales"] : 0;
    });
    var totalNumOtherSales = ndx.dimension(function (d) {
        return d["Other_Sales"] ? d["Other_Sales"] : 0;
    });
    // TODO world sales dim

    // Dimensions end

    // Metrics start

    var numVideoGameSalesByDate = yearReleaseDim.group();
    var numVideoGameGenres = genreDim.group();
    var numVideoGamePublishers = publisherDim.group();
    var numVideoGameSalesByPlatform = platformDim.group();

    // Not sure if required?
    // var all = ndx.groupAll();
    var totalEUSales = totalNumEUSales.groupAll().reduceSum(function (d) {
        return d["EU_Sales"];
    });
    // TODO - No longer a Rank column so need to figure out how to work this out.
    // var totalGames = totalNumGames.groupAll().reduceSum(function (d) {
    //     return d["Rank"];
    // });
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

    // Metrics end

    // Values for charts
    var minYear = yearReleaseDim.bottom(1)[0]["Year"];
    var maxYear = yearReleaseDim.top(1)[0]["Year"];

    // Charts

    // Bar chart variables
    // Check if variable names are OK as these are similar to the lesson

    var margin = {
        top: 50,
        right: 0,
        bottom: 50,
        left: 50
    };
    var canvasWidth = svgWidth + margin.right + margin.left;
    var canvasHeight = svgHeight + margin.top + margin.bottom;

    var svgWidth = 500;
    var svgHeight = 300;
    var spacing = 2;

    // TODO ask mentor for advise on this
    // d3.json("json", function (error, yearData) {
    //     yearData.forEach(function (d) {
    //         d.Year = +d.Year;
    //     });

    //     var maxData = d3.max(yearData);

    //     var heightScale = d3.scale.linear()
    //         .domain([0, maxData])
    //         .range([0, svgHeight]);

    //     var yAxisScale = d3.scale.linear()
    //         .domain([0, maxData])
    //         .range([svgHeight, 0]);

    //     var xAxisScale = d3.scale.ordinal()
    //         .domain(yearData.map(function (d) {
    //             return d.Year;
    //         }))
    //         .rangeBands([0, svgWidth]);

    //     var colorScale = d3.scale.linear()
    //         .domain([0, maxData])
    //         .range(["blue", "red"]); // TODO amend color to fit website style

    //     var yAxis = d3.svg.axis()
    //         .scale(yAxisScale)
    //         .orient("left")
    //         .ticks(8);

    //     var xAxis = d3.svg.axis()
    //         .scale(xAxisScale)
    //         .orient("bottom")
    //         .ticks(yearData.length)

    //     var canvas = d3.select("body")
    //         .append("svg")
    //         .attr("width", canvasWidth)
    //         .attr("height", canvasHeight)
    //         .attr("style", "background-color:#ddd"); // TODO amend color to suit dashboard color scheme.

    //     canvas.append("g")
    //         .attr("class", "axis") // styled axis in myCSS file
    //         .attr("transform", "translate(" + (margin.left - 2) + "," + margin.bottom + ")")
    //         .call(yAxis);

    //     canvas.append("g")
    //         .attr("class", "axis")
    //         .attr("transform", "translate(" + margin.left + "," + (canvasHeight - (margin.bottom - 2)) + ")")
    //         .call(xAxis);

    //     var svg = canvas.append("g")
    //         .attr("width", svgWidth)
    //         .attr("height", svgHeight)
    //         .attr("style", "background-color:#ddd")
    //         .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")")

    //     svg.selectAll("rect")
    //         .data(yearData)
    //         .enter()
    //         .append("rect")
    //         .attr("x", function (d, i) {
    //             return i * (svgWidth / yearData.length);
    //         })
    //         .attr("y", function (d) {
    //             return svgHeight - (heightScale(d));
    //         })
    //         .attr("width", (svgWidth / yearData.length) - spacing)
    //         .attr("height", function (d) {
    //             return (heightScale(d));
    //         })
    //         .attr("fill", function (d) {
    //             return (colorScale(d));
    //         });
    // });

    // Bar chart variables

    var yearChart = dc.barChart("#year-release-bar-chart");
    var genreChart = dc.rowChart("#genre-row-chart");
    var publisherChart = dc.rowChart("#publisher-row-chart");
    // TODO insert world map var here
    var platformChart = dc.pieChart("#platform-pie-chart");

    // Metric Counters
    var euSalesND = dc.numberDisplay("#number-eu-sales-nd");
    // var videoGamesND = dc.numberDisplay("#number-video-games-nd");
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

    // videoGamesND
    //     .formatNumber(d3.format("d"))
    //     .valueAccessor(function (d) {
    //         return d;
    //     })
    //     .group(totalGames);

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

    // TODO ask mentor for advise on this
    // yearChart
    //     // amend values to own spec
    //     .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
    //     .width(1200)
    //     .height(300)
    //     .dimension(yearReleaseDim)
    //     .group(numVideoGameSalesByDate)
    //     .renderArea(true)
    //     .transitionDuration(500)
    //     .x(d3.time.scale().domain([minYear, maxYear]))
    //     .elasticY(true)
    //     .xAxisLabel("Year")
    //     .yAxis().ticks(6);

    genreChart
        // amend values to own spec
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(genreDim)
        .group(numVideoGameGenres)
        .xAxis().ticks(4);

    publisherChart
        // amend values to own spec
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(300)
        .height(250)
        .dimension(publisherDim)
        .group(numVideoGamePublishers)
        .xAxis().ticks(4);

    // TODO world Map properties and values

    // TODO - Need to add svg components to make this a bar chart.
    platformChart
        // amend values to own spec
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .height(220)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(platformDim)
        .group(numVideoGameSalesByPlatform);

    dc.renderAll();
};