$(function () {

    //codeMirror
    let defaultValue = "//put your code here\n\n\n";

    CodeMirror.defineSimpleMode("Riscript", {
        start: [
            // //introduce JavaScript
            // { regex: /\!\-\-Start/, token: "meta", mode: { spec: 'javascript', end: /\!\-\-End/}},

            { regex: /\$\w+/g, token: ["keyword"] },
            //vars
            { regex: /\((.*\|)+.*\)/g, token: ["keyword"] },
            //choices

            //javascript rules from https://codemirror.net/demo/simplemode.html and the javascript mode
            { regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string" },
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
            { regex: /<</, token: "meta", mode: { spec: "xml", end: />>/ } }
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

    let editor = CodeMirror($('#inputArea')[0], {
        lineNumbers: true,
        value: defaultValue,
        mode: 'Riscript',
    });
    editor.setSize("100%", "100%");
    
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
});


