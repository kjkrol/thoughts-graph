import React from 'react'

class MemoFooter extends React.PureComponent<MemoFooterProperties> {
    render() {
        const { createNextMemo } = this.props
        return (
            <button
                className="memo-button-create-child"
                onClick={createNextMemo}
            >
                Create Next
            </button>
        )
    }
}

type MemoFooterProperties = {
    createNextMemo: () => void
}

export default MemoFooter
