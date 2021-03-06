$(function () {
  "use strict";

  // //"解説を見る"
  // $(document).keydown(function (event) {
  //   if (event.which === 32) {
  //     //spaceキー
  //     showAnswer();
  //   }
  // });

  const btnList = document.querySelectorAll(".selectBtn");
  $(document).keydown(function (event) {
    switch (event.key) {
      case "z":
        showAnswer();
        break; //確認用
      case "a":
        SelecButton(btnList[0]);
        break; //確認用
      case "s":
        SelecButton(btnList[1]);
        break; //確認用
      case "d":
        SelecButton(btnList[2]);
        break; //確認用
      case "f":
        SelecButton(btnList[3]);
        break; //確認用
      default:
        break;
    }
  });

  var timerID,
    first = true;
  function SelecButton(btn) {
    var id = $(btn).attr("id");
    if (id == "t") {
      var seikai = "正 解";
      if (typeof localStorage !== undefined) {
        var count = localStorage.getItem("count") || 0;
        if (first) count++;
        if (count > 1) {
          var renzoku = "";
          if (
            count === 5 ||
            count === 15 ||
            (count % 10 === 0 && count <= 100) ||
            (count % 50 === 0 && count <= 200)
          ) {
            seikai = count + "問連続";
            switch (count) {
              case 5:
                renzoku = "\u3053\u306e\u8abf\u5b50";
                break;
              case 10:
                renzoku = "\u7d20\u6674\u3089\u3057\u3044";
                break;
              case 15:
                renzoku =
                  "\u0069\u0074\u0027\u0073\u0020\u0063\u006f\u006f\u006c";
                break;
              case 20:
                renzoku = "\u5929\u6674\u308c\u006c\u0021";
                break;
              case 30:
                renzoku = "\u0042\u0072\u0061\u0076\u006f\u0021\u0021";
                break;
              case 40:
                renzoku =
                  "\u0045\u0078\u0063\u0065\u006c\u006c\u0065\u006e\u0074";
                break;
              case 50:
                renzoku =
                  "\u0057\u006f\u006e\u0064\u0065\u0072\u0066\u0075\u006c";
                break;
              case 60:
                renzoku =
                  "\u0046\u0061\u006e\u0074\u0061\u0073\u0074\u0069\u0063\u0021";
                break;
              case 70:
                renzoku =
                  "\u0041\u006d\u0061\u007a\u0069\u006e\u0067\u0021\u0021";
                break;
              case 80:
                renzoku = "\u5929\u624d\u3067\u3059\u304b\u0021\u003f";
                break;
              case 90:
                renzoku = "\u3082\u306f\u3084\u795e\u002e\u002e\u002e";
                break;
              case 100:
                renzoku = "\u795E\u3068\u8A8D\u5B9A\u3057\u307E\u3059";
                break;
              case 150:
                renzoku = "\uFF1E\u795E\u2606\u964D\u81E8\uFF1C";
                break;
              case 200:
                renzoku =
                  "\u305D\u3057\u3066\u4F1D\u8AAC\u3078\u002E\u002E\u002E";
                break;
            }
          } else {
            var bikkuriCount = Math.min(20, Math.ceil(count / 10));
            renzoku = count + "問連続" + Array(bikkuriCount + 1).join("!");
          }
          if (first) {
            $("head").append(
              '<style>#popup.maru::after{content:"' + renzoku + '"}</style>'
            );
          }
        }
      }
      $("#popup").html(seikai).attr("class", "maru");
      if (first) $("#result").val("1");
    } else {
      $("#popup").html("不正解").attr("class", "batu");
      if (first) $("#result").val("2");
    }

    if (first && typeof localStorage !== undefined) {
      if (id == "t") {
        localStorage.setItem("count", count);
      } else {
        localStorage.removeItem("count");
      }
    }

    /*	if (first) {
		var answer = $('.selectList .selectBtn').index(this)+1;
		var q = '';
		if (location.href.indexOf('kakomon.php') !== -1) {
			if (!$('input[value="random"]').prop('checked')) {
				q = $('[name="_q"]').val().split(',').pop();
			}
		} else if (location.href.indexOf('bunya.php') !== -1 || location.href.indexOf('.html') !== -1) {
			if (location.href.indexOf('am1_') === -1) {
				var ogurl = $('meta[property="og:url"]').attr('content').split('/kakomon/')[1];
				q = ogurl.replace('.html', '').replace(/\/(q|am2_)/, '_');
			}
		}
		if (q) {
			var inputParams = {
				'action': 'log',
				'q': q,
				'answer': answer
			};
			$.ajax({
				type : "POST",
				url : "/log/logger.php",
				cache : false,
				data : $.param(inputParams),
				dataType : "json"})
		}
	}
*/
    showAnswer();

    clearTimeout(timerID);
    $("#popup")
      .stop(true)
      .css({
        opacity: 0,
        top: "-30px",
      })
      .show()
      .animate({ opacity: 1, top: "-10px" }, "slow");
    timerID = setTimeout("$('#popup').fadeOut(1000);", 5000);
    pageScroll($("#ans").offset().top - 5, 650);

    return false;
  }

  function showAnswer() {
    $("#showAnswerBtn").hide();
    $("#answerChar, #kaisetsu").show();
    first = false;
  }
  function pageScroll(pos, duration) {
    var scroll_event =
      "onwheel" in document
        ? "wheel"
        : "onmousewheel" in document
        ? "mousewheel"
        : "DOMMouseScroll";
    function stopScroll(e) {
      e.preventDefault();
    }
    document.addEventListener(scroll_event, stopScroll, { passive: false });
    $("html,body").animate(
      { scrollTop: pos },
      duration,
      "easeOutCirc",
      function () {
        document.removeEventListener(scroll_event, stopScroll, {
          passive: false,
        });
      }
    );
  }
});
