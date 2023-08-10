import { Link } from "react-router-dom";

const DropdownButtonItem = ({link, body}) => {
    return ( 
        <Link to={link} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 z-[100]" role="menuitem">{body}</Link>
     );
}
 
export default DropdownButtonItem;