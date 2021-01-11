$(document).ready(function () {
    //read console
    console.stdlog = console.log.bind(console);
    let logs = [];
    //rewrite console.log() to get the content
    console.log = function() {
        logs.push(Array.from(arguments));
        console.stdlog.apply(console, arguments);
    }

    //codeMirror
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
    });
    $("body").mouseup(function (e) {
        $(this).unbind("mousemove");
    });

    //buttons
    $("#clear").click(function (e) {
        e.preventDefault();
        editor.clearHistory();
        editor.setValue(defaultValue);
    });
    $("#run").click(function (e) {
        e.preventDefault();
        runTheCode();
    });
    $("#save").click(function (e) {
        e.preventDefault();
        saveTheCode();
    });

    //helpers
    function runTheCode() {
        logs.length = 0;
        let code = editor.getValue();
        let s = document.createElement("script");
        s.setAttribute("id", "receivedCode");
        s.textContent = code;
        document.body.appendChild(s);
        $("#output .content").append("<p id='output-content'>"+main()+" </p>");
        $("#console-content").append(logs);
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


