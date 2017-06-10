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
var apiKey = "ee0106774a624bacb1b2e05e789ce624";


function searchArticles(values) {
  url += "?" + $.param({
    "api-key": apiKey,
    q: values.searchTerm,
    begin_date: values.startYear,
    end_date: values.endYear
  });
  console.log(values);
  $.ajax({
    url: url,
    method: 'GET',
    data: {
      "api-key": "ee0106774a624bacb1b2e05e789ce624"
    }
  }).done(function(result) {
    console.log(result.response.docs);
    //$(".targetDiv").html(JSON.stringify(result.response.docs));
  }).fail(function(err) {
    throw err;
  });
}

function createArticles() {
}

function clearFormData() {
}

$('form').submit(function(e) {
  e.preventDefault();
  var $inputs = $('#articleFormEntry :input:not(:button)');
  var values = {};
  $inputs.each(function() {
    var id = $(this)[0].id;
    console.log($(this).val());
    values[id] = $(this).val();
    $(this).val('');
  });
  console.log(values);
  searchArticles(values);
});
// $("#searchButton").click();

// $(document).on("click", "#searchButton", clearFormData);