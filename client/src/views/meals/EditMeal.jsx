import { useNavigate, useParams } from 'react-router-dom'
import { route } from '@/routes'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner'
import { useCategories } from '@/hooks/useCategories'
import { useMeal } from '@/hooks/useMeal'
 
function EditMeal() {
    const params = useParams()
    const navigate = useNavigate()
    const { categories } = useCategories()
    const { meal, updateMeal } = useMeal(params.id)
  
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    await updateMeal(meal.data)
  }
 
  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="">
 
        <h1 className="">Edit Meal</h1>
 
        <div className="">
          <label htmlFor="category_id" className="required">Category</label>
          <select
            id="category_id"
            className=""
            value={ meal.data.category_id ?? '' }
            onChange={ event => meal.setData({
              ...meal.data,
              category_id: event.target.value,
            }) }
            disabled={ meal.loading }
          >
            { categories.length > 0 && categories.map((category) => {
              return <>
                <option key={ category.id } value={ category.id }>
                    { category.title.toUpperCase() }{' '}
                    { category.description }
                </option>
              </>
            }) }
          </select>
          <ValidationError errors={ meal.errors } field="category_id" />
        </div>

        <div className="">
          <label htmlFor="title" className="">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={ meal.data.title ?? '' }
            onChange={ event => meal.setData({
              ...meal.data,
              title: event.target.value,
            }) }
            className=""
            disabled={ meal.loading }
          />
          <ValidationError errors={ meal.errors } field="title" />
        </div>
 
        <div className="">
          <label htmlFor="description" className="">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={ meal.data.description ?? '' }
            onChange={ event => meal.setData({
              ...meal.data,
              description: event.target.value,
            }) }
            className=""
            disabled={ meal.loading }
          />
          <ValidationError errors={ meal.errors } field="description" />
        </div>
 
        <div className="">
          <label htmlFor="price" className="">Price (USD)</label>
          <input
            id="price"
            name="price"
            type="text"
            value={ meal.data.price ?? '' }
            onChange={ event => meal.setData({
              ...meal.data,
              price: event.target.value,
            }) }
            className=""
            disabled={ meal.loading }
          />
          <ValidationError errors={ meal.errors } field="price" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="active" className="required">Active</label>
          <select
            name="active"
            id="active"
            className="form-input"
            value={ meal.data.active ?? '' }
            onChange={ event => meal.setData({
              ...meal.data,
              active: event.target.value,
            }) }
            disabled={ meal.loading }
          >
            <option value="1">Yes</option>
            <option value="0">False</option>
          </select>
          <ValidationError errors={ meal.errors } field="active" />
          <ValidationError errors={ meal.errors } field="general" />
        </div>
 
        <div className="border-t h-[1px] my-6"></div>
 
        <div className="">
          <button
            type="submit"
            className=""
            disabled={ meal.loading }
          >
            { meal.loading && <IconSpinner /> }
            Save Meal
          </button>
 
          <button
            type="button"
            className=""
            disabled={ meal.loading }
            onClick={ () => navigate(route('meals.index')) }
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </form>
  )
}
 
export default EditMeal