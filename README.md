# Express-API-Routing


## Download and Execution

    Download the file.
    install node
    $npm install -g npm
    $npm install –save express-validator
    $npm install -g nodemon
    $npm install body-parser
    $npm install request
    $npm install --save pug
    $npm init -y
    $npm install express
    $npm install express-rate-limit

    Execution from Terminal - $npm run start
    



~ Using WeatherAPI.com API Documentation (weatherapi) | RapidAPI and use weather data upon loading URLs. E.g. http://localhost:3000/all/usa/colorado we will call API and Show
Colorado weather API Data.

~ http://localhost:3000 will route to index with out weather container.

~ http://localhost:3000/all will through a alert box that <b>404 PAGE NOT FOUND!</b>

~ Rate limit to hit the URL above to 1 in 30 seconds, if anyone hit more than this, we will display <b>403 HTTP Forbidden server responses</b>.

~ If no weather data found, then through alert box that, the location is incorrect.

~ When weather data for a location fetch for first time, it stores that into a JSON file, so next time if call that JSON file skipping the API call to RapidAPI.


### Routing Message


<a style="text-decoration:none;">http://localhost:3000</a> --- index <br>
<a style="text-decoration:none;">http://localhost:3000/all</a> --- 404 PAGE NOT FOUND! <br>
<a style="text-decoration:none;">http://localhost:3000/all/city_name</a> --- 404 LOCATION NOT FOUND!<br>
<a style="text-decoration:none;">http://localhost:3000/all/country_name</a> --- SHOW WEATHER DATA<br>
<a style="text-decoration:none;">http://localhost:3000/all/invalid_input</a> --- 404 LOCATION NOT FOUND!<br>
<a style="text-decoration:none;">http://localhost:3000/all/country_name/invalid_input</a> --- 404 LOCATION NOT FOUND!<br>
<a style="text-decoration:none;">http://localhost:3000/all/country_name/city_name</a> --- SHOW WEATHER DATA<br>

First input after "........./all/" should be country or else through 04 LOCATION NOT FOUND!

