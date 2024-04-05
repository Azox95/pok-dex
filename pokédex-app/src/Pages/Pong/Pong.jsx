import React, { useState, useEffect } from 'react';
import './Pong.css';

const Pong = () => {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [ballVelocity, setBallVelocity] = useState({ x: 2, y: 2 });
  const [player1Position, setPlayer1Position] = useState(50);
  const [player2Position, setPlayer2Position] = useState(50);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const gameWidth = 100;
  const gameHeight = 100;
  const paddleWidth = 3;
  const paddleHeight = 20;
  const ballSize = 2;
  const maxScore = 5;

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'w' && player1Position > 0) {
        setPlayer1Position(player1Position - 2);
      }
      if (e.key === 's' && player1Position < gameHeight - paddleHeight) {
        setPlayer1Position(player1Position + 2);
      }
      if (e.key === 'ArrowUp' && player2Position > 0) {
        setPlayer2Position(player2Position - 2);
      }
      if (e.key === 'ArrowDown' && player2Position < gameHeight - paddleHeight) {
        setPlayer2Position(player2Position + 2);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [player1Position, player2Position]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      moveBall();
    }, 16);

    return () => clearInterval(gameLoop);
  }, []);

  const moveBall = () => {
    let nextX = ballPosition.x + ballVelocity.x;
    let nextY = ballPosition.y + ballVelocity.y;

    // Check collision with top and bottom walls
    if (nextY <= 0 || nextY >= gameHeight - ballSize) {
      setBallVelocity({ ...ballVelocity, y: -ballVelocity.y });
      nextY = ballPosition.y + ballVelocity.y;
    }

    // Check collision with player paddles
    if (
      (nextX <= paddleWidth &&
        nextY >= player1Position &&
        nextY <= player1Position + paddleHeight) ||
      (nextX >= gameWidth - paddleWidth - ballSize &&
        nextY >= player2Position &&
        nextY <= player2Position + paddleHeight)
    ) {
      setBallVelocity({ ...ballVelocity, x: -ballVelocity.x });
      nextX = ballPosition.x + ballVelocity.x;
    }

    // Check scoring
    if (nextX <= 0) {
      setPlayer2Score(player2Score + 1);
      resetBall();
    } else if (nextX >= gameWidth - ballSize) {
      setPlayer1Score(player1Score + 1);
      resetBall();
    }

    setBallPosition({ x: nextX, y: nextY });
  };

  const resetBall = () => {
    setBallPosition({ x: 50, y: 50 });
    setBallVelocity({ x: 2, y: 2 });
  };

  return (
    <div className="pong-container">
      <div
        className="ball"
        style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%` }}
      ></div>
      <div
        className="paddle"
        style={{ left: '2%', top: `${player1Position}%`, height: `${paddleHeight}%` }}
      ></div>
      <div
        className="paddle"
        style={{
          right: '2%',
          top: `${player2Position}%`,
          height: `${paddleHeight}%`,
        }}
      ></div>
      <div className="score">
        <span>{player1Score}</span>
        <span>{player2Score}</span>
      </div>
      {player1Score >= maxScore || player2Score >= maxScore ? (
        <div className="winner">
          {player1Score >= maxScore ? 'Player 1 wins!' : 'Player 2 wins!'}
        </div>
      ) : null}
    </div>
  );
};

export default Pong;
