import React from 'react'

const Userprofile = ({params}:any) => {
  return (
    <div>
        <h1>Profile</h1>
        <hr />
        <p className='text-4xl'>profile page
    <span className='p-2 bg-orange-400   '>{params.id}</span> </p>
    </div>
  )
}

export default Userprofile