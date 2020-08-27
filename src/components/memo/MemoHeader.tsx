import React from 'react'

class MemoHeader extends React.PureComponent<MemoHeaderProperties> {
    render() {
        const { title, togglePin, pinned } = this.props
        return (
            <div className="memo-title">
                <button onClick={togglePin}>{pinned ? 'X' : 'O'}</button>
                <textarea
                    className="memo-title"
                    placeholder="Memo Title"
                    rows={1}
                    value={title}
                    onChange={this.onTitleChange}
                ></textarea>
            </div>
        )
    }

    private onTitleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const { titleUpdate } = this.props
        const value = event.currentTarget.value
        titleUpdate(value)
    }
}

type MemoHeaderProperties = {
    title: string
    titleUpdate: (newTitle: string) => void
    pinned: boolean
    togglePin: () => void
}

export default MemoHeader

export { MemoHeaderProperties }
