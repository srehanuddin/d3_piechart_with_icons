
	var pieChart = function (params,data){	
                         
		var	r = params.radius ? params.radius : 200,        
			w = (r*2)+300,                        	
			h = (r*2)+100,                      
			color = d3.scale.category20c(),     
			imagePath = params.imagePath ? params.imagePath : 'images/',
			elementId = params.elementId;
			labelHeight = 25;
			;

		d3.select("#"+elementId).html('');
				   
		var vis = d3.select("#"+elementId)
					.append("svg:svg")  
					.attr("id", "pieSvgContainer")  
					.data([data])               
					.attr("width", w)           
					.attr("height", h)
					.append("svg:g")                
					.attr("transform", "translate(" + (w-200)/2 + "," + h/2 + ")") ;   
		
		var mainSvg = d3.select('#pieSvgContainer');
		
		var labelCont = mainSvg.append("svg:g")
							.attr("width", "200px")           
							.attr("height", "200px")
							.attr("transform", "translate(" + ((r*2)+30+100) + "," + 10 + ")") ;   
					
		var arc = d3.svg.arc()              
					.outerRadius(r);
	
		var pie = d3.layout.pie()           
					.value(function(d) { return d.value; });   
					
		var arcs = vis.selectAll("g.slice")    
					.data(pie)                          
					.enter()                            
					.append("svg:g")      
					.attr("class", "slice")
					.on("mouseover", scaleArcZoomIn)
					.on("mouseout", scaleArcZoomOut);  
	
			arcs.append("svg:path")
					.attr("fill", function(d, i) { return color(i); } ) 
					.attr("d", arc);                              
	
			arcs.append("svg:image")
				.attr("xlink:href",function(d){ return imagePath+d.data.icon; })
				.attr("height","20px")
				.attr("width","20px")      
				.attr("transform", function(d) {              
					d.innerRadius = 0;
					d.outerRadius = r;
					
					var center = arc.centroid(d);
					center[0] = center[0]-10;
					center[1] = center[1]-10;
						
					return "translate(" + center + ")";        //this gives us a pair of coordinates like [50, 50]
				});
			
			
			var curLabel = 0;
			
			var labels = labelCont.selectAll("g.labels")
							.data(pie)
							.enter()                            
							.append("svg:g") 
							.attr("transform", function(d) {                    
								curLabel++;
								return "translate(" + 0 + "," + (curLabel*labelHeight) + ")"; 
							})     
							.attr("class", "labels");
			
			
					labels.append("svg:image")
						.attr("transform", "translate(" + 0 + "," + -15 + ")")	
						.attr("xlink:href",function(d){ return imagePath+d.data.icon; })
						.attr("height","20px")
						.attr("width","20px");						
		   
		   
					labels.append("svg:text")                             
						.attr("transform", "translate(" + 30 + "," + 0 + ")")
						.text(function(d, i) { return data[i].label; });
						      	

/*		
		function scaleIconZoomIn(){
			
			var element = d3.select(this).select('image');
	
			var tran = element.attr('transform');			 
			var tran = tran.split("scale");
			var tran = tran[0];
		 
			  element.transition()            
				.delay(0)            
				.duration(500)
				.attr("transform", tran + " scale(1.5)");
		};
		
		function scaleIconZoomOut(){

			var element = d3.select(this).select('image');
	
			var tran = element.attr('transform');			 
			var tran = tran.split("scale");
			var tran = tran[0];
			
			d3.select(this)
			  .transition()
			 	.delay(0)   
				.duration(500)
				.attr("transform", tran + " scale(0.5)");
		};
*/

		function scaleArcZoomIn(){
			
			var element = d3.select(this);
	
	
			var tran = element.attr('transform');			 
			if(tran){
				var tran = tran.split("scale");
				var tran = tran[0];
			} else {
				tran='';
			}
		 
			
			d3.select(this)
			  .transition()
			 	.delay(0)   
				.duration(500)
				.attr("transform", tran + " scale(1.1)");
		};
		
		function scaleArcZoomOut(){

			var element = d3.select(this);
	
			var tran = element.attr('transform');			 
			if(tran){
				var tran = tran.split("scale");
				var tran = tran[0];
			} else {
				tran='';
			}
			
			d3.select(this)
			  .transition()
			 	.delay(0)   
				.duration(500)
				.attr("transform", tran + " scale(1.0)");
		}
				
	};