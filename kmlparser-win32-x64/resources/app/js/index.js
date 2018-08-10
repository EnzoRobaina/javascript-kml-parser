const $ = require('jquery')
const tj = require('togeojson')
const shell = require('electron').shell
const swal = require('sweetalert2')
const parser = new DOMParser();

var coordArr = []
var arr = []
var coords = ''
$(document).ready(function(){
    function errMsg(text){
        swal({
            type: 'error',
            title: "<span style = 'color:white;'>"+"Error!"+"</span>",
            html: "<span style = 'color:white;'>"+text+"</span>",
            showConfirmButton: true,
            //timer: 5000,
            background: 'black',
            target:	'body',
            position: 'center',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false,
            })
    }
    //spinner configs
    var opts = {
        lines: 20, // The number of lines to draw
        length: 38, // The length of each line
        width: 17, // The line thickness
        radius: 46, // The radius of the inner circle
        scale: 0.5, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        color: 'white', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        speed: 2.2, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        className: 'spinner', // The CSS class to assign to the spinner
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        position: 'absolute' // Element positioning
    };

    //initializes the spinning animation
    var target = document.getElementById('bounds');
    var spinner = new Spinner(opts);
    
    //fades in the inputs for each option
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
    
    //action of the "copy to clipboard" button
    $("#copy").click(function() {
        let text = document.getElementById("kml-output")
        text.select()
        document.execCommand("copy")
    })

    //action of the parse button for the text input
    $("#text-parse").click(function() {

        //shows spinning animation
        spinner.spin(target)

        let style = false
        //check the "keep styles" option and stores it on the style var
        if ($("#styles-text").is(":checked")) {
            style = true
        }
        //gets the text from textarea
        let text = $("#kml-textarea").val()
        if (text != ""){
            //parses the text to xml
            let parsedText = parser.parseFromString(text,"text/xml")
            //converts the xml to geoJSON
            let converted = tj.kml(parsedText, { styles: style })
            //removes every entry of " in the stringified object
            converted = JSON.stringify(converted).replace(/"/g, "")
            //hides the text input
            $("#text").fadeToggle("fast")
            //sets the output text to the geoJSON
            $("#kml-output").val(converted)
            //shows the output textarea
            $("#output").fadeToggle("fast")
            //stops the spinning animation
            spinner.stop()
        }
        else{
            spinner.stop()
            errMsg("Please input KML text")
            return false
        }

    })

    //action of the "array of coords" button for the text input
    $("#text-parse-array").click(function() {

        //shows spinning animation
        spinner.spin(target)

        let style = false
        //check the "keep styles" option and stores it on the style var
        if ($("#styles-text").is(":checked")) {
            style = true
        }
        //gets the text from textarea
        let text = $("#kml-textarea").val()
        if (text != ""){
            //parses the text to xml
            let parsedText = parser.parseFromString(text,"text/xml")
            //converts the xml to geoJSON
            let converted = tj.kml(parsedText, { styles: style })
            
            //hides the text input
            $("#text").fadeToggle("fast")
            //sets the output text to the geoJSON
            $("#kml-output").val(getArr(converted))
            
            //shows the output textarea
            $("#output").fadeToggle("fast")
            //stops the spinning animation
            spinner.stop()
        }
        else{
            spinner.stop()
            errMsg("Please input KML text")
            return false
        }

    })

    //action of the parse button for the link input
    $("#link-parse").click(function() {

        //shows spinning animation
        spinner.spin(target)
        let style = false
        //check the "keep styles" option and stores it on the style var
        if ($("#styles-link").is(":checked")) {
            style = true
        }
        console.log(style)
        if($("#link-text").val() != ""){
            //make an ajax GET request to the link and retrieves the data as text
            getKML($("#link-text").val(),
                function(data){
                    //SUCCESS 
                    let text = parser.parseFromString(data,"text/xml")
                    let converted = tj.kml(text, { styles: style })
                    //removes every entry of " in the stringified object
                    converted = JSON.stringify(converted).replace(/"/g, "")
                    $("#link").fadeToggle("fast")
                    $("#kml-output").val(converted)
                    spinner.stop()
                    $("#output").fadeToggle("fast")
            },
            function(){
                //FAIL
                spinner.stop()
                errMsg("Something went wrong!")
            })
        }
        else{
            spinner.stop()
            errMsg("Please input a link")
            return false
        }

    })

    //action of the "array of coords" button for the link input
    $("#link-parse-array").click(function() {

        //shows spinning animation
        spinner.spin(target)
        let style = false
        //check the "keep styles" option and stores it on the style var
        if ($("#styles-link").is(":checked")) {
            style = true
        }
        console.log(style)
        if($("#link-text").val() != ""){
            //make an ajax GET request to the link and retrieves the data as text
            getKML($("#link-text").val(),
                function(data){
                    //SUCCESS 
                    let text = parser.parseFromString(data,"text/xml");
                    let converted = tj.kml(text, { styles: style });
                    $("#link").fadeToggle("fast")
                    $("#kml-output").val(getArr(converted))
                    spinner.stop()
                    $("#output").fadeToggle("fast")
            },
            function(){
                //FAIL
                spinner.stop()
                errMsg("Something went wrong!")
            })
        }
        else{
            spinner.stop()
            errMsg("Please input a link")
            return false
        }
    })

    //action of the "array of coords" button for the file input
    $("#file-parse-array").click(function() {

        //shows spinning animation
        spinner.spin(target)
        let style = false
        //check the "keep styles" option and stores it in the style var
        if ($("#styles-file").is(":checked")) {
            style = true
        }
        console.log(style)
        //gets the file from file input
        kmlFile = $('#kml-file').prop('files')[0];
        //check if a file was supplied
        if (kmlFile) {
            let reader = new FileReader();
            //reads the file as text
            reader.readAsText(kmlFile);
            //reading was successful
            reader.onload = function(e) {
                //parses the text to xml
                let parsedText = parser.parseFromString(e.target.result,"text/xml")
                //parses the xml to geoJSON
                let converted = tj.kml(parsedText, { styles: style })

                $("#file").fadeToggle("fast")
                $("#kml-output").val(getArr(converted))
                spinner.stop()
                $("#output").fadeToggle("fast")
                
            };
            //reading failed
            reader.onerror = function(){
                //alerts the error
                errMsg(reader.error)
            }
        }
        else{
            spinner.stop()
            errMsg("No file was supplied")
        }
    })

    //action of the parse button for the file input
    $("#file-parse").click(function() {

        //shows spinning animation
        spinner.spin(target)
        let style = false
        //check the "keep styles" option and stores it on the style var
        if ($("#styles-file").is(":checked")) {
            style = true
        }
        console.log(style)
        //gets the file from file input
        kmlFile = $('#kml-file').prop('files')[0];
        //check if a file was supplied
        if (kmlFile) {
            let reader = new FileReader();
            //reads the file as text
            reader.readAsText(kmlFile);
            //reading was successful
            reader.onload = function(e) {
                //parses the text to xml
                let parsedText = parser.parseFromString(e.target.result,"text/xml")
                //parses the xml to geoJSON
                let converted = tj.kml(parsedText, { styles: style })
                //removes every entry of " in the stringified object
                converted = JSON.stringify(converted).replace(/"/g, "")
                $("#file").fadeToggle("fast")
                $("#kml-output").val(converted)
                spinner.stop()
                $("#output").fadeToggle("fast")
                
            };//reading failed
            reader.onerror = function(){
                //alerts the error
                errMsg(reader.error)
            }
        }
        else{
            spinner.stop()
            errMsg("No file was supplied")
        }
    })
    //action of the 'about' button on the bottom of the page
    $("#read-more").click(function() { 
        let source = "https://github.com/EnzoRobaina/Javascript-KML-Parser"
        shell.openExternal(source);
    })
    
    //function used to clear the inputs and checkboxes
    function clr(){
        $("#kml-textarea, #link-text, #kml-file, #kml-output").val('')
        $("#styles-text, #styles-file, #styles-link").prop('checked', false)
    }

    //ajax request to the supplied link
    function getKML(url, dnCb, failCb){
        $.ajax({
            url: url,
            method: 'GET',
        }).done(function(data){
            //SUCCESS
            dnCb(data)
            //FAIL
        }).fail(failCb)
    }

    //function to get array of coordinates from geoJSON
    function getArr(converted){
        //clears these variables
        arr = []
        coordArr = []
        coords = ''

        //loops trough the arrays
        for(let i = 0; i<converted.features.length; i++){
            coordArr = []
            for(let j = 0; j<converted.features[i].geometry.coordinates.length; j++){
                coordArr.push({lat: converted.features[i].geometry.coordinates[j][1], lng: converted.features[i].geometry.coordinates[j][0]}) 
            }
            arr.push({name: converted.features[i].properties.name, coordinates: coordArr})
        }
        
        //loops trought the result array and stringifies the elements
        for(let i = 0; i<arr.length; i++){
            coords += JSON.stringify(arr[i])+"\n\n"
        }
        //removes every entry of " in the stringified object
        coords = coords.replace(/"/g, "")
        return coords
    }
});
