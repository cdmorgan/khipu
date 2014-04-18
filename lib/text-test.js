var margin = {
	top : 40,
	right : 40,
	bottom : 40,
	left : 40
}, w = 0.5 * D3_WIDTH - margin.left - margin.right, h = 0.25 * D3_HEIGHT - margin.top - margin.bottom, x_range = d3.scale.linear().range([0, w]), y_range = d3.scale.linear().range([0, h]), color = d3.scale.category20c();

var vis = d3.select('#divName').append("svg:svg").attr("width", w).attr("height", h).style("left", margin.left + "px").style("top", margin.top + "px");

var partition = d3.layout.partition().value(function(d) {
	return d.size;
});

d3.json(jsonRequestUrl, function(json) {
	var data = partition(json);
	var rect = vis.selectAll("rect").data(data).enter().append("svg:rect").attr("x", function(d) {
		return x_range(d.x);
	}).attr("y", function(d) {
		return y_range(d.y);
	}).attr("width", function(d) {
		return x_range(d.dx);
	}).attr("height", function(d) {
		return y_range(d.dy);
	}).attr("fill", function(d) {
		return color(d.name);
	}).style("cursor", "pointer").on("click", click);
	var fo = vis.selectAll("foreignObject").data(data).enter().append("svg:foreignObject").attr("x", function(d) {
		return x_range(d.x);
	}).attr("y", function(d) {
		return y_range(d.y);
	}).attr("width", function(d) {
		return x_range(d.dx);
	}).attr("height", function(d) {
		return y_range(d.dy);
	}).style("cursor", "pointer").text(function(d) {
		return d.name;
	}).on("click", click);

	function click(d) {
		x_range.domain([d.x, d.x + d.dx]);
		y_range.domain([d.y, 1]).range([d.y ? 20 : 0, h]);

		rect.transition().duration(750).attr("x", function(d) {
			return x_range(d.x);
		}).attr("y", function(d) {
			return y_range(d.y);
		}).attr("width", function(d) {
			return x_range(d.x + d.dx) - x_range(d.x);
		}).attr("height", function(d) {
			return y_range(d.y + d.dy) - y_range(d.y);
		});

		fo.transition().duration(750).attr("x", function(d) {
			return x_range(d.x);
		}).attr("y", function(d) {
			return y_range(d.y);
		}).attr("width", function(d) {
			return x_range(d.x + d.dx) - x_range(d.x);
		}).attr("height", function(d) {
			return y_range(d.y + d.dy) - y_range(d.y);
		});
	}

}); 