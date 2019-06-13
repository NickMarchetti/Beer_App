// Create the tile layer that will be the background of our mapconsole.log("Hello");
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

function turnToAbr(stateName) {
  var newState = stateName;
  switch(stateName) {
    case "Alabama":
      newState = "AL"
      break;
    case "Alaska":
      newState = "AK"
      break;
    case "Arizona":
      newState = "AZ"
      break;
    case "Arkansas":
      newState = "AR"
      break;
    case "California":
      newState = "CA"
      break;
    case "Colorado":
      newState = "CO"
      break;    
    case "Connecticut":
      newState = "CT"
      break;
    case "Delaware":
      newState = "DE"
      break;
    case "Connecticut":
      newState = "CT"
      break;
    case "Delaware":
      newState = "DE"
      break;
    case "Florida":
      newState = "FL"
      break;
    case "Georgia":
      newState = "GA"
      break;
    case "Hawaii":
      newState = "HI"
      break;
    case "Idaho":
      newState = "ID"
      break;
    case "Illinois":
      newState = "IL"
      break;
    case "Indiana":
      newState = "IN"
      break;
    case "Iowa":
      newState = "IA"
      break;
    case "Kansas":
      newState = "KS"
      break;
    case "Kentucky":
      newState = "KY"
      break;
    case "Louisiana":
      newState = "LA"
      break;
    case "Maine":
      newState = "ME"
      break;
    case "Maryland":
      newState = "MD"
      break;
    case "Massachusetts":
      newState = "MA"
      break;
    case "Michigan":
      newState = "MI"
      break;
    case "Minnesota":
      newState = "MN"
      break;
    case "Mississippi":
      newState = "MS"
      break;
    case "Missouri":
      newState = "MO"
      break;
    case "Montana":
      newState = "MT"
      break;
    case "Nebraska":
      newState = "NE"
      break;
    case "Nevada":
      newState = "NV"
      break;
    case "New Hampshire":
      newState = "NH"
      break;
    case "New Jersey":
      newState  = "NJ"
      break;
    case "New Mexico":
      newState = "NM"
      break;
    case "New York":
      newState = "NY"
      break;
    case "North Carolina":
      newState = "NC"
      break;
    case "North Dakota":
      newState = "ND"
      break;
    case "Ohio":
      newState = "OH"
      break;
    case "Oklahoma":
      newState = "OK"
      break;
    case "Oregon":
      newState = "OR"
      break;
    case "Pennsylvania":
      newState = "PA"
      break;
    case "Rhode Island":
      newState = "RI"
      break;
    case "South Carolina":
      newState = "SC"
      break;
    case "South Dakota":
      newState = "SD"
      break;
    case "Tennessee":
      newState = "TN"
      break;
    case "Texas":
      newState = "TX"
      break;
    case "Utah":
      newState = "UT"
      break;
    case "Vermont":
      newState = "VT"
      break;
    case "Virginia":
      newState = "VA"
      break;
    case "Washington":
      newState = "WA"
      break;
    case "West Virginia":
      newState = "WV"
      break;
    case "Wisconsin":
      newState = "WI"
      break;
    case "Wyoming":
      newState = "WY"
      break;
    default:
      newState = "unnamed";
  }
  return newState;
}

function readData(response) {
  // for (var i = 0; i < response.length; i++) {
  //   L.marker([response[i].brewery_latitude, response[i].brewery_longitude])
  //     .addTo(map);
  // }
  // Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
  // var markers = L.markerClusterGroup();
  // for (var i = 0; i < 1000; i++) {
  //   markers.addLayer(L.marker([response[i].brewery_latitude, response[i].brewery_longitude]));
  // }
  // map.addLayer(markers);
//   var markers = L.markerClusterGroup();
   L.geoJson(data, {
//     // Style each feature 
    style: function(feature) {
      return {
        color: "lightblue",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a state, that state's opacity changes to 90% so that it stands out        
        mouseover: function(event) {
          var stateAbr;
          var breweries = [];
          var stateFullName;
          var beerCount = 0;
          d3.json(link).then(function() {
            stateFullName = feature.properties.name;
            stateAbr = turnToAbr(feature.properties.name);

            for (var i = 0; i < 1000; i++) {
              if (stateAbr == response[i].brewery_state) {
                beerCount += 1;
                if (!(breweries.includes(response[i].brewery))) {
                  breweries.push(response[i].brewery);
                }
              }
            }
            layer = event.target;
            layer.bindTooltip("<h3>" + stateFullName + "</h3><br>Beers:  " + beerCount + "</h3><br>Breweries:  " + breweries.length).openTooltip();
            layer.setStyle({
              fillOpacity: 0.2            
            });
          });
          layer = event.target;
            layer.bindTooltip("<h3>" + stateFullName + "</h3><br>Beers:  " + beerCount + "</h3><br>Breweries:  " + breweries.length).openTooltip();
            layer.setStyle({
              fillOpacity: 0.2            
            });
        },
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        click: function(event) {
          map.fitBounds(event.target.getBounds());
          var stateAbr;
          var breweries = [];
          d3.json(link).then(function(stuff) {            
            var markers;
            stateAbr = turnToAbr(feature.properties.name);

            for (var i = 0; i < 1000; i++) {
              if (stateAbr == response[i].brewery_state) {
                if (!(breweries.includes(response[i].brewery))) {
                  breweries.push(response[i]);
                  console.log("Adding: ", response[i].brewery);
                }
              }            
            }
            
            for (var i = 0; i < breweries.length; i++) {
              console.log("marking");
              L.marker([breweries[i].brewery_latitude, breweries[i].brewery_longitude]).bindTooltip(breweries[i].brewery)
                .addTo(map);
            }            
          });
        },
      });
    }
  }).addTo(map);
 });
}

var link = "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json";
var url = "/data"; //assign all data to a temp variable so as not to edit data file1

d3.json(url).then(function(response) {
  readData(response);
});


// Create the map with our layers
var map = L.map("map-id", {
  center: [39.50, -98.35],
  zoom: 4
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(map);