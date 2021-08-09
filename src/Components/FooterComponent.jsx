import React,{Component} from 'react'
import '../Stylesheets/footer.css'

class FooterComponent extends Component {
    render() {
        return(
            <footer className="footer text-center bg-light">
                <span className="text-muted">All rights reserved 2020 @mStock App</span>                
            </footer>
        )
    }
}
export default FooterComponent