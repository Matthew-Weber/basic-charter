Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//the view that constructs a linechart
Reuters.Graphics.ChartBase = Backbone.View.extend({
	groupSort:"descending", 
	categorySort:"ascending",
	margin: {top: 40, right: 20, bottom: 30, left: 40},
	dateFormat: d3.time.format("%b %Y"),
	tipTemplate:Reuters.Graphics.basicCharter.Template.tooltip,
	chartTemplate:Reuters.Graphics.basicCharter.Template.chartTemplate,
	legendTemplate: Reuters.Graphics.basicCharter.Template.legendTemplate,
	tipNumbFormat: function(d){
		var self = this;
		if (isNaN(d) === true){return "N/A";}else{
			return self.dataLabels[0] + self.numbFormat(d) + self.dataLabels[1] ;				
		}				
	},
	colors:[blue3, purple3,orange3, red3,yellow3],
	dataType:'value',		
	xScaleTicks: 5,
	yScaleTicks:5,
	YTickLabel: [["",""]],	
	numbFormat: d3.format(",.0f"),
	lineType: "linear",
	chartBreakPoint:300,
	hasLegend:true,
	xOrY : "x",
	yOrX : "y",
	leftOrTop : "left",
	heightOrWidth : "height",
	widthOrHeight : "width",
	topOrLeft : "top",
	bottomOrRight:"bottom",
	rightOrBottom:"right",
	recessionDateParse : d3.time.format("%m/%d/%Y").parse,
	updateCount:0,
	divisor:1,
	annotationType:d3.annotationLabel,	
	timelineDate:d3.time.format("%m/%d/%Y"),	
	timelineDateDisplay: d3.time.format("%b %e, %Y"),
	timelineTemplate:Reuters.Graphics.basicCharter.Template.tooltipTimeline,
	quarterFormater:function(d){
				var yearformat = d3.time.format(" %Y")	
				var monthformat = d3.time.format("%m")
				var quarters = {
					"01":"Q1",
					"02":"Q1",
					"03":"Q1",
					"04":"Q2",
					"05":"Q2",
					"06":"Q2",
					"07":"Q3",
					"08":"Q3",
					"09":"Q3",
					"10":"Q4",
					"11":"Q4",
					"12":"Q4",
				}					
				return quarters[monthformat(d)] +yearformat(d)
	},
	xTickFormat:Reuters.CurrentLocale.timeFormat.multi([
	    ["%H:%M", function(d) { return d.getMinutes(); }],
	    ["%H:%M", function(d) { return d.getHours(); }],
	    ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
	    ["%b %d", function(d) { return d.getDate() != 1; }],
	    ["%B", function(d) { return d.getMonth(); }],
	    ["%Y", function() { return true; }]
	]),			
	initialize: function(opts){
		var self = this;
		this.options = opts; 		
		
		// if we are passing in options, use them instead of the defualts.
		_.each(opts, function(item, key){
			self[key] = item;
		});	
		if (this.quarterFormat){
			this.dateFormat = this.quarterFormater
		}

		if (self.timelineData){
			self.loadTimelineData()
		}else{
			self.loadData()					
		}

	},
	loadData:function(){
		var self = this;
		//Test which way data is presented and load appropriate way
		if (this.dataURL.indexOf("csv") == -1 && !_.isObject(this.dataURL)){
			d3.json(self.dataURL, function(data){
				self.parseData (data);
			});
		} 
		if (this.dataURL.indexOf("csv") > -1){
			d3.csv(self.dataURL, function(data){
				self.parseData (data);
			});
		}
		if (_.isObject(this.dataURL)){
			setTimeout(function(){
				self.parseData (self.dataURL);											
			}, 100);
		}				
	},
	loadTimelineData:function(){
		var self = this;
		//Test which way data is presented and load appropriate way
		if (this.timelineData.indexOf("csv") == -1 && typeof(this.timelineData) != "object"){
			d3.json(self.timelineData, function(data){
				self.timelineData = data;
				self.loadData ();
				return
			});
		} 
		if (this.timelineData.indexOf("csv") > -1){
			d3.csv(self.timelineData, function(data){
				self.timelineData = data;
				self.loadData ();
				return
			});
		}
		if (typeof(this.timelineData) == "object"){
				self.loadData ();
				return
		}			
	},
	formatDataStream: function(response){
		var newArray = []
		
		response.Dates.forEach(function(d,i){					
			var obj={}

			var newDate = d.replace(/\//g, '').replace('Date(','').replace(')','').replace('+0000','')
			var date = new Date(+newDate)
			var betterDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60000)
			var formatDate = (betterDate.getMonth()+1)+"/"+betterDate.getDate()+"/"+betterDate.getFullYear()

			obj.date = formatDate
							
			response.DataTypeValues[0].SymbolValues.forEach(function(item,index){
				var name = response.DataTypeValues[0].SymbolValues[index].Symbol;					
				obj[name] = response.DataTypeValues[0].SymbolValues[index].Value[i];					
			})
			
			newArray.push(obj)
			
		})
		return newArray
		
	},
	parseData: function (data){			
		var self = this;

		if (self.dataStream){
			var response = data.DataResponse || data.DataResponses[0]
			data = self.formatDataStream(response)
		}

		//figuring out if there is a timescale, is this necessary?
		if (data[0].date){self.hasTimeScale = true;}
		// if parser undefined, figure out if it's a 4 year or 2 year date and set parser to match		
		if (self.hasTimeScale && !self.parseDate){
			if (data[0].date.split('/')[2].length == 2){						
				 self.parseDate = d3.time.format("%m/%d/%y").parse;
			}
			if (data[0].date.split('/')[2].length == 4){						
				 self.parseDate = d3.time.format("%m/%d/%Y").parse;
			}			
		}				
		//figure out current chart label, if it's switching between them.
		if (self.chartLayoutLables){
			self.chartLayout = self.chartLayoutLables[self.chartLayoutLables.length-1];
		}

		//set values if horizontal or not
		if (self.horizontal){
			self.xOrY = "y";
			self.yOrX = "x";
			self.leftOrTop = "top"; 
			self.heightOrWidth = "width";
			self.widthOrHeight = "height";				
			self.topOrLeft = "left";
			self.bottomOrRight="right";
			self.rightOrBottom="bottom";
		}

	
		//find values to map, if not defined
		if (!self.columnNames){
			self.columnNames = _.keys(data[0]).filter(function(d){
				return d != "date" && d != "category"  && d !== "type"  && d !== "rawDate" && d !== "displayDate";
			});
			self.columnNamesDisplay = self.columnNames;
		}		
		if (_.isObject(self.columnNames) && !_.isArray(self.columnNames)){
			self.columnNamesDisplay = _.values(self.columnNames);
			self.columnNames = _.keys(self.columnNames);
		}
		if (_.isArray(self.columnNames) && !self.columnNamesDisplay){
			self.columnNamesDisplay = self.columnNames;
		}
		
		self.colorScale = d3.scale.ordinal();
		//figure out the color scale		
		if (_.isObject(self.colors) && !_.isArray(self.colors)){
			self.colorScale.domain(_.keys(self.colors));
			self.colorScale.range(_.values(self.colors));
		}
		if (_.isArray(self.colors)){
			self.colorScale.domain(self.columnNames);
			self.colorScale.range(self.colors);
		}

		//handle multidata
		if (data[0].type){
			if (!self.multiDataColumns){
				self.multiDataColumns = _.uniq(_.pluck(data, 'type'));
			}
			var groupedData = _.groupBy(data,"type");
			self.multiDataColumns.forEach(function(d){
				self.modelData(groupedData[d], d);				
			});
		}else{
			if (self.multiDataColumns){
				self.dataType = self.multiDataColumns[self.multiDataColumns.length-1];
			}
			self.modelData(data, "dataholder");
		}

		//make labels if none
		if (!self.multiDataLabels && self.multiDataColumns){
			self.multiDataLabels = self.multiDataColumns;
		}

		self.flattenData(self.chartData);
		self.baseRender();			
		self.renderChart(); 																 				
								
	},
	
	//function to make all the data.  
	modelData : function(data, name){
		var self = this;
		
		if (!self.groupedData){self.groupedData = {};}
		self.groupedData[name] = new Reuters.Graphics.DataPointCollection([],{parseDate:self.parseDate, dateFormat:self.dateFormat });
		self.groupedData[name].reset(data, {parse:true});

		self[name] = new Reuters.Graphics.DateSeriesCollection([], {parseDate:self.parseDate, groupSort:self.groupSort, divisor:self.divisor, categorySort:self.categorySort, dataType:self.dataType, multiDataColumns:self.multiDataColumns, dateFormat:self.dateFormat});
		
		self[name].reset(
			self.columnNames.map(function(d,i){
				return {name:d, displayName:self.columnNamesDisplay[i], values:self.groupedData[name]};
			}),
			{parse:true}
		);
		self.chartData = self[name];
	},
	
	flattenData:function(data){
		var self = this;

		var filtered = data.filter(function(d){
				return d.get("visible");
			});

		self.jsonData = _.invoke(filtered, 'toJSON');
				
		self.jsonData.forEach(function(d){
			var name = d.name;
			d.values = d.values.toJSON();
			d.values.forEach(function(point){
				_.extend(point, point[name]);
				point.name = name;
			});
		});

		if (self.jsonData.length == 1 && !self.options.hasLegend){
			self.hasLegend = false;
		}
		if (self.jsonData.length > 1 && self.options.hasLegend != false){
			self.hasLegend = true;
		}

		if (self.timelineData){
			self.showTip = true;
			var closestData = null;				
			self.timelineData.forEach(function(timelineItem){
				timelineItem.parsedDate = self.parseDate(timelineItem.date);	
					
				self.chartData.first().get("values").each(function(d,i){
					if (closestData === null || Math.abs(d.get("date") - timelineItem.parsedDate) < Math.abs(closestData - timelineItem.parsedDate)){
						closestData = d.get("date");
					}
					timelineItem.closestDate = closestData;			
					timelineItem.formatedDate = self.timelineDate(timelineItem.closestDate);
				});
			})
			self.timelineDataGrouped = _.groupBy(self.timelineData, "formatedDate")

		}

	},
	barCalculations:function(){
		var self = this;
		// some aspects of the data useful for figuring out bar placement
		self.dataLength = 0;
		
		self.jsonData.forEach(function(d){
			if( d.values.length > self.dataLength){
				self.dataLength = d.values.length;
			}
		});
		self.numberOfObjects = function(){ 
			if (self.chartLayout == "onTopOf" || self.chartLayout == "outlineBar"){ return 1; }else{
				return self.jsonData.length;
			}
		};

		self.widthOfBar = function(){
			if (self.chartLayout == "stackTotal" || self.chartLayout == "stackPercent"){
				return (self[self.widthOrHeight] / (self.dataLength)) - (self[self.widthOrHeight] / (self.dataLength)) * 0.2;
			}else{				
				return (self[self.widthOrHeight] / (self.dataLength*self.numberOfObjects())) - (self[self.widthOrHeight] / (self.dataLength * self.numberOfObjects())) * 0.2;
			}
		};		
	},

	baseRender: function() {
		var self = this;
		self.trigger("baseRender:start");

		if (self.topLegend){
			self.chartBreakPoint = 3000;
		}
		//make basic template and set names of stuff
		self.$el.html(self.chartTemplate({self:self}));
		if (self.$el.width() < self.chartBreakPoint){
			self.$el.find('.chart-holder').addClass("smaller");
		}

		//make a label based on the div's ID to use as unique identifiers 
		self.targetDiv = self.$el.attr("id");
		self.chartDiv = self.targetDiv + " .chart";
		self.legendDiv = self.targetDiv + " .legend";
		self.$chartEl = $("#"+self.chartDiv);
		self.$legendEl = $("#"+self.legendDiv);

						
		//set the width and the height to be the width and height of the div the chart is rendered in
		self.width = self.$chartEl.width() - self.margin.left - self.margin.right;
		
		//if no height set, square, otherwise use the set height, if lower than 10, it is a ratio to width
		if (!self.options.height){
			self.height = self.$chartEl.width() - self.margin.top - self.margin.bottom;			
		}
		if (self.options.height < 10){
			if ($(window).width() < 400){
				self.height = self.$chartEl.width() - self.margin.top - self.margin.bottom;							
			}else{
				self.height = (self.$chartEl.width() * self.options.height) - self.margin.top - self.margin.bottom;				
			}
		}
				
		self.barCalculations();

		//create an SVG
		self.svg = d3.select("#"+self.chartDiv).append("svg")
			.attr({
				width: self.width + self.margin.left + self.margin.right,
				height:self.height + self. margin.top + self.margin.bottom
				})
		    .append("g")
		    .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");  
		        
		//make a rectangle so there is something to click on
		self.svg.append("svg:rect")
			.attr({
				width:self.width,
				height:self.height,
				class:"plot"
			});
		
		 //make a clip path for the graph  
		 self.clip = self.svg.append("svg:clipPath")
		    .attr("id", "clip" + self.targetDiv)
		    .append("svg:rect")
		    .attr({
			    x: - self.margin.left,
			    y: -4,
			    width:self.width + self.margin.left + 8,
			    height:self.height +8
		    });

		//go get the scales from the chart type view
		this.scales = {
			x: this.getXScale(),
			y: this.getYScale()
		};
	   
		//render all the incidentals.		
		self.recessionMaker();
		self.scaleMaker();
		self.toolTipMaker();
		self.legendMaker();	
		self.multiDataMaker();
		self.chartLayoutMaker();
		self.baseUpdate(1);

		if (self.annotations){
			self.labelAdder();
		}
				
		$(window).on("resize", _.debounce(function(event) {
			var width =  self.$el.width();
			if (width < self.chartBreakPoint){
				self.$el.find('.chart-holder').addClass("smaller");
			}else{
				self.$el.find('.chart-holder').removeClass("smaller");
			}
			self.update();
		},100));
		
		self.trigger("baseRender:end");
		//end of chart render			
		return this;
	},
	
	setWidthAndMargins: function (){
		var self = this;

		//length of largest tick
		var maxWidth = -1;
		$("#" + self.targetDiv+ " .y.axis").find("text").not(".topTick").each(function(){
			maxWidth = maxWidth > $(this).width() ? maxWidth : $(this).width();
		});
		if (maxWidth === 0){
			$("#" + self.targetDiv+ " .y.axis").find("text").not(".topTick").each(function(){
				maxWidth = maxWidth > $(this)[0].getBoundingClientRect().width ? maxWidth : $(this)[0].getBoundingClientRect().width;
			});
		}

		if (!self.options.margin){
			self.margin = {top:15, right: 20, bottom: 30, left:9 +  maxWidth};
			if (self.orient == "right"){
				self.margin = { top: 15, left: 5, bottom: 30, right: 20 + maxWidth };
			}
		}

		self.width = this.$chartEl.width() - self.margin.left - self.margin.right;			
		if (!self.options.height){
			self.height = self.$chartEl.width() - self.margin.top - self.margin.bottom;			
		}
		if (self.options.height < 10){
			if ($(window).width() < 400){
				self.height = self.$chartEl.width() - self.margin.top - self.margin.bottom;							
			}else{
				self.height = (self.$chartEl.width() * self.options.height) - self.margin.top - self.margin.bottom;
			}
		}
	},

	recessionMaker: function(){
		var self = this;
		//put in the recessions, if there are any.
		if (!self.hasRecessions){
			return;
		}

		var recessionData = [{"recess":[{"start":"5/1/1937","end":"6/1/1938"},{"start":"2/1/1945","end":"10/1/1945"},{"start":"11/1/1948","end":"10/1/1949"},{"start":"7/1/1953","end":"5/1/1954"},{"start":"8/1/1957","end":"4/1/1958"},{"start":"4/1/1960","end":"2/1/1961"},{"start":"12/1/1969","end":"11/1/1970"},{"start":"11/1/1973","end":"3/1/1975"},{"start":"1/1/1980","end":"7/1/1980"},{"start":"7/1/1981","end":"11/1/1982"},{"start":"7/1/1990","end":"3/1/1991"},{"start":"3/1/2001","end":"11/1/2001"},{"start":"12/1/2007","end":"6/1/2009"}]}];	
		self.recessions = self.svg.selectAll('.recession')
			.data (recessionData);
			
		self.recessionsEnter = self.recessions.enter().append('g')
			.attr({
				"clip-path":"url(#clip" + self.targetDiv + ")",
				class:"recession",
			});
	
		self.recessionsEnter.selectAll("rect")
			.data( function(d) {return(d.recess);} )
			.enter()
			.append("rect")
			.attr({
				class:"recessionBox",
				x:function(d){return self.scales.x(self.recessionDateParse(d.start));},
				y:0,
				width:function(d){return (self.scales.x(self.recessionDateParse(d.end))) - (self.scales.x(self.recessionDateParse(d.start)));},
				height:self.height
			});		
	},
	
	scaleMaker: function(){
		var self = this;							
    
		//create and draw the x axis
		self.xAxis = d3.svg.axis()
	    	.scale(self.scales[self.xOrY])
		    .orient("bottom")
		    .ticks(self[self.xOrY+"ScaleTicks"])
		    .tickPadding(8);
		
		//create and draw the y axis                  
		self.yAxis = d3.svg.axis()
	    	.scale(self.scales[self.yOrX])
		    .orient("left")
		    .ticks(self[self.yOrX+"ScaleTicks"])
		    .tickPadding(8);

		if (self.orient == "right"){
			self.yAxis
			.orient("right").tickPadding(20);
		}

		//change the tic size if it's sideways    
		if (self.horizontal){
			self.xAxis.tickSize(0 - self.height).tickPadding(12);
		}
		//forces a tick for every value on the x scale 
		if (self.tickAll){
			self.fullDateDomain = [];
			self.smallDateDomain = [];
			self.chartData.first().get("values").each(function (d,i){
				self.fullDateDomain.push(d.get("date"));
				if (i === 0 || i == self.dataLength - 1){
					self.smallDateDomain.push(d.get("date"));	
				}
			});
		}	

		if (self.hasTimeScale || self.options.xTickFormat){
			self[self.xOrY+"Axis"].tickFormat(self.xTickFormat);
		}	


		//FIX the tier thing needs rethought	
		if (self.chartLayout == "tier"){
			self[self.yOrX + "Axis"].ticks(2);		
		}

		//define the tick format if it's specified, change tick length if it's horizontal
		if (self.yTickFormat){
			self[self.yOrX+"Axis"].tickFormat(self.yTickFormat);
		}
		if (!self.horizontal){
			self.yAxis.tickSize(0-self.width);
		}else{
			self.yAxis.tickSize(0);
		}		 
		  			
		//if autoScale ing then let it use the default auto scale.  hasZoom and multiData automatically get auto-scaling
		if (self.yScaleVals && !self.hasZoom){	
			self[self.yOrX + "Axis"].tickValues(self.yScaleVals);
		}
		//draw all the axis
		self.svg.append("svg:g")
		    .attr("class", "x axis");		
	    self.svg.select(".x.axis")
	        .attr("transform", "translate(0," + self.height + ")")
	        .call(self.xAxis);
		self.svg.append("svg:g")
		    .attr("class", "y axis");			
	    self.svg.select(".y.axis")
        	.attr("transform", function(d){
	        	if (self.orient == "right")
	        	return "translate("+self.width+",0)"	        	
        	})
	    	.call(self.yAxis); 


		self.adjustXTicks();

		if (!self.horizontal){
			self.svg.selectAll(".y.axis line")
				.attr("x1", -self.margin.left);
		}

		//get the latest labels
		self.dataLabels = self.YTickLabel[self.YTickLabel.length-1];
		self.topTick(self.dataLabels);
	},

	makeZeroLine:function (){
		var self = this;
		self.zeroLine = self.svg.append("line")
			.attr("class", "zeroAxis")
			.attr("clip-path", "url(#clip" + self.targetDiv + ")")
			.attr(self.xOrY + "1", function (){
				if (self.horizontal){return 0;}
				return -self.margin[self.leftOrTop];				
			})
			.attr(self.xOrY + "2", self[self.widthOrHeight])
			.attr(self.yOrX + "1", self.scales.y(0))
			.attr(self.yOrX + "2", self.scales.y(0));
	},
	
	topTick: function(tickLabels){
		var self = this;	

		d3.selectAll("#" + self.targetDiv + " .topTick").remove();

		var topTick =  $("#" + self.targetDiv + " ." + self.yOrX + ".axis .tick:last-of-type").find("text");
		var topTickHeight = topTick.height();
		if (topTickHeight === 0){
			topTickHeight = topTick[0].getBoundingClientRect().height;
		}
		
		d3.selectAll("#" + self.targetDiv + " ." + self.yOrX + ".axis .tick text")
			.attr("transform", "translate(0,-"+topTickHeight/2+")");

		var topTickHTML = topTick.text();
		var backLabel = "";
		if (self.horizontal){backLabel = tickLabels[1]; }
		topTick.text(tickLabels[0] +topTickHTML + backLabel);
		if (!self.horizontal){
			topTick.clone().appendTo(topTick.parent()).text(tickLabels[1]).css('text-anchor', "start").attr("class","topTick");
		}


	},
	
	toolTipMaker: function() {
		var self = this;

		self.baseElement = document.getElementById(self.targetDiv).querySelector('svg');
		self.svgFind = self.baseElement;		
		self.pt = self.svgFind.createSVGPoint();
		
		//start the cursor off to the left
		self.xPointCursor = 0 - self.margin[self.leftOrTop]-500;
		//add a line	
		self.cursorLine = self.svg.append('svg:line')
			.attr('class','cursorline')
			.attr("clip-path", "url(#clip" + self.targetDiv + ")")
			.attr(self.xOrY + '1', self.xPointCursor)
			.attr(self.xOrY + '2', self.xPointCursor)
			.attr(self.yOrX + '1',0)
			.attr(self.yOrX + '2',self[self.heightOrWidth]);	
				
		// tooltip divs, default turns em off.  They get turned on if you have no legend, or if you specifically turn them on.
		self.tooltip = d3.select("#" + self.chartDiv).append("div")
			.attr("class", "reuters-tooltip")
            .style({
		        opacity:0,
		        display:function(){
			        if (self.showTip || !self.hasLegend){
				        return "block";
			        }
			        return "none";
		        }
	        });            

		self.svgmove = self.svgFind.addEventListener('mousemove',function(evt){ return self.tooltipMover(evt); },false);
		self.svgtouch = self.svgFind.addEventListener('touchmove',function(evt){ return self.tooltipMover(evt); },false);
		self.svgout = self.svgFind.addEventListener('mouseout',function(evt){ return self.tooltipEnd(evt); },false);
		self.svgtouchout = self.svgFind.addEventListener('touchend',function(evt){ return self.tooltipEnd(evt); },false);

	},
	
	tooltipMover: function (evt, self){
		var self = this;
		self.loc = self.cursorPoint(evt);
		self.xPointCursor = self.loc[self.xOrY];
		self.yPointCursor = self.loc[self.yOrX];
		
		//little maths to figure out in the sideBySide layout what data point you are on.
		var widthsOver = 0;
		if (self.chartLayout == "sideBySide"){
			var eachChartWidth = (self[self.widthOrHeight] / self.numberOfObjects());
			for (i = 0; i < self.numberOfObjects;  i++ ){
				if ((self.xPointCursor - self.margin[self.leftOrTop]) > eachChartWidth){
					self.xPointCursor = self.xPointCursor - eachChartWidth;
					widthsOver = widthsOver + eachChartWidth;
				}
			}
		}
		if (self.chartLayout == "tier"){
			widthsOver = ((self.widthOfBar() * self.numberOfObjects()) / 2) - self.widthOfBar() / 2;
		}
		
		var toolTipModifier = 0;
		//use a reverse scale to figure out where you are at if there is a time scale.
		//if it's an ordinal scale it's a little trickier.
		self.closestData = null;				
		var indexLocation = self.xPointCursor - parseFloat(self.margin[self.leftOrTop]);

		if (self.hasTimeScale){
			self.locationDate = self.scales.x.invert(indexLocation);
			self.chartData.first().get("values").each(function(d,i){
				var include;
				_.each(d.attributes, function(obj,key){
					if (key == "date"){return}
					if (obj.value){
						include = true
					}
				})
				if (!include && !self.showZeros){return}				
				if (self.closestData === null || Math.abs(d.get("date") - self.locationDate) < Math.abs(self.closestData - self.locationDate)){
					self.closestData = d.get("date");
				}			
			});
			if (self.timelineData){
				self.closestData = null;				
				self.timelineData.forEach(function(d,i){
					if (self.closestData === null || Math.abs(d.closestDate - self.locationDate) < Math.abs(self.closestData - self.locationDate)){
						self.closestData = d.closestDate;
					}			
				});
			}
		}else{
			var closestRange = null;
			self.scales.x.range().forEach(function(d,i){
				var include;

				self.chartData.first().get("values").each(function(item){
					if (item.get("category") == self.scales.x.domain()[i]){

						_.each(item.attributes, function(obj,key){
							if (key == "category"){return}
							if (obj.value){
								include = true
							}
						})							
					}
				})
				if (!include && !self.showZeros){return}				
				if ( closestRange === null || Math.abs(d-indexLocation) < Math.abs(closestRange - indexLocation)){
					closestRange = d;
				}					
			});
			var closestIndex = self.scales.x.range().indexOf(closestRange);
			self.closestData = self.scales.x.domain()[closestIndex];
			toolTipModifier = self.widthOfBar() / 2;
			if (self.chartType == "line"){
				toolTipModifier = 0;
			}
		}

		//Got the value, now let's move the line.
		self.cursorLine
			.attr(self.xOrY+'1', (self.scales.x(self.closestData)+toolTipModifier + widthsOver ))
			.attr(self.xOrY+'2', self.scales.x(self.closestData)+toolTipModifier + widthsOver);
	
		//highlight current bar
		self.highlightCurrent();
		
		//and now we can update the tooltip
		self.tooltip
			.html(function(d){
				return self.tipTemplate({self:self, data:self.makeTipData()});
			})
			.style(self.leftOrTop, function(d){
				var tipWidth = $("#" + self.targetDiv + " .reuters-tooltip").outerWidth();

				if (self.horizontal){
					tipWidth = $("#" + self.targetDiv + " .reuters-tooltip").outerHeight();
				}
				if (self.xPointCursor < (self.margin.left + self.width + self.margin.right) / 2){
					return self.margin[self.leftOrTop] + self.scales.x(self.closestData) + toolTipModifier + 15 + "px";
				}else{
					return self.scales.x(self.closestData) + toolTipModifier - tipWidth +15  + "px";
				}						
			})
			.style(self.topOrLeft, function(d){
				var toolTipHeight = $("#" + self.targetDiv + " .reuters-tooltip").height();
				if (self.horizontal){
					 toolTipHeight = $("#" + self.targetDiv + " .reuters-tooltip").outerWidth();
				}
				if (self.yPointCursor > (self.margin.top + self.height + self.margin.bottom) * 2 / 3){
					return self.yPointCursor - toolTipHeight -20 + "px";
				} 					
				if (self.yPointCursor < (self.margin.top + self.height + self.margin.bottom) / 3){
					return self.yPointCursor  + "px";
				}
					return self.yPointCursor - toolTipHeight/2 + "px";
			});
		//and now we can update the legend.
		if (self.hasLegend){				
			var legendData = self.makeTipData();			

			d3.select("#"+ self.legendDiv).selectAll(".valueTip")
				.data(legendData, function(d){ return d.name; })
				.html(function(d,i){
					if (self.chartLayout == "stackPercent"){
						return self.tipNumbFormat(d.y1Percent - d.y0Percent);
					}
					return self.tipNumbFormat(d[self.dataType]);
				});

			self.legendDate.html(function(){
				if (legendData[0].category){
					return legendData[0].category;
				}
				if (legendData[0].quarters){
                    return legendData[0].quarters + legendData[0].displayDate;
                }				
				return legendData[0].displayDate;				
			});
						
			self.setLegendPositions();
		}
		
        self.tooltip.style({
	        opacity:1
        });
        self.trigger("tooltipMover:end")

	},
	
	highlightCurrent:function(){
		var self = this;
		if (self.chartType == "bar"){
			self.barChart.selectAll(".bar")
				.classed("lighter", function(d){
					if (d.date == self.closestData || d.category == self.closestData){
						return false;		
					}
					return true;		
				});			
		}
		if (self.chartType == "line"){
			self.lineChart.selectAll(".tipCircle")
				.classed("highlight", function(d){
					if (d.date == self.closestData || d.category == self.closestData){
						return true;		
					}
					return false;
				});
		}			
	},
	
	makeTipData:function(){
		var self = this;
		var xDataType = "category";
		if (self.hasTimeScale){
			xDataType = "date";
		}
		var filtered = self.chartData.filter(function(d){
				return d.get("visible");
		});
		var tipData = [];
		filtered.forEach(function(d){
			var name = d.get("name");
			var displayName = d.get("displayName");
			var timeFormatter = d3.time.format("%m/%d/%Y %H:%M:%S");
			var matchingValues = d.get("values").filter(function(d){
				if (self.hasTimeScale){
					return timeFormatter(d.get(xDataType)) == timeFormatter(self.closestData);				
				}				
				return d.get(xDataType) == self.closestData;
			});	
			matchingValues.forEach(function(d){
				var matchObj = d.toJSON();
				_.extend(matchObj, matchObj[name]);
				matchObj.name = name;
				matchObj.displayName = displayName;
				tipData.push(matchObj);	
			});
			
		});
		return tipData;

	},

	cursorPoint: function (evt){
		var self = this;
		if ((evt.clientX)&&(evt.clientY)) {
			self.pt.x = evt.clientX; self.pt.y = evt.clientY;
		} else if (evt.targetTouches) {
			self.pt.x = evt.targetTouches[0].clientX; self.pt.y = evt.targetTouches[0].clientY;			
			self.pt.deltaX = Math.abs(self.pt.x - self.pt.lastX)
			self.pt.deltaY = Math.abs(self.pt.y - self.pt.lastY)
			if(self.pt.deltaX > self.pt.deltaY){
			  evt.preventDefault();				
			}
			self.pt.lastY = self.pt.y
			self.pt.lastX = self.pt.x
		}
		return self.pt.matrixTransform(self.svgFind.getScreenCTM().inverse());
	},

	tooltipEnd: function (evt){
		var self = this;
		self.cursorLine
			.attr(self.xOrY+'1', 0- self.margin[self.leftOrTop] -10 )
			.attr(self.xOrY+'2', 0-self.margin[self.leftOrTop]-10);
			
		self.tooltip
		.style("opacity", 0);
		
		if (self.hasLegend){
			self.legendItems.selectAll(".valueTip")			
				.html("<br>");

			self.legendDate.html("<br>");
 			self.setLegendPositions();
		}
		if (self.chartType == "bar"){
			self.barChart.selectAll(".bar")
				.classed("lighter", false);			
		}
		if (self.chartType == "line"){
			self.lineChart.selectAll(".tipCircle")
				.classed("highlight", false);			
		}
	},

	multiDataMaker: function() {
		var self = this;
		if (!self.multiDataColumns){
			return;
		}
		self.$(".chart-nav .btn").on("click", function(evt){

                var thisID = $(this).attr("dataid");
                var i = self.$(".chart-nav .btn").index(this)

				if (self.YTickLabel[i]){
					self.dataLabels = self.YTickLabel[i];
				}else{
					self.dataLabels = self.YTickLabel[0];					
				}
				
				//this has to act differently if you're doing a data transform, or picking up totally different data.
				if (!self[thisID]){
					self.dataType = thisID;
				}else{
	    		    self.chartData = self[thisID];
	    		    self.flattenData(self.chartData);
				}

				self.update();    		
		})
		return
		
	},

	chartLayoutMaker: function(){
		var self = this;
    	if (!self.chartLayoutLables){ 
	    	return;
    	}

		self.makeNavLayout = d3.select("#"+self.targetDiv + " .chart-layout").append("div")
			.attr("class", "layoutNavContainer");
					
		self.makeNavLayoutButtons = self.makeNavLayout.selectAll('.layoutNavButtons')
			.data(self.chartLayoutLables)
			.enter()
			.append("div")
			.attr("class", "layoutNavButtons")
			.attr("dataid", function(d){
				return d;
			})
			.style("background-position", function(d){
				//makes the sprite work.  i should change this to a class instead.
				var positionArray = ["basicbar", "stackTotalbar", "stackPercentbar", "sideBySidebar","tierbar","onTopOfbar","basicline", "stackTotalline", "stackPercentline","fillLinesline"];
				var positionNumber = positionArray.indexOf(d + self.chartType);
				return "0px " + ( - (positionNumber * 40)) + "px";
			})
			.classed("selected", function(d,i){
				if (i == self.chartLayoutLables.length - 1){
					return true;
				}else{return false;}
			})
            .on("click", function(d,i) {
				if ($(this).hasClass("selected")){
					return;
				}
				var thisID = $(this).attr("dataid");
				$(this).addClass("selected").siblings().removeClass("selected");
				
    		    self.chartLayout= d;
				
				//get the right data labels
				if (self.YTickLabel[i]){
					self.dataLabels = self.YTickLabel[i];
				}else{
					self.dataLabels = self.YTickLabel[0];					
				}				//and override them if it's stack percent
				if (self.chartLayout == "stackPercent"){
					self.dataLabels = ["","%"];
				}				

				//run the updater    		    
		    	self.update ();	
	        });
	},

	legendMaker: function() {	
		var self = this;
		//if no legend, get out of here.
		if(!self.hasLegend){
			return;
		}
		self.$legendEl.html(self.legendTemplate({data:self.jsonData,self:self}));

		self.legendItems = d3.selectAll("#"+self.legendDiv+' .legendItems')
			.data(self.jsonData)
			.on("click", function(d){
				var that = this;
				self.chartData.where({name:d.name}).forEach(function(d){
					if($(that).hasClass("clicked")){
						d.set({visible:true});
					}else{
						d.set({visible:false});
					}
				});
				if (self.multiDataColumns && self[self.multiDataColumns[0]]){
					self.multiDataColumns.forEach(function(data){
						self[data].where({name:d.name}).forEach(function(d){
							if($(that).hasClass("clicked")){
								d.set({visible:true});
							}else{
								d.set({visible:false});
							}
						});
					});					
				}

				$(this).toggleClass("clicked");									
				self.flattenData(self.chartData);				
				self.update ();  		
			});

		self.legendValues = d3.select("#"+ self.legendDiv).selectAll(".valueTip")
			.data(self.jsonData);
			
		self.legendDate = d3.selectAll("#"+self.legendDiv+' .dateTip');
		
		self.setLegendPositions();
	},

	setLegendPositions: function(){
		var self = this;

		if (!self.hasLegend){
			return;
		}
		var depth = 0;								
			
		self.legendItems
			.data(self.jsonData, function(d) {return d.name;})
			.style("top", function(d,i){					
					var returnDepth = depth;
					depth += $(this).height() + 5;
					return returnDepth+"px";	
			});
		self.legendItems
			.data(self.jsonData, function(d) {return d.name;})
			.exit()
			.style("top", function(d,i){					
					var returnDepth = depth;
					depth += $(this).height() + 5;
					return returnDepth + "px";	
			});

	},

	adjustXTicks:function(){
		var self = this;
 
		var ticksWidth = 0;
		$("#" + self.targetDiv + " .x.axis .tick").find("text").each(function(d){
			ticksWidth += $(this).width() + 5;
		});
		if (self.tickAll){
			self[self.xOrY+"Axis"].tickValues(self.fullDateDomain);			
		}

		if (ticksWidth > self.width){
			if (self.horizontal){
				self["xAxis"].ticks(3);				
			}else{
				self["xAxis"].ticks(2);				
			}


			if (self.tickAll){
				self[self.xOrY+"Axis"].tickValues(self.smallDateDomain);			
			}			
			

		}
	
	},

	baseUpdate: function(duration) {
		var self = this;
		self.trigger("baseUpdate:start");

		if (!duration){duration = 1000;}
		self.setWidthAndMargins();				
		self.setLegendPositions();
		self.barCalculations();

		
		self.svg.selectAll('.cursorline')
			.attr(self.yOrX + '1',0)
			.attr(self.yOrX + '2',self[self.heightOrWidth]);	
		
		d3.select("#"+self.targetDiv+" svg")
			.transition()
			.duration(duration)
			.attr({
				width:self.width + self.margin.left + self.margin.right,
				height:self.height + self. margin.top + self.margin.bottom				
			});
		
		self.svg
			.transition()
			.duration(duration)
			.attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");  
		
		self.svg.select(".plot")
			.transition()
			.duration(duration)
			.attr({
				width:self.width,
				height:self.height
			});

		self.clip 			
			.transition()
			.duration(duration)
			.attr({
			    x: -self.margin.left,
			    y: -4,
			    width:self.width + self.margin.left + 8,
			    height:self.height +8
			});
		
		this.scales = {
			x: this.getXScale(),
			y: this.getYScale()
		};

		self.xAxis.scale(self.scales[self.xOrY]);

		self.yAxis.scale(self.scales[self.yOrX]);
		
		self[self.yOrX+"Axis"].tickSize(0-self[self.widthOrHeight]);
		
		if (self.chartLayout == "tier"){
			self[self.yOrX + "Axis"].ticks(2);		
		}else{
			self.yAxis.ticks(self[self.yOrX + "ScaleTicks"]);
			self.xAxis.ticks(self[self.xOrY + "ScaleTicks"]);
		}

		if (self.updateCount == 1){
			self.adjustXTicks();			
		}

		// update the axes,   
		self.svg.select(".x.axis")
			.transition()
			.duration(duration)
	        .attr("transform", "translate(0," + self.height + ")")
			.call(self.xAxis);					

		self.svg.select(".y.axis")
			.transition()
			.duration(duration)
        	.attr("transform", function(d){
	        	if (self.orient == "right")
	        	return "translate("+self.width+",0)"	        	
        	})			
			.call(self.yAxis)
			.each("end", function(d){
				if (self.updateCount === 0){
					self.updateCount++;
					setTimeout(function(){
						self.update();					
					}, 10); 
				}else{
					self.updateCount = 0;
				}
			});					


		if (!self.horizontal){
			self.svg.selectAll(".y.axis line")
				.attr("x1", "-"+self.margin.left);
		}
		
		//FIX - should be better x axis on the side by side
		if (self.chartLayout == "sideBySide"){
			self.svg.select("." + self.xOrY + ".axis")
				.style("display", "none");
		}else{
			self.svg.select("." + self.xOrY + ".axis")
				.style("display", "block");										
		}
		
		//fix, tier is all screwy, should just rethink
		if (self.chartLayout == "tier"){
		
			self.barChart
			.selectAll("." + self.yOrX + ".axis")
			.remove();
			
			self.barChart
				.append("svg:g")
			    .attr("class", self.yOrX + " axis")
			    .attr("transform", function(d){
					if (self.horizontal){
						return "translate(0," + self.height + ")";   
					}else{
						return "translate(0,0)";   
					}
			    });
			
		    self.barChart		    
		    	.data(self.chartData, function(d) { return d.name;})
		    	.selectAll("."+self.yOrX+".axis")
		    	.call(self[self.yOrX + "Axis"]); 
		    self.barChart.each(function(d){
			    var thisId = $(this).attr("id");
			    var barAxis = $("#"+thisId + " .axis").detach();
				barAxis.prependTo($(this));
		    });
	    }else{
		    //FIX what's up here?
/*
		    if (self.chartType == "bar"){
			    self.barChart.selectAll("." + self.yOrX + ".axis")
				    .remove();
			}
*/
	    }
		
		//update the top tick label
		self.topTick(self.dataLabels);


		//zero line
		if (self.zeroLine){
			self.zeroLine
				.transition()
				.duration(duration)
				.attr(self.xOrY + "1", function (){
					if (self.horizontal){return 0;}
					return "-" + self.margin[self.leftOrTop];				
				})
				.attr(self.xOrY + "2", self[self.widthOrHeight])
				.attr(self.yOrX+"1", self.scales.y(0))
				.attr(self.yOrX+"2", self.scales.y(0));			
		}

		
		//recessions				
		self.svg.selectAll(".recessionBox")
			.transition()
			.duration(duration)
			.attr({
				x: function (d) { return self.scales.x(self.recessionDateParse(d.start)); },
				width:function (d) { return (self.scales.x(self.recessionDateParse(d.end))) - (self.scales.x(self.recessionDateParse(d.start)));},
				height:self.height
			});

		if (self.zoom){
			self.zoom
		    	.x(self.scales.x)
			    .y(self.scales.y);
		}

		if (self.annotationGroup){
			
			self.annotationData = self.options.annotations(self)

			self.makeAnnotations
				.annotations(self.annotationData)				
			
			self.makeAnnotations.updatedAccessors()			
			self.svg.select("g.annotation-group")
//				.transition()
				.call(self.makeAnnotations)		
		}
		
		self.trigger("baseUpdate:end");
	//end of base update	
	},

	zoomChart: function (){
		var self = this;
		//if there is a zoom, then setup the zoom
		//define the zoom
		self.zoom = d3.behavior.zoom()
	    	.x(self.scales.x)
		    .y(self.scales.y)
		    .scaleExtent([1,8])
		    .on("zoom", zoomed);
	
		//call the zoom on the SVG
	    self.svg.call(self.zoom);
	
		//define the zoom function
		function zoomed() {		    	
	    	self.svg.select(".x.axis").call(self.xAxis);
		    self.svg.select(".y.axis").call(self.yAxis);

			if (!self.horizontal){
				self.svg.selectAll(".y.axis line")
					.attr("x1", -self.margin.left);
			}
	
			//get the latest labels
			self.dataLabels = self.YTickLabel[self.YTickLabel.length-1];
			self.topTick(self.dataLabels);


			if (self.chartType == "line"){
				self.lineChart
					.data(self.jsonData, function(d) {return d.name;})
			        .selectAll(".tipCircle")
			        .data( function(d) {return d.values;})
					.attr("cx", function(d,i){return self.scales.x(d.date);})
					.attr("cy",function(d,i){return self.scales.y(d[self.dataType]);});
					
				self.lineChart.selectAll(".line")
			        .data(self.jsonData, function(d) {return d.name;})
		        	.attr("d", function (d) { return self.line(d.values);});
	
				self.lineChart.selectAll(".area")
		        	.data(self.jsonData, function(d) {return d.name;})
			        .attr("d", function(d,i) { 
						return self.area(d.values); 
			         });
			}
			if (self.chartType == "bar"){

				self.svg.selectAll(".barChart")					
					.data(self.jsonData, function(d) { return d.name;})
					.selectAll(".bar")
					.data(function(d) {return d.values;})
					.attr(self.yOrX, function(d){ return self.yBarPosition(d); })
					.attr(self.heightOrWidth, function(d){ return self.barHeight(d); })
					.attr(self.widthOrHeight, function(d,i,j){ return self.barWidth(d,i,j); }) 
					.attr(self.xOrY, function (d,i,j){
						return self.xBarPosition(d,i,j);
					});	
			}
			


			self.zeroLine
				.attr(self.yOrX+"1", self.scales.y(0))
				.attr(self.yOrX+"2", self.scales.y(0));
								
			self.svg.selectAll(".recessionBox")
				.attr("x", function (d) {  return self.scales.x(self.recessionDateParse(d.start));})
				.attr("width", function (d) {return (self.scales.x(self.recessionDateParse(d.end))) - (self.scales.x(self.recessionDateParse(d.start)));});
		}													
	//end of zoom
	},
	labelAdder:function (){
		var self = this;
		self.annotationData = self.annotations()

		self.makeAnnotations = d3.annotation()
		  .editMode(self.annotationDebug)
		  .type(self.annotationType)
		  .annotations(self.annotationData)		  

		  if (self.annotationData[0].data){
			  
		  	self.makeAnnotations
			  .accessors({
				x:function(d){
					if (self.annotationData[0].data.date){
						return self.scales.x(self.parseDate(d.date))						
					}
					return self.scales.x(d.xvalue)

				},
			    y: d => self.scales.y(d.yvalue)
			  })
			  .accessorsInverse({
			     date:function(d){
					return self.dateFormat(self.scales.x.invert(d.x))						
				},
				xvalue:function(d){
					return self.scales.x.invert(d.x)					
				},
			    yvalue: d => self.scales.y.invert(d.y)
			  })


		  }

		
		self.annotationGroup = self.svg
		  .append("g")
		  .attr("class", "annotation-group")
		  .call(self.makeAnnotations)	
		  
		 self.svg.select(".annotation-group").classed("active",true)	
	}
	
//end of view
});

