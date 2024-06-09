import { IResult } from "../types";
import Result from "./result";

/**
	Create an instance of Result as failure state.
 */
function Fail(): Result<string, string, {}>;

function Fail(): IResult<string, string, {}>;

function Fail<E, M extends {} = {}, P = void>(error: E extends void ? null : E, metaData?: M): Result<P, E extends void ? string : E, M>;

function Fail<E, M extends {} = {}, P = void>(error: E extends void ? null : E, metaData?: M): IResult<P, E extends void ? string : E, M>;

function Fail<E = string, M extends {} = {}, P = void>(error?: E extends void ? null : E, metaData?: M): IResult<P, E extends void ? string : E, M> {
	const _error = (typeof error !== 'undefined' && error !== null) ? error : 'void error. no message!';
	return Result.fail(_error as any, metaData);
}

export default Fail;
export { Fail };
