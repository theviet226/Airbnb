
import MenuAdmin from '../menu-admin'
import Users from '../users/users'
import AdminHeader from '../admin-header'

function Admin() {
  return (

    <div className='row'>
        <div className='col-2'>
            <MenuAdmin/>
        </div>
        <div className='col-10'>
            <AdminHeader/>
            <Users/>
        </div>
    </div>
  )
}

export default Admin