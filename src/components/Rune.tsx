import React from 'react';

import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { IRune, RuneState } from '../RuneUtils';

import './rune.scss';

interface RuneProps {
  rune: IRune;
  selectRune?: (runeId: number) => void;
  pairedRune?: boolean;
}

@observer
export class Rune extends React.Component<RuneProps> {
  @observable private hover: boolean = false;

  public render() {
    const { rune, selectRune, pairedRune } = this.props;

    // Rune appearance depends on its state
    let pos = `${rune.posX}px ${rune.posY}px`;
    const classes = ['rune'];
    switch (rune.state) {
      case RuneState.FACE_DOWN:
        pos = '0px 0px';
        if (this.hover) {
          classes.push('hover');
        }
        break;
      case RuneState.FACE_UP:
        break;
      case RuneState.PAIRED:
        classes.push('paired');
        break;
      case RuneState.DANGER_MATCH:
        classes.push('danger-match');
        break;
    }

    if (pairedRune) {
      classes.push('panel');
    }

    const style = {
      backgroundPosition: pos,
    };

    return (
      <div className={'rune-holder'}>
        <div
          className={classes.join(' ')}
          style={style}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={() => selectRune(rune.id)}
        ></div>
      </div>
    );
  }

  private handleMouseEnter = () => {
    this.hover = true;
  };

  private handleMouseLeave = () => {
    this.hover = false;
  };
}
