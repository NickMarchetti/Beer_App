var ABV_slider = document.getElementById("ABV");
var ABV_output = document.getElementById("ABV_Val");
ABV_output.innerHTML = ABV_slider.value;
                            
ABV_slider.oninput = function() {
  ABV_output.innerHTML = this.value;
}