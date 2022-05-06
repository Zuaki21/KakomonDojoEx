var scriptFile = $("script:last")
  .attr("src")
  .replace(/^\/js\/([a-z]+)\.[^.]+$/g, "/$1bbs.php");

$(function () {
  //if(location.href.indexOf("/02_aki/")!==-1||($(".doujou .anslink[style]")[0]&&$(".doujou .anslink[style]").html().indexOf("令和2年秋期")!==-1)){$("body").addClass("c")}$("body.c").on("copy contextmenu selectstart dragstart",function(){return false});$("#mainCol .pan>b").click(function(){$("body.c").off()});

  if (typeof localStorage !== undefined) {
    var yyyymmdd = /^20[2-9][0-9]-(1[0-2]|0[1-9])-(0[1-9]|[1-2][0-9]|3[01])$/;
    var xday = localStorage.getItem("XDAY");
    var defaultMessage =
      '<a href="/config.html#xday">受験予定日を設定すると<br>カウントダウンが表示されます<br><button>設定する</button></a>';
    if (xday && yyyymmdd.test(xday)) {
      var ymd = xday.split("-");
      var y = Number(ymd[0]),
        m = Number(ymd[1]),
        d = Number(ymd[2]);
      var xday = new Date(y, m - 1, d); //次回試験日 実際の月より-1
      var now = new Date();
      var diffdays = Math.ceil((xday - now) / (24 * 60 * 60 * 1000));

      var msg = "";
      if (diffdays > 0) {
        msg =
          "受験予定日は <span>" +
          y +
          "</span>年<span>" +
          m +
          "</span>月<span>" +
          d +
          '</span>日<br>試験本番まであと<span class="big">' +
          diffdays +
          "</span>日です";
      } else if (diffdays == 0) {
        msg =
          "本日は <span>" +
          y +
          "</span>年<span>" +
          m +
          "</span>月<span>" +
          d +
          '</span>日<br>基本情報技術者試験の<span class="big">受験日</span>です';
      } else {
        localStorage.removeItem("XDAY");
        msg = defaultMessage;
      }
      $("#countdown").html(msg);
    } else {
      $("#countdown").html(defaultMessage);
    }
  }

  $(".qtable a[href^=q], .qtable a[href^=am], .qtable a[href^=pm]").each(
    function () {
      var href = $(this).attr("href");
      $(this)
        .parent()
        .next()
        .hover(
          function () {
            $(this).css({ "text-decoration": "underline", cursor: "pointer" });
          },
          function () {
            $(this).css({ "text-decoration": "none", cursor: "auto" });
          }
        )
        .click(function () {
          location.href = href;
        });
    }
  );
  $("input[type='text']")
    .not(".allowSubmit")
    .keypress(function (e) {
      if (e.which === 13 || e.keyCode === 13) {
        return false;
      }
    });
  if ($("#select_a")[0] && $(".lia")[0]) {
    $("#select_a, #select_i, #select_u, #select_e").each(function () {
      var id = $(this).attr("id");
      var li = id.replace("select_", ".li");
      $(li).html(
        '<span class="cite">' +
          $(this).html() +
          "</span><br>" +
          $(li).html().replace("正しい。", '<em class="m">正しい</em>。')
      );
    });
  }
  $("#testMenu")
    .clone()
    .removeAttr("class")
    .attr("id", "fastMenu")
    .appendTo($("#fastMenuBtn"));
  $("#fastMenu")
    .append($("#testMenu2").clone().children())
    .append('<li><a href="/index_pm.html">午後問題一覧</a>');

  $("body").click(function () {});
  //javascript無効への処置
  $("#showAnswerBtn").show();
  $("#answerChar").hide();

  $("#showAnswerBtn").click(function () {
    showAnswer();
  });
  var timerID,
    first = true;
  $(".selectBtn").click(function () {
    var id = $(this).attr("id");
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
  });
  $("#popup").click(function () {
    $(this).stop().fadeOut(500);
  });
  function showAnswer() {
    $("#showAnswerBtn").hide();
    $("#answerChar, #kaisetsu").show();
    first = false;
  }
  $("#sendform")
    .attr("action", scriptFile)
    .submit(function () {
      var flag = false;
      var elem;
      $("p.error, .submitMessage").remove();
      if (
        $('input[name="title"]').length > 0 &&
        !$('input[name="title"]').val().match(/\S/g)
      ) {
        flag = true;
        elem = "タイトル";
      } else if (!$('input[name="name"]').val().match(/\S/g)) {
        flag = true;
        elem = "お名前";
      } else if (!$('textarea[name="mes"]').val().match(/\S/g)) {
        flag = true;
        elem = "本文";
      } else if (
        $('input[name="pass"]').length > 0 &&
        !$('input[name="pass"]').val().match(/\S/g)
      ) {
        flag = true;
        elem = "削除用パスワード";
      }
      if (flag) {
        $(this).prepend(
          '<p class="error" style="background:#FFE4E4;border:2px dotted #EC7F7F">' +
            elem +
            "が未入力です。</p>"
        );
        pageScroll($(this).offset().top - 30, 300);

        return false;
      }
      $("#sendform :submit").prop("disabled", true);
      $("#formBox").append(
        '<div class="submitMessage">投稿を処理中です...<br>5秒以上経過しても画面が切り替わらない場合は、お手数ですがブラウザの更新ボタン、または"F5"でページを再読み込みしてみてください。</div>'
      );
      if (typeof localStorage !== undefined) {
        localStorage.setItem("BBS_NAME", $('input[name="name"]').val());
        localStorage.setItem(
          "BBS_KAOICON",
          $('input[name="kaoicon"]:checked').val()
        );
      }
      //submit
    });
  $("#editform")
    .attr("action", scriptFile)
    .submit(function () {
      $("p.error").remove();
      if ($('select[name="resno"]').val() == "-") {
        $(this).prepend(
          '<p class="error" style="background:#FFE4E4;border:2px dotted #EC7F7F">削除対象の投稿番号が選択されていません。</p>'
        );
        return false;
      } else if (!$('input[name="editpass"]').val().match(/\S/g)) {
        $(this).prepend(
          '<p class="error" style="background:#FFE4E4;border:2px dotted #EC7F7F">削除用パスワードが未入力です。</p>'
        );
        return false;
      }
      //submit
    });
  $("#previewBtn").click(function () {
    var nl2br = function (str) {
      return str.replace(/[\n\r]/g, "<br />");
    };
    var escapeHTML = function (val) {
      return nl2br($("<div />").text(val).html());
    };
    if ($("#previewBox").is(":visible")) {
      $("#previewBtn").html("プレビュー");
      $("#previewBox").hide();
      $("#formBox").fadeIn(200);
    } else {
      var name = escapeHTML($('input[name="name"]').val());
      var message = escapeHTML($('textarea[name="mes"]').val());
      var title =
        $('input[name="title"]').length > 0
          ? '<div style="font-size:16px">【スレッドタイトル】<br>' +
            escapeHTML($('input[name="title"]').val()) +
            "</div>"
          : "";

      name = !name ? "(名前なし)" : name;
      message = !message ? "(本文なし)" : message;

      $("#previewContent")
        .addClass("logContnr")
        .css("margin", "0 -15px")
        .html(
          title +
            '<div class="logTop"><i class="kao' +
            $('input[name="kaoicon"]:checked').val() +
            '"></i>' +
            '<span class="name">' +
            name +
            "</span>さん</div>" +
            '<div class="logMain"><p>' +
            message +
            "</p></div>" +
            '<div class="logBottom"></div>'
        );
      $("#previewBtn").html("入力画面に戻る");
      $("#formBox").hide();
      $("#previewBox").fadeIn(200);
    }
  });
  if ($("#sendform")[0]) {
    if (typeof localStorage !== undefined) {
      var name = localStorage.getItem("BBS_NAME");
      var kaoicon = localStorage.getItem("BBS_KAOICON");
      if (name) {
        $('#sendform [name="name"]').val(name);
      }
      if (kaoicon) {
        $('#sendform [name="kaoicon"]').val([kaoicon]);
      }
    }
  }
  $(
    'a[href="#pagetop"], a[href="#title"], a[href="#last"], .ampm>a, #toTop'
  ).click(function () {
    pageScroll($($(this).attr("href")).offset().top - 20, 700);
    return false;
  });
  $("body").on("click", "#calcBtn", function () {
    if (!$("#calc")[0]) {
      $.ajax({
        url: "/js/jsCalc.js?20171006",
        dataType: "script",
        cache: true,
      });
      $(this).addClass("show");
    } else {
      $("#calc, #calcBtn").toggleClass("show");
    }
  });
  jQuery.easing.easeOutCirc = function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  };
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
  if (typeof localStorage !== undefined && localStorage.getItem("NO_ANIMATION"))
    jQuery.fx.off = true;
  var ua = window.navigator.userAgent.toLowerCase();
  if (
    $("#scrollArea").length > 0 &&
    !(ua.search(/(iphone|android|ipad)/) != -1 || $(window).width() < 1024)
  ) {
    var main = $("#mainCol");
    var side = $(".sideColInner");
    var wrapper = $("#scrollArea");
    var w = $(window);
    var wrapperTop = wrapper.offset().top;
    var sideLeft = side.offset().left;
    var winLeft;
    var pos;
    var scrollAdjust = function () {
      var wrapperHeight = wrapper.outerHeight();
      var sideHeight = side.outerHeight();
      var mainHeight = main.outerHeight();
      var mainAbs = main.offset().top + mainHeight;
      var a = w.scrollTop();
      winLeft = w.scrollLeft();
      var b = w.height();
      var c = a > wrapperTop && mainHeight > sideHeight ? true : false;
      pos = !c ? "static" : a + wrapperHeight > mainAbs ? "absolute" : "fixed";
      if (pos === "fixed") {
        wrapper.css({
          position: pos,
          top: "",
          bottom: b - wrapperHeight,
          left: sideLeft - winLeft,
          margin: 0,
        });
      } else {
        if (pos === "absolute") {
          wrapper.css({
            position: pos,
            top: mainAbs - wrapperHeight,
            bottom: "",
            left: sideLeft,
            margin: 0,
          });
        } else {
          wrapper.css({ position: pos });
        }
      }
    };
    var resizeAdjust = function () {
      side.css({ position: "static" });
      sideLeft = side.offset().left;
      winLeft = w.scrollLeft();
      if (pos === "fixed") {
        wrapper.css({ position: pos, left: sideLeft - winLeft, margin: 0 });
      } else {
        if (pos === "absolute") {
          wrapper.css({ position: pos, left: sideLeft, margin: 0 });
        }
      }
    };
    w.on("load", scrollAdjust);
    w.on("scroll", scrollAdjust);
    w.on("resize", resizeAdjust);
  }
});

var toTop = $("#toTop");
$(window).scroll(function () {
  if ($(this).scrollTop() > 300) {
    toTop.addClass("show");
  } else {
    toTop.removeClass("show");
  }
});
$(window).on("load resize", function () {
  if ($(this).width() < 960) {
    toTop.addClass("inside");
  } else {
    toTop.removeClass("inside");
  }
});
