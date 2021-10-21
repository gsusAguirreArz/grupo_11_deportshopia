import React, {useState, useEffect} from 'react';
import StatBanner from './StatBanner';

function apiCall(url, handler){
    fetch(url)
        .then( response => response.json() )
        .then( data => handler(data) )
        .then( error => console.log(error) );
}

function InfoBanners(){

    const [prods, setprods] = useState([]);
    const [users, setusers] = useState([]);

    const usersHandler = data => {
        setusers(data.data);
    }

    const prodsHandler = data => {
        setprods(data.data);
    }

    const getProds = async url => {
        await apiCall( url, prodsHandler );
    }

    const getUsers = async url => {
        await apiCall( url, usersHandler );
    }
	
    useEffect(() => {
		// console.log('%cMe monte!', 'color: green');

        let URLs = ["/api/products" , "/api/users"];
        getProds(URLs[0]);
        getUsers(URLs[1]);

    }, [])
	
    useEffect(() => {
		// console.log('%cMe actualice!', 'color: yellow');
    }, [prods, users])
	
    useEffect(() => {
		return () => {
			// console.log('%cMe desmonte!', 'color: red');
        };
    }, [])

    let aux = [
        {
            name: "products", 
            stat: prods.length, 
            bc: "primary", 
            icn: "cubes" 
        },
        {
            name: "users",
            stat: users.filter( item => item.role_id === 2).length,
            bc: "success",
            icn: "user"
        },
        {
            name: "admins",
            stat: users.filter(item => item.role_id === 1).length,
            bc: "warning",
            icn: "user-shield"
        }
    ];

    return (
        <>
            {/* <!-- Content Row Movies--> */}
            <div className="row">
                {
                    aux.map( (item,idx) => <StatBanner title={item.name} value={item.stat} border_color={item.bc} icon={item.icn} key={idx} />)
                }
            </div>
            {/* <!-- End movies in Data Base --> */}
        </>
    );
}

export default InfoBanners;