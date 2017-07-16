//Tooltip
//http://learnjsdata.com/index.html
//https://gist.github.com/biovisualize/1016860

//ver d3 toltip
//https://github.com/caged/d3-tip

var dat;
 //nuevas varibles para area dbujo
var w = 1200, h = 400,  borde = 30;
var anchoGrafico = w-borde*2;
var altoGrafico = h-borde*2;

var a = 1200, l = 200; 
 
 
d3.json("d/archivodatos.json", function(error, datos) {
              if (error) return console.warn(error);
              dat = datos;


var sist = d3.select('#caja1')
			.append('svg')
			.attr('width', a)
			.attr('height', l)
			.style("background", "#001621")
 
//crea un contenedor para el grafico, crea dentro un svg
var chart = d3.select('#caja')
			.append('svg')
			.attr('width', w)
			.attr('height', h)
			.style("background", "#000814")

			
//4 - Dominio de datos para rango x (posicion array 1) 
var xScale = d3.scale.linear()
				.domain([	1994, d3.max(datos, function(d) {return d.posX; })	
						+1])
				.range(	[borde, anchoGrafico+borde]	);

//4 - Dominio de datos para rango y (posicion array 3) 
var yScale = d3.scale.linear()
				.domain([	0, d3.max(datos, function(d) {return d.posY; })	
						])
				.range(	[ altoGrafico+borde, borde]	);

//5- Eje para X
var ejeX = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")
			.ticks(20)
			;
//5- Eje para X
var ejeY = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			;



// TOOLTIP
var tooltip = d3.select("body")//body
	.append("div")
	.style("position", "absolute")
	.style("z-index", "100")//10
	.style("visibility", "visible")//hidden
	.style("background", "#999CA1")
	.style("color", "#00084")
	.style("padding", "10px")
;

 

//crea una especie de grupo donde de elementos basados en los datos
var 
es = chart.append("g") 
				.classed("circles", true)
				//vincula circulos a serie de datos 
				.selectAll("circle")		
				.data(datos)
				//una vez vinculados y creados, ahora se procede a "mostrarlos"
				.enter() 		
				.append("circle")	

			//asigna valores de datos para posicion x e y de bolas				
				.attr("cx", function(d) {
					return xScale(d.posX);
				})
				.attr("cy", function(d) {
					return yScale(d.posY);
				})
				.attr("r", function(d){//puede tener un dominio y rango. 
					return d.diam;
				})

				.style("fill", "#00C8C8")
				.style("opacity", .6)
				

				//TOOLTIP  - - - - - - - - - - - - - - - - - - - - 
				.on("mouseover", function(){//cuando el mouse esta arriba del circulo, hace que el tooltip sea visible
					return tooltip.style("visibility", "visible");
				})

				.on("mousemove", function(d){//mouse se mueve c los parametros x e y de la pagina. Incluye tb los datos a mostrar. 
					return	tooltip.style("top", (event.pageY-20)+"px")
									.style("left",(event.pageX+10)+"px")
									.text("Nombre estrella: " + d.nombre);
				})
				//.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
				.on("mouseout", function(){//
					return tooltip.style("visibility", "hidden");
				})
				;


//5 llama ejes X 
//ver css clase eje que pinta el eje

		chart.append("g")
			.attr("class", "ejes")
			.attr("transform", "translate(0,"+(h-borde)+")")
		    .call(ejeX)
		    ;  		

//5 llama ejes Y 
//ver css clase eje que pinta el eje
		chart.append("g")
			.attr("class", "ejes")
			.attr("transform", "translate("+borde+",0)")
		    .call(ejeY)
		    ;  				

});//cierre json call


//4 borde para ver ancho y largo del grafico
d3.select('svg').append("rect")
			.attr('x', borde)
			.attr('y', borde)
			.attr('width', anchoGrafico)
			.attr('height', altoGrafico)
			.style('stroke', '#00545C')
			.style("fill", "transparent")
			.style('opacity', .5)	
 			;

