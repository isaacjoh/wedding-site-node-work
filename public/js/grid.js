/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
(function(window) {
  /**
   * GridLoaderFx obj.
   */
  function GridLoaderFx(el, options) {
    this.el = el;
    this.items = this.el.querySelectorAll(".grid__item > .grid__link");
  }

  /**
   * Effects.
   */
  GridLoaderFx.prototype.effects = {
    Hapi: {
      animeOpts: {
        duration: function(t, i) {
          return 600 + i * 75;
        },
        easing: "easeOutExpo",
        delay: function(t, i) {
          return i * 50;
        },
        opacity: {
          value: [0, 1],
          easing: "linear"
        },
        scale: [0, 1]
      }
    }
  };

  GridLoaderFx.prototype._render = function(effect) {
    grids[0].classList.remove("grid--hidden");
    console.log("removed");

    // Reset styles.
    this._resetStyles();

    var self = this,
      effectSettings = this.effects[effect],
      animeOpts = effectSettings.animeOpts;

    if (effectSettings.perspective != undefined) {
      [].slice.call(this.items).forEach(function(item) {
        item.parentNode.style.WebkitPerspective = item.parentNode.style.perspective =
          effectSettings.perspective + "px";
      });
    }

    if (effectSettings.origin != undefined) {
      [].slice.call(this.items).forEach(function(item) {
        item.style.WebkitTransformOrigin = item.style.transformOrigin =
          effectSettings.origin;
      });
    }

    if (effectSettings.lineDrawing != undefined) {
      [].slice.call(this.items).forEach(function(item) {
        // Create SVG.
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
          path = document.createElementNS("http://www.w3.org/2000/svg", "path"),
          itemW = item.offsetWidth,
          itemH = item.offsetHeight;

        svg.setAttribute("width", itemW + "px");
        svg.setAttribute("height", itemH + "px");
        svg.setAttribute("viewBox", "0 0 " + itemW + " " + itemH);
        svg.setAttribute("class", "grid__deco");
        path.setAttribute(
          "d",
          "M0,0 l" + itemW + ",0 0," + itemH + " -" + itemW + ",0 0,-" + itemH
        );
        path.setAttribute("stroke-dashoffset", anime.setDashoffset(path));
        svg.appendChild(path);
        item.parentNode.appendChild(svg);
      });

      var animeLineDrawingOpts = effectSettings.animeLineDrawingOpts;
      animeLineDrawingOpts.targets = this.el.querySelectorAll(
        ".grid__deco > path"
      );
      anime.remove(animeLineDrawingOpts.targets);
      anime(animeLineDrawingOpts);
    }

    if (effectSettings.revealer != undefined) {
      [].slice.call(this.items).forEach(function(item) {
        var revealer = document.createElement("div");
        revealer.className = "grid__reveal";
        if (effectSettings.revealerOrigin != undefined) {
          revealer.style.transformOrigin = effectSettings.revealerOrigin;
        }
        if (effectSettings.revealerColor != undefined) {
          revealer.style.backgroundColor = effectSettings.revealerColor;
        }
        item.parentNode.appendChild(revealer);
      });

      var animeRevealerOpts = effectSettings.animeRevealerOpts;
      animeRevealerOpts.targets = this.el.querySelectorAll(".grid__reveal");
      animeRevealerOpts.begin = function(obj) {
        for (var i = 0, len = obj.animatables.length; i < len; ++i) {
          obj.animatables[i].target.style.opacity = 1;
        }
      };
      anime.remove(animeRevealerOpts.targets);
      anime(animeRevealerOpts);
    }

    if (effectSettings.itemOverflowHidden) {
      [].slice.call(this.items).forEach(function(item) {
        item.parentNode.style.overflow = "hidden";
      });
    }

    animeOpts.targets =
      effectSettings.sortTargetsFn &&
      typeof effectSettings.sortTargetsFn === "function"
        ? [].slice.call(this.items).sort(effectSettings.sortTargetsFn)
        : this.items;
    anime.remove(animeOpts.targets);
    anime(animeOpts);
  };

  GridLoaderFx.prototype._resetStyles = function() {
    this.el.style.WebkitPerspective = this.el.style.perspective = "none";
    [].slice.call(this.items).forEach(function(item) {
      var gItem = item.parentNode;
      item.style.opacity = 0;
      item.style.WebkitTransformOrigin = item.style.transformOrigin = "50% 50%";
      item.style.transform = "none";

      var svg = item.parentNode.querySelector("svg.grid__deco");
      if (svg) {
        gItem.removeChild(svg);
      }

      var revealer = item.parentNode.querySelector(".grid__reveal");
      if (revealer) {
        gItem.removeChild(revealer);
      }

      gItem.style.overflow = "";
    });
  };

  window.GridLoaderFx = GridLoaderFx;

  var body = document.body,
    grids = [].slice.call(document.querySelectorAll(".grid")),
    masonry = [],
    currentGrid = 0,
    // The GridLoaderFx instances.
    loaders = [],
    loadingTimeout;

  function init() {
    // Preload images
    imagesLoaded(body, function() {
      // Initialize Masonry on each grid.
      grids.forEach(function(grid) {
        var m = new Masonry(grid, {
          itemSelector: ".grid__item",
          columnWidth: ".grid__sizer",
          percentPosition: true,
          transitionDuration: 0
        });
        masonry.push(m);
        // Hide the grid.
        grid.classList.add("grid--hidden");
        // Init GridLoaderFx.
        loaders.push(new GridLoaderFx(grid));
      });

      // Show current grid.
      // Remove loading class from body
      body.classList.remove("loading");
    });
  }

  var isImagesLoaded = false;

  $(function() {
    $.scrollify({
      section: ".slide",
      sectionName: "section-name",
      before: function(index, array) {
        if (index === 1) {
          setTimeout(function() {
            $(".map-btn").addClass("cool-color-effect");
          }, 750);
        } else if (index === 3 && !isImagesLoaded) {
          setTimeout(function() {
            loaders[0]._render("Hapi");
            isImagesLoaded = true;
          }, 500);
        }
      },
      after: function(index, array) {}
    });
  });

  init();
})(window);
