$(function () {
  "use strict";

  $(document).keypress(function (event) {
    if (event.which === 111) {
      showAnswer();
    }
  });
  function showAnswer() {
    $("#showAnswerBtn").hide();
    $("#answerChar, #kaisetsu").show();
    first = false;
  }
});
