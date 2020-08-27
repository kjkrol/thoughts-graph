import React from 'react'

class MemoNoteArea extends React.PureComponent<MemoNoteAreaProperties> {
    render() {
        const { note } = this.props
        return (
            <textarea
                className="memo-note"
                placeholder="Place your note here"
                value={note}
                onChange={this.onNoteChange}
            />
        )
    }

    onNoteChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const { noteUpdate } = this.props
        noteUpdate(event.currentTarget.value)
    }
}

type MemoNoteAreaProperties = {
    note: string
    noteUpdate: (newNote: string) => void
}

export default MemoNoteArea
