export class ValueObject<Props>{
	protected props: Props;
	constructor(props: Props) {
		this.props = props;
	}

	isEqual(other: this): boolean {
		const props = this.props;
		const otherProps = other?.props;

		if (other === null || other === undefined) {
			return false;
		  }
		  if (other.props === undefined) {
			return false;
		  }

		const stringifyAndOmit = (obj: any): string => {
			if (!obj) return '';
			const { createdAt, updatedAt, ...cleanedProps } = obj;
			return JSON.stringify(cleanedProps);
		};

		return stringifyAndOmit(props) === stringifyAndOmit(otherProps);
	}

	get value(): Props {
		return this.props;
	}
}

export default ValueObject;
