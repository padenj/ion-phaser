import React, { useState, useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { IonPhaser, GameInstance } from '@ion-phaser/react'
import logo from './assets/logo.png'

import './App.css'

class MainScene extends Phaser.Scene {
  private helloWorld!: Phaser.GameObjects.Text

  init () {
    this.cameras.main.setBackgroundColor('#24252A')
  }

  create () {
    this.helloWorld = this.add.text(
      this.cameras.main.centerX, 
      this.cameras.main.centerY, 
      "Hello World", { 
        font: "40px Arial", 
        color: "#ffffff" 
      }
    );
    this.helloWorld.setOrigin(0.5);
  }
  update () {
    this.helloWorld.angle += 1;
  }
}

const gameConfig: GameInstance = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%'
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: true
    }
  },
  scene: MainScene
};

export default function App () {
  const gameRef = useRef<HTMLIonPhaserElement>()
  const [game, setGame] = useState<GameInstance>()
  const [initialize, setInitialize] = useState(false)

  const destroy = () => {
    gameRef.current?.destroy()
    setInitialize(false)
    setGame(undefined)
  }

  useEffect(() => {
    if (initialize) {
      setGame(Object.assign({}, gameConfig))
    }
  }, [initialize])

  return (
    <div className="App">
      <header className="App-header">
        { initialize ? (
          <>
            <IonPhaser ref={gameRef} game={game} initialize={initialize} />
            <div onClick={destroy} className="flex destroyButton">
              <a href="#1" className="bttn">Destroy</a>
            </div>
          </>
        ) : (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <div onClick={() => setInitialize(true)} className="flex">
              <a href="#1" className="bttn">Initialize</a>
            </div>
          </>
        )}
      </header>
    </div>
  );
}
