import React, { PureComponent, ComponentType } from 'react'
import ReactDOM from 'react-dom'
import omit from 'lodash/omit'
import { WithPosition, Vector } from '../model'

type DraggableComponentProps = {
    id: string
    draggableDisabled: boolean
    moveOnTop: () => void
}
type DraggableComponentState = {
    readonly selected: boolean
    readonly position: Vector
    readonly positionChange: Vector
    readonly startTime: Date
}

const REFRESH_TIME_DELAY: number = 20

const draggable = <P extends WithPosition>(Component: ComponentType<P>) =>
    class DraggableComponent extends PureComponent<
        P & DraggableComponentProps,
        DraggableComponentState
    > {
        constructor(props: P & DraggableComponentProps) {
            super(props)
            this.state = {
                selected: false,
                position: Vector.fromWithPosition(props),
                positionChange: Vector.ZERO,
                startTime: new Date(),
            }
        }

        private onSelect = (event: Event): void => {
            const mouseEvent = event as MouseEvent
            if (mouseEvent.button === 0 && this.props.draggableDisabled) return
            const { moveOnTop } = this.props
            moveOnTop()
            this.setState((prevState, props) => ({
                selected: true,
            }))
        }

        private onDeselect = (): void => {
            this.setState((prevState) => ({
                selected: false,
                position: prevState.position.add(prevState.positionChange),
                positionChange: Vector.ZERO,
                startTime: new Date(),
            }))
        }

        private onMouseMove = (event: Event): void => {
            const mouseEvent = event as MouseEvent
            if (!this.state.selected) return
            this.setState((prevState) => {
                const temp = prevState.positionChange.add(
                    new Vector(mouseEvent.movementX, mouseEvent.movementY)
                )
                if (
                    new Date().valueOf() - prevState.startTime.valueOf() >
                    REFRESH_TIME_DELAY
                ) {
                    return {
                        ...prevState,
                        position: prevState.position.add(temp),
                        positionChange: Vector.ZERO,
                        startTime: new Date(),
                    }
                } else {
                    return {
                        ...prevState,
                        positionChange: temp,
                    }
                }
            })
        }

        render() {
            const htmlProps = omit(this.props, ['left', 'top'])
            return (
                <Component
                    left={`${this.state.position.x}px`}
                    top={`${this.state.position.y}px`}
                    {...(htmlProps as any)}
                />
            )
        }

        componentDidMount() {
            const element: Element | null | Text = ReactDOM.findDOMNode(this)
            element?.addEventListener('mousedown', this.onSelect)
            element?.addEventListener('mouseup', this.onDeselect)
            element?.addEventListener('mousemove', this.onMouseMove)
            element?.addEventListener('mouseleave', this.onDeselect);
        }

        componentWillUnmount() {
            const element: Element | null | Text = ReactDOM.findDOMNode(this)
            element?.removeEventListener('mousedown', this.onSelect)
            element?.removeEventListener('mouseup', this.onDeselect)
            element?.removeEventListener('mousemove', this.onMouseMove)
            element?.removeEventListener('mouseleave', this.onDeselect);
        }
    }

export default draggable

export { DraggableComponentProps, DraggableComponentState }
