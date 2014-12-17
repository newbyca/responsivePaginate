jQuery.fn.responsivePaginate = function () {

    "use strict";

    {
        var $this = $(this);
        for (var i = 0, max = $this.length; i < max; i++)
            new responsivePaginate($($this[i]));
    }

    function responsivePaginate($container) {

        this.toHtml = function () {
            if (this.linkCount < 1)
                return;
            var html = "<a href='" + this.links[0].href + "' style='visibility: visible;'>|&lt;</a>";
            html = this.appendHtml(html, this.lowerSkip, this.lowerTo);
            html += "<div style='visibility: visible;'>...</div>";
            html = this.appendHtml(html, this.upperSkip, this.upperTo);
            html += "<a href='" + this.links[this.linkCount - 1].href + "' style='visibility: visible;'>&gt;|</a>";
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
            for (var i = from; i < to; i++) {
                var link = this.links[i];
                if (typeof link == "undefined")
                    break;
                if (i == (this.selectedPage - 1))
                    html += "<div style='visibility: visible;'>" + link.html + "</div>";
                else
                    html += "<a href='" + link.href + "' style='visibility: visible;'>" + link.html + "</a>";
            }
            return html;
        }

        this.measureWidest = function () {
            var result = 0;
            for (var i = 0, max = this.links.length; i < max; i++)
                result = Math.max(result, this.links[i].outerWidth);
            result = Math.floor(result);
            return result;
        }

        this.findSelectedPage = function () {
            for (var i = 0, max = this.links.length; i < max; i++) {
                if (this.links[i].selected)
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

        this.getLinks = function (anchorTags) {
            var results = [];
            for (var i = 0, max = anchorTags.length; i < max; i++) {
                var anchor = anchorTags.eq(i);
                var selected = anchor.attr("data-selected");
                if (selected && (selected.toLowerCase() == "true"))
                    selected = true;
                else
                    selected = false;
                var link = {};
                link.selected = selected;
                link.outerWidth = anchor.outerWidth(true);
                link.href = anchor.attr("href");
                link.html = anchor.html();
                results.push(link);
            }
            return results;
        }

        this.$this = $container;
        this.links = this.getLinks(this.$this.children("a"));
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
        	function () { this.reset(); this.toHtml(); },
        	this
        ));
    }

};
