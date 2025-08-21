import AdminColors from './adminProductManagement/AdminColors'
import AdminProducts from './adminProductManagement/AdminProducts'
import AdminVariants from './adminProductManagement/AdminVariants'
import AdminVariantImages from './adminProductManagement/AdminVariantImages'

const ProductManagement = () => {
  return (
    <div className='md:mt-45'>
        <AdminColors/>
        <AdminProducts/>
        <AdminVariants/>
        <AdminVariantImages/>
    </div>
  )
}

export default ProductManagement