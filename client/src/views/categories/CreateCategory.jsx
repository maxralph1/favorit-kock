import { useNavigate } from 'react-router-dom'
import { useCategory } from '@/hooks/useCategory'
import { route } from '@/routes'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner'
 
function CreateCategory() {
  const { category, createCategory } = useCategory()
  const navigate = useNavigate()
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    await createCategory(category.data)
  }
 
  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="">
 
        <h1 className="">Add Category</h1>
 
        <div className="">
          <label htmlFor="title" className="">Title</label>
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
          <label htmlFor="description" className="">Description</label>
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
 
        <div className="">
          <button
            type="submit"
            className=""
            disabled={ category.loading }
          >
            { category.loading && <IconSpinner /> }
            Save Category
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
 
export default CreateCategory