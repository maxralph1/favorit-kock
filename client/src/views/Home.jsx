import React, { useState } from 'react';
import items from './data';
const allCategories = ['all', ...new Set(items.map((item) => item.category))];

const Home = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <>
      <div className='hero'>
        <div>
          <h2>Welcome to <span className='favorit-kock-span'>Favorit-Kock</span></h2>
          <p className='description'>Delivering great food for more than 123 years!</p>
          <div className='buttons'>
            <a href="#" className='button'>Our Menu</a>
            <a href="#" className='button'>Book a Table</a>
            <a href="#" className='button'>Login to Book Meal</a>
          </div>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>

      <section className='why-us'>
        <div className='intro'>
          <h3 className='heading'>Why Us</h3>
          <span className='heading-description'>Why Choose Us</span>
        </div>
        <div className='articles'>
          <article>
            <h4>01</h4>
            <p className='sub-heading'>We cook great meals</p>
            <p>Our meals are carefully curated by the best chefs around the globe.</p>
          </article>
          <article>
            <h4>02</h4>
            <p className='sub-heading'>We cook great meals</p>
            <p>Our meals are carefully curated by the best chefs around the globe.</p>
          </article>
          <article>
            <h4>03</h4>
            <p className='sub-heading'>We cook great meals</p>
            <p>Our meals are carefully curated by the best chefs around the globe.</p>
          </article>
        </div>
      </section>

      <section className='menu'>
        <div>
          <h3 className='heading'>Menu</h3>
          <span className='heading-description'>Check Our Tasty Menu</span>
        </div>

        <div>
          <div>
            <ul className='menu-options'>
              {categories.map((category, index) => {
                return (
                  <li className="option">
                    <button
                      type=""
                      className="option"
                      key={index}
                      onClick={() => filterItems(category)}
                    >
                      {category}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='meals'>
            {menuItems.map((menuItem) => {
              const { id, title, img, desc, price } = menuItem;
              return (
                <article key={id} className='meal'>
                  <div className='meal-image'>
                    <img src={img} alt={title} />
                  </div> 
                  <div className='meal-info'>
                    <header>
                      <h4 className='meal-title'>{title}</h4>
                      <p className='price'>${price}</p>
                    </header>
                    <p className='meal-description'>{desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div>
          <h3 className='heading'>Specials</h3>
          <span className='heading-description'>Check Our Specials</span>
        </div>
        <div>
          {/* Use Smilga's side menu here */}
        </div>
      </section>

      <section>
        <div>
          <h3 className='heading'>Events</h3>
          <span className='heading-description'>Organize Your Events in Our Restaurant</span>
        </div>
        <div>
          {/* Put an automated react slider here */}
        </div>
      </section>

      <section>
        <div>
          <h3 className='heading'>Reservation</h3>
          <span className='heading-description'>Book a Table</span>
        </div>
        <div>
          <form action="">
            <input type="text" placeholder='Your Name' />
            <input type="text" placeholder='Your Email' />
            <input type="text" placeholder='Your Phone' />
            <input type="date" placeholder='Date' /> 
            <input type="time" placeholder='Time' /> 
            <input type="text" placeholder='Number of people' />
            <input type="text" placeholder='Message' />

            <button>Book a Table</button>
          </form>
        </div>
      </section>

      <section>
        <div>
          <h3 className='heading'>Testimonials</h3>
          <span className='heading-description'>What they're saying about us</span>
        </div>
        <div>
          {/* Use Smilga's or Traversy's testimonials here */}
        </div>
      </section>

      <section>
        <div>
          <h3 className='heading'>Gallery</h3>
          <span className='heading-description'>Some Photos of Our Restaurant</span>
        </div>
        <div>
          {/* Do a mosaic here */}
        </div>
      </section>

      <section>
        <div>
          <h3 className='heading'>Chefs</h3>
          <span className='heading-description'>Our Professional Chefs</span>
        </div>
        <div>
          {/* Use Smilga's card for chefs' images */}
        </div>
      </section>

      <section>
        <div>
          <h3 className='heading'>Contact</h3>
          <span className='heading-description'>Contact Us</span>
        </div>
        <div>
          {/* Use one of your numerous frontendmentor footers here while paying attention to the Restaurantly sample */}
        </div>
      </section>
    </>
  )
}

export default Home