export const formatName = (name: string) => {



   return name
        .split(' ')
        .map((word) => word.split('').map((letter) => letter.toLowerCase()).join(''))
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
   


}

const name = "TIMOTHEO BENSONNETTE"

formatName(name);