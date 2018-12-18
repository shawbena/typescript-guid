"use strict";
var Album = /** @class */ (function () {
    function Album() {
        this.label = new Album.AlbumLabel();
    }
    return Album;
}());
(function (Album) {
    var AlbumLabel = /** @class */ (function () {
        function AlbumLabel() {
        }
        return AlbumLabel;
    }());
    Album.AlbumLabel = AlbumLabel;
})(Album || (Album = {}));
