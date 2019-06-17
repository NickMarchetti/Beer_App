var IBU_slider = document.getElementById("IBU");
var IBU_output = document.getElementById("IBU_Val");
IBU_output.innerHTML = IBU_slider.value;
                          
IBU_slider.oninput = function() {
  IBU_output.innerHTML = this.value;
}
