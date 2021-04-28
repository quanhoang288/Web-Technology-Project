import React, { Component } from 'react'
import './Footer.css'
export class Footer extends Component {
    render() {
        return (
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Gallery</h3>
                        <ul>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Trending</a></li>
                            <li><a href="#">Picks</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Marketplace</h3>
                        <ul>
                            <li><a href="#">Trending</a></li>
                            <li><a href="#">Best selling</a></li>
                            <li><a href="#">Latest</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Magazine</h3>
                        <ul>
                            <li><a href="#">Art skills</a></li>
                            <li><a href="#">Career</a></li>
                            <li><a href="#">Inspiration</a></li>
                            <li><a href="#">News</a></li>
                        </ul>
                    </div>
                    <div class="footer-section form">
                        <h3>Newsletter</h3>
                        <p>Subscribe to our newsletter to get your weekly dose of news,updates,tips and special offers.</p>
                        <input type="email" placeholder="Enter your email address" />
                        <button>Subscribe</button>
                    </div>
                </div>
                <div class="footer-bottom">
                    Privacy policy-Terms and conditions
  </div>
            </div>
        )
    }
}

export default Footer
