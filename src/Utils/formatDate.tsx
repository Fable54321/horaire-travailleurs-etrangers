export const formatDate = (date: Date) => {

const dayIndex = date.getDay();
    
const dayMap: Record<number, string> = {
    0: 'Dimanche',
    1: 'Lundi',
    2: 'Mardi',
    3: 'Mercredi',
    4: 'Jeudi',
    5: 'Vendredi',
    6: 'Samedi',
};

    return dayMap[dayIndex] + ' ' + 'le' + ' ' + date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
