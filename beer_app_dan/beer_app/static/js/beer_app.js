var url = "/data"; //assign all data to a temp variable so as not to edit data file1
d3.json(url).then(function(response) {
  
var tbody = d3.select("tbody");  //Store the body of the table
var style = d3.select("#style");  //Capture the user's style to search for 
var beerName = d3.select("#beer_name");  //Capture the user's beer to search for 
var state = d3.select("#state"); //Capture the user's state to search for
var brewery = d3.select("#brewery"); //Capture the user's state to search for
var city = d3.select("#city"); //Capture the user's state to search for
var rating = d3.select("#rating"); //Capture the user's rating to search for
var votes = d3.select("#votes"); //Capture the user's rating to search for
var ABV = d3.select("#ABV"); //Capture the user's ABV to search for
var IBU = d3.select("#IBU"); //Capture the user's IBU to search for
var form = d3.select("#beer_form"); //Capture name of the form to reset
var reset = d3.select("#filter_btn");  // listener to reset form data
var flag = 0;  //flag to check if user data was found...or not
//var beer = "/data";

//  Initial population of page with all data
resetData(); 


// Put column header values on the table
function tableHeaders() {
    var row = tbody.append("tr");
    for (var i = 0; i < 10  ; i++) {
        var cell = row.append("td");
        switch(i) {
            case 0:  // if (x === 'value1')
              cell.text('Beer');          
              break;
            case 1:  // if (x === 'value1')
              cell.text('Style');          
              break;
            case 2:  // if (x === 'value2')
              cell.text("IBU");
              break;
            case 3:  // if (x === 'value2')
              cell.text("ABV");
              break;
            case 4:  // if (x === 'value2')
              cell.text("rating");
              break;
            case 5:
              cell.text("Beer Votes");
              break;
            case 6:
              cell.text("Brewery");
              break;
            case 7:
              cell.text("City");
              break;
            case 8:
              cell.text("State");
              break;
            default:
              cell.text("Region");
        }
    }
}

function displayData(match) {
  var row = tbody.append("tr");  //add a row to the (new) table            
  var cell = row.append("td");  //add a column to the row
  cell.text(match.beer_name);
  cell = row.append("td");  //add a column to the row
  cell.text(match.beer_style);
  cell = row.append("td");  //add a column to the row
  cell.text("IBU's to come..");
  cell = row.append("td");  //add a column to the row
  cell.text(match.beer_abv);
  cell = row.append("td");  //add a column to the row
  cell.text(match.beer_rating);
  cell = row.append("td");  //add a column to the row
  cell.text(match.beer_rating_votes);
  cell = row.append("td");  //add a column to the row
  cell.text(match.brewery);
  cell = row.append("td");  //add a column to the row
  cell.text(match.brewery_city);
  cell = row.append("td");  //add a column to the row
  cell.text(match.brewery_state);
  cell = row.append("td");  //add a column to the row
  cell.text(match.brewery_region);            
}

//  After filtering, user can (re)display all data
function resetData() {
    d3.selectAll("tr").remove();  //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        var row = tbody.append("tr");  //add a row to the table 
                var cell = row.append("td");  //add a column to the row
                cell.text(beer.beer_name);
                cell = row.append("td");  //add a column to the row
                cell.text(beer.beer_style);
                cell = row.append("td");  //add a column to the row
                cell.text("IBU's to come..");
                cell = row.append("td");  //add a column to the row
                cell.text(beer.beer_abv);
                cell = row.append("td");  //add a column to the row
                cell.text(beer.beer_rating);
                cell = row.append("td");  //add a column to the row
                cell.text(beer.beer_rating_votes);
                cell = row.append("td");  //add a column to the row
                cell.text(beer.brewery);
                cell = row.append("td");  //add a column to the row
                cell.text(beer.brewery_city);
                cell = row.append("td");  //add a column to the row
                cell.text(beer.brewery_state);
                cell = row.append("td");  //add a column to the row
                cell.text(beer.brewery_region);            
    }); //End loop of each record
}

// Filter by style
function filterStyle(event) {
    var tbody = d3.select("tbody"); // select the body of the beer table
    var theStyle = d3.event.target.value.toLowerCase(); // store user-selected data
    d3.selectAll("tr").remove();  // remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.beer_style.toLowerCase() == theStyle) { //iterate through data looking to match user's date
            flag = 1;  //found data!
            displayData(beer);  
        } //End loop of each record        
    });
    if (flag == 0) {  // if style not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for style: " + theStyle);
    }    
    flag = 0; //reset flag
}  //end filterStyle function

// Filter by city
function filterCity(event) {
    var tbody = d3.select("tbody"); // select the body of the beer table
    var theCity = d3.event.target.value.toLowerCase(); // store user-selected data
    d3.selectAll("tr").remove();  // remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.brewery_city.toLowerCase() == theCity) { //iterate through data looking to match user's date
            flag = 1;  //found data!
            displayData(beer);  
        } //End loop of each record        
    });
    if (flag == 0) {  // if style not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for style: " + theCity);
    }    
    flag = 0; //reset flag
}  //end filterStyle function

// Filter by beer name
function filterName(event) {
    var tbody = d3.select("tbody"); // select the body of the beer table
    var theName = d3.event.target.value.toLowerCase(); // store user-selected data
    d3.selectAll("tr").remove();  // remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.beer_name.toLowerCase() == theName) { //iterate through data looking to match user's name
            flag = 1;  //found data!            
            displayData(beer);
        } //End loop of each record        
    });
    if (flag == 0) {  // if name not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for beer: " + theName);
    }    
    flag = 0; //reset flag
}  //end filterName function

// function getBeers() {
//     //var beerName = d3.event.target.value.toLowerCase(); // store user-selected data
//     var beerList = [];
//     response.forEach(function(beer) {
//           if (!(beerList.includes(beer.beer_name))) {
//             beerList.push(beer.beer_name);
//           }
//     });  //end filterName function
//     //console.log("beer list: ", beerList);
// }
// Filter by rating
function filterRating(event) {
    var tbody = d3.select("tbody");     // select the body of the beer table
    var theRating = d3.event.target.value;
    d3.selectAll("tr").remove(); //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.beer_rating >= theRating) { //iterate through data looking to match user's rating
            flag = 1; //found data!
            displayData(beer);
        } //End loop of each record
    });
    if (flag == 0) {  // if rating not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for rating at or above: " + theRating);
    }
    flag = 0; //reset flag
} //end filterRating function

// Filter by rating
function filterVotes(event) {
    console.log("Filter by votes...");
    var tbody = d3.select("tbody");     // select the body of the beer table
    var theVote = d3.event.target.value;
    d3.selectAll("tr").remove(); //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.beer_rating_votes >= theVote) { //iterate through data looking to match user's rating
            flag = 1; //found data!
            displayData(beer);
        } //End loop of each record
    });
    if (flag == 0) {  // if rating not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for that many votes!");
    }
    flag = 0; //reset flag
} //end filterRating function

// Filter by state
function filterState() {
    var tbody = d3.select("tbody");  // select the body of the beer table    
    var theState = d3.event.target.value.toLowerCase();  //store user-selected state as lowercase
    d3.selectAll("tr").remove();  //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) { 
        if (beer.brewery_state.toLowerCase() == theState) {  //iterate through data looking to match user's state
            flag = 1;  // found data!
            displayData(beer);
        } //End loop of each record   
    });
    if (flag == 0) {  // if state not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for state: " + theState);
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("Try using a 2-letter abbrievation instead.");
    }
    flag = 0;  //reset flag
}  // end filterState function

function filterBrewery() {
    var tbody = d3.select("tbody");  // select the body of the beer table    
    var theBrewery = d3.event.target.value.toLowerCase();  //store user-selected state as lowercase
    d3.selectAll("tr").remove();  //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) { 
        if (beer.brewery.toLowerCase() == theBrewery) {  //iterate through data looking to match user's state
            flag = 1;  // found data!
            displayData(beer);
        } //End loop of each record   
    });
    if (flag == 0) {  // if state not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for state: " + theBrewery);
    }
    flag = 0;  //reset flag
}  // end filterState function

// Filter by ABV
function filterABV() {
    var tbody = d3.select("tbody");// select the body of the UFO table
    var theABV = +d3.event.target.value; //store user-selected value
    d3.selectAll("tr").remove(); //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.beer_abv >= theABV) { //iterate through data looking to match user's ABV
            flag = 1; //found data!
            displayData(beer);
        } //End loop of each record       
    });
    if (flag == 0) {  // if ABV not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for ABV at or above: " + theABV);
    }
    flag = 0;  //reset flag    
} //end loop to check for match of ABV

// Filter by IBU
function filterIBU() {
    var tbody = d3.select("tbody");// select the body of the UFO table
    var theIBU = +d3.event.target.value; //store user-selected value
    d3.selectAll("tr").remove(); //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.IBU >= theIBU) { //iterate through data looking to match user's ABV
            flag = 1; //found data!
            var row = tbody.append("tr"); //add a row to the (new) table
            Object.entries(beer).forEach(function([key, value]) {
                var cell = row.append("td");//add a column to the row
                cell.text(value);//add data to the cell
            }); 
        } //End loop of each record       
    });
    if (flag == 0) {  // if country not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for IBU at or above: " + theIBU);
    }
    flag = 0;  //reset flag        
} //end loop to check for match of IBU

//Listeners...
$(function () {
    var beerList = [];
    response.forEach(function(beer) {
          if (!(beerList.includes(beer.beer_name))) {
            beerList.push(beer.beer_name);
          }
    });  //end filterName function
    $("#beer_name").autocomplete({
        source:beerList
    });
});

$(function () {
    var brewList = [];
    response.forEach(function(beer) {
          if (!(brewList.includes(beer.brewery))) {
            brewList.push(beer.brewery);
          }
    });  //end filterName function
    $("#brewery").autocomplete({
        source:brewList
    });
});

$(function () {
    var styleList = [];
    response.forEach(function(beer) {
          if (!(styleList.includes(beer.beer_style))) {
            styleList.push(beer.beer_style);
          }
    });  //end filterName function
    $("#style").autocomplete({
        source:styleList
    });
});

style.on("change", filterStyle);  // If user searches by styl
state.on("change", filterState);  // If user searches by state
city.on("change", filterCity);  // If user searches by state
rating.on("change", filterRating);  //  If user searches by rating
votes.on("change", filterVotes);  //  If user searches by rating
ABV.on("change", filterABV);  //  If user searches by ABV
IBU.on("change", filterIBU);  //  If user searches by IBU
beerName.on("change", filterName);  //  If user searches by IBU
brewery.on("change", filterBrewery);  //  If user searches by IBU
reset.on("click", resetData);  //  If user wants to see all data

//Deny attempt to reset page & remove data  
form.on("click", function() {d3.event.preventDefault();} )  

});