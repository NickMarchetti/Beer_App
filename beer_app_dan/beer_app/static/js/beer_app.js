// from alien_data.js
  
  var url = "/data"; //assign all data to a temp variable so as not to edit data file1
  console.log("Table Data:", url);
  d3.json(url).then(function(response) {
      console.log(response);      
  
var tbody = d3.select("tbody");  //Store the body of the table
var style = d3.select("#style");  //Capture the user's style to search for 
var state = d3.select("#state"); //Capture the user's state to search for
var rating = d3.select("#rating"); //Capture the user's rating to search for
var ABV = d3.select("#ABV"); //Capture the user's ABV to search for
var IBU = d3.select("#ABV"); //Capture the user's IBU to search for
var form = d3.select("#beer_form"); //Capture name of the form to reset
var reset = d3.select("#filter_btn");  // listener to reset form data
var flag = 0;  //flag to check if user data was found...or not
var beer = "/data";

//  Initial population of page with all data
resetData(); 

// Put column header values on the table
function tableHeaders() {
    var row = tbody.append("tr");
    for (var i = 0; i < 7; i++) {
        var cell = row.append("td");
        switch(i) {
            case 0:  // if (x === 'value1')
              cell.text('City');          
              break;
            case 1:  // if (x === 'value2')
              cell.text("State");
              break;
            case 2:  // if (x === 'value2')
              cell.text("Brewery");
              break;
            case 3:
              cell.text("Rating");
              break;
            case 4:
              cell.text("IBU");
              break;
            case 5:
              cell.text("ABV");
              break;
            default:
              cell.text("style");
        }
    }
}

//  After filtering, user can (re)display all data
function resetData() {
    d3.selectAll("tr").remove();  //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        var row = tbody.append("tr");  //add a row to the table 
        Object.entries(beer).forEach(function([key, value]) {
            var cell = row.append("td");  //add a column to the row
            cell.text(value);  //add data to the cell
        });     
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
            var row = tbody.append("tr");  //add a row to the (new) table
            Object.entries(beer).forEach(function([key, value]) {
                var cell = row.append("td"); // add a column to the row
                cell.text(value);  //add data to the cell
            });                 
        } //End loop of each record        
    });
    if (flag == 0) {  // if style not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for style: " + theStyle);
    }    
    flag = 0; //reset flag
}  //end filterStyle function

// Filter by rating
function filterRating(event) {
    var tbody = d3.select("tbody");     // select the body of the beer table
    var theRating = d3.event.target.value;
    d3.selectAll("tr").remove(); //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.beer_rating >= theRating) { //iterate through data looking to match user's rating
            flag = 1; //found data!
            var row = tbody.append("tr"); //add a row to the (new) table
            Object.entries(beer).forEach(function([key, value]) {
                var cell = row.append("td"); //add a column to the row
                cell.text(value);  // add data to the cell
            });                 
        } //End loop of each record
    });
    if (flag == 0) {  // if rating not found, return message
        row = tbody.append("tr");
        var cell = row.append ("td");
        cell.text("No data found for rating at or above: " + theRating);
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
        console.log("brewery_state:", beer.brewery_state);
        console.log("theState", theState);
            flag = 1;  // found data!
            var row = tbody.append("tr");  //add a row to the (new) table
            Object.entries(beer).forEach(function([key, value]) {
                var cell = row.append("td");  //add a column to the row
                cell.text(value);  // add data to the cell
            });                 
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

// Filter by ABV
function filterABV() {
    var tbody = d3.select("tbody");// select the body of the UFO table
    var theABV = +d3.event.target.value; //store user-selected value
    d3.selectAll("tr").remove(); //remove any data currently in the table
    tableHeaders();  //add table headers back in
    response.forEach(function(beer) {
        if (beer.ABV >= theABV) { //iterate through data looking to match user's ABV
            flag = 1; //found data!
            var row = tbody.append("tr"); //add a row to the (new) table
            Object.entries(beer).forEach(function([key, value]) {
                var cell = row.append("td");//add a column to the row
                cell.text(value);//add data to the cell
            }); 
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
style.on("change", filterStyle);  // If user searches by styl
state.on("change", filterState);  // If user searches by state
rating.on("change", filterRating);  //  If user searches by rating
ABV.on("change", filterABV);  //  If user searches by ABV
IBU.on("change", filterIBU);  //  If user searches by IBU
reset.on("click", resetData);  //  If user wants to see all data

//Deny attempt to reset page & remove data  
form.on("click", function() {d3.event.preventDefault();} )  

});