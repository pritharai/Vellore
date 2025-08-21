import React from 'react'
import AdminColors from './adminProductManagement/AdminColors'
import AdminProducts from './adminProductManagement/AdminProducts'
import AdminVariants from './adminProductManagement/AdminVariants'

const ProductManagement = () => {
  return (
    <div className='md:mt-45'>
        <AdminColors/>
        <AdminProducts/>
        <AdminVariants/>
    </div>
  )
}

export default ProductManagement