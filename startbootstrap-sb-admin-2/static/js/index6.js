var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

svg
    .append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-size", "20px")
    .attr("class", "title")
    .text("Total Sales Per Segment");

var x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.4),
    y = d3.scaleLinear().range([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.json('/h44', function(error, data) {
    if (error) {
        throw error;
    }

    x.domain(
        data.map(function(d) {
            return d.Segmento;
        })
    );
    y.domain([
        0,
        d3.max(data, function(d) {
            return +d.Total_Sales;
        })
    ]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("font-size", "18px")
        .attr("stroke", "blue")
        .text("Segmento");

    g.append("g")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("font-size", "18px")
        .attr("stroke", "grey")
        .text("2005-2019 Sales (units)");

    g.append("g")
        .attr("transform", "translate(0, 0)")
        .call(d3.axisLeft(y));

    g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .attr("fill", "#69b3a2")
        .attr("x", function(d) {
            return x(d.Segmento);
        })
        .attr("y", function(d) {
            return y(d.Total_Sales);
        })
        .attr("width", x.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(1500)
        .delay(function(d, i) { return i * 10; })

    .attr("height", function(d) {
        return height - y(d.Total_Sales);
    });
});

function onMouseOver(d, i) {
    d3.select(this).attr("class", "highlight");

    d3.select(this)
        .transition()
        .duration(1500)
        .attr("width", x.bandwidth() + 5)
        .attr("y", function(d) {
            return y(d.Total_Sales) - 10;
        })
        .attr("height", function(d) {
            return height - y(d.Total_Sales) + 10;
        });

    g.append("text")
        .attr("class", "val")
        .attr("x", function() {
            return x(d.Segmento);
        })

    .attr("y", function() {
        return y(d.value) - 10;
    });
}

function onMouseOut(d, i) {
    d3.select(this).attr("class", "bar");

    d3.select(this)
        .transition()
        .duration(1500)
        .attr("width", x.bandwidth())
        .attr("y", function(d) {
            return y(d.Total_Sales);
        })
        .attr("height", function(d) {
            return height - y(d.Total_Sales);
        });

    d3.selectAll(".val").remove();
}