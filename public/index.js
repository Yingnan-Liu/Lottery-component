$("#start").click(function() {
  // $.post("/");
  $get("/prizeResult")
  $("#start").addClass("pressed");
  setTimeout(function() {
    $("#start").removeClass("pressed");
  }, 100);
  $.ajax({
    url: "/",
    type: "POST",
    //data: 'your form data',
    success: function(response){
      alert("Congratulations! Your prize is " + );
    }
  });
});
