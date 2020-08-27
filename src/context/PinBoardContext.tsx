import React from 'react'
import { MemoData } from '../commons/model'

type Action =
    | { type: 'MOVE_ON_TOP'; memoId: string }
    | { type: 'CREATE_NEW_MEMO'; parentMemoId: string }
    | { type: 'UPDATE_MEMO_TITLE'; memoId: string; newTitle: string }
    | { type: 'UPDATE_MEMO_NOTE'; memoId: string; newNote: string }
    | { type: 'TOGGLE_MEMO_PIN'; memoId: string }

type State = {
    memos: MemoData[]
    gratestZIndex: number
}

const reducer: React.Reducer<State, Action> = (
    prevState: State,
    action: Action
): State => {
    switch (action.type) {
        case 'MOVE_ON_TOP': {
            const modMemos = prevState.memos.map((memo) =>
                memo.id === action.memoId
                    ? { ...memo, zIndex: prevState.gratestZIndex + 1 }
                    : memo
            )
            return {
                ...prevState,
                gratestZIndex: prevState.gratestZIndex + 1,
                memos: modMemos,
            }
        }
        case 'CREATE_NEW_MEMO': {
            return prevState
        }
        case 'UPDATE_MEMO_TITLE': {
            const modMemos = prevState.memos.map((memo) =>
                memo.id === action.memoId
                    ? { ...memo, title: action.newTitle }
                    : memo
            )
            return {
                ...prevState,
                memos: modMemos,
            }
        }
        case 'UPDATE_MEMO_NOTE': {
            const modMemos = prevState.memos.map((memo) =>
                memo.id === action.memoId
                    ? { ...memo, note: action.newNote }
                    : memo
            )
            return {
                ...prevState,
                memos: modMemos,
            }
        }
        case 'TOGGLE_MEMO_PIN': {
            const modMemos = prevState.memos.map((memo) =>
                memo.id === action.memoId
                    ? { ...memo, pinned: !memo.pinned }
                    : memo
            )
            return {
                ...prevState,
                memos: modMemos,
            }
        }
        default: {
            throw new Error(`Unhandled action: ${action}`)
        }
    }
}

const initialState: State = {
    memos: [
        {
            id: 'key1',
            left: '10px',
            top: '10px',
            zIndex: 1,
            title: 'First Sample Note',
            note: 'lorem ipsum lorem ipsum lorem ipsum',
            pinned: false,
        },
        {
            id: 'key2',
            left: '30px',
            top: '30px',
            zIndex: 2,
            title: 'Second Sample Note',
            note: 'lorem ipsum lorem ipsum lorem ipsum',
            pinned: false,
        },
        {
            id: 'key3',
            left: '50px',
            top: '50px',
            zIndex: 3,
            title: 'Third Sample Note',
            note: 'lorem ipsum lorem ipsum lorem ipsum',
            pinned: false,
        },
    ],
    gratestZIndex: 3,
}

const PinBoardContext = React.createContext<{
    state: State
    dispatch: React.Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => null,
})

type PinBoardContextProps = { children?: React.ReactNode }

const PinBoardContextProvider: React.FC = (props: PinBoardContextProps) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return (
        <PinBoardContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PinBoardContext.Provider>
    )
}

export { PinBoardContextProvider, PinBoardContext }
