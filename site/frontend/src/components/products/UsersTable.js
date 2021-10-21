import React, { Component } from 'react';
import UserRow from './UserRow';
// import TableTitles from './TableTitles';
class UsersTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        };
    }
    apiCall(url, handler){
        fetch(url)
            .then( response => response.json() )
            .then( data => handler(data) )
            .catch( e => console.log(e) );
    }
    usersHandler = (data) => {
        this.setState({
            users: data.data
        });
    }
    getusers(){
        this.apiCall( "/api/users", this.usersHandler );
    }
    componentDidMount(){
        // console.log('me monte!!');
        this.getusers();
    }
    componentDidUpdate(){
        // console.log('me actualice!');
    }
    render(){
        let contenido;

        if ( this.state.users.length !== 0 ){
            contenido = this.state.users.map( (user, idx) => <UserRow key={idx} id={user.id} fn={user.first_name} ln={user.last_name} email={user.email} rt={user.role.title}/> );
        }else{
            contenido = <></>;
        }

        return (
            <>
                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h5 className="m-0 font-weight-bold text-gray-800">Users list</h5>
                        </div>
                        <div className="card-body">
                            <div className="text-center">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contenido}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default UsersTable;