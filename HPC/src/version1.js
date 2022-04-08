import * as d3 from 'd3';

let data = []


let config = {
	data: undefined,
	canvas: undefined,
	x: 'Abs',
	y: 'Diff',
	xScale: undefined,
	yScale: undefined,
	filter: undefined,
}

function showTooltip(evt, d) {
	document.getElementById('tooltip').style.display = 'block'
	document.getElementById('tooltip').style.left = evt.pageX + 2 + 'px'
	document.getElementById('tooltip').style.top = evt.pageY + 2 + 'px'
	document.getElementById('tooltip').innerHTML = `
		<div>
			Event Sel: ${d.es}<br>
			Umask: ${d.umask}<br>
			Pair: ${d.Pair}<br>
			Part: ${d.Part}<br>
			Average: ${d.Average}<br>
			Difference: ${d.Diff}<br>
			Absolute Difference ${d.Abs}
		</div>
	`
}

function hideTooltip() {
	document.getElementById('tooltip').style.display = 'none'
}

function drawAxis() {
	let leftAxisG = d3.select('svg').select('#left-axis')
	let bottomAxisG = d3.select('svg').select('#bottom-axis')

	let bottomAxis = d3.axisBottom(config.xScale)
	bottomAxisG.call(bottomAxis)

	let leftAxis = d3.axisLeft(config.yScale)
	leftAxisG.call(leftAxis)
	
	
}

function render() {	


	data = config.data
	if (config.filter) {
		data = data.filter(d => d.Diff >= config.filter)
	}

	if(config.filter2) {
		data = data.filter(d => d.Diff <= config.filter2)
	}

	if(config.filter3) {
		data = data.filter(d => d.Abs >= config.filter3)
	}

	if(config.filter4) {
		data = data.filter(d => d.Abs <= config.filter4)
	}

	let circles = config.canvas
		.selectAll('circle')
		.data(data, (d => d.ID))

	let enteringCircles = circles
		.enter()
		.append('circle')
		.attr('r', 5)
		.attr('fill', 'red')
		.attr('cx', d => config.xScale(Number(d[config.x])))
		.attr('cy', 350)
		.on('mouseover', showTooltip)
		.on('mouseout', hideTooltip)

	circles.exit()
		.transition()
		.duration(1000)
		.ease(d3.easeCubic)
		.attr('cy', 0)
		.attr('opacity', 0)
		.remove()

	circles.merge(enteringCircles)
		.transition()
		.duration(1000)
		.ease(d3.easeCubic)
		.attr('cx', d => config.xScale(Number(d[config.x])))
		.attr('cy', d => config.yScale(Number(d[config.y])))
		.attr('opacity', 0.5)
}

function registerButtonEvents() {
	config.filter = 1
	render()

	/*document.getElementById('diff-button').onclick = function () {
		config.y = 'Diff'
		render()
	}

	document.getElementById('ID-button').onclick = function () {
		
		render()
	}*/

	document.getElementById('50-button').onclick = function () {
		config.filter = 50
		render()
	}

	document.getElementById('100-button').onclick = function () {
		config.filter = 100
		render()
	}

	document.getElementById('500-button').onclick = function () {
		config.filter = 500
		render()
	}

	document.getElementById('1000-button').onclick = function () {
		config.filter = 1000
		render()
	}

	document.getElementById('show0-button').onclick = function () {
		config.filter = undefined
		render()
	}

	document.getElementById('hide0-button').onclick = function () {
		config.filter = 1
		render()
	}

	document.getElementById('filter-none-button').onclick = function () {
		config.filter = 1
		render()
	}

	d3.select("#Undervalue").on("input", function() {
		config.filter = +this.value
		render()
	  })

	document.getElementById('50-over-button').onclick = function () {
		config.filter2 = 50
		render()
	}

	document.getElementById('100-over-button').onclick = function () {
		config.filter2 = 100
		render()
	}

	document.getElementById('500-over-button').onclick = function () {
		config.filter2 = 500
		render()
	}

	document.getElementById('1000-over-button').onclick = function () {
		config.filter2 = 1000
		render()
	}
	
	document.getElementById('filter-none-over-button').onclick = function () {
		config.filter2 = undefined
		render()
	}
	d3.select("#Overvalue").on("input", function() {
		config.filter2 = +this.value
		render()
	  })



	  document.getElementById('5-a-button').onclick = function () {
		config.filter3 = 5
		render()
	}

	document.getElementById('10-a-button').onclick = function () {
		config.filter3 = 10
		render()
	}

	document.getElementById('50-a-button').onclick = function () {
		config.filter3 = 50
		render()
	}

	document.getElementById('100-a-button').onclick = function () {
		config.filter3 = 100
		render()
	}

	document.getElementById('filter-a-none-button').onclick = function () {
		config.filter3 = undefined
		render()
	}

	d3.select("#a-Undervalue").on("input", function() {
		config.filter3 = +this.value
		render()
	  })

	document.getElementById('5-a-over-button').onclick = function () {
		config.filter4 = 5
		render()
	}

	document.getElementById('10-a-over-button').onclick = function () {
		config.filter4 = 10
		render()
	}

	document.getElementById('50-a-over-button').onclick = function () {
		config.filter4 = 50
		render()
	}

	document.getElementById('100-a-over-button').onclick = function () {
		config.filter4 = 100
		render()
	}
	
	document.getElementById('filter-a-none-over-button').onclick = function () {
		config.filter4 = undefined
		render()
	}
	d3.select("#a-Overvalue").on("input", function() {
		config.filter4 = +this.value
		render()
	  })
	  
	
	  document.getElementById('Print-List').onclick = function () {
		let list = document.getElementById("myList");
		list.value = null;

		data = config.data
		if (config.filter) {
			data = data.filter(d => d.Diff >= config.filter)
		}

		if(config.filter2) {
			data = data.filter(d => d.Diff <= config.filter2)
		}

		if(config.filter3) {
			data = data.filter(d => d.Abs >= config.filter3)
		}

		if(config.filter4) {
			data = data.filter(d => d.Abs <= config.filter4)
		}
		data.forEach((d)=>{
			let li = document.createElement("li");
			li.innerText = `${d.es} ${d.umask}`;
			list.appendChild(li);
		  })
		render()
	  }  
	  document.getElementById('Clear-List').onclick = function () {
		let list = document.getElementById("myList").innerHTML = "";
		
		render()
	  }
}

function createScales() {
	console.log(config.xMin, config.xMax, config.yMin, config.yMax)
	let xScale = d3.scaleLinear()
		.domain([config.xMin, config.xMax])
		.range([0, 720])
	config.xScale = xScale

	let yScale = d3.scaleLog()
		.domain([config.yMin+1, config.yMax+1])
		.range([350, 20])
	config.yScale = yScale
	//let tik = yScale.ticks.append("Infinity")
	//tik.push('Infinity')
	//yScale.tickValues(tik)



	console.log([config.yMin, config.yMax])
	console.log([config.xMin, config.xMax])
}

function prepareGroups() {
	let circleCanvas = d3.select('svg').append('g')
		.attr('id', 'circles')
		.attr('transform', 'translate(50, 0)')
	config.canvas = circleCanvas

	let leftAxisG = d3.select('svg').append('g')
		.attr('id', 'left-axis')
		.attr('transform', 'translate(50, 0)')
	config.leftAxisG = leftAxisG

	let bottomAxisG = d3.select('svg').append('g')
		.attr('id', 'bottom-axis')
		.attr('transform', 'translate(50, 350)')
	config.bottomAxisG = bottomAxisG
}

async function loadData() {
	return d3.csv('data.csv').then(d => {
		data = d.slice(0, 3000)
		config.data = data

		config.xMin = d3.min(data, d => Number(d.Average))
		config.xMax = d3.max(data, d => Number(d.Average))
		config.yMin = d3.min(data, d => Number(d.Diff))
		config.yMax = d3.max(data, d => Number(d.Diff))

		console.log(data)
	})
}

function registerDraggingEvents() {
	d3.select('svg').on('mousedown', function (evt) {
		config.dragging = true
		config.draggingStartX = evt.pageX
		config.draggingStartY = evt.pageY
		config.draggingStartMinX = config.xMin
		config.draggingStartMaxX = config.xMax
		config.draggingStartMinY = config.yMin
		config.draggingStartMaxY = config.yMax
		console.log('dragging', config.draggingStartX, config.draggingStartY)
	})

	d3.select('svg').on('mousemove', function (evt) {
		if (config.dragging) {
			let mouseX = evt.pageX;
			let mouseY = evt.pageY;
			let mouseDeltaX = mouseX - config.draggingStartX;
			let mouseDeltaY = mouseY - config.draggingStartY;

			let deltaX = config.xScale.invert(mouseDeltaX) -
				config.xScale.invert(0);
			let deltaY = config.yScale.invert(mouseDeltaY) -
				config.yScale.invert(0);

			console.log('dragging', mouseDeltaX, mouseDeltaY, deltaX, deltaY);

			config.xMin = config.draggingStartMinX - deltaX;
			config.xMax = config.draggingStartMaxX - deltaX;
			config.yMin = config.draggingStartMinY - deltaY;
			config.yMax = config.draggingStartMaxY - deltaY;

			createScales()
			drawAxis()
			render()
		}
	});

	d3.select('svg').on('mouseup', function () {
		config.dragging = false
		console.log('not dragging')
	})
}

async function app() {
	await loadData()
	prepareGroups()

	createScales()
	drawAxis()

	registerButtonEvents()
	registerDraggingEvents()

	render()
}

export {
	app
}