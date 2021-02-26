import React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { MemoRuneState, MRPairCount } from '../MemoRuneState';

import './mr-menu.scss';

interface MenuProps {
  mrState: MemoRuneState;
}

@observer
export class MRMenu extends React.Component<MenuProps> {
  @observable private drawerOpen = false;

  public render() {
    const { mrState } = this.props;
    const toRender: JSX.Element = mrState.gameState
      ? this.renderInGameMenu()
      : this.renderNormalMenu();

    return (
      <div key={'mr-menu'} className={'mr-menu'}>
        {toRender}
      </div>
    );
  }

  // for when no game is in progress
  private renderNormalMenu() {
    const { mrState } = this.props;
    return (
      <React.Fragment key={'normal-menu'}>
        <form id={'game-size'}>
          <label id={'form-label'} htmlFor={'game-size'}>
            Game size:
          </label>

          <div>
            <label htmlFor={'xl'}>
              <input
                type={'radio'}
                id={'xl'}
                name={'size'}
                checked={mrState.gameSize === MRPairCount.XL}
                onChange={() => mrState.setGameSize(MRPairCount.XL)}
              />
              XL: {MRPairCount.XL} pairs
            </label>
          </div>

          <div>
            <label htmlFor={'l'}>
              <input
                type={'radio'}
                id={'l'}
                name={'size'}
                checked={mrState.gameSize === MRPairCount.L}
                onChange={() => mrState.setGameSize(MRPairCount.L)}
              />
              L: {MRPairCount.L} pairs
            </label>
          </div>

          <div>
            <label htmlFor={'m'}>
              <input
                type={'radio'}
                id={'m'}
                name={'size'}
                checked={mrState.gameSize === MRPairCount.M}
                onChange={() => mrState.setGameSize(MRPairCount.M)}
              />
              M: {MRPairCount.M} pairs
            </label>
          </div>

          <div>
            <label htmlFor={'s'}>
              <input
                type={'radio'}
                id={'s'}
                name={'size'}
                checked={mrState.gameSize === MRPairCount.S}
                onChange={() => mrState.setGameSize(MRPairCount.S)}
              />
              S: {MRPairCount.S} pairs
            </label>
          </div>

          <div>
            <label htmlFor={'xs'}>
              <input
                type={'radio'}
                id={'xs'}
                name={'size'}
                checked={mrState.gameSize === MRPairCount.XS}
                onChange={() => mrState.setGameSize(MRPairCount.XS)}
              />
              XS: {MRPairCount.XS} pairs
            </label>
          </div>
        </form>

        <div className={'btn-container'}>
          <button key={'start1p-btn'} className={'menu-btn'} onClick={() => mrState.startGame(1)}>
            1 Player
          </button>
        </div>
        <div className={'btn-container'}>
          <button key={'start2p-btn'} className={'menu-btn'} onClick={() => mrState.startGame(2)}>
            2 Player
          </button>
        </div>

        {this.renderCommonMenuButtons()}
      </React.Fragment>
    );
  }

  // for when a game is in progress, has different buttons
  private renderInGameMenu() {
    const { mrState } = this.props;
    return (
      <React.Fragment key={'ingame-menu'}>
        <div className={'btn-container'}>
          <button key={'resume-btn'} className={'menu-btn'} onClick={() => mrState.resumeGame()}>
            Resume
          </button>
        </div>

        <div className={'btn-container'}>
          <button key={'endgame-btn'} className={'menu-btn'} onClick={() => mrState.endGame()}>
            End game
          </button>
        </div>
        {this.renderCommonMenuButtons()}
      </React.Fragment>
    );
  }

  private renderCommonMenuButtons() {
    return (
      <>
        <div className={'btn-container'}>
          <button
            key={'how-to-btn'}
            className={'menu-btn'}
            onClick={() => this.props.mrState.viewHowToPlay()}
          >
            How to play
          </button>
        </div>
      </>
    );
  }
}
