/*
 Template Script

This script builds all functionality on the top of the content created by inline-docs.
*/
(function( global ) {
  "use strict";

  var InlineDocs = (function() {

    var contentColumn,
        navigationColumn;

    return {
      init: function() {
        buildLayout();
        iterateHeaders();
        updateFloatingHeader();
        contentColumn.onscroll = updateFloatingHeader;
      }
    };

    /*
      ## Building the layout

      Markup of the layout:

      ```
      <layout>
        <row>
          <column class="navigation"></column>
          <column class="content"></column>
        <row>
      <layout>

      ```
    */
    function buildLayout() {
      var layout = document.createElement("layout"),
          content = document.body.firstElementChild;

      // > Wrap the content created by inline-docs with the template markup
      layout.innerHTML = "<row>"
                       + "<column class='navigation'></column>"
                       + "<column class='content'></column>"
                       + "</row>";
      document.body.firstElementChild.remove();
      document.body.insertBefore(layout, document.body.firstChild);
      contentColumn = document.querySelectorAll("column.content")[0];
      contentColumn.appendChild(content);
    }

/*
## Iterate headers

Look for `h1`, `h2`, `h3`, `h4`, `h5` and `h6` elements inside content.
*/
    function iterateHeaders() {
      var parentLevel = 0,
          navigationMarkup = "";

      [].forEach.call(contentColumn.querySelectorAll("h1"), function(header) {
        var currentLevel,
            headerText;

        // > Trigger addAnchor(header)
        addAnchor(header);

        // > Check header level hierarchy to build the markup
        currentLevel = header.tagName.substring(1);

        // > If it's a `<h1>`, trigger floatingHeaders(header)
        if (currentLevel == 1) {
          floatingHeaders(header);
        }

        // > Check headers hierarchy
        if (currentLevel > parentLevel) {
          navigationMarkup += "<ul class='level-" + currentLevel + "'>";
        } else if (currentLevel === parentLevel) {
          navigationMarkup += "</li>";
        } else {
          navigationMarkup += "</li></ul></li>";
        }

        // > Include current level link
        headerText = header.innerText || header.textContent;
        navigationMarkup += "<li class='level-" + currentLevel + "'>";
        navigationMarkup += "<a href='#" + header.id + "'";

        // > Set .active class in the very first <a>
        if (parentLevel === 0) {
          navigationMarkup += " class='active'";
        }

        navigationMarkup += ">" + headerText  + "";

        // > Include filename information in all `<h1>`
        if (currentLevel == 1) {
          navigationMarkup += "<span class='filename'>" + header.parentNode.parentNode.dataset.filename + "</span>";
        }
        navigationMarkup += "</a>";

        parentLevel = currentLevel;
      });

      navigationMarkup += '</li></ul>';

      // > Include the navigation markup
      navigationColumn = document.querySelectorAll("column.navigation")[0];
      navigationColumn.innerHTML = navigationMarkup;
    }

    /*
      ## Add anchor to all header with proper id
    */
    function addAnchor(header) {
      var anchor = document.createElement("a");

      // > If the header don't have an Id, create one
      if (header.id === "" || header.id === "undefined") {
          header.id = header.innerHTML.toLowerCase().replace(/[^\w]+/g, "-");
      }

      // > Wrap the header in the anchor
      anchor.href = "#" + header.id;
      anchor.innerHTML = header.innerHTML;
      header.innerHTML = "";
      header.appendChild(anchor);
    }

    /*
      ## floatingHeaders(header)
    */
    function floatingHeaders(header) {
      var headerClone = header.cloneNode(true);

      headerClone.id = "";
      headerClone.classList.add("floating");
      header.parentNode.insertBefore(headerClone, header.nextSibling);
    }

    /*
      ## updateFloatingHeader()
    */
    function updateFloatingHeader() {
      [].forEach.call(document.getElementsByTagName("section"), function(section) {
        // very long description about this mess
        // very long description about this mess
        // very long description about this mess
        // very long description about this mess
        // testing multiple inline comments for docs
        // instead block comments
        var scrollTop = contentColumn.scrollTop,
            offsetTop = section.offsetTop,
            offsetHeight = section.offsetHeight,
            floatingElement = section.getElementsByClassName("floating")[0],
            sectionPaddingTop = parseInt(window.getComputedStyle(section, null).getPropertyValue('padding-top')),
            sectionPaddingBottom = parseInt(window.getComputedStyle(section, null).getPropertyValue('padding-bottom'));

        if (floatingElement) {
          if ((scrollTop > offsetTop) && (scrollTop < offsetTop + (offsetHeight - sectionPaddingTop - sectionPaddingBottom))) {
            floatingElement.style.visibility = "visible";
            floatingElement.style.top = Math.min(scrollTop - offsetTop, offsetHeight - floatingElement.offsetHeight) - sectionPaddingTop - 1 + "px";

            // > call affix
            affixNavigation(floatingElement.getElementsByTagName("a")[0].getAttribute("href"));
          } else {
            floatingElement.style.visibility = "hidden";
            floatingElement.style.top = "0";
          }
        }
      });
    }

    /*
      ## affixNavigation
    */
    function affixNavigation(href) {
      [].forEach.call(document.querySelectorAll(".navigation a"), function(anchor) {
        anchor.classList.remove("active");
      });
      document.querySelectorAll(".navigation a[href='" + href + "']")[0].classList.add('active');
    }

  })();

  global.InlineDocs = InlineDocs;
  InlineDocs.init();

})( this );
