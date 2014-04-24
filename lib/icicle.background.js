function colors(str) {
	if (!isNaN(str))
		return "#962";
	else if (str == "UR1032" || str == "UR114" || str == "UR1140" || str == "UR040" || str == "UR1127")
		return "#F00";
	else if (str == "UR1136" || str == "UR1176" || str == "UR122" || str == "UR121")
		return "#FF0";
	else
		return "#00F";
}

var width = 960, height = 500,
	x = d3.scale.linear().range([0, width]),
	y = d3.scale.linear().range([0, height]),
	color = d3.scale.category20c(),
	vis = d3.select("#chart").append("svg").attr("width", width).attr("height", height);

var partition = d3.layout.partition().value(function(d) {
	return 1;//Number(d.values) == 0 ? 1 : d.values;
});

d3.json("./data/khipus.json", function(json) {
	addValues(json);
	var rect = vis.data([json]).selectAll("rect").data(partition.nodes).enter().append("rect").attr("x", function(d) {
		return x(d.x);
	}).attr("y", function(d) {
		return y(d.y);
	}).attr("width", function(d) {
		return x(d.dx);
	}).attr("height", function(d) {
		return y(d.dy);
	}).attr("fill", function(d) {
		return d.color || colors(d.name);
	}).style("stroke", "black").style("stroke-width", 1).on("click", click);

	function click(d) {
		x.domain([d.x, d.x + d.dx]);
		y.domain([d.y, 1]).range([d.y ? 20 : 0, height]);

		rect.transition().duration(750).attr("x", function(d) {
			return x(d.x);
		}).attr("y", function(d) {
			return y(d.y);
		}).attr("width", function(d) {
			return x(d.x + d.dx) - x(d.x);
		}).attr("height", function(d) {
			return y(d.y + d.dy) - y(d.y);
		});
	}

});
