// @flow

type Props = {
  name: string,
  age: number
};

type DefaultProps = { age: number };

declare opaque type O1;
declare opaque type O2;

// $Keys<T> TODO this is not an EvalT
const countries = {
  US: "United States",
  IT: "Italy",
  FR: "France"
};

type Country = $Keys<typeof countries>;
//   ^

type KeysPoly<K> = $Keys<K>;
//   ^

// $Values<T>
type Prop$Values = $Values<Props>;
//   ^

const frozenObject = Object.freeze({ A: "a", B: "b" });
type ValuesOfFrozenObject = $Values<typeof frozenObject>;
//   ^

type ValuesPoly<X> = $Values<X>;
//   ^

type ValuesPolyBound<X: { f: number }> = $Values<X>;
//   ^

// $ReadOnly<T>
type ReadOnlyObj = $ReadOnly<{
//   ^
  key: any
}>;

// $Exact<T>
// see exact.js

// $Diff<A, B>
type RequiredProps = $Diff<Props, DefaultProps>;
//   ^

type DiffFromEmptyObjectError = $Diff<{}, { nope: number }>; // Error
//   ^
type DiffFromEmptyObjectOkay = $Diff<{}, { nope: number | void }>;
//   ^

// $Rest<A, B>
type RestProps = $Rest<Props, {| age: number |}>;
//   ^

type RestObj = $Rest<{| y: O1 |}, {| [string]: O2 |}>;
//   ^
type RestObjoly<X> = $Rest<{| y: X |}, {| [string]: X |}>;
//   ^

// $PropertyType<T, k>
type PropertyTypeProps = $PropertyType<Props, "name">;
//   ^

// $ElementType<T, K>
type ElementTypeProps = $ElementType<Props, "name">;
//   ^
type ElementTypePropsPoly<K> = $ElementType<Props, K>;
//   ^
type ElementTypePropsPolyBounded<K: "name" | "age"> = $ElementType<Props, K>;
//   ^
type ElementTypePropsPolyBoundedEmpty<K: "phone"> = $ElementType<Props, K>;
//   ^

// $NonMaybeType<T>
type NonMaybeTypeNumber = $NonMaybeType<?number>;
//   ^
type NonMaybeTypeAbstract<X> = $NonMaybeType<X>;
//   ^

// $ObjMap<T, F>
type ObjMapProps = $ObjMap<Props, <T>(T) => Array<T>>;
//   ^

type ObjMapPoly<X, Y> = $ObjMap<{ a: X, b?: Y }, <T>(T) => Array<T>>;
//   ^

// $ObjMapi<T, F>
type ObjMapiProps = $ObjMapi<Props, <K, V>(K, V) => Array<K | V>>;
//   ^

type ExtractReturnObjectType = <K, V>(K, () => V) => { k: K, v: V };
type FnObj = { getName: () => string, getAge: () => number };
type ObjMapFnReturnTypes = $ObjMapi<FnObj, ExtractReturnObjectType>;
//   ^

// $TupleMap<T, F>
type TupleMapMixedPair = $TupleMap<[mixed, mixed], <K>(k: K) => K | null>;
//   ^
type TupleMapMixedPairPoly<X> = $TupleMap<[X, mixed], <K>(k: K) => K | null>;
//   ^
type FnTuple = [() => string, () => number];
type TupleMapFnReturnTypes = $TupleMap<FnTuple, ExtractReturnObjectType>;
//   ^

// $Call<F, T...>
type ExtractPropType = <T>({ prop: T }) => T;
type PropObj = { prop: number };
type CallExtractPropType = $Call<ExtractPropType, PropObj>;
//   ^

type NestedObj = {|
  +status: ?number,
  +data: ?$ReadOnlyArray<{|
    +foo: ?{|
      +bar: number
    |}
  |}>
|};

// If you wanted to extract the type for `bar`, you could use $Call:
type CallNestedObjType = $Call<
//   ^
  <T>({
    +data: ?$ReadOnlyArray<{
      +foo: ?{
        +bar: ?T
      }
    }>
  }) => T,
  NestedObj
>;

type CallPoly<R> = $Call<<N>(N) => N, R>;

// $Shape<T>
type PropsShape = $Shape<Props>;
//   ^

// $Exports<T>
declare module m {
  declare export var x: number;
}

type ExportsM = $Exports<'m'>;
//   ^

// Multi-params (ordering)
declare function right_order<T: {}, K: T>(): $ElementType<T, K>;
//               ^
declare function wrong_order<K: T, T: {}>(): $ElementType<T, K>;
//               ^

// TODO
// React.ElementPropsType
// React.ElementConfigType
// React.ElementRefType
// React.ConfigType