import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { route } from '@/routes'
 
function NamedLink(props) {
  return (
    <NavLink
      end
      to={ route(props.name) }
      className={({ isActive }) => isActive ?
        'text-red-600 underline' :
        'text-red-600'
      }
    >
      { props.children }
    </NavLink>
  )
}
 
NamedLink.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
 
export default NamedLink