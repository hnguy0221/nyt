// Built by LucyBot. www.lucybot.com
/*id=“searchTerm”

[1:12] 
id=“recordQuantity”

[1:13] 
id=“startYear”

[1:13] 
id=“endYear”*/
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var searchParams;


function searchArticles() {
  $.ajax({
    url: url,
    method: 'GET',
    data: {
      "api-key": "ee0106774a624bacb1b2e05e789ce624"
    }
  }).done(function(result) {
    console.log(result.response.docs);
    $(".targetDiv").html(JSON.stringify(result.response.docs));
  }).fail(function(err) {
    throw err;
  });
}
function createArticles() {
}

function clearFormData() {
}

$(document).on("click", "#searchButton", searchArticles);