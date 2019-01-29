import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";

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
    max-width: 60rem;
    margin: 0 auto;
    padding: 5rem;
`;

const Header = styled.header`
    font-size: 3rem;
    line-height: 1;
    text-align: center;
`;

const Timer = styled.div`
    width: 20rem;
    height: 20rem;
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

const Presets = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
`;

const Preset = styled.button`
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 2rem;
    border: 1px solid #5ab9ea;
`;

const Control = styled.button`
    font-size: 1.4rem;
    color: #fff;
    padding: 0.5rem 1rem;
    margin-top: 2rem;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.2);
    border-width: 0;
`;

class App extends Component {
    constructor() {
        super();

        this.state = {
            running: false,
            seconds: 0,
            minutes: 0,
            secondsRemaining: 0
        };
    }

    componentDidMount() {
        this.setTimer({ minutes: 10 });
    }

    setTimer({ minutes = 0, seconds = 0 }) {
        if (this.state.running) return;

        this.setState({
            seconds,
            minutes,
            secondsRemaining: minutes * 60 + seconds
        });
    }

    toggleControl = () => {
        if (this.state.running) {
            clearInterval(this.timerID);
            this.setState({ running: false });
        } else {
            this.timerID = setInterval(() => this.tick(), 1000);
            this.setState({ running: true });
        }
    };

    tick() {
        let secondsRemaining = this.state.secondsRemaining;
        let min = ("0" + Math.floor(secondsRemaining / 60)).slice(-2);
        let sec = ("0" + (secondsRemaining - min * 60)).slice(-2);
        console.log(secondsRemaining, min, sec);

        if ((min === "00") & (sec === "00")) {
            this.toggleControl();
        }

        this.setState({
            minutes: min,
            seconds: sec,
            secondsRemaining: (secondsRemaining -= 1)
        });        
    }

    render() {
        return (
            <Wrapper>
                <GlobalStyles />
                <Header>The Hitchhiker's Guide to Sanity</Header>
                <Timer>
                    <div>{`${this.state.minutes}m ${this.state.seconds}s`}</div>
                    <div>
                        <Control onClick={this.toggleControl}>
                            {this.state.running ? "Stop" : "Start"}
                        </Control>
                    </div>
                </Timer>
                <Presets>
                    <Preset onClick={() => this.setTimer({ minutes: 5 })}>
                        5m
                    </Preset>
                    <Preset onClick={() => this.setTimer({ minutes: 10 })}>
                        10m
                    </Preset>
                    <Preset onClick={() => this.setTimer({ seconds: 5 })}>
                        5s
                    </Preset>
                </Presets>
            </Wrapper>
        );
    }
}

export default App;
