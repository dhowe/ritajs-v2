$(document).ready(function () {
    //read console
    let consoleContents = [];
    //rewrite console funtions to get the content
    let _console;
    if (console) {
        _console = {
            log: console.log,
            info: console.info,
            debug: console.debug,
            warn: console.warn,
            error: console.error,
        };
    } else {
        consoleContents.push('! console is not available');
    }
    console.log = function () {
        consoleContents.push(Array.from(arguments));
        _console.log.apply(console, arguments);
    };
    console.info = function () {
        consoleContents.push(Array.from(arguments));
        _console.info.apply(console, arguments);
    };
    console.debug = function () {
        consoleContents.push(Array.from(arguments));
        _console.debug.apply(console, arguments);
    };
    console.warn = function () {
        consoleContents.push(Array.from(arguments));
        _console.warn.apply(console, arguments);
    };
    console.error = function () {
        consoleContents.push(Array.from(arguments));
        _console.error.apply(console, arguments);
    };

    //codeMirror
    let defaultValue = "function main() {\n\n  //replace with your code here\n  let sentence = RiTa.evaluate(\"This is a simple example.\", {});\n  console.log(sentence);\n  return sentence;\n\n}";
    CodeMirror.defineSimpleMode("Riscript", {
        start: [
            // //introduce JavaScript
            // { regex: /\!\-\-Start/, token: "meta", mode: { spec: 'javascript', end: /\!\-\-End/}},

            //Riscript
            { regex: /\$\w+/g, token: ["keyword"] },
            //vars
            { regex: /\((.*\|)+.*\)/g, token: ["keyword"] },
            //choices

            //javascript rules modified from https://codemirror.net/demo/simplemode.html
            { regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string" },
            { regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: "string" },
            { regex: /(function)(\s+)([a-z$][\w$]*)/, token: ["keyword", null, "variable-2"] },
            { regex: /(?:function|var|let|return|if|for|while|else|do|this)\b/, token: "keyword" },
            { regex: /true|false|null|undefined/, token: "atom" },
            { regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number" },
            { regex: /\/\/.*/, token: "comment" },
            { regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3" },
            { regex: /\/\*/, token: "comment", next: "comment" },
            { regex: /[-+\/*=<>!]+/, token: "operator" },
            { regex: /[\{\[\(]/, indent: true },
            { regex: /[\}\]\)]/, dedent: true },
            { regex: /[a-z$][\w$]*/, token: "variable" },
            { regex: /<</, token: "meta", mode: { spec: "xml", end: />>/ } },
        ],
        comment: [
            { regex: /.*?\*\//, token: "comment", next: "start" },
            { regex: /.*/, token: "comment" }
        ],
        meta: {
            dontIndentStates: ["comment"],
            lineComment: "//"
        }
    });

    let editor = CodeMirror.fromTextArea($('#inputArea')[0], {
        lineNumbers: true,
        mode: 'Riscript',
    });
    editor.setSize("100%", "100%");

    let doc = editor.getDoc();

    //resizer
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

    //buttons
    $("#clear").click(function (e) {
        e.preventDefault();
        editor.clearHistory();
        editor.setValue(defaultValue);
        $("#inputArea").val(defaultValue);
    });
    $("#run").click(function (e) {
        e.preventDefault();
        runTheCode();
    });
    $("#save").click(function (e) {
        e.preventDefault();
        saveTheCode();
    });
    $("#clearConsole").click(function (e) {
        e.preventDefault();
        $("#console .content").empty();
        consoleContents.length = 0;
    });
    $("#clearOutput").click(function (e) {
        e.preventDefault();
        $("#output .content").empty();
        consoleContents.length = 0;
    });

    //helpers 
    function runTheCode() {
        let code = editor.getValue();
        let s = document.createElement("script");
        s.setAttribute("id", "receivedCode");
        s.textContent = code;
        document.body.appendChild(s);
        let h = $("#output").height() - 30
        $(".content-wrapper").css({ height: h });
        $("#output .content").append("<p class='output-content'>" + tryCode() + " </p>");
        $("#console .content").empty();
        consoleContents.forEach(function (e) {
            $("#console .content").append("<p class='output-content'>" + e + " </p>");
        });
    }
    function tryCode() {
        try {
            main()
        } catch (error) {
            console.error(error)
        }
    }
    function saveTheCode() {
        let data = doc.getValue();

    }
    function highLightError(lineNo) {
        doc.addLineClass(lineNo, "wrap", "hightLightedError");
    }
    function removeHighLight(lineNo) {
        doc.removeLineClass(lineNo, "wrap", "hightLightedError");
    }
});


