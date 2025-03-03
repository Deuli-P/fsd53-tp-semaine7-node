


export const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long'
    });
}

export const formatAge = (birthdate) => {
    const today = new Date();
    const birthdateDate = new Date(birthdate);
    const age = today.getFullYear() - birthdateDate.getFullYear();
    return age;
}
