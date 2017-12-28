(function () {
    function theCityThatAlwaysSleeps() {
        var getCity;
        if (true) {
            var city_1 = 'Seattle';
            getCity = function () {
                return city_1;
            };
        }
        return getCity();
    }
})();
