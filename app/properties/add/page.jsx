import React from 'react'
import PropertyForm from '@/components/PropertyForm'

const AddProperty = () => {
  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-6'>
          <PropertyForm />
        </div>
      </div>
    </section>
  )
}

export default AddProperty