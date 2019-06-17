var votes_slider = document.getElementById("votes");
var votes_output = document.getElementById("votes_val");
votes_output.innerHTML = votes_slider.value;
                            
votes_slider.oninput = function() {
  votes_output.innerHTML = this.value;
}