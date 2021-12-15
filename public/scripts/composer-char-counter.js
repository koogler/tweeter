$(document).ready(function () {
  $(".textBox").on("input", function () {
    let currentText = $(this).val().length
    console.log(currentText)
  });
  console.log('test123')
});