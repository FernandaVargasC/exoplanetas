//Tooltip
//http://learnjsdata.com/index.html
//https://gist.github.com/biovisualize/1016860

//ver d3 toltip
//https://github.com/caged/d3-tip

function cargar_pagina (){}

// INFORMACIÓN SOBRE PROYECTO //
function sobreproyecto() {
	var mostrar= document.getElementById("infoescondida");
	if (mostrar.style.visibility === 'hidden') {
		mostrar.style.visibility = 'visible';
	} else {
		mostrar.style.visibility = 'hidden';
	}	
}



var dat;
 //nuevas varibles para area dbujo
var w = 1150, h = 340,  borde = 25;
var anchoGrafico = w-borde*0.1;
var altoGrafico = h-borde*2;

var  c = 44; 
 
 
d3.json("d/archivodatos.json", function(error, datos) {
              if (error) return console.warn(error);
              dat = datos;

 
//crea un contenedor para el grafico, crea dentro un svg
var chart = d3.select('#caja2')
			.append('svg')
			.attr('width', w)
			.attr('height', h)
			.style("background", "#101421")

//var hit = d3.select('#caja3')
			//.append('svg')
			//.attr('width', f)
			//.attr('height', c)
			//.style("background", "#102430")

			
//4 - Dominio de datos para rango x (posicion array 1) 
var xScale = d3.scale.linear()
				.domain([	1.994, d3.max(datos, function(d) {return d.posX; })	
						+0.002])
				.range(	[ borde , anchoGrafico+borde]);


//4 - Dominio de datos para rango y (posicion array 3) 
var yScale = d3.scale.linear()
				.domain([	0, d3.max(datos, function(d) {return d.diam; })	
						])
				.range(	[ altoGrafico+borde, borde]	);
               
//5- Eje para X
var ejeX = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")
			.ticks(24)
			.tickSize(-290)

			
			;
//5- Eje para Y
var ejeY = d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.innerTickSize(5)
			.outerTickSize(-1150)
			;

          

// TOOLTIP
var tooltip = d3.select("body")//body
	.append("div")
	.style("position", "absolute")
	.style("z-index", "100")//10
	.style("visibility", "hidden")
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
			    .on("click", function(d){//mouse se mueve c los parametros x e y de la pagina. Incluye tb los datos a mostrar. 
					return	tooltip.style("visibility","visible")
					                .style("top", (event.pageY-230)+"px") // *** VER LA MANERA DE QUE event.pageY SE PUEDA SUMAR CON LA ALTURA DEL TOOLTIP/2 (PARA QUE ASÍ EL TOOLTIP QUEDE CENTRADO CON EL MOUSE)
									.style("left",(event.pageX+20)+"px")
							        .html( "<div id='medidatooltip'>" + "<h3>" + d.nombre + "</h3>" + "<hr>" + "</br><h7>" + "Masa del planeta: " + d.masa + "<br/>" + "Radio del planeta: " + d.radio + "<br/>" + "Periodo orbital: " + d.orbita + "<br/>" + "Distancia a estrella: " + d.disestrella + "</h7><br/>" + "<img id='medidaimagen'src= '" + d.image + "'' ></div>");
				})
				; //mouseover

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
//d3.select('svg').append("rect")
			//.attr('x', borde)
			//.attr('y', borde+50)
			//.attr('width', anchoGrafico)
			//.attr('height', altoGrafico)
			//.style('fill', '#00545C')
			//.style('opacity', .5)	
 			//;
