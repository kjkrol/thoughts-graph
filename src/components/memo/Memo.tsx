import React from 'react'
import { WithSize, MemoData } from '../../commons/model'
import Card from '../card/Card'
import MemoHeader from './MemoHeader'
import MemoNoteArea from './MemoNoteArea'
import MemoFooter from './MemoFooter'
import draggable from '../../commons/lib/draggable'
import { PinBoardContext } from '../../context/PinBoardContext'

import './memo.css'

const DraggableCard = draggable(Card)

type MemoProperties = MemoData & WithSize

const Memo: React.FC<MemoProperties> = (props) => {
    const { title, note, id, pinned } = props
    const { dispatch } = React.useContext(PinBoardContext)
    return (
        <DraggableCard
            {...props}
            draggableDisabled={pinned}
            moveOnTop={() => {
                dispatch({
                    type: 'MOVE_ON_TOP',
                    memoId: id,
                })
            }}
        >
            <MemoHeader
                title={title}
                pinned={pinned}
                togglePin={() => {
                    dispatch({
                        type: 'TOGGLE_MEMO_PIN',
                        memoId: id,
                    })
                }}
                titleUpdate={(newTitle) =>
                    dispatch({
                        type: 'UPDATE_MEMO_TITLE',
                        memoId: id,
                        newTitle: newTitle,
                    })
                }
            />
            <MemoNoteArea
                note={note}
                noteUpdate={(newNote) =>
                    dispatch({
                        type: 'UPDATE_MEMO_NOTE',
                        memoId: id,
                        newNote: newNote,
                    })
                }
            />
            <MemoFooter
                createNextMemo={() =>
                    dispatch({
                        type: 'CREATE_NEW_MEMO',
                        parentMemoId: id,
                    })
                }
            />
        </DraggableCard>
    )
}

export { MemoProperties }

export default Memo
