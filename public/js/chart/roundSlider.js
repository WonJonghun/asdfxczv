var fn1 = $.fn.roundSlider.prototype._setProperties;
        $.fn.roundSlider.prototype._setProperties = function () {
            fn1.apply(this);
            var o = this.options, r = o.radius, d = r * 2,
                r1 = r - (o.width / 2) - this._border(true),
                svgNS = "http://www.w3.org/2000/svg";
            this._circum = Math.PI * (r1 * 2);

            var $svg = $(document.createElementNS(svgNS, "svg"));
            $svg.attr({ "height": d, "width": d });

            this.$circle = $(document.createElementNS(svgNS, 'circle')).attr({
                "fill": "transparent", "class": "rs-transition", "cx": r, "cy": r, "r": r1,
                "stroke-width": o.width, "stroke-dasharray": this._circum
            }).addClass("path-bg");
            this._setDashOffset(this.$circle, this.options.counterClockwise ? this._start : this._end);
            $svg.append(this.$circle);

            this.$svg_box = $(document.createElement("div")).addClass("rs-transition rs-svg").append($svg).css({
                "height": d, "width": d, "transform-origin": "50% 50%",
                "transform": "rotate(" + (o.startAngle + 180) + "deg)"
            }).appendTo(this.innerContainer);
        }

        $.fn.roundSlider.prototype._setDashOffset = function ($ele, deg) {
            var flagValue = this.options.counterClockwise ? 0 : 1;
            var pct = (flagValue - (deg / 360)) * this._circum;
            $ele.css({ strokeDashoffset: pct });
        }
        /// ### ---- ### --------------------- ### ---- ### ///