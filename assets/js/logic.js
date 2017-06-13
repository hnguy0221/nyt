var queryBaseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var searchParams;
var apiKey = "55d2c173aafb46f28a31f032dc749014";
var queryUrl = "";

//function searchArticles(values) 
function searchArticles() 
{
  // prevent form from trying to submit/refresh the page
  event.preventDefault();
  
  var searchTerm = $("#searchTerm").val().trim();
  var noOfRecordsIn = $("#recordQuantity").val().trim();
  var noOfRecordsDisplay = 5;
  var startYear = $("#startYear").val().trim();
  var endYear = $("#endYear").val().trim();

  // url += "?" + $.param({
  //   "api-key": apiKey,
  //   q: values.searchTerm,
  //   begin_date: values.startYear,
  //   end_date: values.endYear
  // });
  if (searchTerm === "")
  {
    alert("Please enter the search term!");
  }
  else
  {
    if (noOfRecordsIn !== "")
    {
        noOfRecordsDisplay = parseInt(noOfRecordsIn);
    }

    queryUrl = queryBaseUrl + "?q=" + searchTerm;

    if (startYear !== "")
    {
      startYear += "1231";
      queryUrl += "&begin_date=" + startYear;
    }

    if (endYear !== "")
    {
      endYear += "1231";
      queryUrl += "&end_date=" + endYear;
    }

    queryUrl += "&api-key=" + apiKey;

    console.log(queryUrl);

    $.ajax({
      url: queryUrl,
      method: "GET"/*,
      data: {
       "api-key": "55d2c173aafb46f28a31f032dc749014"
      }*/
    }).done(function(result) {
      var htmlStr;
      //var myJSON = JSON.stringify(result.response.docs);
      //console.log(myJSON);
      var len = result["response"]["docs"].length;
      console.log("len="+len);
      $(".article").empty();
      for (var i = 0; i < noOfRecordsDisplay; i++)
      {
        var headline = result["response"]["docs"][i]["headline"]["main"];
        console.log((i+1) + " " + headline);
        var sectionNm = result["response"]["docs"][i]["section_name"];
        console.log("section_name: " + sectionNm);
        var pubDt = result["response"]["docs"][i]["pub_date"];
        console.log("pub_date: " + pubDt);
        var webUrl = result["response"]["docs"][i]["web_url"];
        console.log("web_url: " + webUrl);
        htmlStr = "<div><h3>" + (i+1) + " " + headline + "</h3>" +
                  "     <p>Section: " + sectionNm + "</p>" +
                  "     <p>" + pubDt + "</p>" + 
                  "     <a href='" + webUrl + "'>" + webUrl + "</a>"
                  "</div>";
        console.log(htmlStr);
        $(".article").append(htmlStr);
      }
      //$(".article").html(htmlStr);
    }).fail(function(err) {
      //console.log(err);
      throw err;
    });
  }
}

function createArticles() {
}

function clearResults() {
  $(".article").empty();
}

$(document).ready(function() {

  // $('form').submit(function(e) {
  //   e.preventDefault();
  //   var $inputs = $('#articleFormEntry :input:not(:button)');
  //   var values = {};
  //   $inputs.each(function() {
  //     var id = $(this)[0].id;
  //     console.log($(this).val());
  //     values[id] = $(this).val();
  //     $(this).val('');
  //   });
  //   console.log(values);
  //   searchArticles(values);
  // });
  $("#searchButton").on("click", searchArticles);
  $("#clear").on("click", clearResults);
});