$(function () {
  $("#staticBackdrop").modal({
    backdrop: "static",
    keyboard: false,
  });
  // There's the gallery and the trash
  var $gallery = $("#bulbGallery"),
    $trash = $("#trash");
  var bulbVal = "";
  var score = 0;
  // Let the gallery items be draggable
  $("li", $gallery).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    helper: "clone",
    cursor: "grabbing",
  });

  // Let the trash be droppable, accepting the gallery items
  $trash.droppable({
    accept: "#bulbGallery > li.ui-draggable",
    classes: {
      "ui-droppable-active": "ui-state-highlight",
    },
    drop: function (event, ui) {
      mohitFun(ui.draggable);
    },
  });

  // My Function
  var sequenceOrder = ["A", "B", "C", "D", "E", "F", "G"];
  var i = 0;
  function mohitFun($item) {
    bulbVal = $item.children().text();
    console.log(bulbVal);

    if (sequenceOrder[i] == bulbVal) {
      $(".score").addClass("animate__bounce");
      setTimeout(function () {
        $(".score").removeClass("animate__bounce");
      }, 1000);
      score += 20;
      $item.draggable({
        disabled: true,
      });
      i++;
      scoreUpdate();
      $item.css("background-color", "var(--secondary-color)");
    } else {
      $item.addClass("shake");
      $item.css("background-color", "red");
      $(".score").css("background-color", "red");
      $(".score").addClass("animate__wobble");
      setTimeout(function () {
        $(".score").removeClass("animate__wobble");
      }, 1000);
      setTimeout(function () {
        $item.removeClass("shake");
        $item.css("background-color", "#1c212c");
        $(".score").css("background-color", "#06cebb");
      }, 1000);
      $item.draggable({
        disabled: false,
      });
      score -= 2;
      scoreUpdate();
    }
  }
  // Update Score Here
  function scoreUpdate() {
    $(".score").text(score);
    setTimeout(function () {
      if (i == 7) {
        $("#staticBackdropScore").modal({
          backdrop: "static",
          keyboard: false,
        });
        $(".game-score").html(`Your Score is <b> ${score} </b>`);
      }
    }, 1000);
  }
});
