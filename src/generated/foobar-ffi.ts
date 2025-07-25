// This file was autogenerated by some hot garbage in the `uniffi-bindgen-react-native` crate.
// Trust me, you don't want to mess with it!

import {
  type StructuralEquality as UniffiStructuralEquality,
  type UniffiForeignFuture as RuntimeUniffiForeignFuture,
  type UniffiRustCallStatus,
  type UniffiRustArcPtr,
  type UniffiRustFutureContinuationCallback as RuntimeUniffiRustFutureContinuationCallback,
  type UniffiResult,
} from 'uniffi-bindgen-react-native';

interface NativeModuleInterface {
  ubrn_uniffi_internal_fn_func_ffi__string_to_byte_length(
    string: string,
    uniffi_out_err: UniffiRustCallStatus
  ): number;
  ubrn_uniffi_internal_fn_func_ffi__string_to_arraybuffer(
    string: string,
    uniffi_out_err: UniffiRustCallStatus
  ): Uint8Array;
  ubrn_uniffi_internal_fn_func_ffi__arraybuffer_to_string(
    buffer: Uint8Array,
    uniffi_out_err: UniffiRustCallStatus
  ): string;
  ubrn_uniffi_foobar_fn_clone_textanalyzer(
    ptr: bigint,
    uniffi_out_err: UniffiRustCallStatus
  ): bigint;
  ubrn_uniffi_foobar_fn_free_textanalyzer(
    ptr: bigint,
    uniffi_out_err: UniffiRustCallStatus
  ): void;
  ubrn_uniffi_foobar_fn_constructor_textanalyzer_new(
    uniffi_out_err: UniffiRustCallStatus
  ): bigint;
  ubrn_uniffi_foobar_fn_method_textanalyzer_analyze_text(
    ptr: bigint,
    text: Uint8Array,
    uniffi_out_err: UniffiRustCallStatus
  ): Uint8Array;
  ubrn_uniffi_foobar_fn_method_textanalyzer_clear_history(
    ptr: bigint,
    uniffi_out_err: UniffiRustCallStatus
  ): void;
  ubrn_uniffi_foobar_fn_method_textanalyzer_get_last_analysis(
    ptr: bigint,
    uniffi_out_err: UniffiRustCallStatus
  ): Uint8Array;
  ubrn_uniffi_foobar_fn_func_quick_palindrome_check(
    text: Uint8Array,
    uniffi_out_err: UniffiRustCallStatus
  ): number;
  ubrn_uniffi_foobar_fn_func_quick_reverse_text(
    text: Uint8Array,
    uniffi_out_err: UniffiRustCallStatus
  ): Uint8Array;
  ubrn_uniffi_foobar_fn_func_quick_word_count(
    text: Uint8Array,
    uniffi_out_err: UniffiRustCallStatus
  ): number;
  ubrn_uniffi_foobar_checksum_func_quick_palindrome_check(): number;
  ubrn_uniffi_foobar_checksum_func_quick_reverse_text(): number;
  ubrn_uniffi_foobar_checksum_func_quick_word_count(): number;
  ubrn_uniffi_foobar_checksum_method_textanalyzer_analyze_text(): number;
  ubrn_uniffi_foobar_checksum_method_textanalyzer_clear_history(): number;
  ubrn_uniffi_foobar_checksum_method_textanalyzer_get_last_analysis(): number;
  ubrn_uniffi_foobar_checksum_constructor_textanalyzer_new(): number;
  ubrn_ffi_foobar_uniffi_contract_version(): number;
  ubrn_uniffi_internal_fn_method_textanalyzer_ffi__bless_pointer(
    pointer: bigint,
    uniffi_out_err: UniffiRustCallStatus
  ): UniffiRustArcPtr;
}

// Casting globalThis to any allows us to look for `NativeFoobar`
// if it was added via JSI.
//
// We use a getter here rather than simply `globalThis.NativeFoobar` so that
// if/when the startup sequence isn't just so, an empty value isn't inadvertantly cached.
const getter: () => NativeModuleInterface = () =>
  (globalThis as any).NativeFoobar;
export default getter;

// Structs and function types for calling back into Typescript from Rust.
export type UniffiRustFutureContinuationCallback = (
  data: bigint,
  pollResult: number
) => void;
type UniffiForeignFutureFree = (handle: bigint) => void;
type UniffiCallbackInterfaceFree = (handle: bigint) => void;
export type UniffiForeignFuture = {
  handle: bigint;
  free: UniffiForeignFutureFree;
};
export type UniffiForeignFutureStructU8 = {
  returnValue: number;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteU8 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructU8
) => void;
export type UniffiForeignFutureStructI8 = {
  returnValue: number;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteI8 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructI8
) => void;
export type UniffiForeignFutureStructU16 = {
  returnValue: number;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteU16 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructU16
) => void;
export type UniffiForeignFutureStructI16 = {
  returnValue: number;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteI16 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructI16
) => void;
export type UniffiForeignFutureStructU32 = {
  returnValue: number;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteU32 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructU32
) => void;
export type UniffiForeignFutureStructI32 = {
  returnValue: number;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteI32 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructI32
) => void;
export type UniffiForeignFutureStructU64 = {
  returnValue: bigint;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteU64 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructU64
) => void;
export type UniffiForeignFutureStructI64 = {
  returnValue: bigint;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteI64 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructI64
) => void;
export type UniffiForeignFutureStructF32 = {
  returnValue: number;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteF32 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructF32
) => void;
export type UniffiForeignFutureStructF64 = {
  returnValue: number;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteF64 = (
  callbackData: bigint,
  result: UniffiForeignFutureStructF64
) => void;
export type UniffiForeignFutureStructPointer = {
  returnValue: bigint;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompletePointer = (
  callbackData: bigint,
  result: UniffiForeignFutureStructPointer
) => void;
export type UniffiForeignFutureStructRustBuffer = {
  returnValue: Uint8Array;
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteRustBuffer = (
  callbackData: bigint,
  result: UniffiForeignFutureStructRustBuffer
) => void;
export type UniffiForeignFutureStructVoid = {
  callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteVoid = (
  callbackData: bigint,
  result: UniffiForeignFutureStructVoid
) => void;

// UniffiRustFutureContinuationCallback is generated as part of the component interface's
// ffi_definitions. However, we need it in the runtime.
// We could:
// (a) do some complicated template logic to ensure the declaration is not generated here (possible)
// (b) import the generated declaration into the runtime (m a y b e) or…
// (c) generate the declaration anyway, and use a different declaration in the runtime.
//
// We chose (c) here as the simplest. In addition, we perform a compile time check that
// the two versions of `UniffiRustFutureContinuationCallback` are structurally equivalent.
//
// If you see the error:
// ```
// Type 'true' is not assignable to type 'false'.(2322)
// ```
// Then a new version of uniffi has changed the signature of the callback. Most likely, code in
// `typescript/src/async-rust-call.ts` will need to be changed.
//
// If you see the error:
// ```
// Cannot find name 'UniffiRustFutureContinuationCallback'. Did you mean 'RuntimeUniffiRustFutureContinuationCallback'?(2552)
// ```
// then you may not be using callbacks or promises, and uniffi is now not generating Futures and callbacks.
// You should not generate this if that is the case.
//
// ('You' being the bindings generator maintainer).
const isRustFutureContinuationCallbackTypeCompatible: UniffiStructuralEquality<
  RuntimeUniffiRustFutureContinuationCallback,
  UniffiRustFutureContinuationCallback
> = true;
const isUniffiForeignFutureTypeCompatible: UniffiStructuralEquality<
  RuntimeUniffiForeignFuture,
  UniffiForeignFuture
> = true;
