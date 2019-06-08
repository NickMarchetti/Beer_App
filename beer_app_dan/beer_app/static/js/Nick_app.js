/* data route */
var url = "/data";

function dataTest() {
  d3.json(url).then(function(response) {

    console.log(response);

  });
}

dataTest();
