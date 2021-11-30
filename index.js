const request = require("request");
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const port = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 2, // limit each IP to 1 requests per windowMs
  message: "403 HTTP Forbidden server responses",
});

//  apply to all requests
app.use(limiter);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/all", (req, res) => {
  res.render("err");
});
//Country Route
app.get("/all/:country", (req, res) => {
  let dest = req.params.country;
  var weather;
  fs.readFile("./weather.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      weather = JSON.parse(jsonString);
      let bol = false;
      for (let i = 0; i < weather.length; i++) {
        let temp = weather[i];
        if (temp.country == dest.toLowerCase()) {
          bol = true;
          res.render("weather_index", {
            city: temp.city.toUpperCase(),
            country: temp.country.toUpperCase(),
            min_c: temp.min_c,
            max_c: temp.max_c,
            avg_c: temp.avg_c,
            min_f: temp.min_f,
            max_f: temp.max_f,
            avg_f: temp.avg_f,
          });
        }
        if (bol == true) {
          break;
        }
      }
      if (bol == false) {
        console.log("not fetch");
        let options = {
          method: "GET",
          url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
          qs: { q: dest, days: "3" },
          headers: {
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            "x-rapidapi-key":
              "ceff00788dmshc572d2e939e2aa1p16f562jsn6a57c668e74a",
            useQueryString: true,
          },
        };
        request(options, function (error, response, body) {
          if (error) {
            res.render("err", { message: "404 LOCATION NOT FOUND!" });
          } else if (response.statusCode == 400) {
            res.render("loc");
          } else {
            let arr = JSON.parse(body);
            let countr = arr.location.country;
            let cit = arr.location.name;
            if (
              req.params.country.toLowerCase() ==
              arr.location.country.toLowerCase()
            ) {
              let min_temp_c = 0;
              let max_temp_c = 0;
              let avg_temp_c = 0;
              let min_temp_f = 0;
              let max_temp_f = 0;
              let avg_temp_f = 0;
              for (let i = 0; i < 3; i++) {
                min_temp_c += arr.forecast.forecastday[i].day.mintemp_c;
                max_temp_c += arr.forecast.forecastday[i].day.maxtemp_c;
                avg_temp_c += arr.forecast.forecastday[i].day.avgtemp_c;
                min_temp_f += arr.forecast.forecastday[i].day.mintemp_f;
                max_temp_f += arr.forecast.forecastday[i].day.maxtemp_f;
                avg_temp_f += arr.forecast.forecastday[i].day.avgtemp_f;
              }
              const wthr = {
                country: countr.toLowerCase(),
                city: cit.toLowerCase(),
                min_c: (min_temp_c / 3).toFixed(2) + " ℃",
                max_c: (max_temp_c / 3).toFixed(2) + " ℃",
                avg_c: (avg_temp_c / 3).toFixed(2) + " ℃",
                min_f: (min_temp_f / 3).toFixed(2) + " ℉",
                max_f: (max_temp_f / 3).toFixed(2) + " ℉",
                avg_f: (avg_temp_f / 3).toFixed(2) + " ℉",
              };
              weather.push(wthr);
              console.log("Read Object is", weather);
              const json = JSON.stringify(weather, null, 2);
              fs.writeFile("./weather.json", json, (err) => {
                if (err) {
                  console.log("Error writing file", err);
                } else {
                  console.log("Successfully wrote file");
                }
              });

              res.render("weather_index", {
                city: cit.toUpperCase(),
                country: countr.toUpperCase(),
                min_c: (min_temp_c / 3).toFixed(2) + " ℃",
                max_c: (max_temp_c / 3).toFixed(2) + " ℃",
                avg_c: (avg_temp_c / 3).toFixed(2) + " ℃",
                min_f: (min_temp_f / 3).toFixed(2) + " ℉",
                max_f: (max_temp_f / 3).toFixed(2) + " ℉",
                avg_f: (avg_temp_f / 3).toFixed(2) + " ℉",
              });
            } else {
              res.render("loc");
            }
          }
        });
      }
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});
//City Route
app.get("/all/:country/:city", (req, res) => {
  let dest = req.params.city;
  var weather;
  fs.readFile("./weather.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    try {
      weather = JSON.parse(jsonString);
      let bol = false;
      for (let i = 0; i < weather.length; i++) {
        let temp = weather[i];
        if (temp.city == dest.toLowerCase()) {
          bol = true;
          res.render("weather_index", {
            city: temp.city.toUpperCase(),
            country: temp.country.toUpperCase(),
            min_c: temp.min_c,
            max_c: temp.max_c,
            avg_c: temp.avg_c,
            min_f: temp.min_f,
            max_f: temp.max_f,
            avg_f: temp.avg_f,
          });
        }
        if (bol == true) {
          break;
        }
      }
      if (bol == false) {
        console.log("not fetch");
        let options = {
          method: "GET",
          url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
          qs: { q: dest, days: "3" },
          headers: {
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            "x-rapidapi-key":
              "ceff00788dmshc572d2e939e2aa1p16f562jsn6a57c668e74a",
            useQueryString: true,
          },
        };
        request(options, function (error, response, body) {
          if (error) {
            res.render("err", { message: "404 LOCATION NOT FOUND!" });
          } else if (response.statusCode == 400) {
            res.render("loc");
          } else {
            let arr = JSON.parse(body);
            let countr = arr.location.country;
            let cit = arr.location.name;
            if (
              req.params.country.toLowerCase() ==
              arr.location.country.toLowerCase()
            ){            
            let min_temp_c = 0;
            let max_temp_c = 0;
            let avg_temp_c = 0;
            let min_temp_f = 0;
            let max_temp_f = 0;
            let avg_temp_f = 0;
            for (let i = 0; i < 3; i++) {
              min_temp_c += arr.forecast.forecastday[i].day.mintemp_c;
              max_temp_c += arr.forecast.forecastday[i].day.maxtemp_c;
              avg_temp_c += arr.forecast.forecastday[i].day.avgtemp_c;
              min_temp_f += arr.forecast.forecastday[i].day.mintemp_f;
              max_temp_f += arr.forecast.forecastday[i].day.maxtemp_f;
              avg_temp_f += arr.forecast.forecastday[i].day.avgtemp_f;
            }
            const wthr = {
              country: countr.toLowerCase(),
              city: cit.toLowerCase(),
              min_c: (min_temp_c / 3).toFixed(2) + " ℃",
              max_c: (max_temp_c / 3).toFixed(2) + " ℃",
              avg_c: (avg_temp_c / 3).toFixed(2) + " ℃",
              min_f: (min_temp_f / 3).toFixed(2) + " ℉",
              max_f: (max_temp_f / 3).toFixed(2) + " ℉",
              avg_f: (avg_temp_f / 3).toFixed(2) + " ℉",
            };
            weather.push(wthr);
            console.log("Read Object is", weather);
            const json = JSON.stringify(weather, null, 2);
            fs.writeFile("./weather.json", json, (err) => {
              if (err) {
                console.log("Error writing file", err);
              } else {
                console.log("Successfully wrote file");
              }
            });
            res.render("weather_index", {
              city: cit.toUpperCase(),
              country: countr.toUpperCase(),
              min_c: (min_temp_c / 3).toFixed(2) + " ℃",
              max_c: (max_temp_c / 3).toFixed(2) + " ℃",
              avg_c: (avg_temp_c / 3).toFixed(2) + " ℃",
              min_f: (min_temp_f / 3).toFixed(2) + " ℉",
              max_f: (max_temp_f / 3).toFixed(2) + " ℉",
              avg_f: (avg_temp_f / 3).toFixed(2) + " ℉",
            });
          }else {
            res.render("loc");
          }}
        });
      }
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
