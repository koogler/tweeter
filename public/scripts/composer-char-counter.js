// Sets the "findCounter" variable to the amount of characters in the textarea box

$(document).ready(function () {
  $(".textBox").on("input", function () {
    let findCounter = $(this).parent().find(".counter")
    let remaining = 140
    let currentText = $(this).val().length
    let charCount = (remaining - currentText)
    findCounter.text(charCount)
    if (charCount < 0) {
      findCounter.css("color", "red")
    } else {
      findCounter.css("color", "black")
    }
  });
});