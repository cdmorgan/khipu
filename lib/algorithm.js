function addValues(khipus) {
	if(khipus.name && khipus.name != "Nasca Khipus") {
		addKhipuValues(khipus);
	} else {
		for (var i = 0; i < khipus.children.length; i++) {
			addKhipuValues(khipus.children[i]);
		}
	}
}

function addKhipuValues(khipu) {
	var val;
	for (var i = 0; i < khipu.children.length; i++) {
			val = 0;
			khipu.children[i].values = 
				addCords(khipu.children[i]);
	}
	
	function addCords(group) {
		for (var i = 0; i < group.children.length; i++) {
			val += group.children[i].values;
			if(group.children[i].children)
				addSubs(group.children[i]);
		}
		return val;
	}
	
	function addSubs(cord) {
		for (var i = 0; i < cord.children.length; i++) {
			val += cord.children[i].values;
			if(cord.children[i].children)
				addSubs(cord.children[i]);
		}
	}
}
