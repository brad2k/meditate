import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Preset from "./components/preset";
import audio from "./bell.mp3";

const GlobalStyles = createGlobalStyle`
    html {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-size: 10px;
        height: 100vh;
        background: radial-gradient(circle, rgba(90,185,234,1) 0%, rgba(86,128,233,1) 96%);
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        font-size: 1.6rem;
        line-height: 1.8;
        padding: 0;
        margin: 0;
        color: #FFF;
        font-family: 'Montserrat', sans-serif;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 50rem;
    margin: 0 auto;
    padding: 5rem;
`;

const Header = styled.header`
    font-size: 3rem;
    line-height: 1;
    text-align: center;
`;

const Timer = styled.div`
    width: 22rem;
    height: 22rem;
    border-radius: 50%;
    border: 1px solid #5ab9ea;
    font-size: 3.5rem;
    background-color: #5680e9;
    margin: 5rem auto;
    display: grid;
    align-self: center;
    align-content: center;
    text-align: center;
    line-height: 1;
`;

const PresetRow = styled.div`
    /* display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem; */
    display: flex;
    justify-content: center;
    align-items: stretch;
    position: relative;
`;

const Control = styled.span`
    margin-top: 2rem;
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 17.32px solid rgba(255, 255, 255, 0.5);
    ${props => props.running ? 'border: 10px solid rgba(255, 255, 255, 0.5);' : ''}
`;

class App extends Component {
    constructor() {
        super();

        this.audio = new Audio(audio);

        this.state = {
            running: false,
            defaultPreset: 1,
            s: 0,
            m: 0,
            secondsRemaining: 0
        };
    }

    componentDidMount() {
        this.setTimer({ m: 10 });
    }

    setTimer({ m = 0, s = 0 }) {
        if (this.state.running) return;

        this.setState({
            s,
            m,
            secondsRemaining: m * 60 + s
        });
    }

    toggleControl = () => {
        if (this.state.running) {
            clearInterval(this.timerID);
            this.setState({ running: false });
        } else {
            this.timerID = setInterval(() => this.tick(), 1000);
            this.setState({ running: true });
            this.audio.play();
        }
    };

    tick() {
        let secondsRemaining = this.state.secondsRemaining;
        let min = ("0" + Math.floor(secondsRemaining / 60)).slice(-2);
        let sec = ("0" + (secondsRemaining - min * 60)).slice(-2);

        if ((min === "00") & (sec === "00")) {
            this.toggleControl();
        }

        this.setState({
            m: min,
            s: sec,
            secondsRemaining: (secondsRemaining -= 1)
        });
    }

    render() {
        return (
            <Wrapper>
                <GlobalStyles />
                <Header>The Hitchhiker's Guide<br />to Sanity</Header>
                <Timer>
                    <div>{`${this.state.m}m ${this.state.s}s`}</div>
                    <div>
                        <Control onClick={this.toggleControl} running={this.state.running} />
                    </div>
                </Timer>
                <div>
                    <PresetRow>
                        <Preset
                            timer={{ m: 5 }}
                            id={1}
                            checked
                            setTimer={this.setTimer.bind(this)}
                        />
                        <Preset
                            timer={{ m: 10 }}
                            id={2}
                            setTimer={this.setTimer.bind(this)}
                        />
                    </PresetRow>
                    <PresetRow>
                        <Preset
                            timer={{ m: 15 }}
                            id={3}
                            setTimer={this.setTimer.bind(this)}
                        />
                        <Preset
                            timer={{ s: 5 }}
                            id={4}
                            setTimer={this.setTimer.bind(this)}
                        />
                    </PresetRow>
                </div>
            </Wrapper>
        );
    }
}

export default App;
