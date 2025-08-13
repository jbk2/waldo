import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import UserGamesBoard from '../../components/UserGamesBoard';
import { GamesContext } from '../../contexts/GamesContext';
import { ResultsContext } from '../../contexts/ResultsContext';

const gamesContextVal = {
  games: [
    { id: 1, image_id: 1, user_id: 1, rank: 1, time: 1500 },
    { id: 2, image_id: 2, user_id: 1, rank: 1, time: 1500 },
    { id: 3, image_id: 3, user_id: 1, rank: 1, time: 1500 },
    { id: 4, image_id: 1, user_id: 2, rank: 2, time: 2000 },
    { id: 5, image_id: 2, user_id: 2, rank: 2, time: 2000 },
    { id: 6, image_id: 3, user_id: 2, rank: 2, time: 2000 }
  ],
  userGames: [
    { id: 1, image_id: 1, image: { id: 1, title: 'image one' }, user_id: 1, rank: 1, time: 1500 },
    { id: 2, image_id: 2, image: { id: 2, title: 'image two' }, user_id: 1, rank: 1, time: 1500 },
    { id: 3, image_id: 3, image: { id: 3, title: 'image three' }, user_id: 1, rank: 1, time: 1500 }
  ]
}

const resultsContextVal = {
  setActiveTabImageId: vi.fn(),
  setFocussedGameId: vi.fn()
}


const renderUserGamesBoard = (gamesContextVal, resultsContextVal) => {
  render(
    <GamesContext.Provider value={gamesContextVal} >
      <ResultsContext.Provider value={resultsContextVal} >
        <UserGamesBoard />
      </ResultsContext.Provider>
    </GamesContext.Provider>

  )
}

describe('UserGamesBoard', () => {


  it('renders as many stats elements as images the user has played', () => {
    renderUserGamesBoard(gamesContextVal, resultsContextVal)
    
    const imageIds = gamesContextVal.userGames.map((game) => game.image_id);
    const statsEls = screen.getAllByTestId(/^stats-by-image-id-/)
    expect(statsEls).toHaveLength(imageIds.length);
  })

  it('correctly displays the total number of games played by the user', () => {
    renderUserGamesBoard(gamesContextVal, resultsContextVal)
    const userGamesCount = gamesContextVal.userGames.length;
    const totalGamesDiv = screen.queryByTestId('total-games');

    expect(totalGamesDiv).toBeInTheDocument();
    expect(within(totalGamesDiv).getByText('Total Games Played')).toBeInTheDocument();
    expect(within(totalGamesDiv).getByText(userGamesCount.toString())).toBeInTheDocument();
  })

  it("if user hasn't played any games shows a game count of 0", () => {
    const gamesContextVal = {
      games: [
        { id: 1, image_id: 1, user_id: 1, rank: 1, time: 1500 },
        { id: 2, image_id: 2, user_id: 1, rank: 1, time: 1500 },
        { id: 3, image_id: 3, user_id: 1, rank: 1, time: 1500 },
        { id: 4, image_id: 1, user_id: 2, rank: 2, time: 2000 },
        { id: 5, image_id: 2, user_id: 2, rank: 2, time: 2000 },
        { id: 6, image_id: 3, user_id: 2, rank: 2, time: 2000 }
      ],
      userGames: []
    }

    renderUserGamesBoard(gamesContextVal, resultsContextVal)

    const userGamesCount = gamesContextVal.userGames.length;
    const totalGamesDiv = screen.queryByTestId('total-games');

    expect(totalGamesDiv).toBeInTheDocument();
    expect(within(totalGamesDiv).getByText('Total Games Played')).toBeInTheDocument();
    expect(within(totalGamesDiv).getByText(userGamesCount.toString())).toBeInTheDocument();
    expect(within(totalGamesDiv).getByText('0')).toBeInTheDocument();

    const statsEls = screen.queryAllByTestId(/^stats-by-image-id-/)
    expect(statsEls).toHaveLength(0);
  })
  
})