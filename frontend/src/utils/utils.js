


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


export const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

export const formatDateForInput = (dateString) => {
if (!dateString) return "";
return new Date(dateString).toISOString().split('T')[0];
};

