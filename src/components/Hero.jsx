import React from 'react';
import SnakeGame from './SnakeGame';
import TextType from './TextType';
import FaultyTerminal from './FaultyTerminal';
import './Hero.css';

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-background">
                <FaultyTerminal
                    scale={1.5}
                    gridMul={[2, 1]}
                    digitSize={1.2}
                    timeScale={0.5}
                    pause={false}
                    scanlineIntensity={0.5}
                    glitchAmount={1}
                    flickerAmount={1}
                    noiseAmp={1}
                    chromaticAberration={0}
                    dither={0}
                    curvature={0.1}
                    tint="#A7EF9E"
                    mouseReact
                    mouseStrength={0.5}
                    pageLoadAnimation
                    brightness={0.6}
                />
            </div>

            <div className="hero-content">
                <p className="hero-greeting">Hi all. I am</p>
                <h1 className="hero-name">Joseph Johnson</h1>
                <h2 className="hero-title">
                    {'> '}
                    <TextType
                        text={['Student', 'Developer']}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor
                        cursorCharacter="_"
                        deletingSpeed={50}
                        variableSpeedEnabled={false}
                        cursorBlinkDuration={0.5}
                    />
                </h2>

                <div className="hero-comments">
                    <p>{'// complete the game to continue'}</p>
                    <p>{'// also check out my Github page'}</p>
                    <p>
                        <span className="const-keyword">const</span> <span className="var-name">githubLink</span> = <a href="https://github.com/JosefStack" target="_blank" rel="noreferrer" className="string-val">"https://github.com/JoseStack"</a>
                    </p>
                </div>
            </div>

            <div className="hero-game">
                <div className="game-glass-panel">
                    <SnakeGame />
                </div>
            </div>
        </div>
    );
};

export default Hero;
