// display source with syntax highlighting (prism)
function getCode(url, id) {
  $.ajax({
    url: url,
    dataType: "text",
    success: function (data) {
      var encoded = data.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
      });
      $(id).html(encoded);
      if ($(id).length > 0) Prism.highlightElement($(id)[0]);
    }
  });
}

$(() => {
  getCode("../../data/haiku.json", "#grammar");
  getCode("code.js", "#source-code");
});  
