// import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { route } from '@/routes'
import { useMeals } from '@/hooks/useMeals'
import { useMeal } from '@/hooks/useMeal'

function MealsList() {
    const { meals, getMeals } = useMeals()
    const { destroyMeal } = useMeal()

    return (
        <div className="">

            <h1 className="heading">Meals</h1>

            <Link to={ route('meals.create') } className="">
                Add Meal
            </Link>

            <div className="border-t h-[1px] my-6"></div>

            <div className="">
                { meals.length > 0 && meals.map((meal) => {
                return (
                    <div
                        key={ meal.id }
                        className=""
                    >
                        <div className="">
                            { meal.title }
                        </div>
                        <div className="">
                            { meal.description }
                        </div>
                        <div className="">
                        <span className="">
                            ({ (meal.price).toFixed(2) } &#36;)
                        </span>
                        <span className="">&nbsp;&#36;</span>
                        </div>
                        <div className="">
                            { meal.active ? 'Yes' : 'No' }
                        </div>
                        <div className="">
                            <Link
                                to={ route('categories.edit', { id: meal.category.id }) }
                                className=""
                            >
                            { meal.category.title }
                            </Link>
                        </div>

                        <div className="flex gap-1">
                            <Link
                                to={ route('meals.edit', { id: meal.id }) }
                                className=""
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                className=""
                                onClick={ async () => {
                                    await destroyMeal(meal)
                                    await getMeals()
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

export default MealsList
