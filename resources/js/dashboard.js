const { remote } = require('electron')
var request = require('request-promise')

document.getElementById('btn_search').addEventListener('click', () => {
    var get_country = document.getElementById('input_country').value
    var get_region = document.getElementById('input_region').value
    var get_city = document.getElementById('input_city').value

    var options = {
    //    method: 'POST',
        uri: 'http://127.0.0.1:5000/weatherdetails',
        form: {country: get_country, region: get_region, city: get_city}
    }

    request(options).then(function (data) {
        // parse json data
        document.getElementById('weather_text').innerHTML = JSON.parse(data)['current']['temp_c']

        document.getElementById('weather_det_humidi').innerHTML = JSON.parse(data)['current']['humidity']
        document.getElementById('weather_det_windkmh').innerHTML = JSON.parse(data)['current']['wind_kph']
        document.getElementById('weather_det_windmph').innerHTML = JSON.parse(data)['current']['wind_mph']
        document.getElementById('weather_det_winddir').innerHTML = JSON.parse(data)['current']['wind_dir']
        document.getElementById('weather_det_tempf').innerHTML = JSON.parse(data)['current']['uv']
        document.getElementById('weather_det_uv').innerHTML = JSON.parse(data)['current']['precip_in']
        document.getElementById('weather_det_precip').innerHTML = JSON.parse(data)['current']['temp_f']
        document.getElementById('weather_det_cldcondi').innerHTML = JSON.parse(data)['current']['condition']['text']
        document.getElementById('weather_det_lat').innerHTML = JSON.parse(data)['location']['lat']
        document.getElementById('weather_det_long').innerHTML = JSON.parse(data)['location']['lon']
        document.getElementById('weather_det_country').innerHTML = JSON.parse(data)['location']['country']
        document.getElementById('weather_det_region').innerHTML = JSON.parse(data)['location']['region']
        document.getElementById('weather_det_city').innerHTML = JSON.parse(data)['location']['name']
        document.getElementById('weather_det_dateandtime').innerHTML = JSON.parse(data)['location']['localtime']
    }).catch(function (err){})
})