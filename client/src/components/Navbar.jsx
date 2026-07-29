import { Link } from "react-router-dom";


const Navbar = () => {

return (

<nav className="flex justify-between items-center px-20 py-5 bg-white">


<h1 className="text-2xl font-bold text-blue-600">
PlacePro
</h1>


<div className="flex gap-8">


<Link to="/">
Home
</Link>


<Link to="/features">
Features
</Link>


<Link to="/about">
About
</Link>


<Link to="/contact">
Contact
</Link>


</div>


<Link to="/login">
  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
    Login
  </button>
</Link>


</nav>

)

}


export default Navbar;