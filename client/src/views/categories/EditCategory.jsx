import { useNavigate, useParams } from 'react-router-dom'
import { route } from '@/routes'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner' 
import { useCategory } from '@/hooks/useCategory'
 
function EditCategory() {
  const params = useParams()
  const { category, updateCategory } = useCategory(params.id)
  const navigate = useNavigate()
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    await updateCategory(category.data)
  }
 
  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="">
 
        <h1 className="">Edit Category</h1>
 
        <div className="">
          <label htmlFor="title" className="required">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={ category.data.title ?? '' }
            onChange={ event => category.setData({
              ...category.data,
              title: event.target.value,
            }) }
            className=""
            disabled={ category.loading }
          />
          <ValidationError errors={ category.errors } field="title" />
        </div>
 
        <div className="">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={ category.data.description ?? '' }
            onChange={ event => category.setData({
              ...category.data,
              description: event.target.value,
            }) }
            className=""
            disabled={ category.loading }
          />
          <ValidationError errors={ category.errors } field="description" />
        </div>
 
        <div className="border-t h-[1px] my-6"></div>
 
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className=""
            disabled={ category.loading }
          >
            { category.loading && <IconSpinner /> }
            Update Category
          </button>

          <button
            type="button"
            className=""
            disabled={ category.loading }
            onClick={ () => navigate(route('categories.index')) }
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  )
}
 
export default EditCategory