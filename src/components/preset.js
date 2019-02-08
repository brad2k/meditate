import React, { Fragment } from "react";
import styled from "styled-components";

const Sub = styled.sub`
    margin-left: 0.25rem;
    font-size: 1.5rem;
    display: inline-block;
    vertical-align: 0rem;
`;

const Input = styled.input`
    position: absolute;
    top: 0;
    z-index: -1;
    opacity: 0;

    &:checked + label {
        flex-grow: 4;
        background: rgba(255, 255, 255, 0.35);
    }
`;

const Label = styled.label`
    flex-grow: 1;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #5ab9ea;
    font-size: 4rem;
    position: relative;
    margin: 0.5rem;

    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;

    cursor: pointer;

    // opacity: 0.5;
    transition-duration: 0.8s;
    transition-property: flex-grow, background-color;
    transition-timing-function: cubic-bezier(0.98, 0, 0.22, 0.98);
`;

const Preset = ({ className, timer, id, setTimer, checked }) => {
    const elID = `timer${id}`;

    return (
        <Fragment>
            <Input id={elID} type="radio" name="options" defaultChecked={checked} />
            <Label htmlFor={elID} onClick={() => setTimer(timer)}>
                {timer.m > 0 && (
                    <span>
                        {(' 0' + timer.m).slice(-2)}
                        <Sub>m</Sub>
                    </span>
                )}
                {timer.s > 0 && (
                    <span>
                    {(' 0' + timer.s).slice(-2)}
                        <Sub>s</Sub>
                    </span>
                )}
            </Label>
        </Fragment>
    );
};

export default Preset;
