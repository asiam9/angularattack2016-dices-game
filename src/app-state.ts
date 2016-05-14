import {Map} from 'immutable';

export interface IAppState {
    chat: Map<string, number>,
    dices: Map<string, number>,
    players: Map<string, number>,
    user: Map<string, number>
}
