import React, { PureComponent } from 'react'
import { WithPosition, WithSize } from '../../commons/model'

import './card.css'

class Card extends PureComponent<WithPosition & WithSize> {
    static defaultProps = {
        width: '50vh',
        height: '50vh',
    }
    render() {
        const { width, height, top, left, zIndex, children } = this.props
        return (
            <div
                className="card"
                style={{
                    width: width,
                    height: height,
                    top: top,
                    left: left,
                    zIndex: zIndex,
                }}
            >
                {children}
            </div>
        )
    }
}

export default Card
