const findloco = () => {
    const status = document.querySelector('.status');
    const address = document.querySelector('.address');

    const success = (position) => {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
       

       fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=4c2d8e2a1f954fdcae862489de47a270`)
       .then(response => response.json())
       .then(result => {
         if (result.features.length) {
            status.innerHTML = `LATITUTE : ${latitude}
                                LONGITUTE : ${longitude}`;

            address.innerHTML =  ` ADDRESS : ${result.features[0].properties.formatted}`  ;
         } else {
           status.innerHTML = `No address found}`  ;
         }
       });
    } 

    const error = () => {
        status.textContent = 'Unable to retrieve your location';
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        status.textContent = 'Geolocation is not supported by your browser';
    }
};



document.querySelector('.submit').addEventListener('click', findloco);
