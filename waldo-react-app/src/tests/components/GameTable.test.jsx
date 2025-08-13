import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '../../contexts/AuthContext';
import { GamesContext } from '../../contexts/GamesContext';
import { ResultsContext } from '../../contexts/ResultsContext';
import GameTable from '../../components/GameTable';

const authContextVal = {
  user: { id: 1, username: 'user1'}
}

const gamesContextVal = {
  images: [
    { image_id: 1, title: 'imgOne', difficulty: 'easy' },
    { image_id: 2, title: 'imgTwo', difficulty: 'medium' },
    { image_id: 3, title: 'imgThree', difficulty: 'difficult' }
  ],
  DIFFICULTY_PROPS: {
    easy: { text_abbreviation: 'easy' },
    medium: { text_abbreviation: 'med' },
    difficult: { text_abbreviation: 'diff' },
  },
  games: [
    { id: 1, image_id: 1, user_id: 1, rank: 1, time: 1500 },
    { id: 2, image_id: 2, user_id: 1, rank: 1, time: 1500 },
    { id: 3, image_id: 3, user_id: 1, rank: 1, time: 1500 },
    { id: 4, image_id: 1, user_id: 2, rank: 2, time: 2000 },
    { id: 5, image_id: 2, user_id: 2, rank: 2, time: 2000 },
    { id: 6, image_id: 3, user_id: 2, rank: 2, time: 2000 }
  ]
}

const resultsContextVal = {
  activeTabImageId: 1,
  setActiveTabImageId: vi.fn(),
  imagesAndTheirGames: [
    { image_id: 1,
      games: [
        { id: 1, image_id: 1, user_id: 1, rank: 1, time: 1500 },
        { id: 4, image_id: 1, user_id: 2, rank: 2, time: 2000 }
      ]
    },
    { image_id: 2,
      games: [
        { id: 2, image_id: 2, user_id: 1, rank: 1, time: 1500 },
        { id: 5, image_id: 2, user_id: 2, rank: 2, time: 2000 }
      ]
    },
    { image_id: 3,
      games: [
        { id: 3, image_id: 3, user_id: 1, rank: 1, time: 1500 },
        { id: 6, image_id: 3, user_id: 2, rank: 2, time: 2000 }
      ]
    }
  ],
  activeTabGames: [
    { id: 1, image_id: 1, user_id: 1, rank: 1, time: 1500 },
    { id: 4, image_id: 1, user_id: 2, rank: 2, time: 2000 }
  ],
  focussedGameId: null
}

const renderGameTable = (authContextVal, gamesContextVal, resultsContextVal) => {
  render(
    <AuthContext.Provider value={authContextVal} >
      <GamesContext.Provider value={gamesContextVal} >
        <ResultsContext.Provider value={resultsContextVal} >
          <GameTable />
        </ResultsContext.Provider>
      </GamesContext.Provider>
    </AuthContext.Provider>
  )
}

// test the following:
// - that all of the tabs for all of the image titles are present concatenated with thte difficulty level
// - that the current selected tab will only render games in the table with the id of the selected tab (maybe want tp put ids on the tabs)
// - that a tab click will select a new tab
// test styling - probably not
describe('GameTable component', () => {  
  it('renders tabs labelled with concatenation of images title and image difficulty', () => {
    renderGameTable(authContextVal, gamesContextVal, resultsContextVal)
    
    gamesContextVal.images.forEach((img) => {
      const imgTitle = img.title;
      const imgDiff = gamesContextVal.DIFFICULTY_PROPS[img.difficulty].text_abbreviation;
      
      expect(screen.getByRole('tab', { name: `${imgTitle} - ${imgDiff}` })).toBeInTheDocument();
    })
  })
  
  it('styles the active tab correctly', () => {
    renderGameTable(authContextVal, gamesContextVal, resultsContextVal)
    
    const activeTabImg = gamesContextVal.images.find((img) => img.image_id === resultsContextVal.activeTabImageId);
    const activeTabAbbrevDiff = gamesContextVal.DIFFICULTY_PROPS[activeTabImg.difficulty].text_abbreviation;
    const activeTabFullTitle = activeTabImg.title + ' - ' + activeTabAbbrevDiff; 
    
    const activeTabEl = screen.getByRole('tab', { name: activeTabFullTitle});
    expect(activeTabEl.className).toContain('tab-active');
    
    
  });
  
  it('styles inactive tabs correctly', () => {
    renderGameTable(authContextVal, gamesContextVal, resultsContextVal)
    const nonActiveImages = gamesContextVal.images.filter((img) => img.image_id !== resultsContextVal.activeTabImageId);
    nonActiveImages.forEach((img) => {
      const nonActiveTabTitle = img.title + ' - ' + gamesContextVal.DIFFICULTY_PROPS[img.difficulty].text_abbreviation;
      const nonActiveTabEl = screen.getByRole('tab', { name: nonActiveTabTitle });
      expect(nonActiveTabEl.className).not.toContain('tab-active');
    });
  });
  
  it('makes a newly clicked tab active',async () => {
    renderGameTable(authContextVal, gamesContextVal, resultsContextVal)
    const nonActiveImage = gamesContextVal.images.find((img) => img.image_id !== resultsContextVal.activeTabImageId);
    const nonActiveTabEl = screen.getByTestId(`tab-image-id-${nonActiveImage.image_id}`);
    expect(nonActiveTabEl.className).not.toContain('tab-active');
    
    const user = userEvent.setup();
    await user.click(nonActiveTabEl);
    expect(resultsContextVal.setActiveTabImageId).toHaveBeenCalledWith(nonActiveImage.image_id);
    // test actual tab setting functionality in integration tests with createTestRouter:
    // expect(activeTabEl.className).not.toContain('tab-active');
    // expect(nonActiveTabEl.className).toContain('tab-active');
  })
  
  it('renders only games that belong to the active tabs image', () => {
    renderGameTable(authContextVal, gamesContextVal, resultsContextVal)
    
    const activeTabGames = gamesContextVal.games.filter((game) => game.image_id === resultsContextVal.activeTabImageId)
    const inActiveTabGames = gamesContextVal.games.filter((game) => game.image_id !== resultsContextVal.activeTabImageId)
    
    activeTabGames.forEach((game) => {
      expect(screen.getByTestId(`game-id-${game.id}`)).toBeInTheDocument();
    })
    inActiveTabGames.forEach((game) => {
      expect(screen.queryByTestId(`game-id-${game.id}`)).not.toBeInTheDocument();
    })
  })

})