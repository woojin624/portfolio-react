import React, { useEffect, useState } from 'react';
import './MemoryGame.css';

const MemoryGame = () => {
  // get pokemon api
  const url = 'https://pokeres.bastionbot.org/images/pokemon';
  // 게임 시작 여부
  const [isGameStart, setIsGameStart] = useState(false);
  // 열린 카드 배열
  const [openCard, setOpenCard] = useState([]);
  // 열린 카드가 일치하다면 그것을 담을 배열
  const [matched, setMatched] = useState([]);

  // 게임 클리어 여부
  const [isClear, setIsClear] = useState(false);

  // 카드 홀드 여부
  const [isCardHold, setIscardHold] = useState(false);

  // 타이머 변수
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // 포켓몬을 담은 변수
  const pokemons = [
    { id: 1, name: '이상해씨' },
    { id: 4, name: '파이리' },
    { id: 8, name: '어니부기' },
    { id: 9, name: '거북왕' },
    { id: 6, name: '리자몽' },
    { id: 10, name: '캐터피' },
    { id: 19, name: '꼬렛' },
    { id: 39, name: '푸린' },
  ];
  // 카드 랜덤으로 섞는 함수
  const shuffle = (a) => {
    let j, x, i;
    for (i = a.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  };

  // 각쌍의 카드 만들기
  const [pairOfPokemons, setPairOfPokemons] = useState([...pokemons, ...pokemons]);
  // open only that card which was matched

  // 스타트게임 버튼을 누르면 실행되는 함수.
  const startGame = (e) => {
    e.preventDefault();
    // 타이머 시작
    setTime(0);
    setTimerOn(true);
    // 게임시작 여부 true로 변경
    setIsGameStart(true);
    // 오픈된 카드 초기화
    setOpenCard([]);
    // 매치된 함수 초기화
    setMatched([]);
    // 각쌍을 만든 포켓몬의 배열을 복제하고 랜덤으로 섞고 바꿔준다.
    let arr = [...pairOfPokemons];
    shuffle(arr);
    setPairOfPokemons(arr);
  };

  const stopGame = () => {
    // 타이머 종료
    setTimerOn(false);
    // 타이머 시간을 0으로 바꿔준다
    // 게임시작 여부 false로 변경
    setIsGameStart(false);
  };

  // 게임이 다 끝난 후 재시작하는 버튼
  const restartGame = (e) => {
    e.preventDefault();
    stopGame();
    setTime(0);
  };

  // 타이머에 변동이 있다면 실행되는 이펙트
  useEffect(() => {
    // 타이머 실행의 주가 될 interval을 초기값 null로 지정
    let interval = null;
    // 만약 timerOn이 true가 되면 실행될 부분
    if (timerOn) {
      // 0.01초 단위로 타이머가 올라간다
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      // timerOn이 false가 되면 interval을 종료한다.
    } else {
      clearInterval(interval);
    }
    // 퉤
    return () => clearInterval(interval);
  }, [timerOn]);

  // openCard배열에 변화가 있다면 실행될 이펙트
  useEffect(() => {
    console.log(openCard);

    if (openCard < 2) return;

    // firstmatch에 첫번째 클릭하여 오픈된 카드의 index에 해당하는 숫자를 pairOfPokemons 배열에 비교하여
    // pairOfPokemons 배열의 index번째의 정보를 담는다.
    const firstmatch = pairOfPokemons[openCard[0]];
    // 위와 마찬가지로 secondmatch에 카드의 정보를 담는다.
    const secondmatch = pairOfPokemons[openCard[1]];
    // 만약 두번째 클릭한 카드(secondmatch)가 있다면
    // 첫번째 카드와 두번째 카드의 id 정보를 비교한다
    if (secondmatch && firstmatch.id === secondmatch.id) {
      //두 카드의 id값이 같다면
      // matched배열에 첫번째 카드의 id를 저장한다.
      // 이렇게 저장을 하면 아래의 코드 중
      // if (matched.includes(pokemon.id)) flipCard = true;
      // 이것에 의하여 매치된 카드는 오픈상태를 유지하게 된다.
      setMatched([...matched, firstmatch.id]);
    }
    // 그 후 오픈된 카드의 갯수가 2개라면 0.6초 뒤에 오픈된 카드를 다시 뒤집는다.
    if (openCard.length === 2) {
      setIscardHold(true);
      setTimeout(() => {
        setIscardHold(false);
        setOpenCard([]);
      }, 400);
    }
  }, [openCard]);

  useEffect(() => {
    console.log(matched);
    if (matched.length === 8) {
      setIsClear(true);
      stopGame();
    }
  }, [matched]);

  // 카드를 클릭하면 실행할 함수
  // openCard 배열에 현재 클릭된 카드의 인덱스를 담는다.
  const handleFlip = (i) => {
    setOpenCard((opened) => [...opened, i]);
  };

  return (
    <>
      {isGameStart ? <button onClick={restartGame}>Restart</button> : <button onClick={startGame}>Start</button>}
      <p>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}m </span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}s </span>
        <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
      </p>
      <div className='memory-game'>
        <div className={`cards ${isGameStart ? '' : 'hold'}`}>
          {pairOfPokemons.map((pokemon, i) => {
            // let's flip the card with flipped css class
            let flipCard;
            flipCard = false;

            // openCard 배열의 담긴 인덱스에 속하는 카드는 flipCard변수를 true상태로 유지.
            if (openCard.includes(i)) flipCard = true;

            // matched 배열의 담긴 요소의 id와 일치하는 카드는 flipCard변수를 true상태로 유지.
            if (matched.includes(pokemon.id)) flipCard = true;

            return (
              <div
                className={`pokemon-card ${flipCard ? 'flipped' : ''} ${isCardHold ? 'hold' : ''}`}
                key={i} //
                onClick={(e) => {
                  handleFlip(i);
                }}
              >
                <div className='inner'>
                  <div className='front'>
                    <img src={`${url}/${pokemon.id}.png`} alt='pokemon' width='100' />
                  </div>
                  <div className='back'></div>
                </div>
              </div>
            );
          })}
        </div>
        {isClear ? (
          <div className='card-clear-pop'>
            <div className='card-clear-modal'>
              <h3>clear!</h3>
              <p>
                <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}m </span>
                <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}s </span>
                <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
              </p>
              <h4>{time}</h4>
              <button onClick={() => setIsClear(false)}>닫기</button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MemoryGame;
