import React from 'react'
import { assets, userData } from '../assets/assets'

const UserProfile = () => {

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100' id='UserProfile' style={{backgroundImage: "url('/bg6.jpg')"}}>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-150 h-180">
          <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Customer Profile</h1> <br /><br /> <br />

            <div>
                    {userData.map((user, index)=>(
                        <div key={index}>
                            <img className='w-20 h-20 rounded-full mx-auto mb-4' src={user.image} alt={user.alt} />
                            <h1 className='text-xl text-gray-700 font-medium'>Name </h1>  <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" value={user.name}/>
                            <h1 className='text-gray-500 mb-4 text-sm'>Email       </h1>  <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="email" value={user.email}/>
                            <h1 className='text-gray-500 mb-4 text-sm'>Address      </h1>  <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="email" value={user.address}/>
                            <h1 className='text-gray-600'>Password                 </h1>  <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" value={user.password}/>
                            <h1 className='text-gray-600'>Age                    </h1>  <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" value={user.age}/>
                            <h1 className='text-gray-600'>Phone                   </h1>  <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" value={user.phone}/>
                        </div>
                    ))}
                </div>
        </div>
    </div>
  )
}

export default UserProfile

