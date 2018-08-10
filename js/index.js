const $ = require('jquery')
const tj = require('togeojson')
const shell = require('electron').shell
const parser = new DOMParser();


$(document).ready(function(){
    $("#link-btn").click(function() {
        $("#bounds > div").not(":first").hide()
        $("#link").fadeToggle("fast")
        clr()
    })

    $("#text-btn").click(function() {
        $("#bounds > div").not(":first").hide()
        $("#text").fadeToggle("fast")
        clr()

    })

    $("#file-btn").click(function() {
        $("#bounds > div").not(":first").hide()
        $("#file").fadeToggle("fast")
        clr()

    })
    
    $("#copy").click(function() {
        let text = document.getElementById("kml-output")
        text.select()
        document.execCommand("copy")
    })

    $("#text-parse").click(function() {
        let text = $("#kml-textarea").val()
        let parsedText = parser.parseFromString(text,"text/xml")
        let converted = tj.kml(parsedText)
        $("#text").fadeToggle("fast")
        
        $("#kml-output").val(JSON.stringify(converted))
        console.log(converted)
        $("#output").fadeToggle("fast")

    })

    $("#link-parse").click(function() {
        getKML($("#link-text").val(), function(data){
            let text = parser.parseFromString(data,"text/xml");
            let converted = tj.kml(text);
            $("#link").fadeToggle("fast")
            $("#kml-output").val(JSON.stringify(converted))
            console.log(converted)
            $("#output").fadeToggle("fast")
        },
        function(){
            //FAIL
            alert("Something went wrong!")
        })

    })

    $("#file-parse").click(function() {
        kmlFile = $('#kml-file').prop('files')[0];
        if (kmlFile) {
            let reader = new FileReader();
            reader.readAsText(kmlFile);
            reader.onload = function(e) {
                let parsedText = parser.parseFromString(e.target.result,"text/xml")
                let converted = tj.kml(parsedText)

                $("#file").fadeToggle("fast")
                $("#kml-output").val(JSON.stringify(converted))
                console.log(converted)
                $("#output").fadeToggle("fast")
                
            };
        }
        else{
            alert("No file was supplied")
        }
    })

    $("#read-more").click(function() { 
        let source = "https://github.com/EnzoRobaina/Javascript-KML-Parser"
        shell.openExternal(source);
    })
    
    function clr(){
        $("#kml-textarea, #link-text, #kml-file, #kml-output").val('')
    }

    function getKML(url, dnCb, failCb){
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(data){
            dnCb(data)
        }).fail(failCb)
    }


});
