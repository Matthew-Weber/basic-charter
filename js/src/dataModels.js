Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//individual points
Reuters.Graphics.DataPointModel = Backbone.Model.extend({
	initialize:function(attributes, options) {
		return;
    },
    
	parse: function(point, options){
		if (point.date){
			point.rawDate = point.date;
			point.date = options.collection.parseDate(point.date);
			point.displayDate = options.collection.dateFormat(point.date);
		}
		return point;
	},
});

//the collection of datapoint which will sort by date.
Reuters.Graphics.DataPointCollection = Backbone.Collection.extend({
	initialize: function(models, options) {
		var self = this;
		_.each(options, function(item, key){
			self[key] = item;
		});
	},
	
	comparator: function(item) {
		var self = this;
		return item.get("date");
    },
	
	model: Reuters.Graphics.DataPointModel,
	
	parse: function(data){
		var self = this;
		return data;
	},
});

//a model for each collection of data
Reuters.Graphics.DataSeriesModel = Backbone.Model.extend({	
	defaults: {
		name: undefined,
		values: undefined,
		visible:true, 
	},
	
	initialize: function(attributes, options){
		var self = this;
		var totalChange = 0;
		var cumulate = 0;
		var name = self.get("name");
		var firstItem = self.get("values").at(0);
		var firstValue = parseFloat(firstItem.get(name));

		self.get("values").each(function(currentItemInLoop){
			var previousItem = self.get("values").at(self.get("values").indexOf(currentItemInLoop) - 1);
			var currentValue = parseFloat(currentItemInLoop.get(name));
			var change, percent;
			//previousItem.get(name).value ?????
			if(previousItem){
				var previousValue = currentValue
				if (previousItem.get(name)) {
					if (previousItem.get(name).value) {
						previousValue = parseFloat(previousItem.get(name).value);
					}
				}
				change = currentValue - previousValue;
				totalChange += change;
				cumulate += currentValue
				percent = ((currentValue / firstValue) - 1)*100;				
				currentItemInLoop.set(name, {changePreMonth: change, cumulate:cumulate, cumulativeChange: totalChange, percentChange: percent, value:currentValue/options.collection.divisor});
			}else{
				currentItemInLoop.set(name, {changePreMonth: 0, cumulate:currentValue, cumulativeChange: 0, percentChange: 0, value:currentValue/options.collection.divisor});
			}			
		});
	},
	
	parse:function(point, options){
		return point;
	}			
});

//a collection of those collectioins
Reuters.Graphics.DateSeriesCollection = Backbone.Collection.extend({
	initialize: function(models, options) {
		var self = this;
		_.each(options, function(item, key){
			self[key] = item;
		});
	},
	
	comparator: function comparator(item) {
		var self = this;
		var name = item.get("name");
		var lastItem = item.get("values").last()
		// for time series, is going to be last value
		
		if (self.groupSort == "none"){
			return
		}
		for (index = item.get("values").length-1; index > -1; index --){
			if (!isNaN(parseFloat(item.get("values").at(index).get(name)[self.dataType]))  ){
				lastItem = item.get("values").at(index)
				break
			}
		}
		var valueForSort = lastItem.get(name)[self.dataType];			

		//if categories, find greatest value for each
		if (lastItem.get("category")) {
			valueForSort = item.get("values").max(function (d) {
				return d.get(name)[self.dataType];
			}).get(name)[self.dataType];
		}

		var plusMinus = 1;
		if (Array.isArray(self.groupSort)) {
			return self.groupSort.indexOf(name);
		}
		if (self.groupSort == "descending") {
			plusMinus = -1;
		}
		return plusMinus * valueForSort;
	},
	
	model: Reuters.Graphics.DataSeriesModel,
	
	parse: function(data){
		var self = this;

		self.on('reset', function(d){
			if (d.first().get("values").first().get("category")){
				self.categorySorter(d);
			}
			self.makeStacks(d);

		});
		self.on("change", function(d){
			self.makeStacks(d);			
		});


		return data;
	},
	
	categorySorter: function(item){
		var self = this;
		var name = item.last().get("name");
		var plusMinus = 1;
		if (self.categorySort == "descending"){plusMinus = -1;}
		if (self.categorySort == "none"){return}
		
		item.last().get("values").models.sort(function(a,b){			
			if (a.get(name)[self.dataType] > b.get(name)[self.dataType]){ return (1 * plusMinus);}
			if (a.get(name)[self.dataType] < b.get(name)[self.dataType]){ return (-1 * plusMinus);}
			return 0;
		});

    if (!Array.isArray(self.categorySort)){
			self.categorySort = [];
			item.last().get("values").each(function(d){
				self.categorySort.push(d.get("category"));
			});
		}
		
		item.each(function(d){
			d.get("values").models.sort(function(a,b){
				if (self.categorySort.indexOf(a.get("category")) > self.categorySort.indexOf(b.get("category"))){return 1;}
				if (self.categorySort.indexOf(a.get("category")) <  self.categorySort.indexOf(b.get("category"))){return -1;}
				return 0;
			});
		});
		
	},
	
	makeStacks: function(item){
		var self = this;
		var filtered = self.filter(function(d){
			return d.get("visible");
		});
		
		filtered.forEach(function(eachGroup, indexofKey){
			var name = eachGroup.get("name");
			//back to here
			eachGroup.get("values").each(function(d,i){
				var masterPositive = 0;
				var masterNegative = 0;		    	
				var stackTotal = 0;
				var masterPercent = 0;
				var stackMin = 0;
				var thisValue = d.get(name)[self.dataType];
				var counter;
        
				filtered.forEach(function (collection, counter){
					var loopName = collection.get("name");
					var currentValue = collection.get("values").at(i).get(loopName)[self.dataType];
					if (currentValue >=0) {
						stackTotal = stackTotal + currentValue;
					}else{
						stackMin = stackMin + currentValue;							
					}
				});

				for (counter = indexofKey; counter< filtered.length; counter++){					
					var loopName = filtered[counter].get("name");
					var currentValue = filtered[counter].get("values").at(i).get(loopName)[self.dataType];
					if ( currentValue > 0){	
						masterPositive = masterPositive + currentValue;
						masterPercent = masterPercent + (currentValue/stackTotal)*100;
					}else{						
						masterNegative = masterNegative + currentValue;
					}
				}							
				var y0Total = masterPositive - thisValue;
				var y1Total = masterPositive;
				if (thisValue < 0){
					y0Total = masterNegative - thisValue;
					y1Total = masterNegative;
				}									
				d.set(name, _.extend(d.get(name),{y0Total:y0Total, y1Total:y1Total, stackTotal:stackTotal, stackMin:stackMin, y0Percent:masterPercent-((thisValue/stackTotal)*100), y1Percent:masterPercent}));
			});									
		});
	}
	
});


