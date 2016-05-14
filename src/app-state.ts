import {Map} from 'immutable';

export interface IAppState {
    chat: Map<string, number>,
    dices: Map<string, number>
}
