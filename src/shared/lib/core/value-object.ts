import { IResult } from "../types";
import Result from "./result";

export class ValueObject<Props>{
	protected props: Props;
	constructor(props: Props) {
		this.props = props;
	}

	isEqual(other: this): boolean {
		const props = this.props;
		const otherProps = other?.props;

		const stringifyAndOmit = (obj: any): string => {
			if (!obj) return '';
			const { createdAt, updatedAt, ...cleanedProps } = obj;
			return JSON.stringify(cleanedProps);
		};

		return stringifyAndOmit(props) === stringifyAndOmit(otherProps);
	}

	public static isValidProps(props: any): boolean {
		// Validate props
		return true;
	};

	public static create(props: any): IResult<any, any, any>;
	/**
	 * 
	 * @param props params as Props
	 * @returns instance of result with a new Value Object on state if success.
	 * @summary result state will be `null` case failure.
	 */
	public static create(props: {}): Result<any, any, any> {
		if (!this.isValidProps(props)) return Result.fail('Invalid props to create an instance of ' + this.name);
		return Result.Ok(new this(props));
	};
}

export default ValueObject;
