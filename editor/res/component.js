$(document).ready(function () {

  editor = (function () {

    let defaultValue = "\n$mammal=(dog | child | ox)\n\n$verb=(watching | listening)\n\nThe $mammal.pluralize were $verb.\n";

    CodeMirror.defineSimpleMode("RiScript", {
      start: [
        //RiScript
        { regex: /\(([^)]*\|)+[^)]*\)/g, token: "choice" },
        //choices
        { regex: /(\.[\w]+(\(\))?)/g, token: "trans" },
        //transforms 
        { regex: /\$\w+/g, token: "symbol" },
        //symbol
        { regex: /\$\$\w+/g, token: "dynamic" },
        //dynamic symbol
        { regex: /\/\/.*/g, token: "comment" },
        //single line comment
        { regex: /\/\*/, token: "comment", next: "comment" },
        //multi lines comment
      ],
      comment: [
        { regex: /.*?\*\//, token: "comment", next: "start" },
        { regex: /.*/, token: "comment" }
      ],
    });

    console.log($('#inputArea'));
    let editor = CodeMirror.fromTextArea($('#inputArea')[0], {
      value: defaultValue,
      theme: 'darkMode',
      lineNumbers: true,
      mode: 'RiScript',
      extraKeys: {
        "Ctrl-Enter": function () {
          runCode(); // wins
        }, "Cmd-Enter": function () {
          runCode(); // mac
        }
      },
    });
    editor.setSize("100%", "100%");

    let errorLine, doc = editor.getDoc();

    editor.on('change', function () {
      removeHighlight(errorLine);
    });

    // resizing
    $(".resizer.vertical").mousedown(function (e) {
      e.preventDefault();
      $("body").mousemove(function (m) {
        let x = m.pageX;
        let h = $("body").width() - m.pageX;
        $("#output").css({ width: x });
        $("#console").css({ width: h });
      });
    });
    $(".resizer.horizontal").mousedown(function (e) {
      e.preventDefault();
      $("body").mousemove(function (m) {
        let h = $("body").height() - m.pageY;
        $(".output-button-wrapper").css({ height: h })
      });
      let h = $("#output").height() - 30
      $(".content-wrapper").css({ height: h });
    });
    $("body").mouseup(function (e) {
      $(this).unbind("mousemove");
    });

    // helpers
    function runCode() {
      let rs = doc.getValue(), res = tryCode(rs);
      $(".content-wrapper").css({ height: $("#output").height() - 30 });
      if (res.length) $("#output .content").append("<p class='output-content'>" + res + " </p>");
      $("#console .content").empty();
      writeToConsolePanel();
    }

    function tryCode(string) {
      try {
        return RiTa.evaluate(string);
      } catch (e) {
        //console.error(e);
        let string = [].slice.call(e.stack).join('');
        let messageString = [].slice.call(e.message).join('');
        if (string.includes("Parser failed at line")) {
          let arr = string.split(' ');
          let lineNo = arr[arr.indexOf("line") + 1].split(':')[0];
          highlightError(lineNo - 1);
          console.error(e.message);
        } else if (messageString.includes("Parser failed at line")) {
          let arr = messageString.split(' ');
          let lineNo = arr[arr.indexOf("line") + 1].split(':')[0];
          highlightError(lineNo - 1);
          console.error(e.message);
        } else {
          console.error(e.stack);
        }
      }
      return '';
    }

    function highlightError(lineNo) {
      doc.addLineClass(lineNo, "background", "highLightedError");
      errorLine = lineNo;
      if ($("#darkmode").prop("checked")) {
        doc.addLineClass(lineNo, "background", "dark");
      }
    }

    function removeHighlight(lineNo) {
      if (lineNo) {
        doc.removeLineClass(lineNo, "background", "highLightedError");
        doc.removeLineClass(lineNo, "background", "dark");
        errorLine = undefined;
      }
    }

    return {
      run: () => runCode()
    };
  })();
});