import React, { memo, CSSProperties } from 'react'

import classNames from 'classnames'

import styles from './Card.module.scss'
import { CardProps } from './Card.types'
import { useCardSortable } from './useCardSortable'

const Card = memo((cardProps: CardProps) => {
  const { value, index } = cardProps
  const {
    setNodeRef,
    isDragging,
    isSorting,
    transition,
    transform,
    mountedWhileDragging,
    listeners,
  } = useCardSortable({ id: value?.toString() })
  const cardClassName = classNames(
    styles.card,
    mountedWhileDragging && styles.fadeIn,
    isSorting && styles.sorting
  )
  const containerStyle = {
    transition,
    '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
    '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
    '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
    '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
    '--index': index,
  } as CSSProperties

  const divClassName = classNames(styles.item, isDragging && styles.dragging)
  return (
    <li className={cardClassName} style={containerStyle} ref={setNodeRef}>
      <div
        className={divClassName}
        data-cypress="draggable-item"
        {...listeners}
      >
        {value}
      </div>
    </li>
  )
})
Card.displayName = 'Card'
export default Card
