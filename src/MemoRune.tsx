import React from 'react';

import { observer } from 'mobx-react';

import { MRGameUI } from './components/MRGameUI';
import { MRHowToPlay } from './components/MRHowToPlay';
import { MRMenu } from './components/MRMenu';
import { Rune } from './components/Rune';
import { MemoRuneState, MRScreen } from './MemoRuneState';

import './memo-rune.scss';

@observer
export class MemoRune extends React.Component {
  private readonly mrState = new MemoRuneState();
  public render() {
    const toRender: JSX.Element[] = [];

    switch (this.mrState.mrScreen) {
      case MRScreen.MENU:
        toRender.push(<MRMenu key={'mrmenu'} mrState={this.mrState} />);
        break;
      case MRScreen.GAME:
        toRender.push(this.renderGame());
        break;
      case MRScreen.HOW_TO_PLAY:
        toRender.push(<MRHowToPlay mrState={this.mrState} />);
    }

    return (
      <div key={'memo-rune'} className={'memo-rune'}>
        {toRender}
      </div>
    );
  }

  private renderGame() {
    const { gameState } = this.mrState;

    const runes: JSX.Element[] = [];
    gameState.runes.forEach((r) => {
      runes.push(<Rune key={'rune-' + r.id} rune={r} selectRune={gameState.selectRune} />);
    });

    return (
      <React.Fragment key={'container'}>
        <div key={'left-panel'} className={'left-panel'}>
          {this.renderPlayerPanel()}
        </div>
        <div>
          <div key={'rune-area'} className={'rune-area'}>
            {runes}
          </div>
        </div>
      </React.Fragment>
    );
  }

  // Player panel is the panel to left of rune area
  // TODO should make these sub components so whole thing doesn't re-render
  private renderPlayerPanel() {
    const { gameState } = this.mrState;
    const dangerRunes: JSX.Element[] = [];
    gameState.dangerRunes.forEach((dr) => {
      dangerRunes.push(<Rune key={'dr' + dr.id} rune={dr} />);
    });

    const pairRunes: JSX.Element[] = [];
    gameState.pairedRunes.forEach((pr) => {
      pairRunes.push(<Rune key={'pr' + pr.id} rune={pr} pairedRune />);
    });

    return (
      <React.Fragment key={'player-panel'}>
        <div className={'ui-bar'}>
          <MRGameUI mrState={this.mrState} />
        </div>
        <div>
          <div className={'danger-runes'}>{dangerRunes}</div>
        </div>
        <div>
          <div className={'rune-pairs'}>{pairRunes}</div>
        </div>
      </React.Fragment>
    );
  }
}
