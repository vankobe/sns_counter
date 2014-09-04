
$(function(){
	$("#sns-counter").on("submit", function(e){
		e.preventDefault();

		var twitter_api = "http://urls.api.twitter.com/1/urls/count.json";
		var facebook_api = "https://api.facebook.com/method/fql.query";
		
		var medias = ["media1", "media2"]
		$.each(medias, function(i, media){
			var url = $("#" + media + "_url").val();
			var $box = $("#" + media + "-box");
			var $ul = $("<ul>")
			$box.html("");
			$box.append($("<strong>").text(url))
			$box.append($ul);
			var twitter_params = {url: url};
			$.ajax({
				url: twitter_api,
				data: twitter_params,
				dataType: "jsonp",
				success: function(data){
			        $ul.append($("<li>").text("tweet_count: "+data.count))
				}
			});
			var facebook_params = {format: "json", query: 'select click_count, like_count, comment_count, share_count from link_stat where url="' + url + '"'}
			$.ajax({
				url: facebook_api,
				data: facebook_params,
				dataType: "jsonp",
				success: function(data){
					$.each(data, function(i, obj){
						$.each(obj, function(key, value){
							$ul.append($("<li>").text(key + ": " + value));
						})
					})
				}
			});
		})
	})
})
