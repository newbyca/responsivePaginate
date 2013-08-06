jQuery.fn.responsivePaginate = function () {

    "use strict";

    {
        var $this = $(this);
        for(var i = 0, max = $this.length; i < max; i++)
        	new responsivePaginate($($this[i]));
    }

    function responsivePaginate($container){

	    this.toHtml = function() {
	        var html = "<a href='" + this.links.eq(0).attr("href") + "' style='visibility: visible;'>|&lt;</a>";
	        html = this.appendHtml(html, this.lowerSkip, this.lowerTo);
	        html += "<div style='visibility: visible;'>...</div>";
	        html = this.appendHtml(html, this.upperSkip, this.upperTo);
	        html += "<a href='" + this.links.eq(this.linkCount - 1).attr("href") + "' style='visibility: visible;'>&gt;|</a>";
	        this.$this.html(html);
	    }

	    this.reset = function () {
	        this.pagerButtons = this.calculatePagerButtons();
	        this.ellipsisPoint = (this.selectedPage <= this.linkCount / 2)
	            ? Math.floor(3 * this.pagerButtons / 4)
	            : Math.ceil(this.pagerButtons / 4)
	        ;
	        var lowerTake = this.ellipsisPoint - 1;
	        var upperTake = this.pagerButtons - this.ellipsisPoint;
	        this.lowerSkip = (this.selectedPage > lowerTake / 2) && (this.selectedPage <= this.linkCount / 2)
	            ? this.selectedPage - Math.floor(lowerTake / 2)
	            : 0
	        ;
	        this.upperSkip = (this.selectedPage > this.linkCount / 2) && (this.selectedPage <= this.linkCount - (upperTake / 2))
	            ? this.selectedPage - Math.floor(upperTake / 2)
	            : this.linkCount - upperTake
	        ;
	        this.lowerTo = this.lowerSkip + lowerTake;
	        this.upperTo = this.upperSkip + upperTake;
	    }

	    this.appendHtml = function (html, from, to) {
	        for (var i = from; i < to; i++)
	            if (i == (this.selectedPage - 1))
	                html += "<div style='visibility: visible;'>" + this.links.eq(i).html() + "</div>";
	            else
	                html += "<a href='" + this.links.eq(i).attr("href") + "' style='visibility: visible;'>" + this.links.eq(i).html() + "</a>";
	        return html;
	    }

	    this.measureWidest = function () {
	        var result = 0;
	        for (var i = 0, max = this.links.length; i < max; i++)
	            result = Math.max(result, this.links.eq(i).outerWidth(true));
	        result = Math.floor(result);
	        return result;
	    }

	    this.findSelectedPage = function () {
	        for (var i = 0, max = this.links.length; i < max; i++)
	        {
				var selected = this.links.eq(i).attr("data-selected");
	            if (selected && (selected.toLowerCase() == "true"))
	                return i + 1;
	        }
	        return 1;
	    }

	    this.calculatePagerButtons = function () {
	        var result = this.width() / this.widest;
	        result = Math.max(5, Math.floor(result - 2));
	        return result;
	    }

	    this.width = function () {
	        return Math.floor(this.$this.width());
	    }

	    this.$this = $container;
        this.links = this.$this.children("a");
        this.widest = this.measureWidest();
        this.linkCount = this.links.length;
        this.selectedPage = this.findSelectedPage();
        this.pagerButtons = 0;
        this.ellipsisPoint = 0;
        this.lowerSkip = 0;
        this.lowerTo = 0;
        this.upperSkip = 0;
        this.upperTo = 0;
        this.reset();
        this.toHtml();

        $(window).resize($.proxy(
        	function () { this.reset(); this.toHtml();}, 
        	this
        	));

    }

};