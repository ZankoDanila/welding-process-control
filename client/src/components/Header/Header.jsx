import { useState } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useDispatch, useSelector } from 'react-redux'
import { toggleAdminMode } from '../../store/slices/adminSlice'

import './Header.css'


function Header({ organizationName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const dispatch = useDispatch()

  const isAdmin = useSelector(
    (state) => state.admin.isAdmin
  )

  const closeMenu = () => {
    setIsMenuOpen(false)
  }


  return (
    <Navbar
      expanded={isMenuOpen}
      onToggle={setIsMenuOpen}
      className="header"
    >

      <Container fluid className="header-container">


        <Navbar.Brand
          as={Link}
          to="/#hero"
          className="logo-block"
          onClick={closeMenu}
        >
          <img
            src="/img/BRU_logo.png"
            alt="Логотип БРУ"
            className="logo-img"
          />

          <div className="logo-text">
            <span className="text-black">
              {organizationName}
            </span>

            <span className="text-blue">
              Система контроля сварочных процессов
            </span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar"
          aria-label="Открыть меню"
          className="burger-menu"
        >
          <span className="burger-icon">
            <span />
            <span />
            <span />
          </span>
        </Navbar.Toggle>

        <Navbar.Collapse id="main-navbar">

          <Nav className="nav-panel">

            <Nav.Link
              as={Link}
              to="/#hero"
              onClick={closeMenu}
            >
              ГЛАВНАЯ
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/catalog"
              onClick={closeMenu}
            >
              РАЗРАБОТКИ
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/#complectation"
              onClick={closeMenu}
            >
              СИСТЕМА
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/team"
              onClick={closeMenu}
            >
              КОМАНДА
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/#news"
              onClick={closeMenu}
            >
              НОВОСТИ
            </Nav.Link>


            <Nav.Link
              href="#"
              className="btn-cabinet-mobile"
              onClick={closeMenu}
            >
              КАБИНЕТ
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>


        <div className="admin-mode-switch">

          <span className="admin-mode-label">
            Администратор
          </span>

          <Form.Check
            type="switch"
            id="admin-mode-switch"
            checked={isAdmin}
            onChange={() => dispatch(toggleAdminMode())}
            aria-label="Переключить режим администратора"
          />

        </div>


        <Button
          as="a"
          href="#"
          className="btn-cabinet"
        >
          КАБИНЕТ
        </Button>

      </Container>

    </Navbar>
  )
}


export default Header
