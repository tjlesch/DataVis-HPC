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

let data_line = []

let line_es = "00"
 
let line_umask = "00"

let lines = []




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
	console.log("e:", line_es, "u:", line_umask)
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
		console.log("Hello World")
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
		console.log(config.filter4)
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



	d3.select("#umask-line").on("input", function() {
	line_umask = +parseInt(this.value, 16)
	console.log(+this.value)
	data_line = data.filter(d => parseInt(d.es, 16) == line_es && parseInt(d.umask, 16) == line_umask)
	console.log(data_line)
	render()
	
	})

	d3.select("#event-sel-line").on("input", function() {
		line_es = +parseInt(this.value, 16)
		render()
		data_line = data.filter(d => parseInt(d.es, 16) == line_es && parseInt(d.umask, 16) == line_umask)
		console.log(data_line)

		})

	document.getElementById('make-line-graph').onclick = function () {
		gatherdata()
		makeGraph()
		render()
	}
}

function gatherdata(){
	let temp = []
	let temp2 = []
	console.log()
	let tuple1 = [1, parseInt(data_line[0].Run1)]
	temp.push(tuple1)
	let tuple2 = [2, parseInt(data_line[0].Run2)]
	temp.push(tuple2)
	let tuple3 = [3, parseInt(data_line[0].Run3)]
	temp.push(tuple3)
	let tuple4 = [4, parseInt(data_line[0].Run4)]
	temp.push(tuple4)
	let tuple5 = [5, parseInt(data_line[0].Run5)]
	temp.push(tuple5)
	let tuple6 = [6, parseInt(data_line[0].Run6)]
	temp.push(tuple6)
	let tuple7 = [7, parseInt(data_line[0].Run7)]
	temp.push(tuple7)
	let tuple8 = [8, parseInt(data_line[0].Run8)]
	temp.push(tuple8)
	let tuple9 = [9, parseInt(data_line[0].Run9)]
	temp.push(tuple9)
	let tuple10 = [10, parseInt(data_line[0].Run10)]
	temp.push(tuple10)

	temp2.push(parseInt(data_line[0].Run1))
	temp2.push(parseInt(data_line[0].Run2))
	temp2.push(parseInt(data_line[0].Run3))
	temp2.push(parseInt(data_line[0].Run4))
	temp2.push(parseInt(data_line[0].Run5))
	temp2.push(parseInt(data_line[0].Run6))
	temp2.push(parseInt(data_line[0].Run7))
	temp2.push(parseInt(data_line[0].Run8))
	temp2.push(parseInt(data_line[0].Run9))
	temp2.push(parseInt(data_line[0].Run10))
	console.log(temp)
	//temp.append([])
	//lines.append
	lines = temp
}

function getMax(arr)
{
	let max = 0
	let max_val = 0
	for (let i = 0; i < arr.length; i++) {
		if(arr[i][1] > max_val)
		{
			max_val = arr[i][1]
			max = i
		}
	}
	return max_val
}

function makeGraph(){
	var margin = {top: 20, right: 30, bottom: 30, left: 60},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
/*var svg = d3.select("#line-graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // Now I can use this dataset:
	var xScale = d3.scaleLinear().domain([0, 10]).range([0, width]),
        yScale = d3.scaleLinear().domain([0, d3.max(lines)]).range([height, 0]);*/
		var svg = d3.select("#line-graph")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");
		var xScale = d3.scaleLinear().domain([0, 10]).range([0, width]),
            yScale = d3.scaleLinear().domain([0, getMax(lines)]).range([height, 0]);
			console.log(getMax(lines))
		
		
		svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xScale));
	   
	    svg.append("g")
		.call(d3.axisLeft(yScale));

		svg.append('g')
        .selectAll("dot")
        .data(lines)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d[0]); } )
        .attr("cy", function (d) { return yScale(d[1]); } )
        .attr("r", 2)
        .attr("transform", "translate(" + 0 + "," + 20 + ")")
        .style("fill", "#CC0000");

		var line = d3.line()
        .x(function(d) { return xScale(d[0]); }) 
        .y(function(d) { return yScale(d[1]); }) 
        .curve(d3.curveMonotoneX)
        
        svg.append("path")
        .datum(lines) 
        .attr("class", "line") 
        .attr("transform", "translate(" + 0 + "," + 20 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");
   
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

		//console.log(data)
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

function set_data_line() {


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