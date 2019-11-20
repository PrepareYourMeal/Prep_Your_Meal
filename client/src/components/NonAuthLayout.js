import React, { Component, Suspense } from "react";
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

const NonAuthTopbar = React.lazy(() => import("./NonAuthTopbar"));
const Navbar = React.lazy(() => import("./Navbar"));
const Footer = React.lazy(() => import("./Footer"));

const loading = () => <div className="text-center">Loading...</div>



class NonAuthLayout extends Component {
    render() {
        const children = this.props.children || null;
        return (
            <div className="app">
                <header id="topnav">
                    
                    <Suspense fallback={loading()}>
                        <NonAuthTopbar {...this.props} />
                        <Navbar {...this.props} />
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