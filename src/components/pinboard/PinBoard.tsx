import React from 'react'
import Memo, { MemoProperties } from '../memo/Memo'
import { MemoData, WithSize } from '../../commons/model'
import { PinBoardContext } from '../../context/PinBoardContext'

import './pinboard.css'

const PinBoard: React.FC<PinBoardProperties> = (props) => {
    const { memosDefaultSize } = props
    const { state } = React.useContext(PinBoardContext)
    const memos = state.memos.map((memoData, index) =>
        createMemo(memoData, memosDefaultSize, index)
    )
    return <div className="pinboard">{memos}</div>
}

const createMemo = (
    memoProperties: MemoData,
    memosDefaultSize: WithSize,
    index: number
): React.FunctionComponentElement<MemoProperties> =>
    React.createElement(Memo, {
        ...memoProperties,
        ...memosDefaultSize,
        key: index,
    })

interface PinBoardProperties {
    memosDefaultSize: WithSize
}

export { PinBoardProperties }

export default PinBoard
