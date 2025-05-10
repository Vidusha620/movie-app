import { useState, useEffect, useContext } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContext';
import { useMovieContext } from '../context/MovieContext';
import ThemeToggle from './ThemeToggle';
import logo from '../Assets/Logo.jpeg';

// Navigation bar component
const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode } = useContext(ThemeContext);
    const { searchQuery } = useMovieContext();

    // Handle scroll events and update active link
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        }
        window.addEventListener('scroll', onScroll);

        // Set active link based on current path
        const path = location.pathname;
        if (path === '/') {
            setActiveLink('home');
        } else if (path === '/favorites') {
            setActiveLink('favorites');
        }

        return () => window.removeEventListener('scroll', onScroll);
    }, [location]);
    
    // Initialize search term from context
    useEffect(() => {
        if (searchQuery) {
            setSearchTerm(searchQuery);
        }
    }, [searchQuery]);

    // Update active navigation link
    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }
    
    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
    };
    return (
        <Navbar expand="md" className={`red-navbar ${scrolled ? "scrolled" : ""}`}>
            <Container>
                <Nav className="ms-auto navbar-nav-right">
                    <Nav.Link 
                        as={Link} 
                        to="/" 
                        className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} 
                        onClick={() => onUpdateActiveLink('home')}
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link 
                        as={Link} 
                        to="/favorites" 
                        className={activeLink === 'favorites' ? 'active navbar-link' : 'navbar-link'} 
                        onClick={() => onUpdateActiveLink('favorites')}
                    >
                        Favorites
                    </Nav.Link>
                    <div className="theme-toggle-container ms-3">
                        <ThemeToggle />
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )

}

export default NavBar;