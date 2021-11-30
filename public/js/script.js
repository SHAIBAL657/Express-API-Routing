/*Date*/
$( function() {
    $( "#checkin" ).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        minDate: 0,
        onSelect: function(dateText, inst) {
            var selectedDate = $( this ).datepicker( "getDate" );
            selectedDate.setDate(selectedDate.getDate()+1);
            $( "#checkout" ).datepicker( "option", "minDate", selectedDate);
        }

    });
  } );

  $( function() {
    $( "#checkout" ).datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        minDate:0
    });
  } );

/*Date*/

/*Guest Count*/
var count = 0;
document.getElementById('g-p').onclick = function() {
   document.getElementById("g-c").innerHTML=++count;
};

document.getElementById('g-m').onclick = function() {
    if(document.getElementById("g-c").innerHTML==0){
        document.getElementById("g-c").innerHTML=0;
    }
    else{
        --count;
        document.getElementById("g-c").innerHTML=count;
    }
};
/*Guest Count*/
/*Slider*/

$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 50000,
      values: [ 1500, 9000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "৳" + ui.values[ 0 ] + " - ৳" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "৳" + $( "#slider-range" ).slider( "values", 0 ) +
      " - ৳" + $( "#slider-range" ).slider( "values", 1 ) );    
});

    /*Slider*/

    /*place*/
    document.getElementById('place').onkeydown=function place(){
      if(document.getElementById('place').value!=null){
        let val=document.getElementById('place').value;
      if(val.length+2 ==3){
        $(document).ready(function() {

          var acomplete = new google.maps.places.Autocomplete((document.getElementById('place')), {
    
          types: ['geocode'],
      });
    if(val.length+2==3){
      google.maps.event.addListener(acomplete, 'place_changed', function() {
    
      var near_place = acomplete.getplace();
    
    });
  }
});
}
}
}
    /*Place*/

/*map*/

const hotels = [
  [-33.890542, 151.274856],
  [33.923036, 151.259052],
  [-34.028249, 151.157507],
  [-33.80010128657071, 151.28747820854187],
  [-33.950198, 151.259302],
  [-33.718234, 150.363181 ],
  [-31.56391,  147.154312 ],
  [-33.727111, 150.371124 ],
  [-33.848588, 151.209834 ],
  [-33.851702, 151.216968 ],
  [-34.671264, 150.863657 ],
  [-35.304724, 148.662905 ],
  [-36.817685, 175.699196 ],
  [-36.828611, 175.790222 ],
  [-37.75, 145.116667 ],
  [-37.759859,145.128708 ],
  [-37.765015,145.133858 ],
  [-37.770104,145.143299 ],
  [-37.7737, 145.145187 ],  
  [-37.774785, 145.137978 ],
  [-37.819616, 144.968119 ],
  [-38.330766, 144.695692 ],
  [-39.927193, 175.053218 ],
  [-41.330162, 174.865694 ],
  [-42.734358, 147.439506 ],
  [-42.734358, 147.501315 ],
  [-42.735258, 147.438 ],
 [-43.999792, 170.463352 ]
  
];
const price_hotel =["৳16,000","৳10,000","৳12,000","৳10,000","৳12,000",
"৳16,000","৳12,000","৳14,000","৳16,000","৳12,000",
"৳10,000","৳16,000","৳14,000","৳12,000","৳12,000",
"৳16,000","৳12,000","৳16,000","৳12,000","৳12,000",
"৳10,000","৳12,000","৳10,000","৳12,000","৳16,000",
"৳12,000","৳16,000","৳12,000"];

function setMarkers(map) {
  // Adds markers to the map.
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.

  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    const infowindow = new google.maps.InfoWindow({
      content: price_hotel[i],
    });

    const marker = new google.maps.Marker({
      position: { lat: hotel[0], lng: hotel[1] },
      map,
      title:"Click to know the price"
  
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  
  }
}

function CenterControl(controlDiv, map) {
  // Set CSS for the control border.
  const controlUI = document.createElement("div");

  controlUI.style.backgroundColor = "#ff8c00";
  controlUI.style.border = "2px solid #ffa600";
  controlUI.style.width="80px";
  controlUI.style.height="80px";
  controlUI.style.lineheight="80px";
  controlUI.style.borderRadius = "50%";
  controlUI.style.marginBottom="10px";
  controlUI.style.boxShadow = "0 0 5px #ffa600";
  controlUI.style.cursor = "pointer";
  controlUI.style.textAlign = "center";
  controlUI.title = "Click to close the map";
  controlDiv.appendChild(controlUI);
  // Set CSS for the control interior.
  const controlText = document.createElement("div");
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "60px";
  controlText.style.textAlign= "center";
  controlText.innerHTML = "&times";
  controlUI.appendChild(controlText);
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", () => {
    document.getElementById("map").style.display="none";
    document.getElementById("hmcard").style.display="";
    document.getElementById("navall").style.display="";
  });
}
document.getElementById("tg-map").onclick=function myMap() {
    document.getElementById("map").style.display="flex";
    document.getElementById("hmcard").style.display="none";
    document.getElementById("navall").style.display="none";
    var mapProp= {
      center:new google.maps.LatLng(-28.024,140.887),
      zoom:3,
  };
  var map = new google.maps.Map(document.getElementById("map"),mapProp);
  const centerControlDiv = document.createElement("div");

  CenterControl(centerControlDiv, map);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
  setMarkers(map);

}

/*map*/

/* Search popup */
document.getElementById("search").onclick=function(){
    var c_i=document.getElementById("checkin").value;
    var c_o=document.getElementById("checkout").value;
    var p=document.getElementById("place").value;
    if(p===''){
      document.getElementById("popup").innerHTML="Enter Your Destination";
    }
    else if(c_i==='' && c_o==='' ){
      document.getElementById("popup").innerHTML="Enter Your Check In and Check Out Time";
    }
    else if(count=="0"){
      document.getElementById("popup").innerHTML="Enter Total Guest Number";
    }
    else{
        document.getElementById("popup").innerHTML=`<b>Search:</b> ${p}<br>
                                                    <b>Check In:</b> ${c_i}<br>
                                                    <b>Check Out:</b> ${c_o}<br>
                                                    <b>Guest:</b> ${count}<br>
                                                    <b>Price:</b> ${document.getElementById("amount").value}<br>`;
    }
};
/* Search Popup */

function change(){
  if(document.getElementById("change-weather").innerHTML=="Convert it to Fahrenheit"){
    document.getElementById("change-weather").innerHTML= "Convert it to Celsius";
    document.getElementById("weather-c").style.display="none";
    document.getElementById("weather-f").style.display="flex";
  }
  else{
    document.getElementById("change-weather").innerHTML="Convert it to Fahrenheit";
    document.getElementById("weather-f").style.display="none";
    document.getElementById("weather-c").style.display="flex";
  }
}