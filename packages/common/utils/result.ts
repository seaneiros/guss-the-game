interface IResult<Value, Err extends Error> {
  readonly ok: boolean;
  unwrap(): Value;
  match(matchers: {
    ok: (val: Value) => void | Promise<void>,
    error: (error: Err) => void | Promise<void>
  }): void;
}

export namespace Result {

  export function Ok<Val>(value: Val) {
    return new ResultOk<Val>(value);
  }

  export function Error<Err extends Error>(error: Err) {
    return new ResultErr(error);
  }
}

class ResultOk<Value> implements IResult<Value, never> {
  readonly ok = true;

  constructor(private readonly value: Value) {}

  unwrap(): Value {
    return this.value
  }

  match(matchers: { ok: (val: Value) => void | Promise<void>; error: (error: never) => void | Promise<void>; }): void {
    matchers.ok(this.value);
  }
}

class ResultErr<Err extends Error> implements IResult<never, Err> {
  readonly ok = false;

  constructor(private readonly value: Err) {}

  unwrap(): never {
    throw this.value;
  }

  match(matchers: { ok: (val: never) => void | Promise<void>; error: (error: Err) => void | Promise<void>; }): void {
    matchers.error(this.value);
  }
}

export type Result<Value, Err extends Error> = IResult<Value, Err>;