enum Color{
    red = 1,
    green = 2,
    blue = 4
}

namespace Color{
    export function mixColor(colorName: string){
        if(colorName == "yellow"){
            return Color.red + Color.green
        }
        if(colorName == "white"){
            return Color.red + Color.green + Color.blue
        }
        if(colorName == "cyan"){
            return Color.green + Color.blue
        }
    }
}