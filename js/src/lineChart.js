Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
Reuters.Graphics.LineChart = Reuters.Graphics.ChartBase.extend ({
	defaults: _.defaults({
		someNewDefault: "yes"
	}, Reuters.Graphics.ChartBase.prototype.defaults),
	//setup the scales.  You have to do this in the specific view, it will be called in the Reuters.Graphics.ChartBase.
	chartType:"line",
	xScaleMin:function(){
		return d3.min(this.jsonData, function(c) { return d3.min(c.values, function(v) { return v.date; }); });
	},
	xScaleMax:function(){
		return d3.max(this.jsonData, function(c) { return d3.max(c.values, function(v) { return v.date; }); });
	},
	getXScale: function() {
		return d3.time.scale()
			.domain([this.xScaleMin(),this.xScaleMax()])
			.range([0, this.width]);
	},
	yScaleMin:function(){
		var theValues = this.dataType;
		if (this.chartLayout == "stackTotal"){theValues = "stackTotal";}
		var min = d3.min(this.jsonData, function(c) { return d3.min(c.values, function(v) { return v[theValues]; }); });
		if (this.chartlayout == "fillLines"){ if (min > 0){min = 0;}}
		if (this.chartLayout == "stackTotal" || this.chartLayout == "stackPercent"){min = 0;}
		return min;
	},
	yScaleMax:function(){
		var theValues = this.dataType;
		if (this.chartLayout == "stackTotal"){theValues = "stackTotal";}
		var max = d3.max(this.jsonData, function(c) { return d3.max(c.values, function(v) { return v[theValues]; }); });
		if (this.chartLayout == "stackPercent"){max = 100;}
		return max;
	},
	getYScale: function() {
		var self = this;
		if (!self.yScaleVals || this.hasZoom){
			return d3.scale.linear()
				.domain([this.yScaleMin(),this.yScaleMax()])
				.nice(this.yScaleTicks)
				.range([this.height, 0]);
		}else{			
			return d3.scale.linear()
				.domain([this.yScaleVals[0],this.yScaleVals[this.yScaleVals.length - 1]])
				.nice(this.yScaleTicks)
				.range([this.height, 0]);
		}
	},
	renderChart: function (){
		// create a variable called "self" to hold a reference to "this"
		var self = this;
		self.trigger("renderChart:start");
		
		if (self.hasZoom){
			self.zoomChart();		
		}
											
		//will draw the line		
		self.line = d3.svg.line()
	    	.x(function(d) { return self.scales.x(d.date); })
		    .y(function(d) {
		    	if (self.chartLayout == "stackTotal"){
		    		return self.scales.y(d.y1Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ return self.scales.y(d.y1Percent);}else{return self.scales.y(d[self.dataType]);}		
		    	}			    
		    })
			.interpolate (self.lineType)
			.defined(function(d) { return !isNaN(d[self.dataType]); });

		self.area = d3.svg.area()
	    	.x(function(d) { return self.scales.x(d.date); })
		    .y0(function(d) { 
		    	if (self.chartLayout == "stackTotal"){
		    		return self.scales.y(d.y0Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ return self.scales.y(d.y0Percent);}else{return self.scales.y(0);}
		    	}
		    })
		    .y1(function(d) {
		    	if (self.chartLayout == "stackTotal"){
		    		return self.scales.y(d.y1Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ return self.scales.y(d.y1Percent);}else{return self.scales.y(d[self.dataType]);} 		    				   		
		    	}
		     })
			.interpolate (self.lineType)
			.defined (function(d) { return !isNaN(d[self.dataType]); });

								          
		//bind the data and put in some G elements with their specific mouseover behaviors.
		self.lineChart = self.svg.selectAll(".lineChart")
			.data(self.jsonData, function(d) {return d.name; })
			.enter().append("g")
			.attr({
				"clip-path":"url(#clip" + self.targetDiv + ")",
				class: "lineChart",
				id:function(d){ return self.targetDiv + d.name + "-line"; }
			})
			.on("mouseover", function (d){			
				//put the line we've hovered on on top=
				self.lineChart.sort(function(a,b){
					if (a.name == d.name){
						return 1;
					}else{return -1;}
				}).order();
				
				//class all other lines to be lighter
				d3.selectAll("#" + self.targetDiv + " .lineChart")
					.classed('notSelected', true);
				d3.select(this)
					.classed("notSelected", false);				
			})
			.on("mouseout", function (d){
				d3.selectAll(".lineChart")
					.classed('notSelected', false);
			});

		self.lineChart.append("path")
			.attr("class", "line")
			.style("stroke", function(d) { return self.colorScale(d.name); })
			.attr("d", function(d) {return self.line(d.values[0]); })
			.transition()
			.duration(1500)
			.delay(function(d, i) { return i * 100; })
			.attrTween('d',function (d){
				var interpolate = d3.scale.quantile()
					.domain([0,1])
					.range(d3.range(1, d.values.length + 1));
				return function(t){
					return self.line(d.values.slice(0, interpolate(t)));
				};
			});			  				  	
		
		self.lineChart.append("path")
			.attr("class", "area")
			.style("fill", function(d) { return self.colorScale(d.name); })
			.attr("d", function(d) {return self.area(d.values[0]); })
			.style("display", function(d){
				if (self.chartLayout == "stackTotal" || self.chartLayout == "stackPercent" || self.chartLayout == "fillLines"){
					return "block";
				}else{return "none";}			      	
			})
			.transition()
			.duration(1500)
			.delay(function(d, i) { return i * 100; })
			.attrTween('d',function (d){
				var interpolate = d3.scale.quantile()
					.domain([0,1])
					.range(d3.range(1, d.values.length + 1));
				return function(t){
					return self.area(d.values.slice(0, interpolate(t)));
				};
			});									
				
		self.lineChart.selectAll(".tipCircle")
			.data( function(d) {return d.values;})
			.enter()
			.append("circle")
			.attr("class","tipCircle")
			.attr("cx", function(d,i){return self.scales.x(d.date);})
			.attr("cy",function(d,i){
		    	if (self.chartLayout == "stackTotal"){
		    		return self.scales.y(d.y1Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ 
				    	return self.scales.y(d.y1Percent);
				    }else{
					    return self.scales.y(d[self.dataType]);
					}		
				}
			})
			.attr("r",function (d,i) {
				if ( isNaN(d[self.dataType])){return 0;} 
				 return 5;
			})
			.style('opacity', function(d){
				if (self.markDataPoints){
					return 1;
				}
				return 0;
			})
			.style("fill", function(d) { return self.colorScale(d.name); })//1e-6
			.classed("timeline", function(d){
				if (self.timelineDataGrouped){
					if (self.timelineDataGrouped[self.timelineDate(d.date)]){
						return true;
					}					
				}
				return false
			});


		//add teh zero line on top.
		self.makeZeroLine();

		self.trigger("renderChart:end");
		self.trigger("chart:loaded");
		self.trigger("chart:loaded");

	//end chart render
	},
	update:function (){
		var self = this;			
				
		self.baseUpdate();
		self.trigger("update:start");
	
		self.exitLine = d3.svg.line()
			.x(function(d) { return self.scales.x(d.date); })
			.y(function(d) { return  self.margin.bottom+self.height+self.margin.top+10;})
			.interpolate (self.lineType);
	
		self.exitArea = d3.svg.area()
			.x(function(d) { return self.scales.x(d.date); })
			.y0(function(d) { return  self.margin.bottom+self.height+self.margin.top+10;})
			.y1(function(d) { return  self.margin.bottom+self.height+self.margin.top+10;})
			.interpolate (self.lineType);
	
		//exiting lines
		self.lineChart
			.data(self.jsonData, function(d) { return d.name;})
	        .exit()
			.selectAll(".line")
	        .transition()
	        .attr("d", function(d,i) { 
	      	    return self.exitLine(d.values); 
	         });
	
		//exiting area
		self.lineChart
			.data(self.jsonData, function(d) { return d.name;})
	        .exit()
			.selectAll(".area")
	        .transition()
	        .attr("d", function(d,i) { 
	      	    return self.exitArea(d.values); 
	         });			        
	         
	    self.lineChart
			.data(self.jsonData, function(d) { return d.name; } )
			.exit()
			.selectAll(".tipCircle")
			.transition()
			.attr("r",0);
	
		//update the line				    
	    self.lineChart.selectAll(".line")
	        .data(self.jsonData, function(d) {return d.name;})
	        .transition()
	        .duration(1000)
	        .attr("d", function(d,i) { 
	      	    return self.line(d.values); 
	         });
		
		//update the area				    
	    self.lineChart.selectAll(".area")
	        .data(self.jsonData, function(d) {return d.name;})
	        .style("display", function(d){
		      	if (self.chartLayout == "stackTotal" || self.chartLayout == "stackPercent" || self.chartLayout == "fillLines"){
				  	return "block";
			  	}else{return "none";}			      	
	      	})
	        .transition()
	        .duration(1000)
	        .attr("d", function(d,i) { 
	      	    return self.area(d.values); 
	         });
		
		//the circles      
		self.lineChart
			.data(self.jsonData, function(d) {return d.name;})
	        .selectAll(".tipCircle")
	        .data( function(d) {return d.values; })
	        .transition()
	        .duration(1000)
			.attr("cy",function(d,i){
		    	if (self.chartLayout == "stackTotal"){
		    		return self.scales.y(d.y1Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ 
				    	return self.scales.y(d.y1Percent);
				    }else{
					    return self.scales.y(d[self.dataType]);
					}		
				}
			})
		    .attr("cx", function(d,i){return self.scales.x(d.date);})
			.attr("r",function (d,i) {
				if ( isNaN(d[self.dataType])){return 0;} 
				 return 5;
			});
		    
		self.lineChart
			.data(self.jsonData, function(d) {return d.name;})
	        .selectAll(".tipCircle")
	        .data( function(d) {return d.values; })
	        .exit()
	        .transition()
	        .duration(1000)
		    .attr("r",0)
		    .each("end", function(d){
			    d3.select(this).remove();
		    });

		self.lineChart
			.data(self.jsonData, function(d) {return d.name;})
	        .selectAll(".tipCircle")
	        .data( function(d) {return d.values; })
	        .enter()
			.append("circle")
			.attr("class","tipCircle")
			.attr("cx", function(d,i){return self.scales.x(d.date);})
			.attr("cy",function(d,i){
		    	if (self.chartLayout == "stackTotal"){
		    		return self.scales.y(d.y1Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ 
				    	return self.scales.y(d.y1Percent);
				    }else{
					    return self.scales.y(d[self.dataType]);
					}		
				}
			})			
			.style('opacity', function(d){
				if (self.markDataPoints){
					return 1;
				}
				return 0;
			})
			.style("fill", function(d) { return self.colorScale(d.name); })//1e-6		    					 								 					
		    .attr("r",0)
	        .transition()
	        .duration(1000)
			.attr("r",function (d,i) {
				if ( isNaN(d[self.dataType])){return 0;} 
				 return 5;
			});    					 								 						  		
		
		self.trigger("update:end");				        
				 
	//end of update
	}
//end model
});