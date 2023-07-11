import { Link } from 'react-router-dom'
import { route } from '@/routes'
import { useCategories } from '@/hooks/useCategories'
import { useCategory } from '@/hooks/useCategory'
 
function CategoriesList() {
  const { categories, getCategories } = useCategories()
  const { destroyCategory } = useCategory()
 
  return (
    <div className="">
 
      <h1 className="">Categories</h1>
 
      <Link to={ route('categories.create') } className="">
        Add Category
      </Link>
 
      <div className="border-t h-[1px] my-6"></div>
 
      <div className="">
        { categories.length > 0 && categories.map(category => {
          return (
            <div
              key={ category.id }
              className=""
            >
              <div className="">
                <div className="">
                  { category.title }
                </div>
                <div className="">
                  { category.description }
                </div>
              </div>
              <div className="flex gap-1">
                <Link
                  to={ route('categories.edit', { id: category.id }) }
                  className=""
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className=""
                  onClick={ async () => {
                    await destroyCategory(category)
                    await getCategories()
                  } }
                >
                  X
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
 
export default CategoriesList