import React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { Button, Drawer, Radio, RadioGroup } from '@blueprintjs/core';

import { MemoRuneState, MRPairCount } from '../MemoRuneState';

import './mr-menu.scss';

interface MenuProps {
  mrState: MemoRuneState;
}

@observer
export class MRMenu extends React.Component<MenuProps> {
  @observable private drawerOpen: boolean = false;

  public render() {
    const { mrState } = this.props;
    const toRender: JSX.Element = mrState.gameState
      ? this.renderInGameMenu()
      : this.renderNormalMenu();

    return (
      <div key={'mr-menu'} className={'mr-menu'}>
        {toRender}
        {this.renderHowToPlayDrawer()}
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
          <Button
            key={'start1p-btn'}
            className={'menu-btn'}
            minimal={true}
            text={'1 Player'}
            onClick={() => mrState.startGame(1)}
          />
        </div>
        <div className={'btn-container'}>
          <Button
            key={'start2p-btn'}
            className={'menu-btn'}
            minimal={true}
            text={'2 Player'}
            onClick={() => mrState.startGame(2)}
          />
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
          <Button
            key={'resume-btn'}
            className={'menu-btn'}
            minimal={true}
            text={'Resume'}
            onClick={() => mrState.resumeGame()}
          />
        </div>

        <div className={'btn-container'}>
          <Button
            key={'endgame-btn'}
            className={'menu-btn'}
            minimal={true}
            text={'End game'}
            onClick={() => mrState.endGame()}
          />
        </div>
        {this.renderCommonMenuButtons()}
      </React.Fragment>
    );
  }

  private renderCommonMenuButtons() {
    return (
      <>
        <div className={'btn-container'}>
          <Button
            key={'how-to-btn'}
            className={'menu-btn'}
            minimal
            text={'How to play'}
            onClick={() => (this.drawerOpen = !this.drawerOpen)}
          />
        </div>
      </>
    );
  }

  private renderHowToPlayDrawer() {
    return (
      <Drawer
        key={'mr-drawer'}
        isOpen={this.drawerOpen}
        canOutsideClickClose
        canEscapeKeyClose
        onClose={() => (this.drawerOpen = !this.drawerOpen)}
      >
        <div className={'drawer-content'}>
          <h2>How to play Memo Rune</h2>
          <p>Memo Rune is a simple pair matching game - find all the matching pairs to win.</p>
          <p>The runes are face-down normally. On your turn, select a rune to flip it over.</p>
          <p>
            Each turn, you can select two runes to flip over - if they both match you get a point
            and those runes are removed.
          </p>
          <p>If you do get a match, you can go again!</p>
          <p>
            Watch out though, the panel on the left shows a collection of 'danger runes' which are
            non-matching. If you uncover two runes that both appear in that collection of danger
            runes it gives you a negative point - the red score in brackets. When this happens, the
            danger runes are shuffled.
          </p>
          <p>
            Choose the game size to determine how many rune pairs to play with - this game also
            supports local two player!
          </p>
        </div>
      </Drawer>
    );
  }
}
