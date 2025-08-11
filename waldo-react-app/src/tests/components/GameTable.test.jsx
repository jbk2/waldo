import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../contexts/AuthContext';


describe.skip('GameTable component', () => {
  
  // comp need this useContext; 
  const authContextVal = {
    user: { id: 1, username: 'user1'}
  }

  const gamesContextVal = {
    images: [
      { id: 1, title: 'imgOne', difficulty: 'easy' },
      { id: 2, title: 'imgTwo', difficulty: 'medium' },
      { id: 3, title: 'imgThree', difficulty: 'difficult' }
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

  const renderGameTable = (authContextVal, gameContextVal, resultsContextVal, ) => {
    render(
      <AuthContext.Provider value={authContextVal} >
        {/* insert contexts in here */}
      </AuthContext.Provider>
    )
  }
  
  it('renders tabs labelled with concatenation of images title and image difficulty', () => {
    // test the following:
    // - that all of the tabs for all of the image titles are present concatenated with thte difficulty level
    // - that the current selected tab will only render games in the table with the id of the selected tab (maybe want tp put ids on the tabs)
    // - that a tab click will select a new tab
    // test styling - probably not
  })
})