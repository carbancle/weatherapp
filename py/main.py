import apicall as apicalls
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/weatherdetails')
def weatherdetails():
    country = request.form.get('country')
    region = request.form.get('region')
    city = request.form.get('city')
    return apicalls.getWeatherDetails(country, region, city)

if __name__ == "__main__":
    app.run(debug=True, port=5000)