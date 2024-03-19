import { Action } from 'redux';

export interface ActionModel {
    type: string;
}

export interface ActionPayloadModel extends Action {
    type: string;
    payload: any;
}

export type AppAction = ActionPayloadModel | Action;