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
    "de": "German"
}


class App extends Component {
    state = {
        translation: {},
        active: ENCODING[navigator.language.split("-")[0]] ?? "English",
        translated_ids: []
    }

    domElem = []


    componentDidMount() {
        csv(data)
            .then(res => {
                const l = navigator.language.split("-")[0]
                const act = ENCODING[l] ?? this.state.active
                this.setState({ ...this.state, translation: res, active: act })
                this.translate(act)
            })
    }

    Encoder = (data) => {
        const a = data.textContent.trim()
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
                return c[0]
            }

        } else {
            return null
        }
    }

    translate = (lang) => {
        if (this.state.translated_ids.length === 0) {
            let indexes = []
            this.domElem.forEach((i, id) => {
                if (!Array.isArray(i)) {
                    const translated = this.Encoder(i)
                    if (translated) {
                        i.textContent = translated[0][lang]
                        indexes[id]=translated[1]
                    }
                }
                else {
                    let subIndex = []
                    i[0].childNodes.forEach((e, id) => {
                        if (e.textContent) {
                            const translated = this.Encoder(e)
                            if (translated) {
                                e.textContent = translated[0][lang]
                                subIndex[id]=translated[1]
                            }
                        }
                    })
                    indexes[id]=subIndex
                }
            })
            this.setState({ ...this.state, translated_ids: indexes })
        } 
        else {
            let _id;
            let translations;
            this.domElem.forEach((i, id) => {
                _id = this.state.translated_ids[id];
                if (_id) {
                    if (!Array.isArray(_id)) {
                        translations = this.state.translation[_id]
                        i.textContent = translations[lang];
                    }
                    else{
                        _id.forEach((e,index)=>{  
                            translations = this.state.translation[e]
                            i[0].childNodes[index].textContent = translations[lang]
                        })
                    }
                }
            })
        }
    }

    changeLang = e => {
        if (e.target.value !== this.state.active) {
            this.setState({ ...this.state, active: e.target.value })
            this.translate(e.target.value)
        }
    }

    options = () => {
        return (Object.entries(ENCODING).map((i, id) => (
            <option key={id} value={i[1]}>{i[1]}</option>
        )
        ))
    }

    Elements = e => {
        if (e) {
            if (e.childNodes.length > 1) {
                this.domElem.push([e])
            }
            else {
                this.domElem.push(e)
            }
        }
    }

    render() {
        this.domElem = []
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
                    <div className="static-head-text text-center offwhite-bg " ref={e => this.Elements(e)}> If we don't change the world, then who will?
                <div className="content-text ">Global Volunteer is a cross-cultural experience for youth who want to gain
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
                                        <p className="info-head " ref={e => this.Elements(e)}>Experience new cultures</p>
                                        <p className="" ref={e => this.Elements(e)}>There's nothing quite like being in a brand new country, living and volunteering with
                                        people
                                    from all around. Imagine the things you'd learn!</p>
                                    </div>
                                </div>

                                <div className="info-content">
                                    <div className="info-image">
                                        <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/gv-2.svg" alt="Make your Impact" />
                                    </div>
                                    <div className="info-text">
                                        <p className="info-head " ref={e => this.Elements(e)}>Make your impact</p>
                                        <p className="" ref={e => this.Elements(e)}>You can make a difference in the world, it starts with that first step. Contribute
                                        towards the Sustainable Development Goals and tackle the issues you're most passionate
                                    about.</p>
                                    </div>
                                </div>
                                <div className="info-content">
                                    <div className="info-image">
                                        <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/gv-3.svg" alt="Challenge yourself" />
                                    </div>
                                    <div className="info-text">
                                        <p className="info-head " ref={e => this.Elements(e)}>Push yourself out of your comfort zone</p>
                                        <p className="" ref={e => this.Elements(e)}>If you don't try and experience new things, you'll never find your full potential.
                                    Challenge yourself, and discover the best version of you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container space-out-section">
                        <div className="flex-parent-2">
                            <div className="flex-child-2">
                                <h1 className="headings-text-left " ref={e => this.Elements(e)}>Volunteer for the Global Goals</h1>
                                <p className="content-text " ref={e => this.Elements(e)}><strong>Why do we provide Global Volunteer experiences?</strong></p>
                                <p className="content-text mb30 " ref={e => this.Elements(e)}>Our Global Volunteer projects around the world exist because as
                                AIESEC, we
                                choose to shape what we do around what the world needs. We have committed to creating a youth
                            movement to achieve the 17 Sustainable Development Goals by the year 2030.<br /><br /><span className="">This all
                                    falls
                                    under our Youth 4 Global Goals initiative aimed at activating youth to achieve the Sustainable
                            Development Goals.</span>
                                </p>
                                <a className=" red-underline-btn text-center " ref={e => this.Elements(e)} target="_blank" href="">Learn more</a>
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
                                        <p className="video-text " ref={e => this.Elements(e)}>"When I got here and saw a different reality, it changed me more than
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
                                <div className="headings-text-left " ref={e => this.Elements(e)}>What will you gain?</div>
                                <ul className="custom-ul-li">
                                    <li className="li-1">
                                        <div className="content-text " ref={e => this.Elements(e)}>Engage with all kinds of people towards achieving a purpose
                                        bigger
                                        than yourself. It's how you can empower others.
                                </div>
                                    </li>
                                    <li className="li-2">
                                        <div className="content-text " ref={e => this.Elements(e)}>Volunteering abroad isn't easy, but surpassing challenges is what
                                    makes it worth it. You learn how to be solution-oriented.</div>
                                    </li>
                                    <li className="li-3">
                                        <div className="content-text " ref={e => this.Elements(e)}>Making your contribution and seeing your impact in real-time will
                                        show you that you can indeed make a difference the world. Become that world citizen
                                        that's
                                    needed more than ever.</div>
                                    </li>
                                    <li className="li-4">
                                        <div className="content-text " ref={e => this.Elements(e)}>Going beyond what you know opens up new worlds for you. Find your
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
                                    <p className="" ref={e => this.Elements(e)}>120+</p>
                                    <p className="" ref={e => this.Elements(e)}>Countries covered</p>
                                </div>
                                <div className="flex-child-3 text-center">
                                    <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/members-gv-youth.svg" alt="Last year experiences" />
                                    <p className="" ref={e => this.Elements(e)}>50000+</p>
                                    <p className="" ref={e => this.Elements(e)}>Last year experiences</p>
                                </div>
                                <div className="flex-child-3 text-center">
                                    <img src="https://cdn-expa.aiesec.org/assets/images/icons/op_icons/positions-gv-youth.svg" alt="Positions opened" />
                                    <p className="" ref={e => this.Elements(e)}>60000+</p>
                                    <p className="" ref={e => this.Elements(e)}>Positions opened</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-out-section white-bg">
                        <div className="four-box-flow">
                            <h1 className="italics-heading " ref={e => this.Elements(e)}>A life-changing experience a few clicks away</h1>
                            <div className="flex-parent-4">
                                <div className="flex-child-4 border-top-red">
                                    <h4 className="red-text">1. <span className="" ref={e => this.Elements(e)}>Sign up and connect</span></h4>
                                    <p className="" ref={e => this.Elements(e)}>Build your profile on the AIESEC Opportunities Portal and we can start matching you with
                                opportunities.</p>
                                </div>
                                <div className="flex-child-4 border-top-red">
                                    <h4 className="red-text">2. <span className="" ref={e => this.Elements(e)}>Search</span></h4>
                                    <p className="" ref={e => this.Elements(e)}>Filter search results to find the perfect opportunity that fits your skills and interests.</p>
                                </div>
                                <div className="flex-child-4 border-top-red">
                                    <h4 className="red-text">3. <span className="" ref={e => this.Elements(e)}>Interview</span></h4>
                                    <p className="" ref={e => this.Elements(e)}>Once we find a match, we can start the process of organizing interviews and putting things
                                    in
                                place for your internship.</p>
                                </div>
                                <div className="flex-child-4 border-top-red">
                                    <h4 className="red-text ">4. <span className="" ref={e => this.Elements(e)}>Confirm and Go</span></h4>
                                    <p className="" ref={e => this.Elements(e)}> Congratulations! You’ll have made it through the interview. From here we’ll get you prepared
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
                                    <h1 className="italics-text " ref={e => this.Elements(e)}>Feel at ease with our support</h1>
                                    <div className="info-content">
                                        <div className="info-image">
                                            <img src="https://cdn-expa.aiesec.org/icons/logistics.svg" alt="logistics support" />
                                        </div>
                                        <div className="info-text">
                                            <p className="info-head " ref={e => this.Elements(e)}>Logistics Support</p>
                                            <p className="" ref={e => this.Elements(e)}>We ensure you get the right visa, arrival pick-up information before your experience
                                            and
                                        departure instructions post-experience.</p>
                                        </div>
                                    </div>

                                    <div className="info-content">
                                        <div className="info-image">
                                            <img src="https://cdn-expa.aiesec.org/icons/description.svg" alt="job description" />
                                        </div>
                                        <div className="info-text">
                                            <p className="info-head " ref={e => this.Elements(e)}>Clear job description</p>
                                            <p className="" ref={e => this.Elements(e)}>We accompany you to the workplace on the first day, ensure your job description and
                                        goals are clear, and working hours/duration align to the initial description.</p>
                                        </div>
                                    </div>

                                    <div className="info-content">
                                        <div className="info-image">
                                            <img src="https://cdn-expa.aiesec.org/icons/shield.svg" alt="Safe living conditions" />
                                        </div>
                                        <div className="info-text">
                                            <p className="info-head " ref={e => this.Elements(e)}>Safe living conditions</p>
                                            <p className="" ref={e => this.Elements(e)}>Life and health insurance is mandatory for taking part in AIESEC. You will get
                                        information about accommodation and basic living costs.</p>
                                        </div>
                                    </div>
                                    <div className="info-content">
                                        <div className="info-image">
                                            <img src="https://cdn-expa.aiesec.org/icons/learning.svg" alt="Learning experience" />
                                        </div>
                                        <div className="info-text">
                                            <p className="info-head " ref={e => this.Elements(e)}>Learning experience</p>
                                            <p className="" ref={e => this.Elements(e)}>We set clear expectations, provide cultural preparation and facilitate learning
                                            spaces
                                        before and during experiences.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="link-wrapper mtb60">
                                <a className="red-underline-btn " ref={e => this.Elements(e)} href="" >View Opportunities</a>
                            </div>
                        </div>
                    </div>
                </div>

                <footer>
                    <div className="hidden-md-down">
                        <div className="container">
                            <div className="desc">
                                <h6 className="" ref={e => this.Elements(e)}>AIESEC</h6>
                                <p className="" ref={e => this.Elements(e)}>AIESEC is a non-governmental not-for-profit organisation in consultative status with the United
                                Nations Economic and Social Council (ECOSOC), affiliated with the UN DPI, member of ICMYO, and
                                is recognized by UNESCO. AIESEC International Inc. is registered as a Not-for-profit
                                Organisation under the Canadian Not-for-profit Corporations Act - 2018-02-08, Corporation
                            Number: 1055154-6 and Quebec Business Number (NEQ) 1173457178 in Montreal, Quebec, Canada.</p>
                            </div>

                            <div className="about">
                                <h6 className="" ref={e => this.Elements(e)}>About</h6>
                                <a className="" ref={e => this.Elements(e)}> About Us </a>
                                <a className="" ref={e => this.Elements(e)} href=""> Help </a>
                                <a className="" ref={e => this.Elements(e)} href=""> Blog </a>
                                <a className="" ref={e => this.Elements(e)} href=""> Press </a>
                                <a className="" ref={e => this.Elements(e)} href="" target="_blank">
                                    Annual
                            Report </a>
                            </div>

                            <div className="contact">
                                <h6 className="" ref={e => this.Elements(e)}> Youth </h6>
                                <a className="" ref={e => this.Elements(e)}> Global Volunteer </a>
                                <a className="" ref={e => this.Elements(e)}> Global Talent </a>
                                <a className="" ref={e => this.Elements(e)}> Global Entrepreneur </a>
                                <a className="" ref={e => this.Elements(e)}> Youth 4 Global Goals </a>
                                <a className="" ref={e => this.Elements(e)}> YouthSpeak </a>
                            </div>

                            <div className="partners">
                                <h6 className="" ref={e => this.Elements(e)} > Organizations </h6>
                                <a className="" ref={e => this.Elements(e)} href=""> Partner with us </a>
                                <a className="" ref={e => this.Elements(e)} href=""> Global Volunteer </a>
                                <a className="" ref={e => this.Elements(e)} href=""> Global Talent </a>
                                <a className="" ref={e => this.Elements(e)} href=""> Global Entrepreneur </a>
                                <a className="" ref={e => this.Elements(e)} href=""> Premium Organization </a>
                            </div>

                            <div className="membership">
                                <h6 className="" ref={e => this.Elements(e)}> Membership </h6>
                                <a className="" ref={e => this.Elements(e)}> Join Us </a>
                                <a className="" ref={e => this.Elements(e)}> Find your country! </a>
                                <a className="" ref={e => this.Elements(e)} href="" target="_blank"> Alumni </a>
                            </div>
                        </div>

                        <div className="container">
                            <span className="" ref={e => this.Elements(e)}>
                                © AIESEC 2018
                    </span>
                            <span>
                                <a className="" ref={e => this.Elements(e)} href="" target="_blank"> Terms & Privacy </a>
                            </span>
                            <span>
                                <a className="" ref={e => this.Elements(e)} href="" target="_blank"> Cookies Policy </a>
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
