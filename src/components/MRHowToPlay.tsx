import { observer } from 'mobx-react';
import React from 'react';
import { MemoRuneState } from '../MemoRuneState';

import './how-to-play.scss';

interface HTPProps {
  mrState: MemoRuneState;
}

@observer
export class MRHowToPlay extends React.PureComponent<HTPProps> {
  public render() {
    return (
      <div className={'how-to-play'}>
        {this.renderHowToPlay()}
        <div className={'btn-container'}>
          <button
            key={'how-to-btn'}
            className={'menu-btn'}
            onClick={() => this.props.mrState.viewMenu()}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  private renderHowToPlay() {
    return (
      <div className={'content'}>
        <h2>How to play Memo Rune</h2>
        <p>Memo Rune is a simple pair matching game - find all the matching pairs to win.</p>
        <p>The runes are face-down normally. On your turn, select a rune to flip it over.</p>
        <p>
          Each turn, you can select two runes to flip over - if they both match you get a point and
          those runes are removed.
        </p>
        <p>If you do get a match, you can go again!</p>
        <p>
          Watch out though, the panel on the left shows a collection of 'danger runes' which are
          non-matching. If you uncover two runes that both appear in that collection of danger runes
          it gives you a negative point - the red score in brackets. When this happens, the danger
          runes are shuffled.
        </p>
        <p>
          Choose the game size to determine how many rune pairs to play with - this game also
          supports local two player!
        </p>
      </div>
    );
  }
}
