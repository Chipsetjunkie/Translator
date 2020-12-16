import React, { Component } from 'react';
import { csv } from "d3";
import data from "./data.csv";
import "./main.css";


const ENCODING = { 
    "en": "English", 
    "es": "Spanish", 
    "pt": "Portuguese", 
    "fr": "French", 
    "zh": "Mandarin (Simplified)", 
    "pl": "Polish", 
    "de": "German" }


class App extends Component {
    state = {
        translation: {},
        active: ENCODING[navigator.language.split("-")[0]]??"English",
        translated: []
    }



    componentDidMount() {
        csv(data)
            .then(res => {
                const l = navigator.language.split("-")[0]
                const act = ENCODING[l]??this.state.active
                this.setState({ ...this.state, translation: res, active: act})
                this.translate(act)
            })
    }


    translate = (lang) => {
        if (this.state.translated.length === 0) {
            var indexes = []
            document.querySelectorAll(".texttr").forEach((i, id) => {
                const a = i.childNodes[0].textContent.trim()
                var c = this.state.translation.reduce(function (acc, curr, id) {
                    if (curr.English.includes(a)) {
                        acc.push([curr, id])
                    }
                    return acc
                }, [])
                if (c.length > 0) {
                    if (c.length > 1) {
                        c = c.filter(i => i[0].English.length === a.length);
                    }
                    if (c[0][0].English.length === a.length) {
                        i.childNodes[0].textContent = c[0][0][lang];
                        indexes[id] = c[0][1]
                    }
                    else {
                        //console.log(c[0].English, "\n", a, "\n", id)
                    }
                }
                else {
                    //console.log(a)
                }
            })
            this.setState({ ...this.state, translated: indexes })
        }
        else {
            let _id = 0;
            let translations = null;
            document.querySelectorAll(".texttr").forEach((i, id) => {
                _id = this.state.translated[id];
                if (_id !== undefined) {
                    translations = this.state.translation[_id]
                    i.childNodes[0].textContent = translations[lang];

                }
            })

        }

    }

    changeLang = e => {
        if (e.target.value !== this.state.active) {
            this.setState({ ...this.state, active: e.target.value})
            this.translate(e.target.value)
        }
    }

    options = () => {
        return (Object.entries(ENCODING).map((i, id) => (
            <option key={id} value={i[1]}>{i[1]}</option>
        )
        ))
    }


    render() {
        return (
            <div>
                <div className="cover-image-gv">
                    <div className="banner-overlay global">
                        <div className="global-logo">
                            <img className="logo" src="https://cdn-expa.aiesec.org/assets/images/brand_icons/GV.png" alt="Global Volunteer Logo" />
                        </div>
                    </div>
                </div>
                <div className="global-body gv-body">
                    <div className="static-head-text text-center offwhite-bg texttr"> If we don't change the world, then who will?
                <div className="content-text texttr">Global Volunteer is a cross-cultural experience for youth who want to gain
                    personal development and leave an impact on the world.</div>
                    </div>
                    <div className="main-info flex-container">
                        <div className="section-image-left">
                            <img className="img-responsive" src="https://cdn-expa.aiesec.org/assets/images/aiesec_org/static_images/gv_benefits_2x.jpg"
                                alt="Benefits of Global Volunteer" />
                        </div>
                        <div className="section-info-right">
                            <div className="info-container">
                                <div className="info-content">
                                    <div className="info-image">
                                        <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/gv-1_v2.svg" alt="Experience new cultures" />
                                    </div>
                                    <div className="info-text">
                                        <p className="info-head texttr">Experience new cultures</p>
                                        <p className="texttr">There's nothing quite like being in a brand new country, living and volunteering with
                                        people
                                    from all around. Imagine the things you'd learn!</p>
                                    </div>
                                </div>

                                <div className="info-content">
                                    <div className="info-image">
                                        <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/gv-2.svg" alt="Make your Impact" />
                                    </div>
                                    <div className="info-text">
                                        <p className="info-head texttr">Make your impact</p>
                                        <p className="texttr">You can make a difference in the world, it starts with that first step. Contribute
                                        towards the Sustainable Development Goals and tackle the issues you're most passionate
                                    about.</p>
                                    </div>
                                </div>
                                <div className="info-content">
                                    <div className="info-image">
                                        <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/gv-3.svg" alt="Challenge yourself" />
                                    </div>
                                    <div className="info-text">
                                        <p className="info-head texttr">Push yourself out of your comfort zone</p>
                                        <p className="texttr">If you don't try and experience new things, you'll never find your full potential.
                                    Challenge yourself, and discover the best version of you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container space-out-section">
                        <div className="flex-parent-2">
                            <div className="flex-child-2">
                                <h1 className="headings-text-left texttr">Volunteer for the Global Goals</h1>
                                <p className="content-text texttr"><strong>Why do we provide Global Volunteer experiences?</strong></p>
                                <p className="content-text mb30 texttr">Our Global Volunteer projects around the world exist because as
                                AIESEC, we
                                choose to shape what we do around what the world needs. We have committed to creating a youth
                            movement to achieve the 17 Sustainable Development Goals by the year 2030.<br /><br /><span className="texttr">This all
                                    falls
                                    under our Youth 4 Global Goals initiative aimed at activating youth to achieve the Sustainable
                            Development Goals.</span>
                                </p>
                                <a className=" red-underline-btn text-center texttr" target="_blank" href="">Learn more</a>
                            </div>
                            <div className="flex-child-2 text-center">
                                <img width="80%" src="https://cdn-expa.aiesec.org/assets/images/aiesec_org/y4gg.gif" alt="Youth 4 Global Goals" />
                            </div>
                        </div>
                    </div>

                    <div className="offwhite-bg">
                        <div className="space-out-section hidden-md-down">
                            <div className="container video-card">
                                <div className="flex-parent-2">
                                    <div className="flex-child-2">
                                        <video width="550" preload="none" controls>
                                            <source src="https://aiesec-bk.oss-cn-hangzhou.aliyuncs.com/Images/AIESEC%20Global%20Volunteer%20Introduction%20Video.mp4"
                                                type="video/mp4" />
                                    Browser not supported
                                </video>
                                    </div>
                                    <div className="flex-child-2">
                                        <div className="text-center">
                                            <img src="https://cdn-expa.aiesec.org/icons-v2/gv-logo.png" alt="Global Volunteer Logo" />
                                        </div>
                                        <p className="video-text texttr">"When I got here and saw a different reality, it changed me more than
                                        I
                                    could change them."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container space-out-section">
                        <div className="flex-parent-2">
                            <div className="flex-child-2">
                                <div className="headings-text-left texttr">What will you gain?</div>
                                <ul className="custom-ul-li">
                                    <li className="li-1">
                                        <div className="content-text texttr">Engage with all kinds of people towards achieving a purpose
                                        bigger
                                        than yourself. It's how you can empower others.
                                </div>
                                    </li>
                                    <li className="li-2">
                                        <div className="content-text texttr">Volunteering abroad isn't easy, but surpassing challenges is what
                                    makes it worth it. You learn how to be solution-oriented.</div>
                                    </li>
                                    <li className="li-3">
                                        <div className="content-text texttr">Making your contribution and seeing your impact in real-time will
                                        show you that you can indeed make a difference the world. Become that world citizen
                                        that's
                                    needed more than ever.</div>
                                    </li>
                                    <li className="li-4">
                                        <div className="content-text texttr">Going beyond what you know opens up new worlds for you. Find your
                                    values, explore your passions, and become more self-aware.</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-child-2 text-center">
                                <div className="mission-img">
                                    <img src="https://cdn-expa.aiesec.org/assets/images/ldm/LDM_artboard.png" alt="Gain Benefits" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="count-up-counter ptb60 offwhite-bg">
                        <div className="container">
                            <div className="flex-parent-3">
                                <div className="flex-child-3 text-center">
                                    <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/world-gv-youth.svg" alt="Countries covered" />
                                    <p className="texttr">120+</p>
                                    <p className="texttr">Countries covered</p>
                                </div>
                                <div className="flex-child-3 text-center">
                                    <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/members-gv-youth.svg" alt="Last year experiences" />
                                    <p className="texttr">50000+</p>
                                    <p className="texttr">Last year experiences</p>
                                </div>
                                <div className="flex-child-3 text-center">
                                    <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/positions-gv-youth.svg" alt="Positions opened" />
                                    <p className="texttr">60000+</p>
                                    <p className="texttr">Positions opened</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-out-section white-bg">
                        <div className="four-box-flow">
                            <h1 className="italics-heading texttr">A life-changing experience a few clicks away</h1>
                            <div className="flex-parent-4">
                                <div className="flex-child-4 border-top-red">
                                    <h4 className="red-text">1. <span className="texttr">Sign up and connect</span></h4>
                                    <p className="texttr">Build your profile on the AIESEC Opportunities Portal and we can start matching you with
                                opportunities.</p>
                                </div>
                                <div className="flex-child-4 border-top-red">
                                    <h4 className="red-text">2. <span className="texttr">Search</span></h4>
                                    <p className="texttr">Filter search results to find the perfect opportunity that fits your skills and interests.</p>
                                </div>
                                <div className="flex-child-4 border-top-red">
                                    <h4 className="red-text">3. <span className="texttr">Interview</span></h4>
                                    <p className="texttr">Once we find a match, we can start the process of organizing interviews and putting things
                                    in
                                place for your internship.</p>
                                </div>
                                <div className="flex-child-4 border-top-red">
                                    <h4 className="red-text ">4. <span className="texttr">Confirm and Go</span></h4>
                                    <p className="texttr"> Congratulations! You’ll have made it through the interview. From here we’ll get you prepared
                                    for
                                your new adventure.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="white-bg">
                        <div className="flex-container long-info-section">
                            <div className="section-image-left">
                                <img className="img-responsive" src="https://cdn-expa.aiesec.org/assets/images/aiesec_org/static_images/gv_support_2x.jpg"
                                    alt="Our Support" />
                            </div>
                            <div className="section-info-right">
                                <div className="info-container">
                                    <h1 className="italics-text texttr">Feel at ease with our support</h1>
                                    <div className="info-content">
                                        <div className="info-image">
                                            <img src="https://cdn-expa.aiesec.org/icons/logistics.svg" alt="logistics support" />
                                        </div>
                                        <div className="info-text">
                                            <p className="info-head texttr">Logistics Support</p>
                                            <p className="texttr">We ensure you get the right visa, arrival pick-up information before your experience
                                            and
                                        departure instructions post-experience.</p>
                                        </div>
                                    </div>

                                    <div className="info-content">
                                        <div className="info-image">
                                            <img src="https://cdn-expa.aiesec.org/icons/description.svg" alt="job description" />
                                        </div>
                                        <div className="info-text">
                                            <p className="info-head texttr">Clear job description</p>
                                            <p className="texttr">We accompany you to the workplace on the first day, ensure your job description and
                                        goals are clear, and working hours/duration align to the initial description.</p>
                                        </div>
                                    </div>

                                    <div className="info-content">
                                        <div className="info-image">
                                            <img src="https://cdn-expa.aiesec.org/icons/shield.svg" alt="Safe living conditions" />
                                        </div>
                                        <div className="info-text">
                                            <p className="info-head texttr">Safe living conditions</p>
                                            <p className="texttr">Life and health insurance is mandatory for taking part in AIESEC. You will get
                                        information about accommodation and basic living costs.</p>
                                        </div>
                                    </div>
                                    <div className="info-content">
                                        <div className="info-image">
                                            <img src="https://cdn-expa.aiesec.org/icons/learning.svg" alt="Learning experience" />
                                        </div>
                                        <div className="info-text">
                                            <p className="info-head texttr">Learning experience</p>
                                            <p className="texttr">We set clear expectations, provide cultural preparation and facilitate learning
                                            spaces
                                        before and during experiences.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="link-wrapper mtb60">
                                <a className="red-underline-btn texttr" href="" >View Opportunities</a>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <div className="hidden-md-down">
                        <div className="container">
                            <div className="desc">
                                <h6 className="texttr">AIESEC</h6>
                                <p className="texttr">AIESEC is a non-governmental not-for-profit organisation in consultative status with the United
                                Nations Economic and Social Council (ECOSOC), affiliated with the UN DPI, member of ICMYO, and
                                is recognized by UNESCO. AIESEC International Inc. is registered as a Not-for-profit
                                Organisation under the Canadian Not-for-profit Corporations Act - 2018-02-08, Corporation
                            Number: 1055154-6 and Quebec Business Number (NEQ) 1173457178 in Montreal, Quebec, Canada.</p>
                            </div>

                            <div className="about">
                                <h6 className="texttr">About</h6>
                                <a className="texttr"> About Us </a>
                                <a className="texttr" href=""> Help </a>
                                <a className="texttr" href=""> Blog </a>
                                <a className="texttr" href=""> Press </a>
                                <a className="texttr" href="" target="_blank">
                                    Annual
                            Report </a>
                            </div>

                            <div className="contact">
                                <h6 className="texttr"> Youth </h6>
                                <a className="texttr"> Global Volunteer </a>
                                <a className="texttr"> Global Talent </a>
                                <a className="texttr"> Global Entrepreneur </a>
                                <a className="texttr"> Youth 4 Global Goals </a>
                                <a className="texttr"> YouthSpeak </a>
                            </div>

                            <div className="partners">
                                <h6 className="texttr" > Organizations </h6>
                                <a className="texttr" href=""> Partner with us </a>
                                <a className="texttr" href=""> Global Volunteer </a>
                                <a className="texttr" href=""> Global Talent </a>
                                <a className="texttr" href=""> Global Entrepreneur </a>
                                <a className="texttr" href=""> Premium Organization </a>
                            </div>

                            <div className="membership">
                                <h6 className="texttr"> Membership </h6>
                                <a className="texttr"> Join Us </a>
                                <a className="texttr"> Find your country! </a>
                                <a className="texttr" href="" target="_blank"> Alumni </a>
                            </div>
                        </div>

                        <div className="container">
                            <span className="texttr">
                                © AIESEC 2018
                    </span>
                            <span>
                                <a className="texttr" href="" target="_blank"> Terms & Privacy </a>
                            </span>
                            <span>
                                <a className="texttr" href="" target="_blank"> Cookies Policy </a>
                            </span>
                            <span></span>
                            <span className="social-footer">
                                <a href="" target="_blank"><i className="cm cm-facebook"></i></a>
                                <a href="" target="_blank"><i className="cm cm-instagram"></i></a>
                                <a href="" target="_blank"><i className="cm cm-twitter"></i></a>
                                <a href="" target="_blank"><i className="cm cm-linkedin"></i></a>
                                <a href="" target="_blank"><i className="cm cm-youtube"></i></a>
                            </span>
                            <span>
                                <div className="select-box-custom">
                                    <select name="lang" id="lang" value={this.state.active} onChange={this.changeLang}>
                                        {this.options()}
                                    </select>
                                </div>
                            </span>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }

}

export default App;
