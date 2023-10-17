import clsx from 'clsx'
import { forwardRef } from 'react'

import { IField } from './form.interface'

import styles from './Form.module.scss'

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={clsx(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type={type} {...rest} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field