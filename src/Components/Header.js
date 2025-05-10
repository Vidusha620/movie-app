import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import logo from '../Assets/Logo.jpeg';

// Header with logo, title and search functionality
const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { searchQuery } = useMovieContext();

    // Load previous search term if available
    React.useEffect(() => {
        if (searchQuery) {
            setSearchTerm(searchQuery);
        }
    }, [searchQuery]);

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <div className="app-header">
            <Container>
                <div className="header-content">
                    <div className="logo-container">
                        <Link to="/" className="logo-link">
                            <img src={logo} alt="Movie Logo" className="logo-image-large" />
                        </Link>
                    </div>
                    
                    <div className="title-container">
                        <h1 className="site-title-large">Popcorn Heads</h1>
                    </div>
                    
                    <Form className="search-form-header" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search movies..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-light" type="submit">Search</Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default Header;
