import { IResult } from "../types";
import Result from "./result";

/**
 * Create an instance of Result as success state.
 */
function Ok(): Result<void, string, {}>;

function Ok(): IResult<void, string, {}>;

function Ok<P, M extends {} = {}, E = string>(data: P extends void ? null : P, metaData?: M): Result<P, E, M>;

function Ok<P, M extends {} = {}, E = string>(data: P extends void ? null : P, metaData?: M): IResult<P, E, M>;

function Ok<P, M extends {} = {}, E = string>(data?: P extends void ? null : P, metaData?: M): IResult<P, E, M> {
	return Result.Ok(data as P, metaData);
}

export default Ok;
export { Ok };
