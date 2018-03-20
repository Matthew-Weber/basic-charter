Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//the view that constructs a barChart  data, get, models
Reuters.Graphics.BarChart = Reuters.Graphics.ChartBase.extend({
	defaults: _.defaults({
		someNewDefault: "yes"
	}, Reuters.Graphics.ChartBase.prototype.defaults),
	//setup the scales
	chartType:"bar",
	
	xScaleMin:function(){
		return d3.min(this.jsonData, function(c) { return d3.min(c.values, function(v) { return v.date; }); });
	},
	
	xScaleMax:function(){
		return d3.max(this.jsonData, function(c) { return d3.max(c.values, function(v) { return v.date; }); });
	},
	
	xScaleRange:function(){
		var objectNumber = this.numberOfObjects();
		if (this.chartLayout == "stackPercent" ||  this.chartLayout == "stackTotal"){objectNumber = 1;}
		var range = [(this.widthOfBar() * objectNumber) / 2, this[this.widthOrHeight] - this.widthOfBar() * objectNumber];
		if (this.chartLayout == "sideBySide"){
			range = [0, (this[this.widthOrHeight]/(this.jsonData.length * (1 + (2 / (this.jsonData[0].values.length) ) ) ) )];
		}
		return range;
	},
	
	getXScale: function() {
		if (this.hasTimeScale){
				return d3.time.scale()
					.domain([this.xScaleMin(),this.xScaleMax()])
					.range(this.xScaleRange());
			}else{
				return d3.scale.ordinal()
				.domain(this.jsonData[0].values.map(function(d) { return d.category;}))
				.rangeRoundBands([0, this[this.widthOrHeight]], 0);
			}
	},
	
	yScaleMin:function(){
		var theValues = this.dataType;
		if (this.chartLayout == "stackTotal"){theValues = "stackMin";}
		var min = d3.min(this.jsonData, function(c) { return d3.min(c.values, function(v) {return v[theValues]; }); });
		if (this.chartLayout == "stackPercent"){min = 0;}
		if (min > 0){min = 0;}
		return min;		
	},
	
	yScaleMax:function(){
		var theValues = this.dataType;
		if (this.chartLayout == "stackTotal"){theValues = "stackTotal";}
		var max = d3.max(this.jsonData, function(c) { return d3.max(c.values, function(v) { return v[theValues]; }); });
		if (this.chartLayout == "stackPercent"){max = 100;}
		if (max < 0){ max = 0;}
		return max;
	},
	
	yScaleRange: function(){
		var fullHeight = this[this.heightOrWidth];
		if (this.chartLayout == "tier"){
			fullHeight = (this[this.heightOrWidth]/(this.jsonData.length * (1 + (2 / (this.jsonData[0].values.length) ) ) ) );
		}
		var rangeLow = fullHeight;
		var rangeHigh = 0;
		if (this.horizontal){
			rangeLow = 0;
			rangeHigh = fullHeight ;
		}
		return [rangeLow,rangeHigh];		
	},
	
	getYScale: function() {		
		if (!this.yScaleVals || this.hasZoom){
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
									
	xBarPosition:function(d, i, j) {
		
		
		var self = this;
		var theScale = 'category';
		var modifier = 0; 
		if (self.hasTimeScale) {
			theScale = 'date';
			modifier = (self.widthOfBar() * self.numberOfObjects() / 2);
		}			

		if(self.chartLayout == "outlineBar"){
			return (self.scales.x(d[theScale]));  			
		}

		if (self.chartLayout == "stackTotal" || self.chartLayout == "stackPercent" || self.chartLayout == "sideBySide" || self.chartLayout == "tier"){
			if (self.hasTimeScale){ 
				modifier = (self.widthOfBar()/2);
				if (self.chartLayout =="sideBySide"){modifier = 0;}
			}
			return (self.scales.x(d[theScale])) - modifier;
		}else{
			if (self.chartLayout == "onTopOf" || self.chartLayout == "outlineBar"){
				return (self.scales.x(d[theScale]) - modifier)+((self.widthOfBar()/(j+1))*j/2);  
			}else{
				return ((self.scales.x(d[theScale]) - (j * self.widthOfBar())) + (self.widthOfBar() * (self.numberOfObjects() - 1))) - modifier;
			}
		}
	},
	
	yBarPosition:function(d){
		var self = this;
		if ( isNaN(d[self.dataType])){
			return 0;				
		}
		var positioner = "y1";
		if (self.horizontal || d.y1Total < 0 ){ positioner = "y0";}
		if (self.horizontal && d.y1Total < 0 ){ positioner = "y1";}
		if (self.chartLayout == "stackTotal"){ 
			return self.scales.y(d[positioner + "Total"]);
		}else{
			if (self.chartLayout == "stackPercent"){
				return self.scales.y(d[positioner + "Percent"]);					
			}else{
			 	var minOrMax = "max";
		 	  	if (self.horizontal){
			 	  	minOrMax = "min";
		 	  	}
		 	  	return self.scales.y(Math[minOrMax](0, d[self.dataType])); 
		 	}				
		}
	},
	
	barHeight: function(d){
		var self = this;
		if ( isNaN(d[self.dataType])){
			return 0;				
		}
		if (self.chartLayout == "stackTotal"){ 
			return Math.abs(self.scales.y(d.y0Total) - self.scales.y(d.y1Total));
		}else{
			if (self.chartLayout == "stackPercent"){
				return Math.abs(self.scales.y(d.y0Percent) - self.scales.y(d.y1Percent));
			}else{
				return Math.abs(self.scales.y(d[self.dataType]) - self.scales.y(0));
			}									
		}
	},
	
	barFill:function (d,i,j){
		var self = this;
		var color = self.colorScale(d.name)
		if (self.colorUpDown){
			if (d[self.dataType] > 0){
				color = self.colorScale.range()[0];
			}else{
				color =  self.colorScale.range()[1];
			}					  						  	
		}
		if(self.chartLayout == "outlineBar"){
			if (j == 1){return "none"}  			
		}		
		if (self.hashAfterDate){
			var cutoffDate = self.parseDate(self.hashAfterDate);
            var strokecolor = d3.rgb(color).darker(0.8);
            self.t = textures.lines().size(7).stroke(strokecolor).background(color);
            self.svg.call(self.t);
            if (d.date > cutoffDate){
                return self.t.url()
            }
            return color;
		}
		
		
		return color;
		
	},
	
	barWidth:function (d,i,j){
		var self = this;
		if (self.chartLayout == "tier"){
			return self.widthOfBar() * self.numberOfObjects();
		}
		if (self.chartLayout == "outlineBar"){
			return self.widthOfBar() 
		}

		if (self.chartLayout == "onTopOf" ){
			return (self.widthOfBar()) / (j + 1);
		}else{
			return self.widthOfBar();
		}			
	},	
	
	renderChart: function (){
		var self = this;
		self.trigger("renderChart:start");
		
		if (self.hasZoom){
			self.zoomChart();		
		}
		//enter g tags for each set of data, then populate them with bars.  some attribute added on end, for updating reasons
		self.barChart = self.svg.selectAll(".barChart")
			.data(self.jsonData, function(d) { return d.name;})
			.enter().append("g")
		  	.attr("clip-path", "url(#clip" + self.targetDiv + ")")
			.attr("class", "barChart")
			.attr('id',function(d){ return self.targetDiv + d.displayName.replace(/\s/g, '') + "-bar"; });
		
		if (self.chartLayout == "sideBySide"){
			self.barChart.attr("transform", function(d,i){
				if (!self.horizontal){
					return 	"translate(" + (i * (self[self.widthOrHeight] / self.numberOfObjects())) + ",0)";				  	
				}else{
					return 	"translate(0," + (i * (self[self.widthOrHeight] / self.numberOfObjects())) + ")";				  						
				}
			});
		}
		if (self.chartLayout == "tier"){
			self.barChart.attr("transform", function(d,i){
				if (!self.horizontal){
					return 	"translate(0," + (i * (self[self.heightOrWidth] / self.numberOfObjects())) + ")";				  						
				}else{
					return 	"translate(" + (i * (self[self.heightOrWidth] / self.numberOfObjects())) + ",0)";				  	
				}
			});
		}

		self.barChart.selectAll(".bar")
			.data(function(d) {return d.values;})
			.enter().append("rect")
			.attr("class", "bar")
			.style("fill", function(d,i,j){ return self.barFill(d,i,j); })
			.attr(self.heightOrWidth, 0)
			.attr(self.yOrX, self.scales.y(0))
			.attr(self.widthOrHeight, function(d,i,j){ return self.barWidth(d,i,j); }) 
			.attr(self.xOrY, function (d,i,j){					  					  				  	
				return self.xBarPosition(d,i,j);
			})
			.transition()
			.duration(1000)
			.attr(self.yOrX, function(d){ return self.yBarPosition(d); })
			.attr(self.heightOrWidth, function(d){ return self.barHeight(d); });

		if(self.chartLayout == "outlineBar"){
			self.barChart.selectAll(".bar")
			.classed("outline", function(d,i,j){
				if (j == 1){return true} 
				return false 							
			})

		}


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

		if (self.chartLayout == "tier"){
			self.barChart
				.append("svg:g")
			    .attr("class", self.yOrX + " axis")
			    .attr("transform", function(d){
					if (!self.horizontal){
						return "translate(0," + self.height + ")";   
					}else{
						return "translate(0,0)";   
					}
			    });
			
		    self.barChart.selectAll("."+self.yOrX+".axis")
		    	.call(self[self.yOrX + "Axis"]); 
		    self.barChart.each(function(d){
			    var thisId = $(this).attr("id");
			    var barAxis = $("#"+thisId + " .axis").detach();
				barAxis.prependTo($(this));
		    });
	    }else{
		    self.barChart.selectAll("." + self.yOrX + ".axis")
			    .remove();
	    }


		//add teh zero line on top.
		self.makeZeroLine();
		if (self.isPoll){
			self.addMoe();	
		}
		
		self.trigger("renderChart:end");
		self.trigger("chart:loaded");
				
	//end of render
	},
	update: function (){
		var self = this;
		self.baseUpdate();

		self.trigger("update:start");

		self.barChart
			.data(self.jsonData, function(d) {return d.name;})
			.order()
			.transition()
			.duration(1000)
			.attr("transform", function(d,i){
				var xPosit = 0;
				var yPosit = 0;
				if (self.chartLayout == "sideBySide"){
					if (!self.horizontal){
						xPosit = (i*(self[self.widthOrHeight]/self.numberOfObjects()));
					}else{
						yPosit = (i*(self[self.widthOrHeight]/self.numberOfObjects()));
					}
				}
				if (self.chartLayout == "tier"){
					if (!self.horizonta){
						yPosit = (i*(self[self.heightOrWidth]/self.numberOfObjects()));
					}else{
						xPosit = (i*(self[self.heightOrWidth]/self.numberOfObjects()));
					}
				}
				return 	"translate(" + xPosit + ","+yPosit+")";				  	
			});

		self.barChart
			.data(self.jsonData, function(d) { return d.name;})
			.exit()
			.selectAll(".bar")
			.transition()
			.attr(self.heightOrWidth, 0)
			.attr(self.yOrX, self.scales.y(0));
					
		self.svg.selectAll(".barChart")					
			.data(self.jsonData, function(d) { return d.name;})
			.selectAll(".bar")
			.data(function(d) {return d.values;})
			.transition()
			.duration(1000)
			.style("fill", function(d,i,j){ return self.barFill(d,i,j); })
			.attr(self.yOrX, function(d){ return self.yBarPosition(d); })
			.attr(self.heightOrWidth, function(d){ return self.barHeight(d); })
			.attr(self.widthOrHeight, function(d,i,j){ return self.barWidth(d,i,j); }) 
			.attr(self.xOrY, function (d,i,j){
				return self.xBarPosition(d,i,j);
			});	
			
		self.svg.selectAll(".barChart")					
			.data(self.jsonData, function(d) { return d.name;})
			.selectAll(".bar")
			.data(function(d) {return d.values;})
			.exit()
			.transition()
			.attr(self.heightOrWidth, 0)
			.attr(self.yOrX, self.scales.y(0))
			.each("end", function(d){
				d3.select(this).remove();
			});			
			
		self.barChart.selectAll(".bar")
			.data(function(d) {return d.values;})
			.enter().append("rect")
			.attr("class", "bar")
			.style("fill", function(d,i,j){ return self.barFill(d,i,j); })
			.attr(self.heightOrWidth, 0)
			.attr(self.yOrX, self.scales.y(0))
			.attr(self.widthOrHeight, function(d,i,j){ return self.barWidth(d,i,j); }) 
			.attr(self.xOrY, function (d,i,j){					  					  				  	
				return self.xBarPosition(d,i,j);
			})
			.transition()
			.duration(1000)
			.attr(self.yOrX, function(d){ return self.yBarPosition(d); })
			.attr(self.heightOrWidth, function(d){ return self.barHeight(d); });

		if (self.isPoll){
			self.updateMoe();	
		}


		self.trigger("update:end");				        
	//end of update
	},
	updateMoe: function (){
		var self = this;
	    self.addMoe
	    	.transition()
	    	.duration(1000)
			.attr("height", function(d,i,j){ return self.barWidth(d,i,j); }) 
			.attr("y", function (d,i,j){					  					  				  	
				return self.xBarPosition(d,i,j);
			})
			.attr("x", function(d){
				if (d.name == self.leftBarCol){
					return self.scales.y(d["y1Total"]) - (self.scales.y(d[self.moeColumn]));					
				} 
				return self.scales.y(d["y0Total"]) - (self.scales.y(d[self.moeColumn]));
			})
			.attr("width", function(d){ 
				return self.scales.y(d[self.moeColumn]*2)
			});	

		self.addMoeLabels
	    	.transition()
	    	.duration(1000)
		
			.attr("x", function(d,i){
				if (i==0){
					return 0;
				}
				return self.width;
			})
				
	},

	addMoe: function () {
		var self = this;



		self.moeChart = self.svg.selectAll(".moeChart")
			.data(self.jsonData, function(d) { return d.name;})
			.enter().append("g")
		  	.attr("clip-path", "url(#clip" + self.targetDiv + ")")
			.attr("class", "moeChart")


		self.addMoe = self.moeChart.selectAll(".moebar").data(function (d) {
			return d.values;
		}).enter().append("rect").attr("class", "moebar").style("fill", function (d) {

			var color = self.colorScale(d.name)
	        var strokecolor = d3.rgb(color).darker(0.8);
			self.t = textures.lines().size(8).orientation("2/8").stroke(strokecolor);
			self.tother = textures.lines().size(8).orientation("6/8").stroke(strokecolor);
			self.svg.call(self.t);
			self.svg.call(self.tother);


			if (d.name == self.centerCol) {
				return "none";
			}
			if (d.name == self.leftBarCol) {
				return self.tother.url();
			}
			return self.t.url();
		}).attr("height", function (d, i, j) {
			return self.barWidth(d, i, j);
		}).attr("y", function (d, i, j) {
			return self.xBarPosition(d, i, j);
		}).attr("x", function (d) {
			if (d.name == self.leftBarCol) {
				return self.scales.y(d["y1Total"]) - self.scales.y(d[self.moeColumn]);
			}
			return self.scales.y(d["y0Total"]) - self.scales.y(d[self.moeColumn]);
		}).attr("width", function (d) {
			return self.scales.y(d[self.moeColumn])*2;
		});
		
		self.addMoeLabels = self.svg.selectAll("moeLabels")
			.data([self.moeLabelObj[self.leftBarCol], self.moeLabelObj[self.rightBarCol]])
			.enter()
			.append("text")			
			.text(function(d){
				return d;
			})
			.attr("x", function(d,i){
				if (i==0){
					return 0;
				}
				return self.width;
			})
			.attr("text-anchor", function(d,i){
				if (i==0){
					return "start";
				}
				return "end";				
			})
			.attr("dy", -4)
			.style("font-size",".8rem")
			.style("text-transform","uppercase")
		
	}	
	
//end of mdoel
});

