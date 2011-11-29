var nicem = (function () {
    var nicem = {};
    pageLoad = {};
	
	nicem.init = function () {
        setupPageLoadEvent();
        nicem.subscribeToPageLoad("pageLoad", ajaxPageLoad);

		$.mobile.loadingMessage = "searching..."
		$('#searchbutton').click(performSearch);
    };

    nicem.subscribeToPageLoad = function (name, func) {
        if (typeof func === "function") {
            pageLoad[name] = func;
        }
    };

	function performSearch() {
		
		var url = "https://sandbox-syndication.evidence.nhs.uk/services/search/results?q=" + $('#search').val();
		
		$.ajax({
		        url: url,
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Accept', 'application/json');
					xhr.setRequestHeader('API-Key', '5a7a8af2-4084-4632-ba1d-556946e63363');
				},
	            success: function(data, textStatus, jqXhr) {
	                
					$('#searchresults').empty();
					
					var addDocument = function(doc) {
						
						var template = "<li data-theme=\"c\" class=\"ui-li ui-li-static ui-body-a\">" + 
							"<a href=" + doc.Url + " data-transition=\"pop\" class=\"ui-link-inherit\">" +
							"<h3 class=\"ui-li-heading\">" + doc.Title + "</h3>" +
							"<p class=\"ui-li-desc\">" + doc.Abstract + "</p>" +
						"</a><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>";
						
						$('#searchresults').append(template);
					};
	
					jQuery.each(data.Documents,function(){
						addDocument(this);
					});
	            }
	        });
		
		return false;
	}

    function setupPageLoadEvent () {
        $('div[data-role="page"]').live('pagebeforecreate', function() {
            for (var key in pageLoad) {
                if (pageLoad.hasOwnProperty(key)) {
                    pageLoad[key]($(this).attr("id"));
                }
            }
        });
    }
	
    function ajaxPageLoad (id) {
		// This function setup to fire on each ajax page load.
		console.log(id);
    }
	
    return nicem;
})();

$(document).ready(function () {
    nicem.init();
});

$(document).bind("mobileinit", function(){
  $.extend($.mobile, {
      allowCrossDomainPages: true
  });
});

