Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
Reuters.Graphics.LineChart = Reuters.Graphics.ChartBase.extend ({
	defaults: _.defaults({
		someNewDefault: "yes"
	}, Reuters.Graphics.ChartBase.prototype.defaults),
	//setup the scales.  You have to do this in the specific view, it will be called in the Reuters.Graphics.ChartBase.
	chartType:"line",
	xScaleMin:function(){
		var xcolumn = "date"
		if (this.xScaleColumn){
			xcolumn = this.xScaleColumn
		}
		
		return d3.min(this.jsonData, function(c) { return d3.min(c.values, function(v) { return v[xcolumn]; }); });
	},
	xScaleMax:function(){
		var xcolumn = "date"
		if (this.xScaleColumn){
			xcolumn = this.xScaleColumn
		}
		return d3.max(this.jsonData, function(c) { return d3.max(c.values, function(v) { return v[xcolumn]; }); });
	},
	xScaleRange:function(){
		var range = [0, this[this.widthOrHeight]]
		if (this.chartLayout == "sideBySide"){
			range = [0, (this[this.widthOrHeight]/(this.jsonData.length * (1 + (2 / (this.jsonData[0].values.length) ) ) ) )];
		}
		return range;
	},	
	getXScale: function() {
		if(this.xScaleColumn){
			return d3.scale.linear()
				.domain([this.xScaleMin(),this.xScaleMax()])
				.range(this.xScaleRange());			
		}
		if (this.hasTimeScale){		
			return d3.time.scale()
				.domain([this.xScaleMin(),this.xScaleMax()])
				.range(this.xScaleRange());
		}else{
			return d3.scale.ordinal()
			.domain(this.jsonData[0].values.map(function(d) { return d.category;}))
			.rangePoints([0, this[this.widthOrHeight]], 0);
		}				
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
	yScaleRange: function(){
		var fullHeight = this[this.heightOrWidth];
		var rangeLow = fullHeight;
		var rangeHigh = 0;
		if (this.horizontal){
			rangeLow = 0;
			rangeHigh = fullHeight ;
		}
		return [rangeLow,rangeHigh];		
	},	
	getYScale: function() {
		var self = this;
		if (!self.yScaleVals || this.hasZoom){
			return d3.scale.linear()
				.domain([this.yScaleMin(),this.yScaleMax()])
				.nice(this.yScaleTicks)
				.range(this.yScaleRange());
		}else{			
			return d3.scale.linear()
				.domain([this.yScaleVals[0],this.yScaleVals[this.yScaleVals.length - 1]])
				.range(this.yScaleRange());
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
	    	[self.xOrY](function(d) { 
		    	var theScale = 'category';
				if (self.hasTimeScale) {
					theScale = 'date';
				}
				if (self.xScaleColumn){
					theScale = self.xScaleColumn
				}			
		    	return self.scales.x(d[theScale]); 
		    })
		    [self.yOrX](function(d) {
		    	if (self.chartLayout == "stackTotal"){
		    		return self.scales.y(d.y1Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ return self.scales.y(d.y1Percent);}else{return self.scales.y(d[self.dataType]);}		
		    	}			    
		    })
			.interpolate (self.lineType)
			.defined(function(d) { return !isNaN(d[self.dataType]); });

		self.area = d3.svg.area()
	    	[self.xOrY](function(d) {
		    	var theScale = 'category';
				if (self.hasTimeScale) {
					theScale = 'date';
				}
				if (self.xScaleColumn){
					theScale = self.xScaleColumn
				}								
		    	return self.scales.x(d[theScale]); 		    	
	    	})
		    [self.yOrX+"0"](function(d) { 
		    	if (self.chartLayout == "stackTotal"){
		    		return self.scales.y(d.y0Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ return self.scales.y(d.y0Percent);}else{return self.scales.y(0);}
		    	}
		    })
		    [self.yOrX+"1"](function(d) {
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
				id:function(d){return self.targetDiv + d.displayName.replace(/\s/g, '') + "-line"; }
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
			
		if (self.chartLayout == "sideBySide"){
			self.lineChart.attr("transform", function(d,i){
				if (!self.horizontal){
					return 	"translate(" + (i * (self[self.widthOrHeight] / self.numberOfObjects())) + ",0)";				  	
				}else{
					return 	"translate(0," + (i * (self[self.widthOrHeight] / self.numberOfObjects())) + ")";				  						
				}
			});
		}else{
			self.lineChart.attr("transform", function(d,i){
					return 	"translate(0,0)";				  	
			});	
		}			

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
			.attr("c"+self.xOrY, function(d,i){
				
				var theScale = 'category';
				if (self.hasTimeScale) {
					theScale = 'date';
				}
				if (self.xScaleColumn){
					theScale = self.xScaleColumn
				}					
				return self.scales.x(d[theScale]);
			})
			.attr("c"+self.yOrX,function(d,i){
		    	if (self.chartLayout == "stackTotal"){
					if (!d.y1Total){return self.scales.y(0)}	
		    		return self.scales.y(d.y1Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){
				    	if (!d.y1Percent){return self.scales.y(0)} 
				    	return self.scales.y(d.y1Percent);
				    }else{
					    if (!d[self.dataType]){return self.scales.y(0)}
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
				var theScale = 'category';
				if (self.hasTimeScale) {
					theScale = 'date';
				}
				if (self.xScaleColumn){
					theScale = self.xScaleColumn
				}										
				if (self.timelineDataGrouped){
					if (self.timelineDataGrouped[self.timelineDate(d[theScale])]){
						return true;
					}					
				}
				return false
			});


		if (self.chartLayout =="sideBySide"){
			
			var $xaxis = $("#"+self.targetDiv+" ."+self.xOrY+".axis")

			self.jsonData.forEach(function(d,i){
				if (i == 0){return}
				var heightFactor = self.height;
				var widthFactor = (i * (self[self.widthOrHeight] / self.numberOfObjects())) +self.widthOfBar()/2;
				if (self.horizontal){
					heightFactor = (i * (self[self.widthOrHeight] / self.numberOfObjects())) +self.widthOfBar()/2;
					widthFactor = 0;
				}
				$xaxis.clone().attr("transform","translate(" + widthFactor + ","+heightFactor+")").appendTo($xaxis.parent())				
				
			})
	
		}

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

		if (self.chartLayout == "sideBySide"){
			self.lineChart
			.transition()	        
			.duration(1000)
			.attr("transform", function(d,i){
				if (!self.horizontal){
					return 	"translate(" + (i * (self[self.widthOrHeight] / self.numberOfObjects())) + ",0)";				  	
				}else{
					return 	"translate(0," + (i * (self[self.widthOrHeight] / self.numberOfObjects())) + ")";				  						
				}
			});
		}else{
			self.lineChart
				.transition()	        
				.duration(1000)
				.attr("transform", function(d,i){
					return 	"translate(0,0)";				  	
				});	
		}	

		self.exitLine = d3.svg.line()
			[self.xOrY](function(d) { 
				var theScale = 'category';
				if (self.hasTimeScale) {
					theScale = 'date';
				}
				if (self.xScaleColumn){
					theScale = self.xScaleColumn
				}						
				return self.scales.x(d[theScale]); 
			})
			[self.yOrX](function(d) { return  self.margin[self.bottomOrRight]+self[self.heightOrWidth]+self.margin[self.topOrLeft]+10;})
			.interpolate (self.lineType);
	
		self.exitArea = d3.svg.area()
			[self.xOrY](function(d) { 
				var theScale = 'category';
				if (self.hasTimeScale) {
					theScale = 'date';
				}
				if (self.xScaleColumn){
					theScale = self.xScaleColumn
				}						
				return self.scales.x(d[theScale]); 
			})
			[self.yOrX+"0"](function(d) { return  self.margin[self.bottomOrRight]+self[self.heightOrWidth]+self.margin[self.topOrLeft]+10;})
			[self.yOrX+"1"](function(d) { return  self.margin[self.bottomOrRight]+self[self.heightOrWidth]+self.margin[self.topOrLeft]+10;})
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
			.attr("c"+self.yOrX,function(d,i){
		    	if (self.chartLayout == "stackTotal"){
					if (!d.y1Total){return self.scales.y(0)}
		    		return self.scales.y(d.y1Total); 		    	
		    	}else {
			    	if (self.chartLayout == "stackPercent"){ 
					    if (!d.y1Percent){return self.scales.y(0)}
				    	return self.scales.y(d.y1Percent);
				    }else{
						if (!d[self.dataType]){return self.scales.y(0)}
					    return self.scales.y(d[self.dataType]);
					}		
				}
			})
		    .attr("c"+self.xOrY, function(d,i){
				var theScale = 'category';
				if (self.hasTimeScale) {
					theScale = 'date';
				}
				if (self.xScaleColumn){
					theScale = self.xScaleColumn
				}						
			    return self.scales.x(d[theScale]);

			    })
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
			.attr("c"+self.xOrY, function(d,i){
				var theScale = 'category';
				if (self.hasTimeScale) {
					theScale = 'date';
				}
				if (self.xScaleColumn){
					theScale = self.xScaleColumn
				}						
				return self.scales.x(d[theScale]);
			})
			.attr("c"+self.yOrX,function(d,i){
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