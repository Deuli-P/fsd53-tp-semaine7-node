const API_URL = import.meta.env.VITE_API_URL;


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

export const adminDeleteUser = async (id) => {
    try{
        const response = await fetch(`${API_URL}/api/admin/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({id: id})
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error( data.message)
        }
        if(data.success){
            return true
        }
    }
    catch(error){
        console.log('Erreur admin delete:', error)
    }
}