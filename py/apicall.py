import urllib.request
import json

def getWeatherDetails(country, region, city):
    country_res = ""
    region_res = ""
    city_res = ""

    if (country != "null"):
        # remove whitespace so prevent from error
        country_res = country.replace(" ", "%20") + ",%20"
    else:
        country_res = ""

    if (region != "null"):
        region_res = region.replace(" ", "%20") + ",%20"
    else:
        region_res = ""

    if (city != "null"):
        city_res = city.replace(" ", "%20") + ",%20"
    else:
        city_res = ""

    location = city_res + region_res + country_res

    url = "http://api.weatherapi.com/v1/current.json?key=21ff7d3f344941ac8cd83326221105&q=" + location + "&aqi=no"
    request = urllib.request.Request(url)
    response = urllib.request.urlopen(request)
    result = json.loads(response.read())
    return result