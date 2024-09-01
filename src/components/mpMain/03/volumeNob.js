"use client";
import { useState, React, useEffect } from "react";
import styled from 'styled-components'
import styles from '@/app/[slug]/styles.module.css';

const VolumeControl = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;

    input[type='range'] {
        -webkit-appearance: none;
        height: 100%;
        background: transparent;

        &:focus {
            outline: none;
        }

        //WEBKIT
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: ${(props) => (props.$volume > 0 ? "white" : "rgb(190,190,190)")};
            margin-top: -3px;
            cursor: pointer;
        }

        &::-webkit-slider-runnable-track {
            height: 0.3rem;
            background: ${(props) => props.$volume > 0 ? 
                `linear-gradient(to right, white ${props.$volume}%, rgba(255, 255, 255, 0.1) ${props.$volume}% 100%)`
                : "rgba(250,250,250,.3)"};
            border-radius: 3rem;
            transition: all 0.5s;
            cursor: pointer;
        }
    }
`;

const style = {
    position: "relative",
    display: "flex",
    justifyContent : "center",
    zIndex : "100"
}

function VolumeNob({volume, setVolume}){

    const [userSpeaker, setUserSpeaker] = useState(true);

    useEffect(()=>{
        if(volume === 0) setUserSpeaker(false);
    },[volume])

    return(
        <div className={styles.volume_nob} style={ style }>
            <VolumeControl $volume={volume * 100} $speaker={userSpeaker}>
                <input
                    style={{ zIndex : "100" }}
                    type="range"
                    min={0}
                    max={1}
                    step={0.02}
                    value={volume}
                    onChange={(event) => {
                        setVolume(event.target.valueAsNumber);
                    }}
                />
            </VolumeControl>
        </div>
    )      
}
export default VolumeNob;