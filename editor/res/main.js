$(document).ready(function () {
    //switch mode
    $("#darkmode").on("change", function () {
        if (editor) {
            if ($("#darkmode").prop("checked")) {
                editor.setOption("theme","darkMode");
            } else {
                editor.setOption("theme","lightMode");
            }
        }
        $(".mainArea").toggleClass("dark");
        $(".codeArea").toggleClass("dark");
        $(".title-wrapper").toggleClass("dark");  
        $(".output-button-wrapper").toggleClass("dark");
        $(".output-wrapper").toggleClass("dark");
        $("#output").toggleClass("dark");
        $("#console").toggleClass("dark");
        $(".output-header").toggleClass("dark");
        $(".output-header-text").toggleClass("dark");
        $(".output-content-log").toggleClass("dark");
        $(".output-content-warn").toggleClass("dark");
        $(".output-content-error").toggleClass("dark");
        $(".highLightedError").toggleClass("dark");
    });

    // read console
    let consoleContents = [];

    // rewrite console funtions to get the content
    let _console = reassignConsole();

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
            {regex: /.*?\*\//, token: "comment", next: "start"},
            {regex: /.*/, token: "comment"}
        ],
    });

    let editor = CodeMirror.fromTextArea($('#inputArea')[0], {
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

    // buttons
    $("#clear").click(function (e) {
        e.preventDefault();
        editor.clearHistory();
        editor.setValue(defaultValue);
        $("#inputArea").val(defaultValue);
    });
    $("#run").click(function (e) {
        e.preventDefault();
        runCode();
    });
    $("#save").click(function (e) {
        e.preventDefault();
        saveCode();
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

    // helpers
    function runCode() {
        let rs = doc.getValue(), res = tryCode(rs);
        $(".content-wrapper").css({ height: $("#output").height() - 30 });
        if (res.length) $("#output .content").append("<p class='output-content'>" + res + " </p>");
        $("#console .content").empty();
        writeToConsolePanel();
    }

    function writeToConsolePanel() {
        consoleContents.forEach(cc => {
            let msg = cc.content;
            if (cc.type !== 'log') {
                msg = msg.replace(/'/g, '"').replace(/PARSER: /, '');
            }
            let dark = '';
            if ($("#darkmode").prop("checked")) {
                dark = ' dark'
            }
            $("#console .content").append(
                "<p class='output-content-" + cc.type + dark + "'>" + msg + " </p>");
        });
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

    function saveCode() {
        //via https://stackoverflow.com/a/30832210
        let data = doc.getValue();
        let fileName = $("#title").val() + '.rs';
        let b = new Blob([data], { type: 'text' });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
        }, 0);
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

    // rewrite console funtions to get the content
    function reassignConsole() {
        let _console = console;
        if (console) {
            _console = {
                log: console.log,
                info: console.info,
                debug: console.debug,
                warn: console.warn,
                error: console.error,
            };
            console.log = function () {
                consoleContents.push({ type: 'log', content: Array.prototype.join.call(arguments, '') });
                _console.log.apply(console, arguments);
            };
            console.info = function () {
                consoleContents.push({ type: 'info', content: Array.prototype.join.call(arguments, '') });
                _console.info.apply(console, arguments);
            };
            console.debug = function () {
                consoleContents.push({ type: 'debug', content: Array.prototype.join.call(arguments, '') });
                _console.debug.apply(console, arguments);
            };
            console.warn = function () {
                consoleContents.push({ type: 'warn', content: Array.prototype.join.call(arguments, '') });
                _console.warn.apply(console, arguments);
            };
            console.error = function () {
                consoleContents.push({ type: 'error', content: Array.prototype.join.call(arguments, 'XXX') });
                _console.error.apply(console, arguments);
            };
        } else {
            consoleContents.push('** console not available **');
        }
        return _console;
    }
});


