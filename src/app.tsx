import * as React from 'react'
import * as ReactDOM from 'react-dom'
import PinBoard from './components/pinboard/PinBoard'
import { PinBoardContextProvider } from './context/PinBoardContext'
import { MemoData, WithSize } from './commons/model'

const memosDefaultSize: WithSize = {
    height: '50vh',
    width: '50vh',
}

ReactDOM.render(
    <PinBoardContextProvider>
        <PinBoard memosDefaultSize={memosDefaultSize} />
    </PinBoardContextProvider>,
    document.getElementById('app')
)
