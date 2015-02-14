$(function () {

    $('input:text').focus(function () {
        $(this).val('');
    });

    $("#getValue").click(function(){
        $('#weather').empty();
        var city=$("#name").val();
        $.ajax({
            url: "http://api.worldweatheronline.com/free/v2/weather.ashx?q="+city+"&format=JSON&num_of_days=1&key=a53efcc3de3ded6ab63590252e80e",
            success: function(weather){

                
                for (var w in weather) {
                    var wt = weather[w];
                    var cc = wt.current_condition[0];

                    var $list = $('<ul>');
                    var $humidity = $('<li>').text("Humidity: " + cc.humidity);
                    var $feelc = $('<li>').text("FeelsLike in C: " + cc.FeelsLikeC);
                    var $feelf = $('<li>').text("FeelsLike in F: " + cc.FeelsLikeF);
                    var $tempc = $('<li>').text("Temprature in C: " + cc.temp_C);
                    var $tempf = $('<li>').text("Temprature in F: " + cc.temp_F);

                    var wdesc = cc.weatherDesc[0];
                    var $desc = $('<li>').text("Weather Description: " + wdesc.value);

                    var icon = cc.weatherIconUrl[0];
                    var $wicon = $('<img>').attr("src", icon.value);

                    var req = wt.request[0];
                    var $place = $('<h2>').text("Current weather condition in " + req.query);
                    
                    $("#weather")
                    .append($place)
                    .append($list)
                    .append($humidity)
                    .append($tempc)
                    .append($feelc)
                    .append($tempf)
                    .append($feelf)
                    .append($desc)
                    .append($wicon);
                        


                    


                }
            }

        });   
    });

});

