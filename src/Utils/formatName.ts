export const formatName = (name: string) => {



     name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

console.log(name);

}

const name = 'juan carlos';

formatName(name);