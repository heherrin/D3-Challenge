// set svg and dimensions of chart

//Set variable for height and width for calculation
var svgWidth = 900;
var svgHeight = 500;

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
            .domain([0, d3.max(journalismData, d => d.income)])
            .range([0, chartWidth]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(journalismData, d => d.smokes)])
            .range([chartHeight, 0])



    });
})

