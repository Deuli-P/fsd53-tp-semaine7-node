import {useState, useEffect } from 'react'
import Card from '../components/Card';
const  API_URL = import.meta.env.VITE_API_URL;

const UserList = () => {


  const optionCategory= ['Client','Technique','Marketing'];

  const [ query, setQuery ] = useState({
    search_query: '',
    category: null
  });
  const [ userList, setUserList ] = useState([]);

  const handleChangeQuery= (e) => {
    const { name, value } = e.target;

    setQuery({
      ...query,
      [name]: value === "- Aucun -" ? null : value
    });
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleListUser();
    }
  };


  const handleListUser = async () => {
    try{

      const queryParams = new URLSearchParams();

      if (query.search_query && query.search_query.trim() !== "") {
        queryParams.append("search_query", query.search_query);
      }
      if (query.category && query.category.trim() !== "") {
        queryParams.append("category", query.category);
      }

      const url = `${API_URL}/api/list${queryParams.toString() ? "?" + queryParams.toString() : ""}`;

      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      setUserList(data);
    }
    catch (error) {
      console.log('Erreur lors de la récupération des utilisateurs', error)
    }
  };

  useEffect(() => {
    handleListUser();
  },[]);


  useEffect(() => {
    handleListUser();
  },[query.category]);

  useEffect
  return (
    <main className='userList-container'>
      <h1>Liste des utilisateurs</h1>
      <div className='divider-horizontal'/>
      <div className="userList-filters-container">
        <div className="userList-search-input-container">
          <input 
            type="text" 
            value={query.search_query} 
            name='search_query' 
            onChange={(e)=> handleChangeQuery(e)}
            onKeyDown={handleKeyPress}
            placeholder="Rechercher un utilisateur..."
          />
        </div>
        <div className="userList-category-container">
          <label htmlFor="">Catégorie :</label>
          <select name="category" id="select-category" onChange={(e)=> handleChangeQuery(e)}>
            <option>- Aucun -</option>
            {optionCategory.map((option, index) => (
              <option 
                key={index} 
                value={option}
                className='useList-category-option'
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="userList-list-container">
        {userList.length === 0 && 
        <div className="userList-list-empty">
          <p>Aucun utilisateur trouvé</p>
        </div>
        }
        {userList.map((user,index) => (
          <Card key={"card_"+index} userData={user} />
        ))}
      </div>
    </main>
  )
}

export default UserList;