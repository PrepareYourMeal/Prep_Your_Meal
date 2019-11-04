import React, { Component, Suspense } from "react";
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

const Topbar = React.lazy(() => import("./Topbar"));
const Navbar = React.lazy(() => import("./Navbar"));
const Footer = React.lazy(() => import("./Footer"));
const loading = () => <div className="text-center"></div>;

class NonAuthLayout extends Component {

    constructor(props) {
        super(props);

        // this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isMenuOpened: false
        }
    }

    render() {
        const children = this.props.children || null;
        return (
            <div className="app">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar rightSidebarToggle={this.toggleRightSidebar} menuToggle={this.toggleMenu} isMenuOpened={this.state.isMenuOpened} {...this.props} />
                        <Navbar isMenuOpened={this.state.isMenuOpened} {...this.props} />
                    </Suspense>
                </header>

                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {children}
                        </Suspense>
                    </Container>
                </div>

                <Footer />
              
            </div>
        );
    }
}

export default connect()(NonAuthLayout);