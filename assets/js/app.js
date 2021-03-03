// set svg and dimensions of chart

//Set variable for height and width for calculation
var svgWidth = 800;
var svgHeight = 400;

//set chart margins
var chartMargin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 60
};

// Set the dimensions for chart
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter in html & append svg & dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from journalism data csv
d3.csv("assets/data/data.csv").then(function (journalismData) {

    // Print the csv data
    console.log(journalismData);

    // Cast the hours value to a number for each piece of tvData
    journalismData.forEach(function (chartData) {
        chartData.income = +chartData.income;
        chartData.smokes = +chartData.smokes;

        //console log data
        console.log(chartData.income);
        console.log(chartData.smokes);

        //creating scaling
        var xScale = d3.scaleLinear()
            .domain([35000, d3.max(journalismData, d => d.income)])
            .range([0, chartWidth]);

        var yScale = d3.scaleLinear()
            .domain([2, d3.max(journalismData, d => d.smokes)])
            .range([chartHeight, 0])

        //create axis -day 2 activity 5
        var yAxis = d3.axisLeft(yScale);
        var xAxis = d3.axisBottom(xScale);

        // set x to the bottom of the chart 
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis);

        // set y to the y axis
        chartGroup.append("g")
            .call(yAxis);

        // create data format for circles
        var circle = svg.selectAll("g circle").data(journalismData).enter();

        circle
            .append("circle")
            .attr("cx", d => xScale(d.income))
            .attr("cy", d => yScale(d.smokes))
            .attr("r", "15")
            .attr("fill", "orange")
            .attr("opacity", ".3")

        circle
            .append("text")
            .text(d => d.abbr)
            .attr("fill", "black")
            .attr("font-size", "10px")
            .attr("x", d => xScale(d.income))
            .attr("y", d => yScale(d.smokes));

        // Axis labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - chartMargin.left + 1)
            .attr("x", 0 - (svgHeight / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Smoking");

        chartGroup.append("text")
            .attr("transform", `translate(${svgWidth / 2}, ${svgHeight + chartMargin.top + 30})`)
            .attr("class", "axisText")
            .text("Household Income");

    });
})

