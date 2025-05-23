import React from 'react';

// hooks
import {
    useIsWhite,
    useMoveHistory,
    useMyBombs,
    useBombPlantingTime,
    useGameState
} from '../../hooks';

// components
import { Timer } from '../';

// constants
import { GAME_STATES } from '../../constants';

const SidePanel = () => {
    const moveHistory = useMoveHistory();
    const isWhite = useIsWhite();
    const myBombs = useMyBombs();
    const bombPlantingTimeLeft = useBombPlantingTime();
    const gameState = useGameState();

    return (
        <div className="side-panel">
            {(gameState === GAME_STATES.placing_bombs) ?
                <div className="bomb-placement-info">
                    <h3>
                        {
                            (myBombs.length < 3) ?
                                `Plant your ${3 - myBombs.length} bombs!` :
                                "Waiting for your opponent to finish planting bombs..."
                        }
                    </h3>
                    <Timer 
                        isActive={true}
                        initialSeconds={bombPlantingTimeLeft}
                    />
                    <p>
                        As the {isWhite ? "white" : "black"} player, you can place bombs only on the {isWhite ? "3rd & 4th" : "5th & 6th"} ranks.
                        <br />
                        <br />
                        Your opponent can't see them, but you can (marked with a red X).
                        <br />
                        <br />
                        Any piece that steps on a bomb is destroyed, and the bomb is removed.
                    </p>
                </div>
                :
                <div className="move-history">
                    <h3>Moves</h3>
                    <div className="move-history-table">
                        {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, idx) => {
                            const whiteMove = moveHistory[2 * idx];
                            const blackMove = moveHistory[2 * idx + 1];

                            return (
                                <div className="move-history-row" key={idx}>
                                    <div className="move-turn">{idx + 1}.</div>
                                    <div className="move-white">{whiteMove || ""}</div>
                                    <div className="move-black">{blackMove || ""}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }
        </div>
    );
};

export default SidePanel;