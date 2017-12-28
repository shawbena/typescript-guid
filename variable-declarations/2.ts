(function(){
    function theCityThatAlwaysSleeps(){
        let getCity;

        if(true){
            let city = 'Seattle';
            getCity = () => {
                return city;
            };
        }
        return getCity();
    }
})();