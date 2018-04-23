(function () {
	window["Reuters"] = window["Reuters"] || {};
	window["Reuters"]["Graphics"] = window["Reuters"]["Graphics"] || {};
	window["Reuters"]["Graphics"]["basicCharter"] = window["Reuters"]["Graphics"]["basicCharter"] || {};
	window["Reuters"]["Graphics"]["basicCharter"]["Template"] = window["Reuters"]["Graphics"]["basicCharter"]["Template"] || {};

	window["Reuters"]["Graphics"]["basicCharter"]["Template"]["chartTemplate"] = function (t) {
		var __t,
		    __p = '',
		    __j = Array.prototype.join;
		function print() {
			__p += __j.call(arguments, '');
		}

		if (t.self.multiDataColumns) {
			;
			__p += '\n	<div class="chart-nav">\n		<div class="navContainer">\n            <div class="btn-group nav-options horizontal" data-toggle="buttons">\n                ';
			t.self.multiDataColumns.forEach(function (d, i) {
				;
				__p += '                \n                    <label dataid="' + ((__t = d) == null ? '' : __t) + '" class="btn btn-primary ';
				if (i == t.self.multiDataLabels.length - 1) {
					;
					__p += 'active';
				};
				__p += ' smaller">\n                        <input type="radio" name="nav-options" autocomplete="off"> \n                        ' + ((__t = t.self.multiDataLabels[i]) == null ? '' : __t) + '\n                    </label>\n                ';
			});
			__p += '\n            </div>    		    		\n		</div>    	\n	</div>\n';
		};
		__p += '\n';
		if (t.self.navSpacer) {
			;
			__p += '\n	<div class="chart-nav">\n		<div class="navContainer spacer"></div>\n	</div>\n';
		};
		__p += '\n\n';
		if (t.self.chartLayoutLables) {
			;
			__p += '\n	<div class="chart-layout"></div>\n';
		};
		__p += '\n<div class="chart-holder \n	';
		if (!t.self.hasLegend) {
			print('no-legend');
		};
		__p += '\n	">\n	<div class="legend nested-legend"></div>\n	<div class="chart nested-chart"></div>\n</div>';
		return __p;
	};
})();
(function () {
	window["Reuters"] = window["Reuters"] || {};
	window["Reuters"]["Graphics"] = window["Reuters"]["Graphics"] || {};
	window["Reuters"]["Graphics"]["basicCharter"] = window["Reuters"]["Graphics"]["basicCharter"] || {};
	window["Reuters"]["Graphics"]["basicCharter"]["Template"] = window["Reuters"]["Graphics"]["basicCharter"]["Template"] || {};

	window["Reuters"]["Graphics"]["basicCharter"]["Template"]["legendTemplate"] = function (t) {
		var __t,
		    __p = '',
		    __j = Array.prototype.join;
		function print() {
			__p += __j.call(arguments, '');
		}
		__p += '<div class=\'legendContainer\'>\n	<div class="legend-ital">' + ((__t = 'Hide/show') == null ? '' : __t) + '</div>\n	<div class=\'dateTip\'> \n		';

		if (t.data[0].displayDate) {
			print(t.data[0].displayDate);
		}
		if (t.data[0].category) {
			print(t.data[0].category);
		}
		if (!t.data[0].category && !t.data[0].displayDate) {
			print('<br>');
		};
		__p += '\n	</div>\n	<div class="legend-items-holder">\n		';
		t.data.forEach(function (d, i) {
			;
			__p += '\n			<div class="legendItems">\n				<div class=\'circleTip ' + ((__t = t.self.chartType) == null ? '' : __t) + ' ';
			if (t.self.chartLayout == "outlineBar" && i == 1) {
				;
				__p += 'outline';
			};
			__p += '\' style=\'background-color:';
			print(t.self.colorScale(d.name));
			__p += ';\'></div>\n				<div class="legendInline">\n					<div class="nameTip">	' + ((__t = d.displayName) == null ? '' : __t) + '</div>\n					<div class=\'valueTip\'>\n						';
			if (d[t.self.dataType]) {
				print(t.self.tipNumbFormat(d[t.self.dataType]));
			} else {
				print("<br>");
			};
			__p += '\n					</div>\n				</div>\n			</div>\n		';
		});
		__p += '\n	</div>		\n</div>\n\n';
		return __p;
	};
})();
(function () {
	window["Reuters"] = window["Reuters"] || {};
	window["Reuters"]["Graphics"] = window["Reuters"]["Graphics"] || {};
	window["Reuters"]["Graphics"]["basicCharter"] = window["Reuters"]["Graphics"]["basicCharter"] || {};
	window["Reuters"]["Graphics"]["basicCharter"]["Template"] = window["Reuters"]["Graphics"]["basicCharter"]["Template"] || {};

	window["Reuters"]["Graphics"]["basicCharter"]["Template"]["tooltip"] = function (t) {
		var __t,
		    __p = '',
		    __j = Array.prototype.join;
		function print() {
			__p += __j.call(arguments, '');
		}

		if (t.data[0].quarters) {
			;
			__p += '\n	<div class=\'dateTip\'> ' + ((__t = t.data[0].quarters) == null ? '' : __t) + ' ' + ((__t = t.data[0].displayDate) == null ? '' : __t) + ' </div>\n';
		} else if (t.data[0].displayDate) {
			;
			__p += '\n	<div class=\'dateTip\'> ' + ((__t = t.data[0].displayDate) == null ? '' : __t) + ' </div>\n';
		} else {
			;
			__p += '\n	<div class=\'dateTip\'> ' + ((__t = t.data[0].category) == null ? '' : __t) + ' </div>\n';
		};
		__p += '\n';
		if (t.self.xScaleColumn) {
			;
			__p += '\n	<div class=\'dateTip\'> ' + ((__t = t.data[0][t.self.xScaleColumn]) == null ? '' : __t) + ' </div>\n';
		};
		__p += '\n\n';
		t.data.forEach(function (d, i) {
			;
			__p += '\n		<div class="tipHolder">\n			';
			if (t.data.length > 1) {
				;
				__p += '\n				<div class=\'circleTip ' + ((__t = t.self.chartType) == null ? '' : __t) + ' ';
				if (t.self.chartLayout == "outlineBar" && i == 1) {
					;
					__p += 'outline';
				};
				__p += '\' style=\'background-color:';
				print(t.self.colorScale(d.name));
				__p += ';\'></div>\n				<div class=\'nameTip\'>' + ((__t = d.displayName) == null ? '' : __t) + '</div>\n			';
			};
			__p += '\n			<div class=\'valueTip\'>\n				';
			if (t.self.chartLayout == "stackPercent") {
				;
				__p += '\n					';
				print(t.self.tipNumbFormat(d.y1Percent - d.y0Percent));
				__p += '				\n				';
			} else {
				;
				__p += '\n					';
				print(t.self.tipNumbFormat(d[t.self.dataType]));
				__p += '				\n				';
			};
			__p += '\n			</div>\n	\n		</div>\n';
		});
		__p += '	\n';
		if (t.self.timelineData) {
			var timelineData = t.self.timelineDataGrouped[t.self.timelineDate(t.data[0].date)];
			print(t.self.timelineTemplate({ data: timelineData, self: t.self }));
		};
		__p += '	';
		return __p;
	};
})();
(function () {
	window["Reuters"] = window["Reuters"] || {};
	window["Reuters"]["Graphics"] = window["Reuters"]["Graphics"] || {};
	window["Reuters"]["Graphics"]["basicCharter"] = window["Reuters"]["Graphics"]["basicCharter"] || {};
	window["Reuters"]["Graphics"]["basicCharter"]["Template"] = window["Reuters"]["Graphics"]["basicCharter"]["Template"] || {};

	window["Reuters"]["Graphics"]["basicCharter"]["Template"]["tooltipTimeline"] = function (t) {
		var __t,
		    __p = '',
		    __j = Array.prototype.join;
		function print() {
			__p += __j.call(arguments, '');
		}
		__p += '<hr>\n';
		t.data.forEach(function (d, i) {
			;
			__p += '\n	<div class="tip-Timeline-date text-uppercase">\n		';
			print(t.self.timelineDateDisplay(d.parsedDate));
			__p += '\n	</div>\n	<div class="tip-Timeline">\n		' + ((__t = d.item) == null ? '' : __t) + '\n	</div>\n\n	';
			if (i != t.data.length - 1) {
				print('<br>');
			};
			__p += '\n\n';
		});
		__p += ' ';
		return __p;
	};
})();
(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : babelHelpers.typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-drag'), require('d3-shape'), require('d3-dispatch')) : typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-drag', 'd3-shape', 'd3-dispatch'], factory) : factory(d3 = d3 || {}, d3, d3, d3, d3);
})(undefined, function (exports, d3, d3Drag, d3Shape, d3Dispatch) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : babelHelpers.typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : babelHelpers.typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var Annotation = function () {
    function Annotation(_ref) {
      var _ref$x = _ref.x,
          x = _ref$x === undefined ? 0 : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === undefined ? 0 : _ref$y,
          nx = _ref.nx,
          ny = _ref.ny,
          _ref$dy = _ref.dy,
          dy = _ref$dy === undefined ? 0 : _ref$dy,
          _ref$dx = _ref.dx,
          dx = _ref$dx === undefined ? 0 : _ref$dx,
          _ref$color = _ref.color,
          color = _ref$color === undefined ? "grey" : _ref$color,
          data = _ref.data,
          type = _ref.type,
          subject = _ref.subject,
          connector = _ref.connector,
          note = _ref.note,
          disable = _ref.disable,
          id = _ref.id,
          className = _ref.className;
      classCallCheck(this, Annotation);

      this._dx = nx !== undefined ? nx - x : dx;
      this._dy = ny !== undefined ? ny - y : dy;
      this._x = x;
      this._y = y;
      this._color = color;
      this.id = id;
      this._className = className || "";

      this.type = type || "";
      this.data = data;

      this.note = note || {};
      this.connector = connector || {};
      this.subject = subject || {};

      this.disable = disable || [];
    }

    createClass(Annotation, [{
      key: "updatePosition",
      value: function updatePosition() {
        if (this.type.setPosition) {
          this.type.setPosition();
          var nodeArray = [];
          this.type.subject.selectAll(":not(.handle)").each(function (d) {
            nodeArray.push(this);
          });
          if (nodeArray.length !== 0) {
            this.type.redrawSubject();
          }
        }
      }
    }, {
      key: "updateOffset",
      value: function updateOffset() {
        if (this.type.setOffset) {
          this.type.setOffset();

          var nodeArray = [];
          this.type.connector.selectAll(":not(.handle)").each(function (d) {
            nodeArray.push(this);
          });

          if (nodeArray.length !== 0) {
            this.type.redrawConnector();
          }

          this.type.redrawNote();
        }
      }
    }, {
      key: "className",
      get: function get$$1() {
        return this._className;
      },
      set: function set$$1(className) {
        this._className = className;
        if (this.type.setClassName) this.type.setClassName();
      }
    }, {
      key: "x",
      get: function get$$1() {
        return this._x;
      },
      set: function set$$1(x) {
        this._x = x;
        this.updatePosition();
      }
    }, {
      key: "y",
      get: function get$$1() {
        return this._y;
      },
      set: function set$$1(y) {
        this._y = y;
        this.updatePosition();
      }
    }, {
      key: "color",
      get: function get$$1() {
        return this._color;
      },
      set: function set$$1(color) {
        this._color = color;
        this.updatePosition();
      }
    }, {
      key: "dx",
      get: function get$$1() {
        return this._dx;
      },
      set: function set$$1(dx) {
        this._dx = dx;
        this.updateOffset();
      }
    }, {
      key: "dy",
      get: function get$$1() {
        return this._dy;
      },
      set: function set$$1(dy) {
        this._dy = dy;
        this.updateOffset();
      }
    }, {
      key: "nx",
      set: function set$$1(nx) {
        this._dx = nx - this._x;
        this.updateOffset();
      }
    }, {
      key: "ny",
      set: function set$$1(ny) {
        this._dy = ny - this._y;
        this.updateOffset();
      }
    }, {
      key: "offset",
      get: function get$$1() {
        return { x: this._dx, y: this._dy };
      },
      set: function set$$1(_ref2) {
        var x = _ref2.x,
            y = _ref2.y;

        this._dx = x;
        this._dy = y;
        this.updateOffset();
      }
    }, {
      key: "position",
      get: function get$$1() {
        return { x: this._x, y: this._y };
      },
      set: function set$$1(_ref3) {
        var x = _ref3.x,
            y = _ref3.y;

        this._x = x;
        this._y = y;
        this.updatePosition();
      }
    }, {
      key: "translation",
      get: function get$$1() {
        return {
          x: this._x + this._dx,
          y: this._y + this._dy
        };
      }
    }, {
      key: "json",
      get: function get$$1() {
        var json = {
          x: this._x,
          y: this._y,
          dx: this._dx,
          dy: this._dy
        };

        if (this.data && Object.keys(this.data).length > 0) json.data = this.data;
        if (this.type) json.type = this.type;
        if (this._className) json.className = this._className;

        if (Object.keys(this.connector).length > 0) json.connector = this.connector;
        if (Object.keys(this.subject).length > 0) json.subject = this.subject;
        if (Object.keys(this.note).length > 0) json.note = this.note;

        return json;
      }
    }]);
    return Annotation;
  }();

  var AnnotationCollection = function () {
    function AnnotationCollection(_ref) {
      var annotations = _ref.annotations,
          accessors = _ref.accessors,
          accessorsInverse = _ref.accessorsInverse;
      classCallCheck(this, AnnotationCollection);

      this.accessors = accessors;
      this.accessorsInverse = accessorsInverse;
      this.annotations = annotations;
    }

    createClass(AnnotationCollection, [{
      key: "clearTypes",
      value: function clearTypes(newSettings) {
        this.annotations.forEach(function (d) {
          d.type = undefined;
          d.subject = newSettings && newSettings.subject || d.subject;
          d.connector = newSettings && newSettings.connector || d.connector;
          d.note = newSettings && newSettings.note || d.note;
        });
      }
    }, {
      key: "setPositionWithAccessors",
      value: function setPositionWithAccessors() {
        var _this = this;

        this.annotations.forEach(function (d) {
          d.type.setPositionWithAccessors(_this.accessors);
        });
      }
    }, {
      key: "editMode",
      value: function editMode(_editMode) {
        this.annotations.forEach(function (a) {
          if (a.type) {
            a.type.editMode = _editMode;
            a.type.updateEditMode();
          }
        });
      }
    }, {
      key: "updateDisable",
      value: function updateDisable(disable) {
        this.annotations.forEach(function (a) {
          a.disable = disable;
          if (a.type) {
            disable.forEach(function (d) {
              if (a.type[d]) {
                a.type[d].remove && a.type[d].remove();
                a.type[d] = undefined;
              }
            });
          }
        });
      }
    }, {
      key: "updateTextWrap",
      value: function updateTextWrap(textWrap) {
        this.annotations.forEach(function (a) {
          if (a.type && a.type.updateTextWrap) {
            a.type.updateTextWrap(textWrap);
          }
        });
      }
    }, {
      key: "updateText",
      value: function updateText() {
        this.annotations.forEach(function (a) {
          if (a.type && a.type.drawText) {
            a.type.drawText();
          }
        });
      }
    }, {
      key: "updateNotePadding",
      value: function updateNotePadding(notePadding) {
        this.annotations.forEach(function (a) {
          if (a.type) {
            a.type.notePadding = notePadding;
          }
        });
      }
    }, {
      key: "json",
      get: function get$$1() {
        var _this2 = this;

        return this.annotations.map(function (a) {
          var json = a.json;
          if (_this2.accessorsInverse && a.data) {
            json.data = {};
            Object.keys(_this2.accessorsInverse).forEach(function (k) {
              json.data[k] = _this2.accessorsInverse[k]({ x: a.x, y: a.y });

              //TODO make this feasible to map back to data for other types of subjects
            });
          }
          return json;
        });
      }
    }, {
      key: "noteNodes",
      get: function get$$1() {
        return this.annotations.map(function (a) {
          return _extends({}, a.type.getNoteBBoxOffset(), { positionX: a.x, positionY: a.y });
        });
      }

      //TODO: come back and rethink if a.x and a.y are applicable in all situations
      // get connectorNodes() {
      //   return this.annotations.map(a => ({ ...a.type.getConnectorBBox(), startX: a.x, startY: a.y}))
      // }

      // get subjectNodes() {
      //   return this.annotations.map(a => ({ ...a.type.getSubjectBBox(), startX: a.x, startY: a.y}))
      // }

      // get annotationNodes() {
      //   return this.annotations.map(a => ({ ...a.type.getAnnotationBBox(), startX: a.x, startY: a.y}))
      // }

    }]);
    return AnnotationCollection;
  }();

  var pointHandle = function pointHandle(_ref) {
    var _ref$cx = _ref.cx,
        cx = _ref$cx === undefined ? 0 : _ref$cx,
        _ref$cy = _ref.cy,
        cy = _ref$cy === undefined ? 0 : _ref$cy;

    return { move: { x: cx, y: cy } };
  };

  var circleHandles = function circleHandles(_ref2) {
    var _ref2$cx = _ref2.cx,
        cx = _ref2$cx === undefined ? 0 : _ref2$cx,
        _ref2$cy = _ref2.cy,
        cy = _ref2$cy === undefined ? 0 : _ref2$cy,
        r1 = _ref2.r1,
        r2 = _ref2.r2,
        padding = _ref2.padding;

    var h = { move: { x: cx, y: cy } };

    if (r1 !== undefined) {
      h.r1 = { x: cx + r1 / Math.sqrt(2), y: cy + r1 / Math.sqrt(2) };
    }

    if (r2 !== undefined) {
      h.r2 = { x: cx + r2 / Math.sqrt(2), y: cy + r2 / Math.sqrt(2) };
    }

    if (padding !== undefined) {
      h.padding = { x: cx + r1 + padding, y: cy };
    }

    return h;
  };

  //arc handles
  var addHandles = function addHandles(_ref5) {
    var group = _ref5.group,
        handles = _ref5.handles,
        _ref5$r = _ref5.r,
        r = _ref5$r === undefined ? 10 : _ref5$r;

    //give it a group and x,y to draw handles
    //then give it instructions on what the handles change
    var h = group.selectAll("circle.handle").data(handles);

    h.enter().append("circle").attr("class", "handle").attr("fill", "grey").attr("fill-opacity", 0.1).attr("cursor", "move").attr("stroke-dasharray", 5).attr("stroke", "grey").call(d3.behavior.drag().on("dragstart", function (d) {
      return d.start && d.start(d);
    }).on("drag", function (d) {
      return d.drag && d.drag(d);
    }).on("dragend", function (d) {
      return d.end && d.end(d);
    }));

    group.selectAll("circle.handle").attr("cx", function (d) {
      return d.x;
    }).attr("cy", function (d) {
      return d.y;
    }).attr("r", function (d) {
      return d.r || r;
    }).attr("class", function (d) {
      return "handle " + (d.className || "");
    });

    h.exit().remove();
  };

  var leftRightDynamic = function leftRightDynamic(align, y) {
    if (align === "dynamic" || align === "left" || align === "right") {
      if (y < 0) {
        align = "top";
      } else {
        align = "bottom";
      }
    }
    return align;
  };

  var topBottomDynamic = function topBottomDynamic(align, x) {
    if (align === "dynamic" || align === "top" || align === "bottom") {
      if (x < 0) {
        align = "right";
      } else {
        align = "left";
      }
    }
    return align;
  };

  var orientationTopBottom = ["topBottom", "top", "bottom"];
  var orientationLeftRight = ["leftRight", "left", "right"];

  var noteAlignment = function noteAlignment(_ref) {
    var _ref$padding = _ref.padding,
        padding = _ref$padding === undefined ? 0 : _ref$padding,
        _ref$bbox = _ref.bbox,
        bbox = _ref$bbox === undefined ? { x: 0, y: 0, width: 0, height: 0 } : _ref$bbox,
        align = _ref.align,
        orientation = _ref.orientation,
        _ref$offset = _ref.offset,
        offset = _ref$offset === undefined ? { x: 0, y: 0 } : _ref$offset;

    var x = -bbox.x;
    var y = 0; //-bbox.y
    if (orientationTopBottom.indexOf(orientation) !== -1) {
      align = topBottomDynamic(align, offset.x);
      if (offset.y < 0 && orientation === "topBottom" || orientation === "top") {
        y -= bbox.height + padding;
      } else {
        y += padding;
      }

      if (align === "middle") {
        x -= bbox.width / 2;
      } else if (align === "right") {
        x -= bbox.width;
      }
    } else if (orientationLeftRight.indexOf(orientation) !== -1) {
      align = leftRightDynamic(align, offset.y);
      if (offset.x < 0 && orientation === "leftRight" || orientation === "left") {
        x -= bbox.width + padding;
      } else {
        x += padding;
      }

      if (align === "middle") {
        y -= bbox.height / 2;
      } else if (align === "top") {
        y -= bbox.height;
      }
    }

    return { x: x, y: y };
  };

  var lineBuilder = function lineBuilder(_ref) {
    var data = _ref.data,
        _ref$curve = _ref.curve,
        curve = _ref$curve === undefined ? "linear" : _ref$curve,
        canvasContext = _ref.canvasContext,
        className = _ref.className,
        classID = _ref.classID;

    var lineGen = d3.svg.line().interpolate(curve);

    var builder = {
      type: 'path',
      className: className,
      classID: classID,
      data: data
    };

    if (canvasContext) {
      lineGen.context(canvasContext);
      builder.pathMethods = lineGen;
    } else {
      builder.attrs = {
        d: lineGen(data)
      };
    }

    return builder;
  };

  var arcBuilder = function arcBuilder(_ref2) {
    var data = _ref2.data,
        canvasContext = _ref2.canvasContext,
        className = _ref2.className,
        classID = _ref2.classID;

    var builder = {
      type: 'path',
      className: className,
      classID: classID,
      data: data
    };

    var arcShape = d3.svg.arc().innerRadius(data.innerRadius || 0).outerRadius(data.outerRadius || data.radius || 2).startAngle(data.startAngle || 0).endAngle(data.endAngle || 2 * Math.PI);

    if (canvasContext) {
      arcShape.context(canvasContext);
      builder.pathMethods = lineGen;
    } else {

      builder.attrs = {
        d: arcShape()
      };
    }

    return builder;
  };

  var noteVertical = function noteVertical(_ref) {
    var align = _ref.align,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        bbox = _ref.bbox,
        offset = _ref.offset;

    align = leftRightDynamic(align, offset.y);

    if (align === "top") {
      y -= bbox.height;
    } else if (align === "middle") {
      y -= bbox.height / 2;
    }

    var data = [[x, y], [x, y + bbox.height]];
    return { components: [lineBuilder({ data: data, className: "note-line" })] };
  };

  var noteHorizontal = function noteHorizontal(_ref) {
    var align = _ref.align,
        _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        offset = _ref.offset,
        bbox = _ref.bbox;

    align = topBottomDynamic(align, offset.x);

    if (align === "right") {
      x -= bbox.width;
    } else if (align === "middle") {
      x -= bbox.width / 2;
    }

    var data = [[x, y], [x + bbox.width, y]];
    return { components: [lineBuilder({ data: data, className: "note-line" })] };
  };

  var lineSetup = function lineSetup(_ref) {
    var type = _ref.type,
        subjectType = _ref.subjectType;

    var annotation = type.annotation;
    var offset = annotation.position;

    var x1 = annotation.x - offset.x,
        x2 = x1 + annotation.dx,
        y1 = annotation.y - offset.y,
        y2 = y1 + annotation.dy;

    var subjectData = annotation.subject;

    if (subjectType === "circle" && (subjectData.outerRadius || subjectData.radius)) {
      var h = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      var angle = Math.asin(-y2 / h);
      var r = subjectData.outerRadius || subjectData.radius + (subjectData.radiusPadding || 0);

      x1 = Math.abs(Math.cos(angle) * r) * (x2 < 0 ? -1 : 1);
      y1 = Math.abs(Math.sin(angle) * r) * (y2 < 0 ? -1 : 1);
    }

    if (subjectType === "rect") {
      var width = subjectData.width,
          height = subjectData.height;

      if (width > 0 && annotation.dx > 0 || width < 0 && annotation.dx < 0) {
        if (Math.abs(width) > Math.abs(annotation.dx)) x1 = width / 2;else x1 = width;
      }
      if (height > 0 && annotation.dy > 0 || height < 0 && annotation.dy < 0) {
        if (Math.abs(height) > Math.abs(annotation.dy)) y1 = height / 2;else y1 = height;
      }
      if (x1 === width / 2 && y1 === height / 2) {
        x1 = x2;y1 = y2;
      }
    }

    return [[x1, y1], [x2, y2]];
  };

  var connectorLine = function connectorLine(connectorData) {
    var data = lineSetup(connectorData);
    return { components: [lineBuilder({ data: data, className: "connector" })] };
  };

  var connectorElbow = function connectorElbow(_ref) {
    var type = _ref.type,
        subjectType = _ref.subjectType;

    var annotation = type.annotation;
    var offset = annotation.position;

    var x1 = annotation.x - offset.x,
        x2 = x1 + annotation.dx,
        y1 = annotation.y - offset.y,
        y2 = y1 + annotation.dy;

    var subjectData = annotation.subject;

    if (subjectType === "rect") {
      var width = subjectData.width,
          height = subjectData.height;

      if (width > 0 && annotation.dx > 0 || width < 0 && annotation.dx < 0) {
        if (Math.abs(width) > Math.abs(annotation.dx)) x1 = width / 2;else x1 = width;
      }
      if (height > 0 && annotation.dy > 0 || height < 0 && annotation.dy < 0) {
        if (Math.abs(height) > Math.abs(annotation.dy)) y1 = height / 2;else y1 = height;
      }
      if (x1 === width / 2 && y1 === height / 2) {
        x1 = x2;y1 = y2;
      }
    }

    var data = [[x1, y1], [x2, y2]];

    var diffY = y2 - y1;
    var diffX = x2 - x1;
    var xe = x2;
    var ye = y2;
    var opposite = y2 < y1 && x2 > x1 || x2 < x1 && y2 > y1 ? -1 : 1;

    if (Math.abs(diffX) < Math.abs(diffY)) {
      xe = x2;
      ye = y1 + diffX * opposite;
    } else {
      ye = y2;
      xe = x1 + diffY * opposite;
    }

    if (subjectType === "circle" && (subjectData.outerRadius || subjectData.radius)) {
      var r = (subjectData.outerRadius || subjectData.radius) + (subjectData.radiusPadding || 0);
      var length = r / Math.sqrt(2);

      if (Math.abs(diffX) > length && Math.abs(diffY) > length) {
        x1 = length * (x2 < 0 ? -1 : 1);
        y1 = length * (y2 < 0 ? -1 : 1);
        data = [[x1, y1], [xe, ye], [x2, y2]];
      } else if (Math.abs(diffX) > Math.abs(diffY)) {
        var angle = Math.asin(-y2 / r);
        x1 = Math.abs(Math.cos(angle) * r) * (x2 < 0 ? -1 : 1);
        data = [[x1, y2], [x2, y2]];
      } else {
        var _angle = Math.acos(x2 / r);
        y1 = Math.abs(Math.sin(_angle) * r) * (y2 < 0 ? -1 : 1);
        data = [[x2, y1], [x2, y2]];
      }
    } else {
      data = [[x1, y1], [xe, ye], [x2, y2]];
    }

    return { components: [lineBuilder({ data: data, className: "connector" })] };
  };

  var connectorCurve = function connectorCurve(_ref) {
    var type = _ref.type,
        connectorData = _ref.connectorData,
        subjectType = _ref.subjectType;

    if (!connectorData) {
      connectorData = {};
    }
    if (!connectorData.points || typeof connectorData.points === "number") {
      connectorData.points = createPoints(type.annotation.offset, connectorData.points);
    }
    if (!connectorData.curve) {
      connectorData.curve = "basis";
    }

    var handles = [];

    if (type.editMode) {
      var cHandles = connectorData.points.map(function (c, i) {
        return _extends({}, pointHandle({ cx: c[0], cy: c[1] }), { index: i });
      });

      var updatePoint = function updatePoint(index) {
        connectorData.points[index][0] += d3.event.dx;
        connectorData.points[index][1] += d3.event.dy;
        type.redrawConnector();
      };

      handles = type.mapHandles(cHandles.map(function (h) {
        return _extends({}, h.move, { drag: updatePoint.bind(type, h.index) });
      }));
    }

    var data = lineSetup({ type: type, subjectType: subjectType });
    data = [data[0]].concat(toConsumableArray(connectorData.points), [data[1]]);
    var components = [lineBuilder({ data: data, curve: connectorData.curve, className: "connector" })];

    return { components: components, handles: handles };
  };

  var createPoints = function createPoints(offset) {
    var anchors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var diff = { x: offset.x / (anchors + 1), y: offset.y / (anchors + 1) };
    var p = [];

    var i = 1;
    for (; i <= anchors; i++) {
      p.push([diff.x * i + i % 2 * 20, diff.y * i - i % 2 * 20]);
    }
    return p;
  };

  var connectorArrow = function connectorArrow(_ref) {
    var annotation = _ref.annotation,
        start = _ref.start,
        end = _ref.end;

    var offset = annotation.position;
    if (!start) {
      start = [annotation.dx, annotation.dy];
    } else {
      start = [-end[0] + start[0], -end[1] + start[1]];
    }
    if (!end) {
      end = [annotation.x - offset.x, annotation.y - offset.y];
    }

    var x1 = end[0],
        y1 = end[1];

    var dx = start[0];
    var dy = start[1];

    var size = 10;
    var angleOffset = 16 / 180 * Math.PI;
    var angle = Math.atan(dy / dx);

    if (dx < 0) {
      angle += Math.PI;
    }

    var data = [[x1, y1], [Math.cos(angle + angleOffset) * size + x1, Math.sin(angle + angleOffset) * size + y1], [Math.cos(angle - angleOffset) * size + x1, Math.sin(angle - angleOffset) * size + y1], [x1, y1]];

    //TODO add in reverse
    // if (canvasContext.arrowReverse){
    //   data = [[x1, y1], 
    //   [Math.cos(angle + angleOffset)*size, Math.sin(angle + angleOffset)*size],
    //   [Math.cos(angle - angleOffset)*size, Math.sin(angle - angleOffset)*size],
    //   [x1, y1]
    //   ]
    // } else {
    //   data = [[x1, y1], 
    //   [Math.cos(angle + angleOffset)*size, Math.sin(angle + angleOffset)*size],
    //   [Math.cos(angle - angleOffset)*size, Math.sin(angle - angleOffset)*size],
    //   [x1, y1]
    //   ]
    // }

    return { components: [lineBuilder({ data: data, className: 'connector-end connector-arrow', classID: 'connector-end' })] };
  };

  var connectorDot = function connectorDot(_ref) {
    var line$$1 = _ref.line;

    var dot = arcBuilder({ className: 'connector-end connector-dot', classID: 'connector-end', data: { radius: 3 } });
    dot.attrs.transform = 'translate(' + line$$1.data[0][0] + ', ' + line$$1.data[0][1] + ')';

    return { components: [dot] };
  };

  var subjectCircle = function subjectCircle(_ref) {
    var subjectData = _ref.subjectData,
        type = _ref.type;

    if (!subjectData.radius && !subjectData.outerRadius) {
      subjectData.radius = 20;
    }

    var handles = [];
    var c = arcBuilder({ data: subjectData, className: "subject" });
    if (type.editMode) {
      var h = circleHandles({
        r1: c.data.outerRadius || c.data.radius,
        r2: c.data.innerRadius,
        padding: subjectData.radiusPadding
      });

      var updateRadius = function updateRadius(attr) {
        var r = subjectData[attr] + d3.event.dx * Math.sqrt(2);
        subjectData[attr] = r;
        type.redrawSubject();
        type.redrawConnector();
      };

      var cHandles = [_extends({}, h.r1, {
        drag: updateRadius.bind(type, subjectData.outerRadius !== undefined ? "outerRadius" : "radius")
      })];

      if (subjectData.innerRadius) {
        cHandles.push(_extends({}, h.r2, { drag: updateRadius.bind(type, "innerRadius") }));
      }
      handles = type.mapHandles(cHandles);
    }

    c.attrs["fill-opacity"] = 0;

    return { components: [c], handles: handles };
  };

  var subjectRect = function subjectRect(_ref) {
    var subjectData = _ref.subjectData,
        type = _ref.type;

    if (!subjectData.width) {
      subjectData.width = 100;
    }
    if (!subjectData.height) {
      subjectData.height = 100;
    }

    var handles = [];
    var width = subjectData.width,
        height = subjectData.height;

    var data = [[0, 0], [width, 0], [width, height], [0, height], [0, 0]];
    var rect = lineBuilder({ data: data, className: "subject" });

    if (type.editMode) {
      var updateWidth = function updateWidth() {
        subjectData.width = d3.event.x;
        type.redrawSubject();
        type.redrawConnector();
      };

      var updateHeight = function updateHeight() {
        subjectData.height = d3.event.y;
        type.redrawSubject();
        type.redrawConnector();
      };

      var rHandles = [{ x: width, y: height / 2, drag: updateWidth.bind(type) }, { x: width / 2, y: height, drag: updateHeight.bind(type) }];

      handles = type.mapHandles(rHandles);
    }
    rect.attrs["fill-opacity"] = 0.1;
    return { components: [rect], handles: handles };
  };

  var subjectThreshold = function subjectThreshold(_ref) {
    var subjectData = _ref.subjectData,
        type = _ref.type;

    var offset = type.annotation.position;

    var x1 = (subjectData.x1 !== undefined ? subjectData.x1 : offset.x) - offset.x,
        x2 = (subjectData.x2 !== undefined ? subjectData.x2 : offset.x) - offset.x,
        y1 = (subjectData.y1 !== undefined ? subjectData.y1 : offset.y) - offset.y,
        y2 = (subjectData.y2 !== undefined ? subjectData.y2 : offset.y) - offset.y;

    var data = [[x1, y1], [x2, y2]];
    return { components: [lineBuilder({ data: data, className: 'subject' })] };
  };

  var subjectBadge = function subjectBadge(_ref) {
    var _ref$subjectData = _ref.subjectData,
        subjectData = _ref$subjectData === undefined ? {} : _ref$subjectData,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? {} : _ref$type;
    var annotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var typeSettings = type.typeSettings && type.typeSettings.subject;

    if (!subjectData.radius) {
      if (typeSettings && typeSettings.radius) {
        subjectData.radius = typeSettings.radius;
      } else {
        subjectData.radius = 14;
      }
    }
    if (!subjectData.x) {
      if (typeSettings && typeSettings.x) {
        subjectData.x = typeSettings.x;
      }
    }
    if (!subjectData.y) {
      if (typeSettings && typeSettings.y) {
        subjectData.y = typeSettings.y;
      }
    }

    var handles = [];
    var components = [];
    var radius = subjectData.radius;
    var innerRadius = radius * 0.7;
    var x = 0;
    var y = 0;

    var notCornerOffset = Math.sqrt(2) * radius;
    var placement = {
      xleftcorner: -radius,
      xrightcorner: radius,
      ytopcorner: -radius,
      ybottomcorner: radius,
      xleft: -notCornerOffset,
      xright: notCornerOffset,
      ytop: -notCornerOffset,
      ybottom: notCornerOffset
    };

    if (subjectData.x && !subjectData.y) {
      x = placement["x" + subjectData.x];
    } else if (subjectData.y && !subjectData.x) {
      y = placement["y" + subjectData.y];
    } else if (subjectData.x && subjectData.y) {
      x = placement["x" + subjectData.x + "corner"];
      y = placement["y" + subjectData.y + "corner"];
    }

    var transform = "translate(" + x + ", " + y + ")";
    var circlebg = arcBuilder({ className: "subject", data: { radius: radius } });
    circlebg.attrs.transform = transform;
    circlebg.attrs.fill = annotation.color;
    circlebg.attrs["stroke-linecap"] = "round";
    circlebg.attrs["stroke-width"] = "3px";

    var circle = arcBuilder({
      className: "subject-ring",
      data: { outerRadius: radius, innerRadius: innerRadius }
    });

    circle.attrs.transform = transform;
    // circle.attrs.fill = annotation.color
    circle.attrs["stroke-width"] = "3px";
    circle.attrs.fill = "white";

    var pointer = void 0;
    if (x && y || !x && !y) {
      pointer = lineBuilder({
        className: "subject-pointer",
        data: [[0, 0], [x || 0, 0], [0, y || 0], [0, 0]]
      });
    } else if (x || y) {
      var notCornerPointerXY = function notCornerPointerXY(v) {
        var sign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        return v && v / Math.sqrt(2) / Math.sqrt(2) || sign * radius / Math.sqrt(2);
      };

      pointer = lineBuilder({
        className: "subject-pointer",
        data: [[0, 0], [notCornerPointerXY(x), notCornerPointerXY(y)], [notCornerPointerXY(x, -1), notCornerPointerXY(y, -1)], [0, 0]]
      });
    }

    if (pointer) {
      pointer.attrs.fill = annotation.color;
      pointer.attrs["stroke-linecap"] = "round";
      pointer.attrs["stroke-width"] = "3px";
      components.push(pointer);
    }

    if (type.editMode) {
      var dragBadge = function dragBadge() {
        subjectData.x = d3.event.x < -radius * 2 ? "left" : d3.event.x > radius * 2 ? "right" : undefined;
        subjectData.y = d3.event.y < -radius * 2 ? "top" : d3.event.y > radius * 2 ? "bottom" : undefined;

        type.redrawSubject();
      };

      var bHandles = { x: x * 2, y: y * 2, drag: dragBadge.bind(type) };
      if (!bHandles.x && !bHandles.y) {
        bHandles.y = -radius;
      }

      handles = type.mapHandles([bHandles]);
    }

    var text = void 0;
    if (subjectData.text) {
      text = {
        type: "text",
        className: "badge-text",
        attrs: {
          fill: "white",
          stroke: "none",
          "font-size": ".7em",
          text: subjectData.text,
          "text-anchor": "middle",
          dy: ".25em",
          x: x,
          y: y
        }
      };
    }

    components.push(circlebg);
    components.push(circle);
    components.push(text);

    return { components: components, handles: handles };
  };

  //Note options
  //Connector options
  //Subject options
  var Type = function () {
    function Type(_ref) {
      var a = _ref.a,
          annotation = _ref.annotation,
          editMode = _ref.editMode,
          dispatcher = _ref.dispatcher,
          notePadding = _ref.notePadding,
          accessors = _ref.accessors,
          accessorsInverse = _ref.accessorsInverse;
      classCallCheck(this, Type);

      this.a = a;

      this.note = annotation.disable.indexOf("note") === -1 && a.select("g.annotation-note");
      this.noteContent = this.note && a.select("g.annotation-note-content");
      this.connector = annotation.disable.indexOf("connector") === -1 && a.select("g.annotation-connector");
      this.subject = annotation.disable.indexOf("subject") === -1 && a.select("g.annotation-subject");
      this.dispatcher = dispatcher;
      if (dispatcher) {
        var handler = addHandlers.bind(null, dispatcher, annotation);
        handler({ component: this.note, name: "note" });
        handler({ component: this.connector, name: "connector" });
        handler({ component: this.subject, name: "subject" });
      }

      this.annotation = annotation;
      this.editMode = annotation.editMode || editMode;
      this.notePadding = notePadding !== undefined ? notePadding : 3;
      this.offsetCornerX = 0;
      this.offsetCornerY = 0;
      this.accessorsInverse = accessorsInverse;
      if (accessors && annotation.data) {
        this.init(accessors);
      }
    }

    createClass(Type, [{
      key: "init",
      value: function init(accessors) {
        if (!this.annotation.x) {
          this.mapX(accessors);
        }
        if (!this.annotation.y) {
          this.mapY(accessors);
        }
      }
    }, {
      key: "mapY",
      value: function mapY(accessors) {
        if (accessors.y) {
          this.annotation.y = accessors.y(this.annotation.data);
        }
      }
    }, {
      key: "mapX",
      value: function mapX(accessors) {
        if (accessors.x) {
          this.annotation.x = accessors.x(this.annotation.data);
        }
      }
    }, {
      key: "updateEditMode",
      value: function updateEditMode() {
        this.a.selectAll("circle.handle").remove();
      }
    }, {
      key: "drawOnSVG",
      value: function drawOnSVG(component, builders) {
        var _this = this;

        if (!Array.isArray(builders)) {
          builders = [builders];
        }

        builders.filter(function (b) {
          return b;
        }).forEach(function (_ref2) {
          var type = _ref2.type,
              className = _ref2.className,
              attrs = _ref2.attrs,
              handles = _ref2.handles,
              classID = _ref2.classID;

          if (type === "handle") {
            addHandles({ group: component, r: attrs && attrs.r, handles: handles });
          } else {
            newWithClass(component, [_this.annotation], type, className, classID);
            var el = component.select(type + "." + (classID || className));
            var addAttrs = Object.keys(attrs);
            var removeAttrs = [];

            var currentAttrs = el.node().attributes;
            for (var i = currentAttrs.length - 1; i >= 0; i--) {
              var name = currentAttrs[i].name;
              if (addAttrs.indexOf(name) === -1 && name !== "class") removeAttrs.push(name);
            }
            //matt here is all the attrs
            addAttrs.forEach(function (attr) {
              if (attr === "text") {
                el.text(attrs[attr]);
              } else {
                el.attr(attr, attrs[attr]);
              }
            });

            removeAttrs.forEach(function (attr) {
              return el.attr(attr, null);
            });
          }
        });
      }

      //TODO: how to extend this to a drawOnCanvas mode?

    }, {
      key: "getNoteBBox",
      value: function getNoteBBox() {
        return bboxWithoutHandles(this.note, ".annotation-note-content text");
      }
    }, {
      key: "getNoteBBoxOffset",
      value: function getNoteBBoxOffset() {
        var bbox = bboxWithoutHandles(this.note, ".annotation-note-content");
        var transform = this.noteContent.attr("transform").split(/\(|\,|\)/g);
        bbox.offsetCornerX = parseFloat(transform[1]) + this.annotation.dx;
        bbox.offsetCornerY = parseFloat(transform[2]) + this.annotation.dy;
        bbox.offsetX = this.annotation.dx;
        bbox.offsetY = this.annotation.dy;
        return bbox;
      }
    }, {
      key: "drawSubject",
      value: function drawSubject() {
        var _this2 = this;

        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var subjectData = this.annotation.subject;
        var type = context.type;
        var subjectParams = { type: this, subjectData: subjectData };

        var subject = {};
        if (type === "circle") subject = subjectCircle(subjectParams);else if (type === "rect") subject = subjectRect(subjectParams);else if (type === "threshold") subject = subjectThreshold(subjectParams);else if (type === "badge") subject = subjectBadge(subjectParams, this.annotation);

        var _subject = subject,
            _subject$components = _subject.components,
            components = _subject$components === undefined ? [] : _subject$components,
            _subject$handles = _subject.handles,
            handles = _subject$handles === undefined ? [] : _subject$handles;

        components.forEach(function (c) {
          if (c && c.attrs && !c.attrs.stroke) {
            c.attrs.stroke = _this2.annotation.color;
          }
        });

        if (this.editMode) {
          handles = handles.concat(this.mapHandles([{ drag: this.dragSubject.bind(this) }]));
          components.push({ type: "handle", handles: handles });
        }

        return components;
      }
    }, {
      key: "drawConnector",
      value: function drawConnector() {
        var _this3 = this;

        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var connectorData = this.annotation.connector;
        var type = connectorData.type || context.type;
        var connectorParams = { type: this, connectorData: connectorData };
        connectorParams.subjectType = this.typeSettings && this.typeSettings.subject && this.typeSettings.subject.type;

        var connector = {};
        if (type === "curve") connector = connectorCurve(connectorParams);else if (type === "elbow") connector = connectorElbow(connectorParams);else connector = connectorLine(connectorParams);
        var _connector = connector,
            _connector$components = _connector.components,
            components = _connector$components === undefined ? [] : _connector$components,
            _connector$handles = _connector.handles,
            handles = _connector$handles === undefined ? [] : _connector$handles;

        var line$$1 = components[0];
        //TODO: genericize this into fill t/f stroke t/f
        if (line$$1) {
          line$$1.attrs.stroke = this.annotation.color;
          line$$1.attrs.fill = "none";
        }
        var endType = connectorData.end || context.end;
        var end = {};
        if (endType === "arrow") {
          var s = line$$1.data[1];
          var e = line$$1.data[0];
          var distance = Math.sqrt(Math.pow(s[0] - e[0], 2) + Math.pow(s[1] - e[1], 2));
          if (distance < 5 && line$$1.data[2]) {
            s = line$$1.data[2];
          }
          end = connectorArrow({ annotation: this.annotation, start: s, end: e });
        } else if (endType === "dot") {
          end = connectorDot({ line: line$$1 });
        }

        if (end.components) {
          end.components.forEach(function (c) {
            c.attrs.fill = _this3.annotation.color;
            c.attrs.stroke = _this3.annotation.color;
          });
          components = components.concat(end.components);
        }

        if (this.editMode) {
          if (handles.length !== 0) components.push({ type: "handle", handles: handles });
        }
        return components;
      }
    }, {
      key: "drawNote",
      value: function drawNote() {
        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var noteData = this.annotation.note;
        var align = noteData.align || context.align || "dynamic";
        var noteParams = {
          bbox: context.bbox,
          align: align,
          offset: this.annotation.offset
        };
        var lineType = noteData.lineType || context.lineType;
        var note = {};
        if (lineType === "vertical") note = noteVertical(noteParams);else if (lineType === "horizontal") note = noteHorizontal(noteParams);

        var _note = note,
            _note$components = _note.components,
            components = _note$components === undefined ? [] : _note$components,
            _note$handles = _note.handles,
            handles = _note$handles === undefined ? [] : _note$handles;

        if (this.editMode) {
          handles = this.mapHandles([{ x: 0, y: 0, drag: this.dragNote.bind(this) }]);
          components.push({ type: "handle", handles: handles });
        }
        return components;
      }
    }, {
      key: "drawNoteContent",
      value: function drawNoteContent(context) {
        var noteData = this.annotation.note;
        var padding = noteData.padding !== undefined ? noteData.padding : this.notePadding;
        var orientation = noteData.orientation || context.orientation || "topBottom";
        var lineType = noteData.lineType || context.lineType;
        var align = noteData.align || context.align || "dynamic";

        if (lineType === "vertical") orientation = "leftRight";else if (lineType === "horizontal") orientation = "topBottom";

        var noteParams = {
          padding: padding,
          bbox: context.bbox,
          offset: this.annotation.offset,
          orientation: orientation,
          align: align
        };

        var _noteAlignment = noteAlignment(noteParams),
            x = _noteAlignment.x,
            y = _noteAlignment.y;

        this.offsetCornerX = x + this.annotation.dx;
        this.offsetCornerY = y + this.annotation.dy;
        this.note && this.noteContent.transition().duration(1000).attr("transform", "translate(" + x + ", " + y + ")");

        return [];
      }
    }, {
      key: "drawOnScreen",
      value: function drawOnScreen(component, drawFunction) {
        return this.drawOnSVG(component, drawFunction);
      }
    }, {
      key: "redrawSubject",
      value: function redrawSubject() {
        this.subject && this.drawOnScreen(this.subject, this.drawSubject());
      }
    }, {
      key: "redrawConnector",
      value: function redrawConnector() {
        this.connector && this.drawOnScreen(this.connector, this.drawConnector());
      }
    }, {
      key: "redrawNote",
      value: function redrawNote() {
        var bbox = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getNoteBBox();

        this.noteContent && this.drawOnScreen(this.noteContent, this.drawNoteContent({ bbox: bbox }));
        this.note && this.drawOnScreen(this.note, this.drawNote({ bbox: bbox }));
      }
    }, {
      key: "setPosition",
      value: function setPosition() {
        var position = this.annotation.position;
        this.a.transition().duration(1000).attr("transform", "translate(" + position.x + ", " + position.y + ")");
      }
    }, {
      key: "setOffset",
      value: function setOffset() {
        if (this.note) {
          var offset = this.annotation.offset;
          this.note.transition().duration(1000).attr("transform", "translate(" + offset.x + ", " + offset.y + ")");
        }
      }
    }, {
      key: "setPositionWithAccessors",
      value: function setPositionWithAccessors(accessors) {
        if (accessors && this.annotation.data) {
          this.mapX(accessors);
          this.mapY(accessors);
        }
        this.setPosition();
      }
    }, {
      key: "setClassName",
      value: function setClassName() {
        this.a.attr("class", "annotation " + (this.className && this.className()) + " " + (this.editMode ? "editable" : "") + " " + (this.annotation.className || ""));
      }
    }, {
      key: "draw",
      value: function draw() {
        this.setClassName();
        this.setPosition();
        this.setOffset();
        this.redrawSubject();
        this.redrawConnector();
        this.redrawNote();
      }
    }, {
      key: "dragstarted",
      value: function dragstarted() {
        d3.event.sourceEvent.stopPropagation();
        this.dispatcher && this.dispatcher.dragstart(this.a, this.annotation);
        this.a.classed("dragging", true);
        this.a.selectAll("circle.handle").style("pointer-events", "none");
      }
    }, {
      key: "dragended",
      value: function dragended() {
        var formatnumb = d3.format(".2f");
        var dx = formatnumb(this.annotation["_dx"]);
        var dy = formatnumb(this.annotation["_dy"]);
        var xyObj = {
          x: this.annotation["_x"],
          y: this.annotation["_y"]
        };
        var x = this.accessorsInverse.date(xyObj);
        var y = formatnumb(this.accessorsInverse.yvalue(xyObj));

        if (this.annotation.connector) {
          if (this.annotation.connector.points) {
            console.log("connector points (this is an array of arrays, with two points each. [[x,y],[x,y]]): " + this.annotation.connector.points);
          }
        }

        if (this.annotation.subject) {
          if (this.annotation.subject.radius) {
            console.log("radius: " + this.annotation.subject.radius);
          }
          if (this.annotation.subject.width) {
            console.log("width: " + this.annotation.subject.width);
          }
          if (this.annotation.subject.height) {
            console.log("height: " + this.annotation.subject.height);
          }
        }

        console.log("values", "dx: " + dx, " dy: " + dy, " x: " + x, " y: " + y, " rawx: " + this.annotation["_x"], " rawy: " + this.annotation["_y"]);

        this.dispatcher && this.dispatcher.dragend(this.a, this.annotation);
        this.a.classed("dragging", false);
        this.a.selectAll("circle.handle").style("pointer-events", "all");
      }
    }, {
      key: "dragSubject",
      value: function dragSubject() {
        var position = this.annotation.position;
        position.x += d3.event.dx;
        position.y += d3.event.dy;
        this.annotation.position = position;
      }
    }, {
      key: "dragNote",
      value: function dragNote() {
        var offset = this.annotation.offset;
        offset.x += d3.event.dx;
        offset.y += d3.event.dy;
        this.annotation.offset = offset;
      }
    }, {
      key: "mapHandles",
      value: function mapHandles(handles) {
        var _this4 = this;

        return handles.map(function (h) {
          return _extends({}, h, {
            start: _this4.dragstarted.bind(_this4),
            end: _this4.dragended.bind(_this4)
          });
        });
      }
    }]);
    return Type;
  }();

  var customType = function customType(initialType, typeSettings, _init) {
    return function (_initialType) {
      inherits(customType, _initialType);

      function customType(settings) {
        classCallCheck(this, customType);

        var _this5 = possibleConstructorReturn(this, (customType.__proto__ || Object.getPrototypeOf(customType)).call(this, settings));

        _this5.typeSettings = typeSettings;

        if (typeSettings.disable) {
          typeSettings.disable.forEach(function (d) {
            _this5[d] = undefined;
            if (d === "note") {
              _this5.noteContent = undefined;
            }
          });
        }
        return _this5;
      }

      createClass(customType, [{
        key: "className",
        value: function className() {
          return "" + (typeSettings.className || get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "className", this) && get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "className", this).call(this) || "");
        }
      }, {
        key: "drawSubject",
        value: function drawSubject(context) {
          this.typeSettings.subject = _extends({}, typeSettings.subject, this.typeSettings.subject);
          return get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "drawSubject", this).call(this, _extends({}, context, this.typeSettings.subject));
        }
      }, {
        key: "drawConnector",
        value: function drawConnector(context) {
          this.typeSettings.connector = _extends({}, typeSettings.connector, this.typeSettings.connector);
          return get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "drawConnector", this).call(this, _extends({}, context, typeSettings.connector, this.typeSettings.connector));
        }
      }, {
        key: "drawNote",
        value: function drawNote(context) {
          this.typeSettings.note = _extends({}, typeSettings.note, this.typeSettings.note);
          return get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "drawNote", this).call(this, _extends({}, context, typeSettings.note, this.typeSettings.note));
        }
      }, {
        key: "drawNoteContent",
        value: function drawNoteContent(context) {
          return get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "drawNoteContent", this).call(this, _extends({}, context, typeSettings.note, this.typeSettings.note));
        }
      }], [{
        key: "init",
        value: function init(annotation, accessors) {
          get(customType.__proto__ || Object.getPrototypeOf(customType), "init", this).call(this, annotation, accessors);
          if (_init) {
            annotation = _init(annotation, accessors);
          }
          return annotation;
        }
      }]);
      return customType;
    }(initialType);
  };

  var d3NoteText = function (_Type) {
    inherits(d3NoteText, _Type);

    function d3NoteText(params) {
      classCallCheck(this, d3NoteText);

      var _this6 = possibleConstructorReturn(this, (d3NoteText.__proto__ || Object.getPrototypeOf(d3NoteText)).call(this, params));

      _this6.textWrap = params.textWrap || 120;
      _this6.drawText();
      return _this6;
    }

    createClass(d3NoteText, [{
      key: "updateTextWrap",
      value: function updateTextWrap(textWrap) {
        this.textWrap = textWrap;
        this.drawText();
      }

      //TODO: add update text functionality

    }, {
      key: "drawText",
      value: function drawText() {
        if (this.note) {
          newWithClass(this.note, [this.annotation], "g", "annotation-note-content");

          var noteContent = this.note.select("g.annotation-note-content");
          newWithClass(noteContent, [this.annotation], "rect", "annotation-note-bg");
          newWithClass(noteContent, [this.annotation], "text", "annotation-note-label");
          newWithClass(noteContent, [this.annotation], "text", "annotation-note-title");

          var titleBBox = { height: 0 };
          var label = this.a.select("text.annotation-note-label");
          var wrapLength = this.annotation.note && this.annotation.note.wrap || this.typeSettings && this.typeSettings.note && this.typeSettings.note.wrap || this.textWrap;

          if (this.annotation.note.title) {
            var title = this.a.select("text.annotation-note-title");
            title.text(this.annotation.note.title);
            title.attr("fill", this.annotation.color);
            title.attr("font-weight", "bold");

            var titleDy = this.annotation.note.dyOffsetTitle || this.annotation.note.dyOffset;

            title.call(wrap, wrapLength, titleDy);
            titleBBox = title.node().getBBox();
          }

          var labelDy = this.annotation.note.dyOffsetLabel || this.annotation.note.dyOffset;

          label.text(this.annotation.note.label).attr("dx", "0");
          label.call(wrap, wrapLength, labelDy);

          label.attr("y", titleBBox.height * 1.1 || 0);
          label.attr("fill", this.annotation.color);

          var bbox = this.getNoteBBox();

          this.a.select("rect.annotation-note-bg").attr("width", bbox.width).attr("height", bbox.height).attr("x", bbox.x).attr("fill", "white").attr("fill-opacity", 0);
        }
      }
    }]);
    return d3NoteText;
  }(Type);

  var d3Label = customType(d3NoteText, {
    className: "label",
    note: { align: "middle" }
  });

  var d3Callout = customType(d3NoteText, {
    className: "callout",
    note: { lineType: "horizontal" }
  });

  var d3CalloutElbow = customType(d3Callout, {
    className: "callout elbow",
    connector: { type: "elbow" }
  });

  var d3CalloutCurve = customType(d3Callout, {
    className: "callout curve",
    connector: { type: "curve" }
  });

  var d3Badge = customType(Type, {
    className: "badge",
    subject: { type: "badge" },
    disable: ["connector", "note"]
  });

  var d3CalloutCircle = customType(d3CalloutElbow, {
    className: "callout circle",
    subject: { type: "circle" }
  });

  var d3CalloutRect = customType(d3CalloutElbow, {
    className: "callout rect",
    subject: { type: "rect" }
  });

  var ThresholdMap = function (_d3Callout) {
    inherits(ThresholdMap, _d3Callout);

    function ThresholdMap() {
      classCallCheck(this, ThresholdMap);
      return possibleConstructorReturn(this, (ThresholdMap.__proto__ || Object.getPrototypeOf(ThresholdMap)).apply(this, arguments));
    }

    createClass(ThresholdMap, [{
      key: "mapY",
      value: function mapY(accessors) {
        get(ThresholdMap.prototype.__proto__ || Object.getPrototypeOf(ThresholdMap.prototype), "mapY", this).call(this, accessors);
        var a = this.annotation;
        if ((a.subject.x1 || a.subject.x2) && a.data && accessors.y) {
          a.y = accessors.y(a.data);
        }
        if ((a.subject.x1 || a.subject.x2) && !a.x) {
          a.x = a.subject.x1 || a.subject.x2;
        }
      }
    }, {
      key: "mapX",
      value: function mapX(accessors) {
        get(ThresholdMap.prototype.__proto__ || Object.getPrototypeOf(ThresholdMap.prototype), "mapX", this).call(this, accessors);
        var a = this.annotation;
        if ((a.subject.y1 || a.subject.y2) && a.data && accessors.x) {
          a.x = accessors.x(a.data);
        }
        if ((a.subject.y1 || a.subject.y2) && !a.y) {
          a.y = a.subject.y1 || a.subject.y2;
        }
      }
    }]);
    return ThresholdMap;
  }(d3Callout);

  var d3XYThreshold = customType(ThresholdMap, {
    className: "callout xythreshold",
    subject: { type: "threshold" }
  });

  var newWithClass = function newWithClass(a, d, type, className, classID) {
    var group = a.selectAll(type + "." + (classID || className)).data(d);
    //matt
    //  group.enter().append(type).merge(group).attr("class", className);
    group.enter().append(type).attr("class", className);

    group.exit().remove();
    return a;
  };

  var addHandlers = function addHandlers(dispatcher, annotation, _ref3) {
    var component = _ref3.component,
        name = _ref3.name;

    if (component) {
      component.on("mouseover.annotations", function () {
        d3.dispatch.call(name + "over", component, annotation);
      }).on("mouseout.annotations", function () {
        return d3.dispatch.call(name + "out", component, annotation);
      }).on("click.annotations", function () {
        return d3.dispatch.call(name + "click", component, annotation);
      });
    }
  };

  //Text wrapping code adapted from Mike Bostock
  var wrap = function wrap(text, width, dy) {
    var lineHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.2;

    text.each(function () {
      var text = d3.select(this),
          words = text.text().split(/[ \t\r\n]+/).reverse().filter(function (w) {
        return w !== "";
      });
      var word = void 0,
          line$$1 = [],

      //matt dy was 0.8
      tspan = text.text(null).append("tspan").attr("x", 0).attr("dy", dy + "em");

      while (word = words.pop()) {
        line$$1.push(word);
        tspan.text(line$$1.join(" "));
        if (tspan.node().getComputedTextLength() > width && line$$1.length > 1) {
          line$$1.pop();
          tspan.text(line$$1.join(" "));
          line$$1 = [word];
          tspan = text.append("tspan").attr("x", 0).attr("dy", lineHeight + "em").text(word);
        }
      }
    });
  };

  var bboxWithoutHandles = function bboxWithoutHandles(selection) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ":not(.handle)";

    if (!selection) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    //matt, an array of the nodes
    //  return selection.selectAll(selector).nodes().reduce(function (p, c) {

    var array = [];
    selection.selectAll(selector).each(function (d) {
      array.push(this);
    });
    return array.reduce(function (p, c) {
      var bbox = c.getBBox();
      p.x = Math.min(p.x, bbox.x);
      p.y = Math.min(p.y, bbox.y);
      p.width = Math.max(p.width, bbox.width);

      var yOffset = c && c.attributes && c.attributes.y;
      p.height = Math.max(p.height, (yOffset && parseFloat(yOffset.value) || 0) + bbox.height);
      return p;
    }, { x: 0, y: 0, width: 0, height: 0 });
  };

  function annotation() {
    var annotations = [],
        collection = void 0,
        context = void 0,

    //TODO: add canvas functionality
    disable = [],
        accessors = {},
        accessorsInverse = {},
        editMode = false,
        ids = void 0,
        type = d3Callout,
        textWrap = void 0,
        notePadding = void 0,
        annotationDispatcher = d3.dispatch("subjectover", "subjectout", "subjectclick", "connectorover", "connectorout", "connectorclick", "noteover", "noteout", "noteclick", "dragend", "dragstart"),
        sel = void 0;

    var annotation = function annotation(selection) {
      sel = selection;
      //TODO: check to see if this is still needed
      if (!editMode) {
        selection.selectAll("circle.handle").remove();
      }

      var translatedAnnotations = annotations.map(function (a) {
        if (!a.type) {
          a.type = type;
        }
        if (!a.disable) {
          a.disable = disable;
        }
        return new Annotation(a);
      });

      collection = collection || new AnnotationCollection({
        annotations: translatedAnnotations,
        accessors: accessors,
        accessorsInverse: accessorsInverse,
        ids: ids
      });
      //matt it goes screwy here when you are transition on update
      var annotationG = selection.selectAll("g").data([collection]);
      annotationG.enter().append("g").attr("class", "annotations");

      var group = selection.select("g.annotations");
      newWithClass(group, collection.annotations, "g", "annotation");

      var annotation = group.selectAll("g.annotation");

      annotation.each(function (d) {
        var a = d3.select(this);

        a.attr("class", "annotation");
        //matt look here
        newWithClass(a, [d], "g", "annotation-connector");
        newWithClass(a, [d], "g", "annotation-subject");
        newWithClass(a, [d], "g", "annotation-note");
        newWithClass(a.select("g.annotation-note"), [d], "g", "annotation-note-content");
        d.type = d.type.toString() === "[object Object]" ? d.type : new d.type({
          a: a,
          annotation: d,
          textWrap: textWrap,
          notePadding: notePadding,
          editMode: editMode,
          dispatcher: annotationDispatcher,
          accessors: accessors,
          accessorsInverse: accessorsInverse
        });
        d.type.draw();
        d.type.drawText && d.type.drawText();
      });
    };

    annotation.json = function () {
      /* eslint-disable no-console */
      console.log("Annotations JSON was copied to your clipboard. Please note the annotation type is not JSON compatible. It appears in the objects array in the console, but not in the copied JSON.", collection.json);
      /* eslint-enable no-console */
      window.copy(JSON.stringify(collection.json.map(function (a) {
        delete a.type;
        return a;
      })));
      return annotation;
    };

    annotation.update = function () {
      if (annotations && collection) {
        annotations = collection.annotations.map(function (a) {
          a.type.draw();
          return a;
        });
      }
      return annotation;
    };

    annotation.updateText = function () {
      if (collection) {
        collection.updateText(textWrap);
        annotations = collection.annotations;
      }
      return annotation;
    };

    annotation.updatedAccessors = function () {
      collection.setPositionWithAccessors();
      annotations = collection.annotations;
      return annotation;
    };

    annotation.disable = function (_) {
      if (!arguments.length) return disable;
      disable = _;
      if (collection) {
        collection.updateDisable(disable);
        annotations = collection.annotations;
      }
      return annotation;
    };

    annotation.textWrap = function (_) {
      if (!arguments.length) return textWrap;
      textWrap = _;
      if (collection) {
        collection.updateTextWrap(textWrap);
        annotations = collection.annotations;
      }
      return annotation;
    };

    annotation.notePadding = function (_) {
      if (!arguments.length) return notePadding;
      notePadding = _;
      if (collection) {
        collection.updateNotePadding(notePadding);
        annotations = collection.annotations;
      }
      return annotation;
    };
    //todo think of how to handle when undefined is sent
    annotation.type = function (_, settings) {
      if (!arguments.length) return type;
      type = _;
      if (collection) {
        collection.annotations.map(function (a) {
          a.type.note && a.type.note.selectAll("*:not(.annotation-note-content)").remove();
          a.type.noteContent && a.type.noteContent.selectAll("*").remove();
          a.type.subject && a.type.subject.selectAll("*").remove();
          a.type.connector && a.type.connector.selectAll("*").remove();
          a.type.typeSettings = {};
          a.type = type;

          a.subject = settings && settings.subject || a.subject;
          a.connector = settings && settings.connector || a.connector;
          a.note = settings && settings.note || a.note;
        });

        annotations = collection.annotations;
      }
      return annotation;
    };

    annotation.annotations = function (_) {
      if (!arguments.length) return collection && collection.annotations || annotations;
      annotations = _;

      if (collection && collection.annotations) {
        var rerun = annotations.some(function (d) {
          return !d.type || d.type.toString() !== "[object Object]";
        });

        if (rerun) {
          collection = null;
          annotation(sel);
        } else {
          collection.annotations = annotations;
        }
      }
      return annotation;
    };

    annotation.context = function (_) {
      if (!arguments.length) return context;
      context = _;
      return annotation;
    };

    annotation.accessors = function (_) {
      if (!arguments.length) return accessors;
      accessors = _;
      return annotation;
    };

    annotation.accessorsInverse = function (_) {
      if (!arguments.length) return accessorsInverse;
      accessorsInverse = _;
      return annotation;
    };

    annotation.ids = function (_) {
      if (!arguments.length) return ids;
      ids = _;
      return annotation;
    };

    annotation.editMode = function (_) {
      if (!arguments.length) return editMode;
      editMode = _;

      if (sel) {
        sel.selectAll("g.annotation").classed("editable", editMode);
      }

      if (collection) {
        collection.editMode(editMode);
        annotations = collection.annotations;
      }
      return annotation;
    };

    annotation.collection = function (_) {
      if (!arguments.length) return collection;
      collection = _;
      return annotation;
    };

    annotation.on = function () {
      var value = annotationDispatcher.on.apply(annotationDispatcher, arguments);
      return value === annotationDispatcher ? annotation : value;
    };

    return annotation;
  }

  var index = {
    annotation: annotation,
    annotationTypeBase: Type,
    annotationLabel: d3Label,
    annotationCallout: d3Callout,
    annotationCalloutCurve: d3CalloutCurve,
    annotationCalloutElbow: d3CalloutElbow,
    annotationCalloutCircle: d3CalloutCircle,
    annotationCalloutRect: d3CalloutRect,
    annotationXYThreshold: d3XYThreshold,
    annotationBadge: d3Badge,
    annotationCustomType: customType
  };

  exports.annotation = annotation;
  exports.annotationTypeBase = Type;
  exports.annotationLabel = d3Label;
  exports.annotationCallout = d3Callout;
  exports.annotationCalloutCurve = d3CalloutCurve;
  exports.annotationCalloutElbow = d3CalloutElbow;
  exports.annotationCalloutCircle = d3CalloutCircle;
  exports.annotationCalloutRect = d3CalloutRect;
  exports.annotationXYThreshold = d3XYThreshold;
  exports.annotationBadge = d3Badge;
  exports.annotationCustomType = customType;
  exports['default'] = index;

  Object.defineProperty(exports, '__esModule', { value: true });
});
//# sourceMappingURL=d3-annotation.js.map
//# sourceMappingURL=annotation.js.map

var forest1 = "#C4D6C4";
var forest2 = "#A5C3A8";
var forest3 = "#73A97F";
var forest4 = "#008C4E";
var forest5 = "#007741";
var forest6 = "#005027";
var green1 = "#CBE1C8";
var green2 = "#AED3AB";
var green3 = "#7DBE80";
var green4 = "#0AA74B";
var green5 = "#008C3E";
var green6 = "#005E25";
var olive1 = "#E0EDCB";
var olive2 = "#D0E4AF";
var olive3 = "#B4D682";
var olive4 = "#8FC641";
var olive5 = "#74A535";
var olive6 = "#476E1E";
var lime1 = "#EFF4CC";
var lime2 = "#E8EEAF";
var lime3 = "#DBE580";
var lime4 = "#CADB2E";
var lime5 = "#A6B626";
var lime6 = "#6A7812";
var yellow1 = "#FCF8CD";
var yellow2 = "#FBF5B0";
var yellow3 = "#F9F17E";
var yellow4 = "#F6EB0E";
var yellow5 = "#CAC313";
var yellow6 = "#838103";
var tangerine1 = "#FFECC6";
var tangerine2 = "#FFE3A7";
var tangerine3 = "#FFD576";
var tangerine4 = "#FDC218";
var tangerine5 = "#D0A115";
var tangerine6 = "#886A00";
var orange1 = "#FDD5BB";
var orange2 = "#FBBE99";
var orange3 = "#F79967";
var orange4 = "#F26725";
var orange5 = "#C8551D";
var orange6 = "#843401";
var red1 = "#FBC9BA";
var red2 = "#F8AB98";
var red3 = "#F37B68";
var red4 = "#EC2033";
var red5 = "#C31729";
var red6 = "#82000D";
var rose1 = "#E9C3C8";
var rose2 = "#DFA4AE";
var rose3 = "#D17589";
var rose4 = "#C02460";
var rose5 = "#A11950";
var rose6 = "#6B0031";
var violet1 = "#DABFD1";
var violet2 = "#C99FBB";
var violet3 = "#B1709B";
var violet4 = "#952978";
var violet5 = "#7E1E65";
var violet6 = "#530041";
var purple1 = "#CABDDC";
var purple2 = "#B19CC9";
var purple3 = "#8D6EAE";
var purple4 = "#653290";
var purple5 = "#552479";
var purple6 = "#360451";
var navy1 = "#BCC2E0";
var navy2 = "#9BA4CF";
var navy3 = "#697CB8";
var navy4 = "#0F519F";
var navy5 = "#0A4286";
var navy6 = "#002459";
var blue1 = "#C8DAF0";
var blue2 = "#ABC8E8";
var blue3 = "#7AADDC";
var blue4 = "#1F8FCE";
var blue5 = "#1B78AC";
var blue6 = "#044F74";
var cyan1 = "#CFE8F9";
var cyan2 = "#B5DDF6";
var cyan3 = "#86CCF1";
var cyan4 = "#2AB8EB";
var cyan5 = "#259AC5";
var cyan6 = "#0C6785";
var gray1 = "#DCDDDE";
var gray2 = "#BCBEC0";
var gray3 = "#939598";
var gray4 = "#6D6E71";
var gray5 = "#4D4D4F";
var gray6 = "#414042";

var grey1 = "#AFBABF";
var grey2 = "#D4D8DA";
var black = "#231F20";
var white = "#FFFFFF";

//relative colors,
var staticnav = grey1;
var selectednav = black;
//# sourceMappingURL=color.js.map

Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//individual points
Reuters.Graphics.DataPointModel = Backbone.Model.extend({
	initialize: function initialize(attributes, options) {
		return;
	},

	parse: function parse(point, options) {
		if (point.date) {
			point.rawDate = point.date;
			point.date = options.collection.parseDate(point.date);
			point.displayDate = options.collection.dateFormat(point.date);
		}

		if (options.collection.xScaleColumn) {
			point[options.collection.xScaleColumn] = parseFloat(point[options.collection.xScaleColumn]);
			return point;
		}
		return point;
	}
});

//the collection of datapoint which will sort by date.
Reuters.Graphics.DataPointCollection = Backbone.Collection.extend({
	initialize: function initialize(models, options) {
		var self = this;
		_.each(options, function (item, key) {
			self[key] = item;
		});
	},

	comparator: function comparator(item) {
		var self = this;
		if (item.get("date")) {
			return item.get("date");
		}

		return parseFloat(item.get(item.collection.xScaleColumn));
	},

	model: Reuters.Graphics.DataPointModel,

	parse: function parse(data) {
		var self = this;
		return data;
	}
});

//a model for each collection of data
Reuters.Graphics.DataSeriesModel = Backbone.Model.extend({
	defaults: {
		name: undefined,
		values: undefined,
		visible: true
	},

	initialize: function initialize(attributes, options) {
		var self = this;
		var totalChange = 0;
		var cumulate = 0;
		var name = self.get("name");
		var firstItem = self.get("values").at(0);
		var firstValue = parseFloat(firstItem.get(name));

		self.get("values").each(function (currentItemInLoop) {
			var previousItem = self.get("values").at(self.get("values").indexOf(currentItemInLoop) - 1);
			var currentValue = parseFloat(currentItemInLoop.get(name));
			var change, percent;
			//previousItem.get(name).value ?????
			if (previousItem) {
				var previousValue = currentValue;
				if (previousItem.get(name)) {
					if (previousItem.get(name).value) {
						previousValue = parseFloat(previousItem.get(name).value);
					}
				}
				change = currentValue - previousValue;
				totalChange += change;
				cumulate += currentValue;
				percent = (currentValue / firstValue - 1) * 100;
				currentItemInLoop.set(name, { changePreMonth: change, cumulate: cumulate, cumulativeChange: totalChange, percentChange: percent, value: currentValue / options.collection.divisor });
			} else {
				currentItemInLoop.set(name, { changePreMonth: 0, cumulate: currentValue, cumulativeChange: 0, percentChange: 0, value: currentValue / options.collection.divisor });
			}
		});
	},

	parse: function parse(point, options) {
		return point;
	}
});

//a collection of those collectioins
Reuters.Graphics.DateSeriesCollection = Backbone.Collection.extend({
	initialize: function initialize(models, options) {
		var self = this;
		_.each(options, function (item, key) {
			self[key] = item;
		});
	},

	comparator: function comparator(item) {
		var self = this;
		var name = item.get("name");
		var lastItem = item.get("values").last();
		// for time series, is going to be last value

		if (self.groupSort == "none") {
			return;
		}
		for (index = item.get("values").length - 1; index > -1; index--) {
			if (!isNaN(parseFloat(item.get("values").at(index).get(name)[self.dataType]))) {
				lastItem = item.get("values").at(index);
				break;
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

	parse: function parse(data) {
		var self = this;

		self.on('reset', function (d) {
			if (d.first().get("values").first().get("category")) {
				self.categorySorter(d);
			}
			self.makeStacks(d);
		});
		self.on("change", function (d) {
			self.makeStacks(d);
		});

		return data;
	},

	categorySorter: function categorySorter(item) {
		var self = this;
		var name = item.last().get("name");
		var plusMinus = 1;
		if (self.categorySort == "descending") {
			plusMinus = -1;
		}
		if (self.categorySort == "none") {
			return;
		}

		item.last().get("values").models.sort(function (a, b) {
			if (a.get(name)[self.dataType] > b.get(name)[self.dataType]) {
				return 1 * plusMinus;
			}
			if (a.get(name)[self.dataType] < b.get(name)[self.dataType]) {
				return -1 * plusMinus;
			}
			return 0;
		});

		if (!Array.isArray(self.categorySort)) {
			self.categorySort = [];
			item.last().get("values").each(function (d) {
				self.categorySort.push(d.get("category"));
			});
		}

		item.each(function (d) {
			d.get("values").models.sort(function (a, b) {
				if (self.categorySort.indexOf(a.get("category")) > self.categorySort.indexOf(b.get("category"))) {
					return 1;
				}
				if (self.categorySort.indexOf(a.get("category")) < self.categorySort.indexOf(b.get("category"))) {
					return -1;
				}
				return 0;
			});
		});
	},

	makeStacks: function makeStacks(item) {
		var self = this;
		var filtered = self.filter(function (d) {
			return d.get("visible");
		});

		filtered.forEach(function (eachGroup, indexofKey) {
			var name = eachGroup.get("name");
			//back to here
			eachGroup.get("values").each(function (d, i) {
				var masterPositive = 0;
				var masterNegative = 0;
				var stackTotal = 0;
				var masterPercent = 0;
				var stackMin = 0;
				var thisValue = d.get(name)[self.dataType];
				var counter;

				filtered.forEach(function (collection, counter) {
					var loopName = collection.get("name");
					var currentValue = collection.get("values").at(i).get(loopName)[self.dataType];
					if (currentValue >= 0) {
						stackTotal = stackTotal + currentValue;
					} else {
						stackMin = stackMin + currentValue;
					}
				});

				for (counter = indexofKey; counter < filtered.length; counter++) {
					var loopName = filtered[counter].get("name");
					var currentValue = filtered[counter].get("values").at(i).get(loopName)[self.dataType];
					if (currentValue > 0) {
						masterPositive = masterPositive + currentValue;
						masterPercent = masterPercent + currentValue / stackTotal * 100;
					} else {
						masterNegative = masterNegative + currentValue;
					}
				}
				var y0Total = masterPositive - thisValue;
				var y1Total = masterPositive;
				if (thisValue < 0) {
					y0Total = masterNegative - thisValue;
					y1Total = masterNegative;
				}
				d.set(name, _.extend(d.get(name), { y0Total: y0Total, y1Total: y1Total, stackTotal: stackTotal, stackMin: stackMin, y0Percent: masterPercent - thisValue / stackTotal * 100, y1Percent: masterPercent }));
			});
		});
	}

});
//# sourceMappingURL=dataModels.js.map

Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//the view that constructs a linechart
Reuters.Graphics.ChartBase = Backbone.View.extend({
	groupSort: "descending",
	categorySort: "ascending",
	margin: { top: 40, right: 20, bottom: 30, left: 40 },
	dateFormat: d3.time.format("%b %Y"),
	tipTemplate: Reuters.Graphics.basicCharter.Template.tooltip,
	chartTemplate: Reuters.Graphics.basicCharter.Template.chartTemplate,
	legendTemplate: Reuters.Graphics.basicCharter.Template.legendTemplate,
	tipNumbFormat: function tipNumbFormat(d) {
		var self = this;
		if (isNaN(d) === true) {
			return "N/A";
		} else {
			return self.dataLabels[0] + self.numbFormat(d) + self.dataLabels[1];
		}
	},
	colors: [blue3, purple3, orange3, red3, yellow3],
	dataType: 'value',
	xScaleTicks: 5,
	yScaleTicks: 5,
	YTickLabel: [["", ""]],
	numbFormat: d3.format(",.0f"),
	lineType: "linear",
	chartBreakPoint: 300,
	hasLegend: true,
	xOrY: "x",
	yOrX: "y",
	leftOrTop: "left",
	heightOrWidth: "height",
	widthOrHeight: "width",
	topOrLeft: "top",
	bottomOrRight: "bottom",
	firstRun: true,
	rightOrBottom: "right",
	recessionDateParse: d3.time.format("%m/%d/%Y").parse,
	updateCount: 0,
	divisor: 1,
	visiblePosition: "onScreen",
	annotationType: d3.annotationLabel,
	timelineDate: d3.time.format("%m/%d/%Y"),
	timelineDateDisplay: d3.time.format("%b %e, %Y"),
	timelineTemplate: Reuters.Graphics.basicCharter.Template.tooltipTimeline,
	quarterFormater: function quarterFormater(d) {
		var yearformat = d3.time.format(" %Y");
		var monthformat = d3.time.format("%m");
		var quarters = {
			"01": "Q1",
			"02": "Q1",
			"03": "Q1",
			"04": "Q2",
			"05": "Q2",
			"06": "Q2",
			"07": "Q3",
			"08": "Q3",
			"09": "Q3",
			"10": "Q4",
			"11": "Q4",
			"12": "Q4"
		};
		return quarters[monthformat(d)] + yearformat(d);
	},
	xTickFormat: Reuters.CurrentLocale.timeFormat.multi([["%H:%M", function (d) {
		return d.getMinutes();
	}], ["%H:%M", function (d) {
		return d.getHours();
	}], ["%a %d", function (d) {
		return d.getDay() && d.getDate() != 1;
	}], ["%b %d", function (d) {
		return d.getDate() != 1;
	}], ["%B", function (d) {
		return d.getMonth();
	}], ["%Y", function () {
		return true;
	}]]),
	initialize: function initialize(opts) {
		var self = this;
		this.options = opts;

		// if we are passing in options, use them instead of the defualts.
		_.each(opts, function (item, key) {
			self[key] = item;
		});

		if (self.isPoll && self.chartType == "line") {
			self.chartLayout = "fillLines";
		}
		if (self.isPoll && self.chartType != "line" && self.leftBarCol) {
			self.moeLabelObj = self.columnNames;
			self.options.colors[self.centerCol] = "none";
			self.colors[self.centerCol] = "none";
			self.legendItemsArray = [self.rightBarCol, self.centerCol, self.leftBarCol];
			self.hasLegend = false;
			self.options.hasLegend = false;
			self.horizontal = true;
			self.chartLayout = "stackTotal";
			self.yScaleMax = function () {
				return 100;
			};
			self.categorySort = "none";
			self.yScaleVals = [0, 25, 50, 75, 100];
			self.groupSort = self.legendItemsArray;
			self.YTickLabel = [[gettext(""), "%"]];
		}
		if (this.quarterFormat) {
			this.dateFormat = this.quarterFormater;
		}

		if (self.timelineData) {
			self.loadTimelineData();
		} else {
			self.loadData();
		}
	},
	loadData: function loadData() {
		var self = this;
		//Test which way data is presented and load appropriate way
		if (this.dataURL.indexOf("csv") == -1 && !_.isObject(this.dataURL)) {
			d3.json(self.dataURL, function (data) {
				self.parseData(data);
			});
		}
		if (this.dataURL.indexOf("csv") > -1) {
			d3.csv(self.dataURL, function (data) {
				self.parseData(data);
			});
		}
		if (_.isObject(this.dataURL)) {
			setTimeout(function () {
				self.parseData(self.dataURL);
			}, 100);
		}
	},
	loadTimelineData: function loadTimelineData() {
		var self = this;
		//Test which way data is presented and load appropriate way
		if (this.timelineData.indexOf("csv") == -1 && babelHelpers.typeof(this.timelineData) != "object") {
			d3.json(self.timelineData, function (data) {
				self.timelineData = data;
				self.loadData();
				return;
			});
		}
		if (this.timelineData.indexOf("csv") > -1) {
			d3.csv(self.timelineData, function (data) {
				self.timelineData = data;
				self.loadData();
				return;
			});
		}
		if (babelHelpers.typeof(this.timelineData) == "object") {
			self.loadData();
			return;
		}
	},
	formatDataStream: function formatDataStream(response) {
		var newArray = [];

		response.Dates.forEach(function (d, i) {
			var obj = {};

			var newDate = d.replace(/\//g, '').replace('Date(', '').replace(')', '').replace('+0000', '');
			var date = new Date(+newDate);
			var betterDate = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
			var formatDate = betterDate.getMonth() + 1 + "/" + betterDate.getDate() + "/" + betterDate.getFullYear();

			obj.date = formatDate;

			response.DataTypeValues[0].SymbolValues.forEach(function (item, index) {
				var name = response.DataTypeValues[0].SymbolValues[index].Symbol;
				obj[name] = response.DataTypeValues[0].SymbolValues[index].Value[i];
			});

			newArray.push(obj);
		});
		return newArray;
	},
	parseData: function parseData(data) {
		var self = this;
		data = JSON.parse(JSON.stringify(data));
		if (self.dataStream) {
			var response = data.DataResponse || data.DataResponses[0];
			data = self.formatDataStream(response);
		}

		//figuring out if there is a timescale, is this necessary?
		if (data[0].date && !self.xScaleColumn) {
			self.hasTimeScale = true;
		}
		// if parser undefined, figure out if it's a 4 year or 2 year date and set parser to match		
		if (data[0].date && !self.parseDate) {
			if (data[0].date.split('/')[2].length == 2) {
				self.parseDate = d3.time.format("%m/%d/%y").parse;
			}
			if (data[0].date.split('/')[2].length == 4) {
				self.parseDate = d3.time.format("%m/%d/%Y").parse;
			}
		}
		//figure out current chart label, if it's switching between them.
		if (self.chartLayoutLables) {
			self.chartLayout = self.chartLayoutLables[self.chartLayoutLables.length - 1];
		}

		//set values if horizontal or not
		if (self.horizontal) {
			self.xOrY = "y";
			self.yOrX = "x";
			self.leftOrTop = "top";
			self.heightOrWidth = "width";
			self.widthOrHeight = "height";
			self.topOrLeft = "left";
			self.bottomOrRight = "right";
			self.rightOrBottom = "bottom";
		}

		//find values to map, if not defined
		if (!self.columnNames) {
			self.columnNames = _.keys(data[0]).filter(function (d) {
				return d != "date" && d != "category" && d !== "type" && d !== "rawDate" && d !== "displayDate";
			});
			self.columnNamesDisplay = self.columnNames;
		}
		if (_.isObject(self.columnNames) && !_.isArray(self.columnNames)) {
			self.columnNamesDisplay = _.values(self.columnNames);
			self.columnNames = _.keys(self.columnNames);
		}
		if (_.isArray(self.columnNames) && !self.columnNamesDisplay) {
			self.columnNamesDisplay = self.columnNames;
		}

		self.colorScale = d3.scale.ordinal();
		//figure out the color scale		
		if (_.isObject(self.colors) && !_.isArray(self.colors)) {
			self.colorScale.domain(_.keys(self.colors));
			self.colorScale.range(_.values(self.colors));
		}
		if (_.isArray(self.colors)) {
			self.colorScale.domain(self.columnNames);
			self.colorScale.range(self.colors);
		}

		//handle multidata
		if (data[0].type) {
			if (!self.multiDataColumns) {
				self.multiDataColumns = _.uniq(_.pluck(data, 'type'));
			}
			var groupedData = _.groupBy(data, "type");
			self.multiDataColumns.forEach(function (d) {
				self.modelData(groupedData[d], d);
			});
		} else {
			if (self.multiDataColumns) {
				self.dataType = self.multiDataColumns[self.multiDataColumns.length - 1];
			}
			self.modelData(data, "dataholder");
		}

		//make labels if none
		if (!self.multiDataLabels && self.multiDataColumns) {
			self.multiDataLabels = self.multiDataColumns;
		}

		self.flattenData(self.chartData);
		self.baseRender();
		self.renderChart();
	},

	//function to make all the data.  
	modelData: function modelData(data, name) {
		var self = this;

		if (!self.groupedData) {
			self.groupedData = {};
		}
		self.groupedData[name] = new Reuters.Graphics.DataPointCollection([], { parseDate: self.parseDate, xScaleColumn: self.xScaleColumn, dateFormat: self.dateFormat });
		self.groupedData[name].reset(data, { parse: true });

		self[name] = new Reuters.Graphics.DateSeriesCollection([], { parseDate: self.parseDate, xScaleColumn: self.xScaleColumn, groupSort: self.groupSort, divisor: self.divisor, categorySort: self.categorySort, dataType: self.dataType, multiDataColumns: self.multiDataColumns, dateFormat: self.dateFormat });

		self[name].reset(self.columnNames.map(function (d, i) {
			return { name: d, displayName: self.columnNamesDisplay[i], values: self.groupedData[name] };
		}), { parse: true });
		self.chartData = self[name];
	},

	flattenData: function flattenData(data) {
		var self = this;

		var filtered = data.filter(function (d) {
			return d.get("visible");
		});

		self.jsonData = _.invoke(filtered, 'toJSON');

		self.jsonData.forEach(function (d) {
			var name = d.name;
			d.values = d.values.toJSON();
			d.values.forEach(function (point) {
				_.extend(point, point[name]);
				point.name = name;
			});
		});

		if (self.jsonData.length == 1 && !self.options.hasLegend) {
			self.hasLegend = false;
		}
		if (self.jsonData.length > 1 && self.options.hasLegend != false) {
			self.hasLegend = true;
		}

		if (self.timelineData) {
			self.showTip = true;
			var closestData = null;
			self.timelineData.forEach(function (timelineItem) {
				timelineItem.parsedDate = self.parseDate(timelineItem.date);

				self.chartData.first().get("values").each(function (d, i) {
					if (closestData === null || Math.abs(d.get("date") - timelineItem.parsedDate) < Math.abs(closestData - timelineItem.parsedDate)) {
						closestData = d.get("date");
					}
					timelineItem.closestDate = closestData;
					timelineItem.formatedDate = self.timelineDate(timelineItem.closestDate);
				});
			});
			self.timelineDataGrouped = _.groupBy(self.timelineData, "formatedDate");
		}
	},
	barCalculations: function barCalculations() {
		var self = this;
		// some aspects of the data useful for figuring out bar placement
		self.dataLength = 0;

		self.jsonData.forEach(function (d) {
			if (d.values.length > self.dataLength) {
				self.dataLength = d.values.length;
			}
		});
		self.numberOfObjects = function () {
			if (self.chartLayout == "onTopOf" || self.chartLayout == "outlineBar") {
				return 1;
			} else {
				return self.jsonData.length;
			}
		};

		self.widthOfBar = function () {
			if (self.chartLayout == "stackTotal" || self.chartLayout == "stackPercent") {
				return self[self.widthOrHeight] / self.dataLength - self[self.widthOrHeight] / self.dataLength * 0.2;
			} else {
				return self[self.widthOrHeight] / (self.dataLength * self.numberOfObjects()) - self[self.widthOrHeight] / (self.dataLength * self.numberOfObjects()) * 0.2;
			}
		};
	},

	baseRender: function baseRender() {
		var self = this;
		self.trigger("baseRender:start");

		if (self.topLegend) {
			self.chartBreakPoint = 3000;
		}
		//make basic template and set names of stuff
		self.$el.html(self.chartTemplate({ self: self }));
		if (self.$el.width() < self.chartBreakPoint) {
			self.$el.find('.chart-holder').addClass("smaller");
		}

		//make a label based on the div's ID to use as unique identifiers 
		self.targetDiv = self.$el.attr("id");
		self.chartDiv = self.targetDiv + " .chart";
		self.legendDiv = self.targetDiv + " .legend";
		self.$chartEl = $("#" + self.chartDiv);
		self.$legendEl = $("#" + self.legendDiv);
		self.masterWidth = self.$el.width();

		//set the width and the height to be the width and height of the div the chart is rendered in
		self.width = self.$chartEl.width() - self.margin.left - self.margin.right;

		//if no height set, square, otherwise use the set height, if lower than 10, it is a ratio to width
		if (!self.options.height) {
			self.height = self.$chartEl.width() - self.margin.top - self.margin.bottom;
		}
		if (self.options.height < 10) {
			if ($(window).width() < 400) {
				self.height = self.$chartEl.width() - self.margin.top - self.margin.bottom;
			} else {
				self.height = self.$chartEl.width() * self.options.height - self.margin.top - self.margin.bottom;
			}
		}

		self.barCalculations();

		//create an SVG
		self.svg = d3.select("#" + self.chartDiv).append("svg").attr({
			width: self.width + self.margin.left + self.margin.right,
			height: self.height + self.margin.top + self.margin.bottom
		}).append("g").attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

		//make a rectangle so there is something to click on
		self.svg.append("svg:rect").attr({
			width: self.width,
			height: self.height,
			class: "plot"
		});

		//make a clip path for the graph  
		self.clip = self.svg.append("svg:clipPath").attr("id", "clip" + self.targetDiv).append("svg:rect").attr({
			x: -self.margin.left,
			y: -4,
			width: self.width + self.margin.left + 8,
			height: self.height + 8
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

		if (self.annotations) {
			self.labelAdder();
		}

		$(window).scroll(_.debounce(function () {
			self.scrollAnimate();
		}, 100));

		$(window).on("resize", _.debounce(function (event) {
			var width = self.$el.width();
			if (width == self.masterWidth) {
				return;
			}
			self.masterWidth = width;
			if (width < self.chartBreakPoint) {
				self.$el.find('.chart-holder').addClass("smaller");
			} else {
				self.$el.find('.chart-holder').removeClass("smaller");
			}
			self.update();
		}, 100));

		self.trigger("baseRender:end");
		//end of chart render			
		return this;
	},

	setWidthAndMargins: function setWidthAndMargins() {
		var self = this;

		//length of largest tick
		var maxWidth = -1;
		$("#" + self.targetDiv + " .y.axis").find("text").not(".topTick").each(function () {
			maxWidth = maxWidth > $(this).width() ? maxWidth : $(this).width();
		});
		if (maxWidth === 0) {
			$("#" + self.targetDiv + " .y.axis").find("text").not(".topTick").each(function () {
				maxWidth = maxWidth > $(this)[0].getBoundingClientRect().width ? maxWidth : $(this)[0].getBoundingClientRect().width;
			});
		}

		if (!self.options.margin) {
			self.margin = { top: 15, right: 20, bottom: 30, left: 9 + maxWidth };
			if (self.yorient == "right") {
				self.margin.left = 5;
				self.margin.right = 20 + maxWidth;
			}
			if (self.xorient == "top") {
				self.margin.top = 30;
				self.margin.bottom = 15;
			}
		}

		self.width = this.$chartEl.width() - self.margin.left - self.margin.right;
		if (!self.options.height) {
			self.height = self.$chartEl.width() - self.margin.top - self.margin.bottom;
		}
		if (self.options.height < 10) {
			if ($(window).width() < 400) {
				self.height = self.$chartEl.width() - self.margin.top - self.margin.bottom;
			} else {
				self.height = self.$chartEl.width() * self.options.height - self.margin.top - self.margin.bottom;
			}
		}
	},

	recessionMaker: function recessionMaker() {
		var self = this;
		//put in the recessions, if there are any.
		if (!self.hasRecessions) {
			return;
		}

		var recessionData = [{ "recess": [{ "start": "5/1/1937", "end": "6/1/1938" }, { "start": "2/1/1945", "end": "10/1/1945" }, { "start": "11/1/1948", "end": "10/1/1949" }, { "start": "7/1/1953", "end": "5/1/1954" }, { "start": "8/1/1957", "end": "4/1/1958" }, { "start": "4/1/1960", "end": "2/1/1961" }, { "start": "12/1/1969", "end": "11/1/1970" }, { "start": "11/1/1973", "end": "3/1/1975" }, { "start": "1/1/1980", "end": "7/1/1980" }, { "start": "7/1/1981", "end": "11/1/1982" }, { "start": "7/1/1990", "end": "3/1/1991" }, { "start": "3/1/2001", "end": "11/1/2001" }, { "start": "12/1/2007", "end": "6/1/2009" }] }];
		self.recessions = self.svg.selectAll('.recession').data(recessionData);

		self.recessionsEnter = self.recessions.enter().append('g').attr({
			"clip-path": "url(#clip" + self.targetDiv + ")",
			class: "recession"
		});

		self.recessionsEnter.selectAll("rect").data(function (d) {
			return d.recess;
		}).enter().append("rect").attr({
			class: "recessionBox",
			x: function x(d) {
				return self.scales.x(self.recessionDateParse(d.start));
			},
			y: 0,
			width: function width(d) {
				return self.scales.x(self.recessionDateParse(d.end)) - self.scales.x(self.recessionDateParse(d.start));
			},
			height: self.height
		});
	},

	scaleMaker: function scaleMaker() {
		var self = this;

		//create and draw the x axis
		self.xAxis = d3.svg.axis().scale(self.scales[self.xOrY]).orient("bottom").ticks(self[self.xOrY + "ScaleTicks"]).tickPadding(8);

		//create and draw the y axis                  
		self.yAxis = d3.svg.axis().scale(self.scales[self.yOrX]).orient("left").ticks(self[self.yOrX + "ScaleTicks"]).tickPadding(8);

		if (self.yorient == "right") {
			self.yAxis.orient("right").tickPadding(20);
		}
		if (self.xorient == "top") {
			self.xAxis.orient("top");
		}

		//change the tic size if it's sideways    
		if (self.horizontal) {
			self.xAxis.tickSize(0 - self.height).tickPadding(12);
		}
		//forces a tick for every value on the x scale 
		if (self.tickAll) {
			self.fullDateDomain = [];
			self.smallDateDomain = [];
			self.chartData.first().get("values").each(function (d, i) {
				self.fullDateDomain.push(d.get("date"));
				if (i === 0 || i == self.dataLength - 1) {
					self.smallDateDomain.push(d.get("date"));
				}
			});
		}

		if (self.hasTimeScale && !self.xScaleColumn || self.options.xTickFormat) {
			self[self.xOrY + "Axis"].tickFormat(self.xTickFormat);
		}

		//FIX the tier thing needs rethought	
		if (self.chartLayout == "tier") {
			self[self.yOrX + "Axis"].ticks(2);
		}

		//define the tick format if it's specified, change tick length if it's horizontal
		if (self.yTickFormat) {
			self[self.yOrX + "Axis"].tickFormat(self.yTickFormat);
		}
		if (!self.horizontal) {
			self.yAxis.tickSize(0 - self.width);
		} else {
			self.yAxis.tickSize(0);
		}

		//if autoScale ing then let it use the default auto scale.  hasZoom and multiData automatically get auto-scaling
		if (self.yScaleVals && !self.hasZoom) {
			self[self.yOrX + "Axis"].tickValues(self.yScaleVals);
		}
		//draw all the axis
		self.svg.append("svg:g").attr("class", "x axis");
		self.svg.selectAll(".x.axis").attr("transform", function (d, i) {
			var toptrans = self.height;
			if (self.xorient == "top") {
				toptrans = 0;
			}
			var sideAdjust = 0;
			if (self.chartLayout == "sideBySide" && !self.horizontal) {
				sideAdjust = self.widthOfBar() / 2;
			}
			if (self.chartLayout != "sideBySide") {
				i = 0;
			}
			return "translate(" + (i * (self[self.widthOrHeight] / self.numberOfObjects()) + sideAdjust) + "," + toptrans + ")";
		}).call(self.xAxis);
		self.svg.append("svg:g").attr("class", "y axis");
		self.svg.selectAll(".y.axis").attr("transform", function (d, i) {
			if (self.yorient == "right") {
				return "translate(" + self.width + ",0)";
			}
			if (self.chartLayout == "sideBySide" && self.horizontal) {
				var heightFactor = i * (self[self.widthOrHeight] / self.numberOfObjects()) + self.widthOfBar() / 2;
				var widthFactor = 0;
				return "translate(" + widthFactor + "," + heightFactor + ")";
			}
		}).call(self.yAxis);

		self.adjustXTicks();

		if (!self.horizontal) {
			self.svg.selectAll(".y.axis line").attr("x1", -self.margin.left);
		}

		//get the latest labels
		self.dataLabels = self.YTickLabel[self.YTickLabel.length - 1];
		self.topTick(self.dataLabels);
	},

	makeZeroLine: function makeZeroLine() {
		var self = this;
		self.zeroLine = self.svg.append("line").attr("class", "zeroAxis").attr("clip-path", "url(#clip" + self.targetDiv + ")").attr(self.xOrY + "1", function () {
			if (self.horizontal) {
				return 0;
			}
			return -self.margin[self.leftOrTop];
		}).attr(self.xOrY + "2", self[self.widthOrHeight]).attr(self.yOrX + "1", self.scales.y(0)).attr(self.yOrX + "2", self.scales.y(0));
	},

	topTick: function topTick(tickLabels) {
		var self = this;

		d3.selectAll("#" + self.targetDiv + " .topTick").remove();

		var topTick = $("#" + self.targetDiv + " ." + self.yOrX + ".axis .tick:last-of-type").find("text");
		var topTickHeight = topTick.height();
		if (topTickHeight === 0) {
			topTickHeight = topTick[0].getBoundingClientRect().height;
		}

		d3.selectAll("#" + self.targetDiv + " ." + self.yOrX + ".axis .tick text").attr("transform", "translate(0,-" + topTickHeight / 2 + ")");

		var topTickHTML = topTick.text();
		var backLabel = "";
		if (self.horizontal) {
			backLabel = tickLabels[1];
		}
		topTick.text(tickLabels[0] + topTickHTML + backLabel);
		if (!self.horizontal) {
			topTick.clone().appendTo(topTick.parent()).text(tickLabels[1]).css('text-anchor', "start").attr("class", "topTick");
		}
	},

	toolTipMaker: function toolTipMaker() {
		var self = this;

		self.baseElement = document.getElementById(self.targetDiv).querySelector('svg');
		self.svgFind = self.baseElement;
		self.pt = self.svgFind.createSVGPoint();

		//start the cursor off to the left
		self.xPointCursor = 0 - self.margin[self.leftOrTop] - 500;
		//add a line	
		self.cursorLine = self.svg.append('svg:line').attr('class', 'cursorline').attr("clip-path", "url(#clip" + self.targetDiv + ")").attr(self.xOrY + '1', self.xPointCursor).attr(self.xOrY + '2', self.xPointCursor).attr(self.yOrX + '1', 0).attr(self.yOrX + '2', self[self.heightOrWidth]);

		// tooltip divs, default turns em off.  They get turned on if you have no legend, or if you specifically turn them on.
		self.tooltip = d3.select("#" + self.chartDiv).append("div").attr("class", "reuters-tooltip").style({
			opacity: 0,
			display: function display() {
				if (self.showTip || !self.hasLegend) {
					return "block";
				}
				return "none";
			}
		});

		self.svgmove = self.svgFind.addEventListener('mousemove', function (evt) {
			return self.tooltipMover(evt);
		}, false);
		self.svgtouch = self.svgFind.addEventListener('touchmove', function (evt) {
			return self.tooltipMover(evt);
		}, false);
		self.svgout = self.svgFind.addEventListener('mouseout', function (evt) {
			return self.tooltipEnd(evt);
		}, false);
		self.svgtouchout = self.svgFind.addEventListener('touchend', function (evt) {
			return self.tooltipEnd(evt);
		}, false);
	},

	tooltipMover: function tooltipMover(evt, self) {
		var self = this;
		self.loc = self.cursorPoint(evt);
		self.xPointCursor = self.loc[self.xOrY];
		self.yPointCursor = self.loc[self.yOrX];

		//little maths to figure out in the sideBySide layout what data point you are on.
		var widthsOver = 0;
		if (self.chartLayout == "sideBySide") {
			var eachChartWidth = self[self.widthOrHeight] / self.numberOfObjects();
			for (i = 0; i < self.numberOfObjects(); i++) {
				if (self.xPointCursor - self.margin[self.leftOrTop] > eachChartWidth) {
					self.xPointCursor = self.xPointCursor - eachChartWidth;
					widthsOver = widthsOver + eachChartWidth;
				}
			}
		}
		if (self.chartLayout == "tier") {
			widthsOver = self.widthOfBar() * self.numberOfObjects() / 2 - self.widthOfBar() / 2;
		}

		var toolTipModifier = 0;
		//use a reverse scale to figure out where you are at if there is a time scale.
		//if it's an ordinal scale it's a little trickier.
		self.closestData = null;
		var indexLocation = self.xPointCursor - parseFloat(self.margin[self.leftOrTop]);
		if (self.chartLayout == "sideBySide") {
			var widthOfEach = self.width / self.numberOfObjects();
			if (indexLocation > widthOfEach * 2) {
				indexLocation = indexLocation - widthOfEach * 2;
			}
			if (indexLocation > widthOfEach) {
				indexLocation = indexLocation - widthOfEach;
			}
		}

		if (self.hasTimeScale || self.xScaleColumn) {
			var theScale = 'date';
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			self.locationDate = self.scales.x.invert(indexLocation);
			self.chartData.first().get("values").each(function (d, i) {
				var include;
				_.each(d.attributes, function (obj, key) {
					if (!_.isObject(obj)) {
						return;
					}
					if (key == "date") {
						return;
					}
					if (obj.value) {
						include = true;
					}
				});
				if (!include && !self.showZeros) {
					return;
				}
				if (self.closestData === null || Math.abs(d.get(theScale) - self.locationDate) < Math.abs(self.closestData - self.locationDate)) {
					self.closestData = d.get(theScale);
				}
			});
			if (self.timelineData) {
				self.closestData = null;
				self.timelineData.forEach(function (d, i) {
					if (self.closestData === null || Math.abs(d.closestDate - self.locationDate) < Math.abs(self.closestData - self.locationDate)) {
						self.closestData = d.closestDate;
					}
				});
			}
		} else {
			var closestRange = null;
			self.scales.x.range().forEach(function (d, i) {
				var include;

				self.chartData.first().get("values").each(function (item) {
					if (item.get("category") == self.scales.x.domain()[i]) {

						_.each(item.attributes, function (obj, key) {
							if (!_.isObject(obj)) {
								return;
							}
							if (key == "category") {
								return;
							}
							if (obj.value) {
								include = true;
							}
						});
					}
				});
				if (!include && !self.showZeros) {
					return;
				}
				if (closestRange === null || Math.abs(d - indexLocation) < Math.abs(closestRange - indexLocation)) {
					closestRange = d;
				}
			});
			var closestIndex = self.scales.x.range().indexOf(closestRange);
			self.closestData = self.scales.x.domain()[closestIndex];
			toolTipModifier = self.widthOfBar() / 2;
			if (self.chartType == "line") {
				toolTipModifier = 0;
			}
		}

		//Got the value, now let's move the line.
		self.cursorLine.attr(self.xOrY + '1', self.scales.x(self.closestData) + toolTipModifier + widthsOver).attr(self.xOrY + '2', self.scales.x(self.closestData) + toolTipModifier + widthsOver);

		//highlight current bar
		self.highlightCurrent();

		//and now we can update the tooltip
		self.tooltip.html(function (d) {
			return self.tipTemplate({ self: self, data: self.makeTipData() });
		}).style(self.leftOrTop, function (d) {
			var tipWidth = $("#" + self.targetDiv + " .reuters-tooltip").outerWidth();

			if (self.horizontal) {
				tipWidth = $("#" + self.targetDiv + " .reuters-tooltip").outerHeight();
			}
			if (self.xPointCursor < (self.margin.left + self.width + self.margin.right) / 2) {
				return self.margin[self.leftOrTop] + self.scales.x(self.closestData) + toolTipModifier + widthsOver + 15 + "px";
			} else {
				return self.scales.x(self.closestData) + toolTipModifier - tipWidth + 15 + "px";
			}
		}).style(self.topOrLeft, function (d) {
			var toolTipHeight = $("#" + self.targetDiv + " .reuters-tooltip").height();
			if (self.horizontal) {
				toolTipHeight = $("#" + self.targetDiv + " .reuters-tooltip").outerWidth();
			}
			if (self.yPointCursor > (self.margin.top + self.height + self.margin.bottom) * 2 / 3) {
				return self.yPointCursor - toolTipHeight - 20 + "px";
			}
			if (self.yPointCursor < (self.margin.top + self.height + self.margin.bottom) / 3) {
				return self.yPointCursor + "px";
			}
			return self.yPointCursor - toolTipHeight / 2 + "px";
		});
		//and now we can update the legend.
		if (self.hasLegend) {
			var legendData = self.makeTipData();

			d3.select("#" + self.legendDiv).selectAll(".valueTip").data(legendData, function (d) {
				return d.name;
			}).html(function (d, i) {
				if (self.chartLayout == "stackPercent") {
					return self.tipNumbFormat(d.y1Percent - d.y0Percent);
				}
				return self.tipNumbFormat(d[self.dataType]);
			});

			self.legendDate.html(function () {
				if (self.xScaleColumn) {
					return legendData[0][self.xScaleColumn];
				}
				if (legendData[0].category) {
					return legendData[0].category;
				}
				if (legendData[0].quarters) {
					return legendData[0].quarters + legendData[0].displayDate;
				}
				return legendData[0].displayDate;
			});

			self.setLegendPositions();
		}

		self.tooltip.style({
			opacity: 1
		});
		self.trigger("tooltipMover:end");
	},

	highlightCurrent: function highlightCurrent() {
		var self = this;
		if (self.chartType == "bar") {
			self.barChart.selectAll(".bar").classed("lighter", function (d) {
				if (d.date == self.closestData || d.category == self.closestData) {
					return false;
				}
				return true;
			});
		}
		if (self.chartType == "line") {
			self.lineChart.selectAll(".tipCircle").classed("highlight", function (d) {
				if (d.date == self.closestData || d.category == self.closestData) {
					return true;
				}
				return false;
			});
		}
	},

	makeTipData: function makeTipData() {
		var self = this;
		var xDataType = "category";
		if (self.hasTimeScale) {
			xDataType = "date";
		}
		if (self.xScaleColumn) {
			xDataType = self.xScaleColumn;
		}

		var filtered = self.chartData.filter(function (d) {
			return d.get("visible");
		});
		var tipData = [];
		filtered.forEach(function (d) {
			var name = d.get("name");
			var displayName = d.get("displayName");
			var timeFormatter = d3.time.format("%m/%d/%Y %H:%M:%S");
			var matchingValues = d.get("values").filter(function (d) {
				if (self.hasTimeScale) {
					return timeFormatter(d.get(xDataType)) == timeFormatter(self.closestData);
				}
				return d.get(xDataType) == self.closestData;
			});
			matchingValues.forEach(function (d) {
				var matchObj = d.toJSON();
				_.extend(matchObj, matchObj[name]);
				matchObj.name = name;
				matchObj.displayName = displayName;
				tipData.push(matchObj);
			});
		});
		return tipData;
	},

	cursorPoint: function cursorPoint(evt) {
		var self = this;
		if (evt.clientX && evt.clientY) {
			self.pt.x = evt.clientX;self.pt.y = evt.clientY;
		} else if (evt.targetTouches) {
			self.pt.x = evt.targetTouches[0].clientX;self.pt.y = evt.targetTouches[0].clientY;
			self.pt.deltaX = Math.abs(self.pt.x - self.pt.lastX);
			self.pt.deltaY = Math.abs(self.pt.y - self.pt.lastY);
			if (self.pt.deltaX > self.pt.deltaY) {
				evt.preventDefault();
			}
			self.pt.lastY = self.pt.y;
			self.pt.lastX = self.pt.x;
		}
		return self.pt.matrixTransform(self.svgFind.getScreenCTM().inverse());
	},

	tooltipEnd: function tooltipEnd(evt) {
		var self = this;
		self.cursorLine.attr(self.xOrY + '1', 0 - self.margin[self.leftOrTop] - 10).attr(self.xOrY + '2', 0 - self.margin[self.leftOrTop] - 10);

		self.tooltip.style("opacity", 0);

		if (self.hasLegend) {
			self.legendItems.selectAll(".valueTip").html("<br>");

			self.legendDate.html("<br>");
			self.setLegendPositions();
		}
		if (self.chartType == "bar") {
			self.barChart.selectAll(".bar").classed("lighter", false);
		}
		if (self.chartType == "line") {
			self.lineChart.selectAll(".tipCircle").classed("highlight", false);
		}
	},

	multiDataMaker: function multiDataMaker() {
		var self = this;
		if (!self.multiDataColumns) {
			return;
		}
		self.$(".chart-nav .btn").on("click", function (evt) {

			var thisID = $(this).attr("dataid");
			var i = self.$(".chart-nav .btn").index(this);

			if (self.YTickLabel[i]) {
				self.dataLabels = self.YTickLabel[i];
			} else {
				self.dataLabels = self.YTickLabel[0];
			}

			//this has to act differently if you're doing a data transform, or picking up totally different data.
			if (!self[thisID]) {
				self.dataType = thisID;
			} else {
				self.chartData = self[thisID];
				self.flattenData(self.chartData);
			}

			self.update();
		});
		return;
	},

	chartLayoutMaker: function chartLayoutMaker() {
		var self = this;
		if (!self.chartLayoutLables) {
			return;
		}

		self.makeNavLayout = d3.select("#" + self.targetDiv + " .chart-layout").append("div").attr("class", "layoutNavContainer");

		self.makeNavLayoutButtons = self.makeNavLayout.selectAll('.layoutNavButtons').data(self.chartLayoutLables).enter().append("div").attr("class", "layoutNavButtons").attr("dataid", function (d) {
			return d;
		}).style("background-position", function (d) {
			//makes the sprite work.  i should change this to a class instead.
			var positionArray = ["basicbar", "stackTotalbar", "stackPercentbar", "sideBySidebar", "tierbar", "onTopOfbar", "basicline", "stackTotalline", "stackPercentline", "fillLinesline"];
			var positionNumber = positionArray.indexOf(d + self.chartType);
			return "0px " + -(positionNumber * 40) + "px";
		}).classed("selected", function (d, i) {
			if (i == self.chartLayoutLables.length - 1) {
				return true;
			} else {
				return false;
			}
		}).on("click", function (d, i) {
			if ($(this).hasClass("selected")) {
				return;
			}
			var thisID = $(this).attr("dataid");
			$(this).addClass("selected").siblings().removeClass("selected");

			self.chartLayout = d;

			//get the right data labels
			if (self.YTickLabel[i]) {
				self.dataLabels = self.YTickLabel[i];
			} else {
				self.dataLabels = self.YTickLabel[0];
			} //and override them if it's stack percent
			if (self.chartLayout == "stackPercent") {
				self.dataLabels = ["", "%"];
			}

			//run the updater    		    
			self.update();
		});
	},

	legendMaker: function legendMaker() {
		var self = this;
		//if no legend, get out of here.
		if (!self.hasLegend) {
			return;
		}
		self.$legendEl.html(self.legendTemplate({ data: self.jsonData, self: self }));

		self.legendItems = d3.selectAll("#" + self.legendDiv + ' .legendItems').data(self.jsonData).on("click", function (d) {
			var that = this;
			self.chartData.where({ name: d.name }).forEach(function (d) {
				if ($(that).hasClass("clicked")) {
					d.set({ visible: true });
				} else {
					d.set({ visible: false });
				}
			});
			if (self.multiDataColumns && self[self.multiDataColumns[0]]) {
				self.multiDataColumns.forEach(function (data) {
					self[data].where({ name: d.name }).forEach(function (d) {
						if ($(that).hasClass("clicked")) {
							d.set({ visible: true });
						} else {
							d.set({ visible: false });
						}
					});
				});
			}

			$(this).toggleClass("clicked");
			self.flattenData(self.chartData);
			self.update();
		});

		self.legendValues = d3.select("#" + self.legendDiv).selectAll(".valueTip").data(self.jsonData);

		self.legendDate = d3.selectAll("#" + self.legendDiv + ' .dateTip');

		self.setLegendPositions();
	},

	setLegendPositions: function setLegendPositions() {
		var self = this;

		if (!self.hasLegend) {
			return;
		}
		var depth = 0;

		self.legendItems.data(self.jsonData, function (d) {
			return d.name;
		}).style("top", function (d, i) {
			var returnDepth = depth;
			depth += $(this).height() + 5;
			return returnDepth + "px";
		});
		self.legendItems.data(self.jsonData, function (d) {
			return d.name;
		}).exit().style("top", function (d, i) {
			var returnDepth = depth;
			depth += $(this).height() + 5;
			return returnDepth + "px";
		});
	},

	adjustXTicks: function adjustXTicks() {
		var self = this;

		var ticksWidth = 0;
		$("#" + self.targetDiv + " .x.axis .tick").find("text").each(function (d) {
			ticksWidth += $(this).width() + 5;
		});
		if (self.tickAll) {
			self[self.xOrY + "Axis"].tickValues(self.fullDateDomain);
		}

		if (ticksWidth > self.width) {
			if (self.horizontal) {
				self["xAxis"].ticks(3);
			} else {
				self["xAxis"].ticks(2);
			}

			if (self.tickAll) {
				self[self.xOrY + "Axis"].tickValues(self.smallDateDomain);
			}
		}
	},

	scrollAnimate: function scrollAnimate() {
		var self = this;
		if (Reuters.hasPym) {
			return;
		}

		var scrollTop = $(window).scrollTop();
		var offset = self.$el.offset().top;
		var height = $(window).height();
		var triggerPoint = scrollTop + height * .8;
		var visiblePosition;

		if (triggerPoint > offset) {
			var visiblePosition = "onScreen";
			if (self.visiblePosition == visiblePosition) {
				return;
			}
			self.animateIn();
		} else {
			var visiblePosition = "offScreen";
			if (self.visiblePosition == visiblePosition) {
				return;
			}
			self.animateOut();
		}

		self.visiblePosition = visiblePosition;
	},

	animateIn: function animateIn() {
		var self = this;
		if (self.barChart) {
			self.barChart.selectAll(".bar").transition().duration(1000).attr(self.yOrX, function (d) {
				return self.yBarPosition(d);
			}).attr(self.heightOrWidth, function (d) {
				return self.barHeight(d);
			}).attr(self.widthOrHeight, function (d, i, j) {
				return self.barWidth(d, i, j);
			}).attr(self.xOrY, function (d, i, j) {
				return self.xBarPosition(d, i, j);
			});
		}
		if (self.lineChart) {
			self.lineChart.selectAll("path.line").transition().duration(1500).delay(function (d, i) {
				return i * 100;
			}).attrTween('d', function (d) {
				var interpolate = d3.scale.quantile().domain([0, 1]).range(d3.range(1, d.values.length + 1));
				return function (t) {
					return self.line(d.values.slice(0, interpolate(t)));
				};
			});

			self.lineChart.selectAll("path.area").transition().duration(1500).delay(function (d, i) {
				return i * 100;
			}).attrTween('d', function (d) {
				var interpolate = d3.scale.quantile().domain([0, 1]).range(d3.range(1, d.values.length + 1));
				return function (t) {
					return self.area(d.values.slice(0, interpolate(t)));
				};
			});
		}
	},

	animateOut: function animateOut() {
		var self = this;

		if (self.barChart) {
			self.barChart.selectAll(".bar").transition().duration(1000).attr(self.heightOrWidth, 0).attr(self.yOrX, self.scales.y(0));
		}
		if (self.lineChart) {
			self.lineChart.selectAll("path.line").transition().attr("d", function (d) {
				return self.line([d.values[0]]);
			});

			self.lineChart.selectAll("path.area").transition().attr("d", function (d) {
				return self.area([d.values[0]]);
			});
		}
	},

	baseUpdate: function baseUpdate(duration) {
		var self = this;
		self.trigger("baseUpdate:start");
		if (!duration) {
			duration = 1000;
		}
		self.setWidthAndMargins();
		self.setLegendPositions();
		self.barCalculations();

		self.svg.selectAll('.cursorline').attr(self.yOrX + '1', 0).attr(self.yOrX + '2', self[self.heightOrWidth]);

		d3.select("#" + self.targetDiv + " svg").transition().duration(duration).attr({
			width: self.width + self.margin.left + self.margin.right,
			height: self.height + self.margin.top + self.margin.bottom
		});

		self.svg.transition().duration(duration).attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

		self.svg.select(".plot").transition().duration(duration).attr({
			width: self.width,
			height: self.height
		});

		self.clip.transition().duration(duration).attr({
			x: -self.margin.left,
			y: -4,
			width: self.width + self.margin.left + 8,
			height: self.height + 8
		});

		this.scales = {
			x: this.getXScale(),
			y: this.getYScale()
		};

		self.xAxis.scale(self.scales[self.xOrY]);

		self.yAxis.scale(self.scales[self.yOrX]);

		self[self.yOrX + "Axis"].tickSize(0 - self[self.widthOrHeight]);

		if (self.chartLayout == "tier") {
			self[self.yOrX + "Axis"].ticks(2);
		} else {
			self.yAxis.ticks(self[self.yOrX + "ScaleTicks"]);
			self.xAxis.ticks(self[self.xOrY + "ScaleTicks"]);
		}

		if (self.updateCount == 1) {
			self.adjustXTicks();
		}

		// update the axes,   
		self.svg.selectAll(".x.axis").transition().duration(duration).attr("transform", function (d, i) {
			var toptrans = self.height;
			if (self.xorient == "top") {
				toptrans = 0;
			}
			var sideAdjust = 0;
			if (self.chartLayout == "sideBySide" && !self.horizontal) {
				sideAdjust = self.widthOfBar() / 2;
			}
			if (self.chartLayout != "sideBySide") {
				i = 0;
			}
			return "translate(" + (i * (self[self.widthOrHeight] / self.numberOfObjects()) + sideAdjust) + "," + toptrans + ")";
		}).call(self.xAxis);

		self.svg.selectAll(".y.axis").transition().duration(duration).attr("transform", function (d, i) {
			if (self.yorient == "right") return "translate(" + self.width + ",0)";
			if (self.chartLayout == "sideBySide" && self.horizontal) {
				var heightFactor = i * (self[self.widthOrHeight] / self.numberOfObjects()) + self.widthOfBar() / 2;
				var widthFactor = 0;
				return "translate(" + widthFactor + "," + heightFactor + ")";
			}
		}).call(self.yAxis).each("end", function (d) {
			if (self.firstRun) {
				self.firstRun = false;
				self.labelUpdate();
				return;
			}
			if (self.updateCount === 0) {
				self.updateCount++;
				setTimeout(function () {
					self.update();
				}, 10);
			} else {
				self.updateCount = 0;
			}
		});

		if (!self.horizontal) {
			self.svg.selectAll(".y.axis line").attr("x1", "-" + self.margin.left);
		}

		//update the top tick label
		self.topTick(self.dataLabels);

		//zero line
		if (self.zeroLine) {
			self.zeroLine.transition().duration(duration).attr(self.xOrY + "1", function () {
				if (self.horizontal) {
					return 0;
				}
				return "-" + self.margin[self.leftOrTop];
			}).attr(self.xOrY + "2", self[self.widthOrHeight]).attr(self.yOrX + "1", self.scales.y(0)).attr(self.yOrX + "2", self.scales.y(0));
		}

		//recessions				
		self.svg.selectAll(".recessionBox").transition().duration(duration).attr({
			x: function x(d) {
				return self.scales.x(self.recessionDateParse(d.start));
			},
			width: function width(d) {
				return self.scales.x(self.recessionDateParse(d.end)) - self.scales.x(self.recessionDateParse(d.start));
			},
			height: self.height
		});

		if (self.zoom) {
			self.zoom.x(self.scales.x).y(self.scales.y);
		}
		self.labelUpdate();

		self.trigger("baseUpdate:end");
		//end of base update	
	},
	labelUpdate: function labelUpdate() {
		var self = this;
		if (!self.annotationGroup) {
			return;
		}
		self.annotationData = self.options.annotations(self);

		self.makeAnnotations.annotations(self.annotationData);

		self.makeAnnotations.updatedAccessors();
		self.svg.select("g.annotation-group")
		//				.transition()
		.call(self.makeAnnotations);
	},

	zoomChart: function zoomChart() {
		var self = this;
		//if there is a zoom, then setup the zoom
		//define the zoom
		self.zoom = d3.behavior.zoom().x(self.scales.x).y(self.scales.y).scaleExtent([1, 8]).on("zoom", zoomed);

		//call the zoom on the SVG
		self.svg.call(self.zoom);

		//define the zoom function
		function zoomed() {
			self.svg.selectAll(".x.axis").call(self.xAxis);
			self.svg.select(".y.axis").call(self.yAxis);

			if (!self.horizontal) {
				self.svg.selectAll(".y.axis line").attr("x1", -self.margin.left);
			}

			//get the latest labels
			self.dataLabels = self.YTickLabel[self.YTickLabel.length - 1];
			self.topTick(self.dataLabels);

			if (self.chartType == "line") {
				self.lineChart.data(self.jsonData, function (d) {
					return d.name;
				}).selectAll(".tipCircle").data(function (d) {
					return d.values;
				}).attr("cx", function (d, i) {
					return self.scales.x(d.date);
				}).attr("cy", function (d, i) {
					return self.scales.y(d[self.dataType]);
				});

				self.lineChart.selectAll(".line").data(self.jsonData, function (d) {
					return d.name;
				}).attr("d", function (d) {
					return self.line(d.values);
				});

				self.lineChart.selectAll(".area").data(self.jsonData, function (d) {
					return d.name;
				}).attr("d", function (d, i) {
					return self.area(d.values);
				});
			}
			if (self.chartType == "bar") {

				self.svg.selectAll(".barChart").data(self.jsonData, function (d) {
					return d.name;
				}).selectAll(".bar").data(function (d) {
					return d.values;
				}).attr(self.yOrX, function (d) {
					return self.yBarPosition(d);
				}).attr(self.heightOrWidth, function (d) {
					return self.barHeight(d);
				}).attr(self.widthOrHeight, function (d, i, j) {
					return self.barWidth(d, i, j);
				}).attr(self.xOrY, function (d, i, j) {
					return self.xBarPosition(d, i, j);
				});
			}

			self.zeroLine.attr(self.yOrX + "1", self.scales.y(0)).attr(self.yOrX + "2", self.scales.y(0));

			self.svg.selectAll(".recessionBox").attr("x", function (d) {
				return self.scales.x(self.recessionDateParse(d.start));
			}).attr("width", function (d) {
				return self.scales.x(self.recessionDateParse(d.end)) - self.scales.x(self.recessionDateParse(d.start));
			});
		}
		//end of zoom
	},
	labelAdder: function labelAdder() {
		var self = this;
		self.annotationData = self.annotations();

		self.makeAnnotations = d3.annotation().editMode(self.annotationDebug).type(self.annotationType).annotations(self.annotationData);

		if (self.annotationData[0].data) {
			var _self$makeAnnotations;

			self.makeAnnotations.accessors((_self$makeAnnotations = {}, babelHelpers.defineProperty(_self$makeAnnotations, self.xOrY, function (d) {
				if (self.annotationData[0].data.date) {
					return self.scales.x(self.parseDate(d.date));
				}
				return self.scales.x(d.xvalue);
			}), babelHelpers.defineProperty(_self$makeAnnotations, self.yOrX, function (d) {
				return self.scales.y(d.yvalue);
			}), _self$makeAnnotations)).accessorsInverse({
				date: function date(d) {
					if (!self.scales.x.invert) {
						return d.x;
					}
					return self.dateFormat(self.scales.x.invert(d.x));
				},
				xvalue: function xvalue(d) {
					if (!self.scales.x.invert) {
						return d.x;
					}

					return self.scales.x.invert(d.x);
				},
				yvalue: function yvalue(d) {
					if (!self.scales.y.invert) {
						return d.y;
					}

					return self.scales.y.invert(d.y);
				}
			});
		}

		self.annotationGroup = self.svg.append("g").attr("class", "annotation-group").call(self.makeAnnotations);

		self.svg.select(".annotation-group").classed("active", true);
	}

	//end of view
});
//# sourceMappingURL=chartBase.js.map

Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
Reuters.Graphics.LineChart = Reuters.Graphics.ChartBase.extend({
	defaults: _.defaults({
		someNewDefault: "yes"
	}, Reuters.Graphics.ChartBase.prototype.defaults),
	//setup the scales.  You have to do this in the specific view, it will be called in the Reuters.Graphics.ChartBase.
	chartType: "line",
	xScaleMin: function xScaleMin() {
		var xcolumn = "date";
		if (this.xScaleColumn) {
			xcolumn = this.xScaleColumn;
		}

		return d3.min(this.jsonData, function (c) {
			return d3.min(c.values, function (v) {
				return v[xcolumn];
			});
		});
	},
	xScaleMax: function xScaleMax() {
		var xcolumn = "date";
		if (this.xScaleColumn) {
			xcolumn = this.xScaleColumn;
		}
		return d3.max(this.jsonData, function (c) {
			return d3.max(c.values, function (v) {
				return v[xcolumn];
			});
		});
	},
	xScaleRange: function xScaleRange() {
		var range = [0, this[this.widthOrHeight]];
		if (this.chartLayout == "sideBySide") {
			range = [0, this[this.widthOrHeight] / (this.jsonData.length * (1 + 2 / this.jsonData[0].values.length))];
		}
		return range;
	},
	getXScale: function getXScale() {
		if (this.xScaleColumn) {
			return d3.scale.linear().domain([this.xScaleMin(), this.xScaleMax()]).range(this.xScaleRange());
		}
		if (this.hasTimeScale) {
			return d3.time.scale().domain([this.xScaleMin(), this.xScaleMax()]).range(this.xScaleRange());
		} else {
			return d3.scale.ordinal().domain(this.jsonData[0].values.map(function (d) {
				return d.category;
			})).rangePoints([0, this[this.widthOrHeight]], 0);
		}
	},
	yScaleMin: function yScaleMin() {
		var theValues = this.dataType;
		if (this.chartLayout == "stackTotal") {
			theValues = "stackTotal";
		}
		var min = d3.min(this.jsonData, function (c) {
			return d3.min(c.values, function (v) {
				return v[theValues];
			});
		});
		if (this.chartlayout == "fillLines") {
			if (min > 0) {
				min = 0;
			}
		}
		if (this.chartLayout == "stackTotal" || this.chartLayout == "stackPercent") {
			min = 0;
		}
		return min;
	},
	yScaleMax: function yScaleMax() {
		var theValues = this.dataType;
		if (this.chartLayout == "stackTotal") {
			theValues = "stackTotal";
		}
		var max = d3.max(this.jsonData, function (c) {
			return d3.max(c.values, function (v) {
				return v[theValues];
			});
		});
		if (this.chartLayout == "stackPercent") {
			max = 100;
		}
		return max;
	},
	yScaleRange: function yScaleRange() {
		var fullHeight = this[this.heightOrWidth];
		var rangeLow = fullHeight;
		var rangeHigh = 0;
		if (this.horizontal) {
			rangeLow = 0;
			rangeHigh = fullHeight;
		}
		return [rangeLow, rangeHigh];
	},
	getYScale: function getYScale() {
		var self = this;
		if (!self.yScaleVals || this.hasZoom) {
			return d3.scale.linear().domain([this.yScaleMin(), this.yScaleMax()]).nice(this.yScaleTicks).range(this.yScaleRange());
		} else {
			return d3.scale.linear().domain([this.yScaleVals[0], this.yScaleVals[this.yScaleVals.length - 1]]).range(this.yScaleRange());
		}
	},
	renderChart: function renderChart() {
		// create a variable called "self" to hold a reference to "this"
		var self = this;
		self.trigger("renderChart:start");
		if (self.hasZoom) {
			self.zoomChart();
		}
		//will draw the line		
		self.line = d3.svg.line()[self.xOrY](function (d) {
			var theScale = 'category';
			if (self.hasTimeScale) {
				theScale = 'date';
			}
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			return self.scales.x(d[theScale]);
		})[self.yOrX](function (d) {
			if (self.chartLayout == "stackTotal") {
				return self.scales.y(d.y1Total);
			} else {
				if (self.chartLayout == "stackPercent") {
					return self.scales.y(d.y1Percent);
				} else {
					return self.scales.y(d[self.dataType]);
				}
			}
		}).interpolate(self.lineType).defined(function (d) {
			return !isNaN(d[self.dataType]);
		});

		self.area = d3.svg.area()[self.xOrY](function (d) {
			var theScale = 'category';
			if (self.hasTimeScale) {
				theScale = 'date';
			}
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			return self.scales.x(d[theScale]);
		})[self.yOrX + "0"](function (d) {
			if (self.isPoll) {
				return self.scales.y(d[self.dataType] - parseFloat(d[self.moeColumn]));
			}
			if (self.chartLayout == "stackTotal") {
				return self.scales.y(d.y0Total);
			} else {
				if (self.chartLayout == "stackPercent") {
					return self.scales.y(d.y0Percent);
				} else {
					return self.scales.y(0);
				}
			}
		})[self.yOrX + "1"](function (d) {
			if (self.isPoll) {
				return self.scales.y(d[self.dataType] + parseFloat(d[self.moeColumn]));
			}
			if (self.chartLayout == "stackTotal") {
				return self.scales.y(d.y1Total);
			} else {
				if (self.chartLayout == "stackPercent") {
					return self.scales.y(d.y1Percent);
				} else {
					return self.scales.y(d[self.dataType]);
				}
			}
		}).interpolate(self.lineType).defined(function (d) {
			return !isNaN(d[self.dataType]);
		});

		//bind the data and put in some G elements with their specific mouseover behaviors.
		self.lineChart = self.svg.selectAll(".lineChart").data(self.jsonData, function (d) {
			return d.name;
		}).enter().append("g").attr({
			"clip-path": "url(#clip" + self.targetDiv + ")",
			class: "lineChart",
			id: function id(d) {
				return self.targetDiv + d.displayName.replace(/\s/g, '') + "-line";
			}
		}).on("mouseover", function (d) {
			//put the line we've hovered on on top=
			self.lineChart.sort(function (a, b) {
				if (a.name == d.name) {
					return 1;
				} else {
					return -1;
				}
			}).order();

			//class all other lines to be lighter
			d3.selectAll("#" + self.targetDiv + " .lineChart").classed('notSelected', true);
			d3.select(this).classed("notSelected", false);
		}).on("mouseout", function (d) {
			d3.selectAll(".lineChart").classed('notSelected', false);
		});

		if (self.chartLayout == "sideBySide") {
			self.lineChart.attr("transform", function (d, i) {
				if (!self.horizontal) {
					return "translate(" + i * (self[self.widthOrHeight] / self.numberOfObjects()) + ",0)";
				} else {
					return "translate(0," + i * (self[self.widthOrHeight] / self.numberOfObjects()) + ")";
				}
			});
		} else {
			self.lineChart.attr("transform", function (d, i) {
				return "translate(0,0)";
			});
		}

		self.lineChart.append("path").attr("class", "line").style("stroke", function (d) {
			return self.colorScale(d.name);
		}).attr("d", function (d) {
			return self.line([d.values[0]]);
		}).transition().duration(1500).delay(function (d, i) {
			return i * 100;
		}).attrTween('d', function (d) {
			var interpolate = d3.scale.quantile().domain([0, 1]).range(d3.range(1, d.values.length + 1));
			return function (t) {
				return self.line(d.values.slice(0, interpolate(t)));
			};
		});

		self.lineChart.append("path").attr("class", function (d) {
			if (self.isPoll) {
				return "area pollArea";
			}
			return "area";
		}).style("fill", function (d) {
			return self.colorScale(d.name);
		}).attr("d", function (d) {
			return self.area(d.values[0]);
		}).style("display", function (d) {
			if (self.chartLayout == "stackTotal" || self.chartLayout == "stackPercent" || self.chartLayout == "fillLines") {
				return "block";
			} else {
				return "none";
			}
		}).transition().duration(1500).delay(function (d, i) {
			return i * 100;
		}).attrTween('d', function (d) {
			var interpolate = d3.scale.quantile().domain([0, 1]).range(d3.range(1, d.values.length + 1));
			return function (t) {
				return self.area(d.values.slice(0, interpolate(t)));
			};
		});

		self.lineChart.selectAll(".tipCircle").data(function (d) {
			return d.values;
		}).enter().append("circle").attr("class", "tipCircle").attr("c" + self.xOrY, function (d, i) {

			var theScale = 'category';
			if (self.hasTimeScale) {
				theScale = 'date';
			}
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			return self.scales.x(d[theScale]);
		}).attr("c" + self.yOrX, function (d, i) {
			if (self.chartLayout == "stackTotal") {
				if (!d.y1Total) {
					return self.scales.y(0);
				}
				return self.scales.y(d.y1Total);
			} else {
				if (self.chartLayout == "stackPercent") {
					if (!d.y1Percent) {
						return self.scales.y(0);
					}
					return self.scales.y(d.y1Percent);
				} else {
					if (!d[self.dataType]) {
						return self.scales.y(0);
					}
					return self.scales.y(d[self.dataType]);
				}
			}
		}).attr("r", function (d, i) {
			if (isNaN(d[self.dataType])) {
				return 0;
			}
			return 5;
		}).style('opacity', function (d) {
			if (self.markDataPoints) {
				return 1;
			}
			return 0;
		}).style("fill", function (d) {
			return self.colorScale(d.name);
		}) //1e-6
		.classed("timeline", function (d) {
			var theScale = 'category';
			if (self.hasTimeScale) {
				theScale = 'date';
			}
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			if (self.timelineDataGrouped) {
				if (self.timelineDataGrouped[self.timelineDate(d[theScale])]) {
					return true;
				}
			}
			return false;
		});

		if (self.chartLayout == "sideBySide") {

			var $xaxis = $("#" + self.targetDiv + " ." + self.xOrY + ".axis");

			self.jsonData.forEach(function (d, i) {
				if (i == 0) {
					return;
				}
				var heightFactor = self.height;
				var widthFactor = i * (self[self.widthOrHeight] / self.numberOfObjects()) + self.widthOfBar() / 2;
				if (self.horizontal) {
					heightFactor = i * (self[self.widthOrHeight] / self.numberOfObjects()) + self.widthOfBar() / 2;
					widthFactor = 0;
				}
				$xaxis.clone().attr("transform", "translate(" + widthFactor + "," + heightFactor + ")").appendTo($xaxis.parent());
			});
		}

		//add teh zero line on top.
		self.makeZeroLine();
		self.trigger("renderChart:end");
		self.trigger("chart:loaded");
		self.trigger("chart:loaded");

		//end chart render
	},
	update: function update() {
		var self = this;

		self.baseUpdate();
		self.trigger("update:start");

		if (self.chartLayout == "sideBySide") {
			self.lineChart.transition().duration(1000).attr("transform", function (d, i) {
				if (!self.horizontal) {
					return "translate(" + i * (self[self.widthOrHeight] / self.numberOfObjects()) + ",0)";
				} else {
					return "translate(0," + i * (self[self.widthOrHeight] / self.numberOfObjects()) + ")";
				}
			});
		} else {
			self.lineChart.transition().duration(1000).attr("transform", function (d, i) {
				return "translate(0,0)";
			});
		}

		self.exitLine = d3.svg.line()[self.xOrY](function (d) {
			var theScale = 'category';
			if (self.hasTimeScale) {
				theScale = 'date';
			}
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			return self.scales.x(d[theScale]);
		})[self.yOrX](function (d) {
			return self.margin[self.bottomOrRight] + self[self.heightOrWidth] + self.margin[self.topOrLeft] + 10;
		}).interpolate(self.lineType);

		self.exitArea = d3.svg.area()[self.xOrY](function (d) {
			var theScale = 'category';
			if (self.hasTimeScale) {
				theScale = 'date';
			}
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			return self.scales.x(d[theScale]);
		})[self.yOrX + "0"](function (d) {
			return self.margin[self.bottomOrRight] + self[self.heightOrWidth] + self.margin[self.topOrLeft] + 10;
		})[self.yOrX + "1"](function (d) {
			return self.margin[self.bottomOrRight] + self[self.heightOrWidth] + self.margin[self.topOrLeft] + 10;
		}).interpolate(self.lineType);

		//exiting lines
		self.lineChart.data(self.jsonData, function (d) {
			return d.name;
		}).exit().selectAll(".line").transition().attr("d", function (d, i) {
			return self.exitLine(d.values);
		});

		//exiting area
		self.lineChart.data(self.jsonData, function (d) {
			return d.name;
		}).exit().selectAll(".area").transition().attr("d", function (d, i) {
			return self.exitArea(d.values);
		});

		self.lineChart.data(self.jsonData, function (d) {
			return d.name;
		}).exit().selectAll(".tipCircle").transition().attr("r", 0);

		//update the line				    
		self.lineChart.selectAll(".line").data(self.jsonData, function (d) {
			return d.name;
		}).transition().duration(1000).attr("d", function (d, i) {
			return self.line(d.values);
		});

		//update the area				    
		self.lineChart.selectAll(".area").data(self.jsonData, function (d) {
			return d.name;
		}).style("display", function (d) {
			if (self.chartLayout == "stackTotal" || self.chartLayout == "stackPercent" || self.chartLayout == "fillLines") {
				return "block";
			} else {
				return "none";
			}
		}).transition().duration(1000).attr("d", function (d, i) {
			return self.area(d.values);
		});

		//the circles      
		self.lineChart.data(self.jsonData, function (d) {
			return d.name;
		}).selectAll(".tipCircle").data(function (d) {
			return d.values;
		}).transition().duration(1000).attr("c" + self.yOrX, function (d, i) {
			if (self.chartLayout == "stackTotal") {
				if (!d.y1Total) {
					return self.scales.y(0);
				}
				return self.scales.y(d.y1Total);
			} else {
				if (self.chartLayout == "stackPercent") {
					if (!d.y1Percent) {
						return self.scales.y(0);
					}
					return self.scales.y(d.y1Percent);
				} else {
					if (!d[self.dataType]) {
						return self.scales.y(0);
					}
					return self.scales.y(d[self.dataType]);
				}
			}
		}).attr("c" + self.xOrY, function (d, i) {
			var theScale = 'category';
			if (self.hasTimeScale) {
				theScale = 'date';
			}
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			return self.scales.x(d[theScale]);
		}).attr("r", function (d, i) {
			if (isNaN(d[self.dataType])) {
				return 0;
			}
			return 5;
		});

		self.lineChart.data(self.jsonData, function (d) {
			return d.name;
		}).selectAll(".tipCircle").data(function (d) {
			return d.values;
		}).exit().transition().duration(1000).attr("r", 0).each("end", function (d) {
			d3.select(this).remove();
		});

		self.lineChart.data(self.jsonData, function (d) {
			return d.name;
		}).selectAll(".tipCircle").data(function (d) {
			return d.values;
		}).enter().append("circle").attr("class", "tipCircle").attr("c" + self.xOrY, function (d, i) {
			var theScale = 'category';
			if (self.hasTimeScale) {
				theScale = 'date';
			}
			if (self.xScaleColumn) {
				theScale = self.xScaleColumn;
			}
			return self.scales.x(d[theScale]);
		}).attr("c" + self.yOrX, function (d, i) {
			if (self.chartLayout == "stackTotal") {
				return self.scales.y(d.y1Total);
			} else {
				if (self.chartLayout == "stackPercent") {
					return self.scales.y(d.y1Percent);
				} else {
					return self.scales.y(d[self.dataType]);
				}
			}
		}).style('opacity', function (d) {
			if (self.markDataPoints) {
				return 1;
			}
			return 0;
		}).style("fill", function (d) {
			return self.colorScale(d.name);
		}) //1e-6		    					 								 					
		.attr("r", 0).transition().duration(1000).attr("r", function (d, i) {
			if (isNaN(d[self.dataType])) {
				return 0;
			}
			return 5;
		});

		self.trigger("update:end");

		//end of update
	}
	//end model
});
//# sourceMappingURL=lineChart.js.map

Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};
//the view that constructs a barChart  data, get, models
Reuters.Graphics.BarChart = Reuters.Graphics.ChartBase.extend({
	defaults: _.defaults({
		someNewDefault: "yes"
	}, Reuters.Graphics.ChartBase.prototype.defaults),
	//setup the scales
	chartType: "bar",

	xScaleMin: function xScaleMin() {
		return d3.min(this.jsonData, function (c) {
			return d3.min(c.values, function (v) {
				return v.date;
			});
		});
	},

	xScaleMax: function xScaleMax() {
		return d3.max(this.jsonData, function (c) {
			return d3.max(c.values, function (v) {
				return v.date;
			});
		});
	},

	xScaleRange: function xScaleRange() {
		var objectNumber = this.numberOfObjects();
		if (this.chartLayout == "stackPercent" || this.chartLayout == "stackTotal") {
			objectNumber = 1;
		}
		var range = [this.widthOfBar() * objectNumber / 2, this[this.widthOrHeight] - this.widthOfBar() * objectNumber];
		if (this.chartLayout == "sideBySide") {
			range = [0, this[this.widthOrHeight] / (this.jsonData.length * (1 + 2 / this.jsonData[0].values.length))];
		}
		return range;
	},

	getXScale: function getXScale() {
		if (this.hasTimeScale) {
			return d3.time.scale().domain([this.xScaleMin(), this.xScaleMax()]).range(this.xScaleRange());
		} else {
			return d3.scale.ordinal().domain(this.jsonData[0].values.map(function (d) {
				return d.category;
			})).rangeRoundBands([0, this[this.widthOrHeight]], 0);
		}
	},

	yScaleMin: function yScaleMin() {
		var theValues = this.dataType;
		if (this.chartLayout == "stackTotal") {
			theValues = "stackMin";
		}
		var min = d3.min(this.jsonData, function (c) {
			return d3.min(c.values, function (v) {
				return v[theValues];
			});
		});
		if (this.chartLayout == "stackPercent") {
			min = 0;
		}
		if (min > 0) {
			min = 0;
		}
		return min;
	},

	yScaleMax: function yScaleMax() {
		var theValues = this.dataType;
		if (this.chartLayout == "stackTotal") {
			theValues = "stackTotal";
		}
		var max = d3.max(this.jsonData, function (c) {
			return d3.max(c.values, function (v) {
				return v[theValues];
			});
		});
		if (this.chartLayout == "stackPercent") {
			max = 100;
		}
		if (max < 0) {
			max = 0;
		}
		return max;
	},

	yScaleRange: function yScaleRange() {
		var fullHeight = this[this.heightOrWidth];
		if (this.chartLayout == "tier") {
			fullHeight = this[this.heightOrWidth] / (this.jsonData.length * (1 + 2 / this.jsonData[0].values.length));
		}
		var rangeLow = fullHeight;
		var rangeHigh = 0;
		if (this.horizontal) {
			rangeLow = 0;
			rangeHigh = fullHeight;
		}
		return [rangeLow, rangeHigh];
	},

	getYScale: function getYScale() {
		if (!this.yScaleVals || this.hasZoom) {
			return d3.scale.linear().domain([this.yScaleMin(), this.yScaleMax()]).nice(this.yScaleTicks).range(this.yScaleRange());
		} else {
			return d3.scale.linear().domain([this.yScaleVals[0], this.yScaleVals[this.yScaleVals.length - 1]]).range(this.yScaleRange());
		}
	},

	xBarPosition: function xBarPosition(d, i, j) {

		var self = this;
		var theScale = 'category';
		var modifier = 0;
		if (self.hasTimeScale) {
			theScale = 'date';
			modifier = self.widthOfBar() * self.numberOfObjects() / 2;
		}

		if (self.chartLayout == "outlineBar") {
			return self.scales.x(d[theScale]);
		}

		if (self.chartLayout == "stackTotal" || self.chartLayout == "stackPercent" || self.chartLayout == "sideBySide" || self.chartLayout == "tier") {
			if (self.hasTimeScale) {
				modifier = self.widthOfBar() / 2;
				if (self.chartLayout == "sideBySide") {
					modifier = 0;
				}
			}
			return self.scales.x(d[theScale]) - modifier;
		} else {
			if (self.chartLayout == "onTopOf" || self.chartLayout == "outlineBar") {
				return self.scales.x(d[theScale]) - modifier + self.widthOfBar() / (j + 1) * j / 2;
			} else {
				return self.scales.x(d[theScale]) - j * self.widthOfBar() + self.widthOfBar() * (self.numberOfObjects() - 1) - modifier;
			}
		}
	},

	yBarPosition: function yBarPosition(d) {
		var self = this;
		if (isNaN(d[self.dataType])) {
			return 0;
		}
		var positioner = "y1";
		if (self.horizontal || d.y1Total < 0) {
			positioner = "y0";
		}
		if (self.horizontal && d.y1Total < 0) {
			positioner = "y1";
		}
		if (self.chartLayout == "stackTotal") {
			return self.scales.y(d[positioner + "Total"]);
		} else {
			if (self.chartLayout == "stackPercent") {
				return self.scales.y(d[positioner + "Percent"]);
			} else {
				var minOrMax = "max";
				if (self.horizontal) {
					minOrMax = "min";
				}
				return self.scales.y(Math[minOrMax](0, d[self.dataType]));
			}
		}
	},

	barHeight: function barHeight(d) {
		var self = this;
		if (isNaN(d[self.dataType])) {
			return 0;
		}
		if (self.chartLayout == "stackTotal") {
			return Math.abs(self.scales.y(d.y0Total) - self.scales.y(d.y1Total));
		} else {
			if (self.chartLayout == "stackPercent") {
				return Math.abs(self.scales.y(d.y0Percent) - self.scales.y(d.y1Percent));
			} else {
				return Math.abs(self.scales.y(d[self.dataType]) - self.scales.y(0));
			}
		}
	},

	barFill: function barFill(d, i, j) {
		var self = this;
		var color = self.colorScale(d.name);
		if (self.colorUpDown) {
			if (d[self.dataType] > 0) {
				color = self.colorScale.range()[0];
			} else {
				color = self.colorScale.range()[1];
			}
		}
		if (self.chartLayout == "outlineBar") {
			if (j == 1) {
				return "none";
			}
		}
		if (self.hashAfterDate) {
			var cutoffDate = self.parseDate(self.hashAfterDate);
			var strokecolor = d3.rgb(color).darker(0.8);
			self.t = textures.lines().size(7).stroke(strokecolor).background(color);
			self.svg.call(self.t);
			if (d.date > cutoffDate) {
				return self.t.url();
			}
			return color;
		}

		return color;
	},

	barWidth: function barWidth(d, i, j) {
		var self = this;
		if (self.chartLayout == "tier") {
			return self.widthOfBar() * self.numberOfObjects();
		}
		if (self.chartLayout == "outlineBar") {
			return self.widthOfBar();
		}

		if (self.chartLayout == "onTopOf") {
			return self.widthOfBar() / (j + 1);
		} else {
			return self.widthOfBar();
		}
	},

	renderChart: function renderChart() {
		var self = this;
		self.trigger("renderChart:start");

		if (self.hasZoom) {
			self.zoomChart();
		}
		//enter g tags for each set of data, then populate them with bars.  some attribute added on end, for updating reasons
		self.barChart = self.svg.selectAll(".barChart").data(self.jsonData, function (d) {
			return d.name;
		}).enter().append("g").attr("clip-path", "url(#clip" + self.targetDiv + ")").attr("class", "barChart").attr('id', function (d) {
			return self.targetDiv + d.displayName.replace(/\s/g, '') + "-bar";
		});

		if (self.chartLayout == "sideBySide") {
			self.barChart.attr("transform", function (d, i) {
				if (!self.horizontal) {
					return "translate(" + i * (self[self.widthOrHeight] / self.numberOfObjects()) + ",0)";
				} else {
					return "translate(0," + i * (self[self.widthOrHeight] / self.numberOfObjects()) + ")";
				}
			});
		}
		if (self.chartLayout == "tier") {
			self.barChart.attr("transform", function (d, i) {
				if (!self.horizontal) {
					return "translate(0," + i * (self[self.heightOrWidth] / self.numberOfObjects()) + ")";
				} else {
					return "translate(" + i * (self[self.heightOrWidth] / self.numberOfObjects()) + ",0)";
				}
			});
		}

		self.barChart.selectAll(".bar").data(function (d) {
			return d.values;
		}).enter().append("rect").attr("class", "bar").style("fill", function (d, i, j) {
			return self.barFill(d, i, j);
		}).attr(self.heightOrWidth, 0).attr(self.yOrX, self.scales.y(0)).attr(self.widthOrHeight, function (d, i, j) {
			return self.barWidth(d, i, j);
		}).attr(self.xOrY, function (d, i, j) {
			return self.xBarPosition(d, i, j);
		}).transition().duration(1000).attr(self.yOrX, function (d) {
			return self.yBarPosition(d);
		}).attr(self.heightOrWidth, function (d) {
			return self.barHeight(d);
		});

		if (self.chartLayout == "outlineBar") {
			self.barChart.selectAll(".bar").classed("outline", function (d, i, j) {
				if (j == 1) {
					return true;
				}
				return false;
			});
		}

		if (self.chartLayout == "sideBySide") {

			var $xaxis = $("#" + self.targetDiv + " ." + self.xOrY + ".axis");

			self.jsonData.forEach(function (d, i) {
				if (i == 0) {
					return;
				}
				var heightFactor = self.height;
				var widthFactor = i * (self[self.widthOrHeight] / self.numberOfObjects()) + self.widthOfBar() / 2;
				if (self.horizontal) {
					heightFactor = i * (self[self.widthOrHeight] / self.numberOfObjects()) + self.widthOfBar() / 2;
					widthFactor = 0;
				}
				$xaxis.clone().attr("transform", "translate(" + widthFactor + "," + heightFactor + ")").appendTo($xaxis.parent());
			});
		}

		if (self.chartLayout == "tier") {
			self.barChart.append("svg:g").attr("class", self.yOrX + " axis").attr("transform", function (d) {
				if (!self.horizontal) {
					return "translate(0," + self.height + ")";
				} else {
					return "translate(0,0)";
				}
			});

			self.barChart.selectAll("." + self.yOrX + ".axis").call(self[self.yOrX + "Axis"]);
			self.barChart.each(function (d) {
				var thisId = $(this).attr("id");
				var barAxis = $("#" + thisId + " .axis").detach();
				barAxis.prependTo($(this));
			});
		} else {
			self.barChart.selectAll("." + self.yOrX + ".axis").remove();
		}

		//add teh zero line on top.
		self.makeZeroLine();
		if (self.isPoll) {
			self.addMoe();
		}

		self.trigger("renderChart:end");
		self.trigger("chart:loaded");

		//end of render
	},
	update: function update() {
		var self = this;
		self.baseUpdate();

		self.trigger("update:start");

		self.barChart.data(self.jsonData, function (d) {
			return d.name;
		}).order().transition().duration(1000).attr("transform", function (d, i) {
			var xPosit = 0;
			var yPosit = 0;
			if (self.chartLayout == "sideBySide") {
				if (!self.horizontal) {
					xPosit = i * (self[self.widthOrHeight] / self.numberOfObjects());
				} else {
					yPosit = i * (self[self.widthOrHeight] / self.numberOfObjects());
				}
			}
			if (self.chartLayout == "tier") {
				if (!self.horizonta) {
					yPosit = i * (self[self.heightOrWidth] / self.numberOfObjects());
				} else {
					xPosit = i * (self[self.heightOrWidth] / self.numberOfObjects());
				}
			}
			return "translate(" + xPosit + "," + yPosit + ")";
		});

		self.barChart.data(self.jsonData, function (d) {
			return d.name;
		}).exit().selectAll(".bar").transition().attr(self.heightOrWidth, 0).attr(self.yOrX, self.scales.y(0));

		self.svg.selectAll(".barChart").data(self.jsonData, function (d) {
			return d.name;
		}).selectAll(".bar").data(function (d) {
			return d.values;
		}).transition().duration(1000).style("fill", function (d, i, j) {
			return self.barFill(d, i, j);
		}).attr(self.yOrX, function (d) {
			return self.yBarPosition(d);
		}).attr(self.heightOrWidth, function (d) {
			return self.barHeight(d);
		}).attr(self.widthOrHeight, function (d, i, j) {
			return self.barWidth(d, i, j);
		}).attr(self.xOrY, function (d, i, j) {
			return self.xBarPosition(d, i, j);
		});

		self.svg.selectAll(".barChart").data(self.jsonData, function (d) {
			return d.name;
		}).selectAll(".bar").data(function (d) {
			return d.values;
		}).exit().transition().attr(self.heightOrWidth, 0).attr(self.yOrX, self.scales.y(0)).each("end", function (d) {
			d3.select(this).remove();
		});

		self.barChart.selectAll(".bar").data(function (d) {
			return d.values;
		}).enter().append("rect").attr("class", "bar").style("fill", function (d, i, j) {
			return self.barFill(d, i, j);
		}).attr(self.heightOrWidth, 0).attr(self.yOrX, self.scales.y(0)).attr(self.widthOrHeight, function (d, i, j) {
			return self.barWidth(d, i, j);
		}).attr(self.xOrY, function (d, i, j) {
			return self.xBarPosition(d, i, j);
		}).transition().duration(1000).attr(self.yOrX, function (d) {
			return self.yBarPosition(d);
		}).attr(self.heightOrWidth, function (d) {
			return self.barHeight(d);
		});

		if (self.isPoll) {
			self.updateMoe();
		}

		self.trigger("update:end");
		//end of update
	},
	updateMoe: function updateMoe() {
		var self = this;
		self.addMoe.transition().duration(1000).attr(self.widthOrHeight, function (d, i, j) {
			return self.barWidth(d, i, j);
		}).attr(self.xOrY, function (d, i, j) {
			return self.xBarPosition(d, i, j);
		}).attr(self.yOrX, function (d) {
			if (!self.leftBarCol) {
				if (self.horizontal) {
					return self.scales.y(d[self.dataType]) - self.scales.y(d[self.moeColumn]);
				}
				return self.scales.y(d[self.dataType] + parseFloat(d[self.moeColumn]));
			}
			if (d.name == self.leftBarCol) {
				return self.scales.y(d["y1Total"]) - self.scales.y(d[self.moeColumn]);
			}
			return self.scales.y(d["y0Total"]) - self.scales.y(d[self.moeColumn]);
		}).attr(self.heightOrWidth, function (d) {
			if (self.horizontal) {
				return self.scales.y(d[self.moeColumn] * 2);
			}
			return Math.abs(self.scales.y(d[self.moeColumn] * 2) - self.scales.y(0));
		});

		if (!self.leftBarCol) {
			return;
		}

		self.addMoeLabels.transition().duration(1000).attr("x", function (d, i) {
			if (i == 0) {
				return 0;
			}
			return self.width;
		});
	},

	addMoe: function addMoe() {
		var self = this;

		self.moeChart = self.svg.selectAll(".moeChart").data(self.jsonData, function (d) {
			return d.name;
		}).enter().append("g").attr("clip-path", "url(#clip" + self.targetDiv + ")").attr("class", "moeChart");

		self.addMoe = self.moeChart.selectAll(".moebar").data(function (d) {
			return d.values;
		}).enter().append("rect").attr("class", "moebar").style("fill", function (d) {

			var color = self.colorScale(d.name);
			var strokecolor = d3.rgb(color).darker(0.8);
			self.t = textures.lines().size(7).orientation("2/8").stroke(strokecolor);
			self.tother = textures.lines().size(7).orientation("6/8").stroke(strokecolor);
			self.svg.call(self.t);
			self.svg.call(self.tother);

			if (d.name == self.centerCol) {
				return "none";
			}
			if (d.name == self.leftBarCol) {
				return self.tother.url();
			}
			return self.t.url();
		}).attr(self.widthOrHeight, function (d, i, j) {
			return self.barWidth(d, i, j);
		}).attr(self.xOrY, function (d, i, j) {
			return self.xBarPosition(d, i, j);
		}).attr(self.yOrX, function (d) {
			if (!self.leftBarCol) {
				if (self.horizontal) {
					return self.scales.y(d[self.dataType]) - self.scales.y(d[self.moeColumn]);
				}
				return self.scales.y(d[self.dataType] + parseFloat(d[self.moeColumn]));
			}
			if (d.name == self.leftBarCol) {
				return self.scales.y(d["y1Total"]) - self.scales.y(d[self.moeColumn]);
			}
			return self.scales.y(d["y0Total"]) - self.scales.y(d[self.moeColumn]);
		}).attr(self.heightOrWidth, function (d) {
			if (self.horizontal) {
				return self.scales.y(d[self.moeColumn] * 2);
			}
			return Math.abs(self.scales.y(d[self.moeColumn] * 2) - self.scales.y(0));
		});
		if (!self.leftBarCol) {
			return;
		}
		self.addMoeLabels = self.svg.selectAll("moeLabels").data([self.moeLabelObj[self.leftBarCol], self.moeLabelObj[self.rightBarCol]]).enter().append("text").text(function (d) {
			return d;
		}).attr("x", function (d, i) {
			if (i == 0) {
				return 0;
			}
			return self.width;
		}).attr("text-anchor", function (d, i) {
			if (i == 0) {
				return "start";
			}
			return "end";
		}).attr("dy", -4).style("font-size", ".8rem").style("text-transform", "uppercase");
	}

	//end of mdoel
});
//# sourceMappingURL=barChart.js.map
