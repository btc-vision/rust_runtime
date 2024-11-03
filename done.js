import * as env from 'env';

  var bufferView;
  var base64ReverseLookup = new Uint8Array(123/*'z'+1*/);
  for (var i = 25; i >= 0; --i) {
    base64ReverseLookup[48+i] = 52+i; // '0-9'
    base64ReverseLookup[65+i] = i; // 'A-Z'
    base64ReverseLookup[97+i] = 26+i; // 'a-z'
  }
  base64ReverseLookup[43] = 62; // '+'
  base64ReverseLookup[47] = 63; // '/'
  /** @noinline Inlining this function would mean expanding the base64 string 4x times in the source code, which Closure seems to be happy to do. */
  function base64DecodeToExistingUint8Array(uint8Array, offset, b64) {
    var b1, b2, i = 0, j = offset, bLength = b64.length, end = offset + (bLength*3>>2) - (b64[bLength-2] == '=') - (b64[bLength-1] == '=');
    for (; i < bLength; i += 4) {
      b1 = base64ReverseLookup[b64.charCodeAt(i+1)];
      b2 = base64ReverseLookup[b64.charCodeAt(i+2)];
      uint8Array[j++] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
      if (j < end) uint8Array[j++] = b1 << 4 | b2 >> 2;
      if (j < end) uint8Array[j++] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i+3)];
    }
  }
function initActiveSegments(imports) {
  base64DecodeToExistingUint8Array(bufferView, 1048576, "AwAAAAwAAAAEAAAABAAAAAUAAAAGAAAAL3J1c3QvZGVwcy9kbG1hbGxvYy0wLjIuNi9zcmMvZGxtYWxsb2MucnNhc3NlcnRpb24gZmFpbGVkOiBwc2l6ZSA+PSBzaXplICsgbWluX292ZXJoZWFkABgAEAApAAAAqAQAAAkAAABhc3NlcnRpb24gZmFpbGVkOiBwc2l6ZSA8PSBzaXplICsgbWF4X292ZXJoZWFkAAAYABAAKQAAAK4EAAANAAAAbWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAwAAQABUAAADVABAADQAAAHN0ZC9zcmMvYWxsb2MucnP0ABAAEAAAAGMBAAAJAAAAAwAAAAwAAAAEAAAABwAAAAAAAAAIAAAABAAAAAgAAAAAAAAACAAAAAQAAAAJAAAACgAAAAsAAAAMAAAADQAAABAAAAAEAAAADgAAAA8AAAAQAAAAEQAAAEVycm9yAAAAEgAAAAwAAAAEAAAAEwAAABQAAAAVAAAAY2FwYWNpdHkgb3ZlcmZsb3cAAACMARAAEQAAAGFsbG9jL3NyYy9yYXdfdmVjLnJzqAEQABQAAAAYAAAABQAAAAAAAAAAAAAAAQAAABYAAABhIGZvcm1hdHRpbmcgdHJhaXQgaW1wbGVtZW50YXRpb24gcmV0dXJuZWQgYW4gZXJyb3Igd2hlbiB0aGUgdW5kZXJseWluZyBzdHJlYW0gZGlkIG5vdGFsbG9jL3NyYy9mbXQucnMAADICEAAQAAAAfgIAAA4AAABbY2FsbGVkIGBPcHRpb246OnVud3JhcCgpYCBvbiBhIGBOb25lYCB2YWx1ZWluZGV4IG91dCBvZiBib3VuZHM6IHRoZSBsZW4gaXMgIGJ1dCB0aGUgaW5kZXggaXMgAACAAhAAIAAAAKACEAASAAAAOiAAAAEAAAAAAAAAxAIQAAIAAAAAAAAADAAAAAQAAAAZAAAAGgAAABsAAAAgICAgLCAsCgpdY29yZS9zcmMvZm10L251bS5ycwAAAPoCEAATAAAAZgAAABcAAAAweDAwMDEwMjAzMDQwNTA2MDcwODA5MTAxMTEyMTMxNDE1MTYxNzE4MTkyMDIxMjIyMzI0MjUyNjI3MjgyOTMwMzEzMjMzMzQzNTM2MzczODM5NDA0MTQyNDM0NDQ1NDY0NzQ4NDk1MDUxNTI1MzU0NTU1NjU3NTg1OTYwNjE2MjYzNjQ2NTY2Njc2ODY5NzA3MTcyNzM3NDc1NzY3Nzc4Nzk4MDgxODI4Mzg0ODU4Njg3ODg4OTkwOTE5MjkzOTQ5NTk2OTc5ODk5cmFuZ2Ugc3RhcnQgaW5kZXggIG91dCBvZiByYW5nZSBmb3Igc2xpY2Ugb2YgbGVuZ3RoIAAA6gMQABIAAAD8AxAAIgAAAHJhbmdlIGVuZCBpbmRleCAwBBAAEAAAAPwDEAAiAAAAL3J1c3RjLzNlOWJkOGI1NjZhNDdjNWQxYzFkYmM3ZTA0M2I0YjdmYTUzMzBlY2EvbGlicmFyeS9hbGxvYy9zcmMvY29sbGVjdGlvbnMvYnRyZWUvbWFwL2VudHJ5LnJzUAQQAGAAAABxAQAANgAAAC9ydXN0Yy8zZTliZDhiNTY2YTQ3YzVkMWMxZGJjN2UwNDNiNGI3ZmE1MzMwZWNhL2xpYnJhcnkvYWxsb2Mvc3JjL2NvbGxlY3Rpb25zL2J0cmVlL25vZGUucnNhc3NlcnRpb24gZmFpbGVkOiBlZGdlLmhlaWdodCA9PSBzZWxmLmhlaWdodCAtIDEAwAQQAFsAAACvAgAACQAAAGludGVybmFsIGVycm9yOiBlbnRlcmVkIHVucmVhY2hhYmxlIGNvZGU6IGVtcHR5IGludGVybmFsIG5vZGUAAABcBRAAPQAAAMAEEABbAAAAKwUAAB8AAABhc3NlcnRpb24gZmFpbGVkOiBzZWxmLmhlaWdodCA+IDAAAADABBAAWwAAAGICAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogc3JjLmxlbigpID09IGRzdC5sZW4oKcAEEABbAAAALwcAAAUAAADABBAAWwAAAK8EAAAjAAAAwAQQAFsAAADvBAAAJAAAAGFzc2VydGlvbiBmYWlsZWQ6IGVkZ2UuaGVpZ2h0ID09IHNlbGYubm9kZS5oZWlnaHQgLSAxAAAAwAQQAFsAAADwAwAACQAAAGFzc2VydGlvbiBmYWlsZWQ6IG9sZF9yaWdodF9sZW4gKyBjb3VudCA8PSBDQVBBQ0lUWQDABBAAWwAAANwFAAANAAAAYXNzZXJ0aW9uIGZhaWxlZDogb2xkX2xlZnRfbGVuID49IGNvdW50AMAEEABbAAAA3QUAAA0AAABpbnRlcm5hbCBlcnJvcjogZW50ZXJlZCB1bnJlYWNoYWJsZSBjb2RlwAQQAFsAAAAMBgAAFgAAAGFzc2VydGlvbiBmYWlsZWQ6IG9sZF9sZWZ0X2xlbiArIGNvdW50IDw9IENBUEFDSVRZAADABBAAWwAAABsGAAANAAAAYXNzZXJ0aW9uIGZhaWxlZDogb2xkX3JpZ2h0X2xlbiA+PSBjb3VudMAEEABbAAAAHAYAAA0AAADABBAAWwAAAEwGAAAWAAAAYXNzZXJ0aW9uIGZhaWxlZDogbWF0Y2ggdHJhY2tfZWRnZV9pZHggewogICAgTGVmdE9yUmlnaHQ6OkxlZnQoaWR4KSA9PiBpZHggPD0gb2xkX2xlZnRfbGVuLAogICAgTGVmdE9yUmlnaHQ6OlJpZ2h0KGlkeCkgPT4gaWR4IDw9IHJpZ2h0X2xlbiwKfQAAwAQQAFsAAACuBQAACQAAAGFzc2VydGlvbiBmYWlsZWQ6IG5ld19sZWZ0X2xlbiA8PSBDQVBBQ0lUWQAAwAQQAFsAAABhBQAACQAAAGNhcGFjaXR5IG92ZXJmbG93AAAApAgQABEAAAAvcnVzdGMvM2U5YmQ4YjU2NmE0N2M1ZDFjMWRiYzdlMDQzYjRiN2ZhNTMzMGVjYS9saWJyYXJ5L2FsbG9jL3NyYy92ZWMvc3BlY19mcm9tX2l0ZXJfbmVzdGVkLnJzAADACBAAXgAAADkAAAASAAAAL3J1c3RjLzNlOWJkOGI1NjZhNDdjNWQxYzFkYmM3ZTA0M2I0YjdmYTUzMzBlY2EvbGlicmFyeS9hbGxvYy9zcmMvY29sbGVjdGlvbnMvYnRyZWUvbWFwL2VudHJ5LnJzMAkQAGAAAAA1AgAAKgAAAC9ydXN0Yy8zZTliZDhiNTY2YTQ3YzVkMWMxZGJjN2UwNDNiNGI3ZmE1MzMwZWNhL2xpYnJhcnkvYWxsb2Mvc3JjL3ZlYy9tb2QucnOgCRAATAAAAEAMAAANAAAAAAAAAAQAAAAEAAAAHQAAAHNyYy9tZW0ucnMAAAwKEAAKAAAANwAAABcAAAAMChAACgAAAIYAAAARAAAADAoQAAoAAACtAAAAEQAAAENlbGwgbm90IGZvdW5kAABIChAADgAAAAwKEAAKAAAA1AAAABEAAAAMChAACgAAAPMAAAANAAAARXhlY3V0ZToge31TZXQgZW52aXJvbm1lbnQ6IIsKEAARAAAAT24gZGVwbG95OiB7fU1lbSBzaXplOg==");
}
function wasm2js_trap() { throw new Error('abort'); }

function asmFunc(imports) {
 var buffer = new ArrayBuffer(1114112);
 var HEAP8 = new Int8Array(buffer);
 var HEAP16 = new Int16Array(buffer);
 var HEAP32 = new Int32Array(buffer);
 var HEAPU8 = new Uint8Array(buffer);
 var HEAPU16 = new Uint16Array(buffer);
 var HEAPU32 = new Uint32Array(buffer);
 var HEAPF32 = new Float32Array(buffer);
 var HEAPF64 = new Float64Array(buffer);
 var Math_imul = Math.imul;
 var Math_fround = Math.fround;
 var Math_abs = Math.abs;
 var Math_clz32 = Math.clz32;
 var Math_min = Math.min;
 var Math_max = Math.max;
 var Math_floor = Math.floor;
 var Math_ceil = Math.ceil;
 var Math_trunc = Math.trunc;
 var Math_sqrt = Math.sqrt;
 var env = imports.env;
 var _ZN12rust_runtime3mem3log17hfd3cd80676177765E = env.log;
 var __stack_pointer = 1048576;
 var global$1 = 1051820;
 var global$2 = 1051824;
 var __wasm_intrinsics_temp_i64 = 0;
 var __wasm_intrinsics_temp_i64$hi = 0;
 var i64toi32_i32$HIGH_BITS = 0;
 function __rust_alloc($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return __rdl_alloc($0 | 0, $1 | 0) | 0 | 0;
 }
 
 function __rust_dealloc($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  __rdl_dealloc($0 | 0, $1 | 0, $2 | 0);
  return;
 }
 
 function __rust_realloc($0, $1, $2, $3) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  return __rdl_realloc($0 | 0, $1 | 0, $2 | 0, $3 | 0) | 0 | 0;
 }
 
 function __rust_alloc_error_handler($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  __rg_oom($0 | 0, $1 | 0);
  return;
 }
 
 function _ZN36_$LT$T$u20$as$u20$core__any__Any$GT$7type_id17h1116370b49193673E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$1 = 0, i64toi32_i32$0 = 0;
  i64toi32_i32$1 = $0;
  i64toi32_i32$0 = 1676365868;
  HEAP32[(i64toi32_i32$1 + 8 | 0) >> 2] = -691315347;
  HEAP32[(i64toi32_i32$1 + 12 | 0) >> 2] = i64toi32_i32$0;
  i64toi32_i32$0 = -1182065807;
  HEAP32[i64toi32_i32$1 >> 2] = 1470513528;
  HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
 }
 
 function _ZN36_$LT$T$u20$as$u20$core__any__Any$GT$7type_id17h698f49bbed3b63dfE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$1 = 0, i64toi32_i32$0 = 0;
  i64toi32_i32$1 = $0;
  i64toi32_i32$0 = 2063459409;
  HEAP32[(i64toi32_i32$1 + 8 | 0) >> 2] = 2100447575;
  HEAP32[(i64toi32_i32$1 + 12 | 0) >> 2] = i64toi32_i32$0;
  i64toi32_i32$0 = -718796931;
  HEAP32[i64toi32_i32$1 >> 2] = -1437107046;
  HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
 }
 
 function _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$7reserve21do_reserve_and_handle17h5e9daeeab98ea459E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $4 = 0;
  $3 = __stack_pointer - 32 | 0;
  __stack_pointer = $3;
  label$1 : {
   $2 = $1 + $2 | 0;
   if ($2 >>> 0 >= $1 >>> 0) {
    break label$1
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(0 | 0, 0 | 0);
   wasm2js_trap();
  }
  $4 = HEAP32[$0 >> 2] | 0;
  $1 = $4 << 1 | 0;
  $1 = $1 >>> 0 > $2 >>> 0 ? $1 : $2;
  $1 = $1 >>> 0 > 8 >>> 0 ? $1 : 8;
  $2 = ($1 ^ -1 | 0) >>> 31 | 0;
  label$2 : {
   label$3 : {
    if ($4) {
     break label$3
    }
    $4 = 0;
    break label$2;
   }
   HEAP32[($3 + 28 | 0) >> 2] = $4;
   HEAP32[($3 + 20 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | 0;
   $4 = 1;
  }
  HEAP32[($3 + 24 | 0) >> 2] = $4;
  _ZN5alloc7raw_vec11finish_grow17ha2d904593814b148E($3 + 8 | 0 | 0, $2 | 0, $1 | 0, $3 + 20 | 0 | 0);
  label$4 : {
   if ((HEAP32[($3 + 8 | 0) >> 2] | 0 | 0) != (1 | 0)) {
    break label$4
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(HEAP32[($3 + 12 | 0) >> 2] | 0 | 0, HEAP32[($3 + 16 | 0) >> 2] | 0 | 0);
   wasm2js_trap();
  }
  $2 = HEAP32[($3 + 12 | 0) >> 2] | 0;
  HEAP32[$0 >> 2] = $1;
  HEAP32[($0 + 4 | 0) >> 2] = $2;
  __stack_pointer = $3 + 32 | 0;
 }
 
 function _ZN4core3fmt5Write9write_fmt17h44df5905957d3a1fE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return _ZN4core3fmt5write17hd273a061a774381dE($0 | 0, 1048576 | 0, $1 | 0) | 0 | 0;
 }
 
 function _ZN4core3ptr42drop_in_place$LT$alloc__string__String$GT$17hb5bccdeece555eeeE($0) {
  $0 = $0 | 0;
  var $1 = 0;
  label$1 : {
   $1 = HEAP32[$0 >> 2] | 0;
   if (!$1) {
    break label$1
   }
   __rust_dealloc(HEAP32[($0 + 4 | 0) >> 2] | 0 | 0, $1 | 0, 1 | 0);
  }
 }
 
 function _ZN4core3ptr77drop_in_place$LT$std__panicking__begin_panic_handler__FormatStringPayload$GT$17hec524af3f69d5a53E($0) {
  $0 = $0 | 0;
  var $1 = 0;
  label$1 : {
   $1 = HEAP32[$0 >> 2] | 0;
   if (($1 | -2147483648 | 0 | 0) == (-2147483648 | 0)) {
    break label$1
   }
   __rust_dealloc(HEAP32[($0 + 4 | 0) >> 2] | 0 | 0, $1 | 0, 1 | 0);
  }
 }
 
 function _ZN4core5panic12PanicPayload6as_str17hd887f5dc9940e8f0E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  HEAP32[$0 >> 2] = 0;
 }
 
 function _ZN58_$LT$alloc__string__String$u20$as$u20$core__fmt__Write$GT$10write_char17h9231f70fbd335441E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0;
  $2 = __stack_pointer - 16 | 0;
  __stack_pointer = $2;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      if ($1 >>> 0 < 128 >>> 0) {
       break label$4
      }
      HEAP32[($2 + 12 | 0) >> 2] = 0;
      if ($1 >>> 0 < 2048 >>> 0) {
       break label$3
      }
      label$5 : {
       if ($1 >>> 0 >= 65536 >>> 0) {
        break label$5
       }
       HEAP8[($2 + 14 | 0) >> 0] = $1 & 63 | 0 | 128 | 0;
       HEAP8[($2 + 12 | 0) >> 0] = $1 >>> 12 | 0 | 224 | 0;
       HEAP8[($2 + 13 | 0) >> 0] = ($1 >>> 6 | 0) & 63 | 0 | 128 | 0;
       $1 = 3;
       break label$2;
      }
      HEAP8[($2 + 15 | 0) >> 0] = $1 & 63 | 0 | 128 | 0;
      HEAP8[($2 + 12 | 0) >> 0] = $1 >>> 18 | 0 | 240 | 0;
      HEAP8[($2 + 14 | 0) >> 0] = ($1 >>> 6 | 0) & 63 | 0 | 128 | 0;
      HEAP8[($2 + 13 | 0) >> 0] = ($1 >>> 12 | 0) & 63 | 0 | 128 | 0;
      $1 = 4;
      break label$2;
     }
     label$6 : {
      $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
      if (($3 | 0) != (HEAP32[$0 >> 2] | 0 | 0)) {
       break label$6
      }
      _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$8grow_one17hcf301c28e3aef7c4E($0 | 0);
     }
     HEAP32[($0 + 8 | 0) >> 2] = $3 + 1 | 0;
     HEAP8[((HEAP32[($0 + 4 | 0) >> 2] | 0) + $3 | 0) >> 0] = $1;
     break label$1;
    }
    HEAP8[($2 + 13 | 0) >> 0] = $1 & 63 | 0 | 128 | 0;
    HEAP8[($2 + 12 | 0) >> 0] = $1 >>> 6 | 0 | 192 | 0;
    $1 = 2;
   }
   label$7 : {
    $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
    if (((HEAP32[$0 >> 2] | 0) - $3 | 0) >>> 0 >= $1 >>> 0) {
     break label$7
    }
    _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$7reserve21do_reserve_and_handle17h5e9daeeab98ea459E($0 | 0, $3 | 0, $1 | 0);
    $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
   }
   memcpy((HEAP32[($0 + 4 | 0) >> 2] | 0) + $3 | 0 | 0, $2 + 12 | 0 | 0, $1 | 0) | 0;
   HEAP32[($0 + 8 | 0) >> 2] = $3 + $1 | 0;
  }
  __stack_pointer = $2 + 16 | 0;
  return 0 | 0;
 }
 
 function _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$8grow_one17hcf301c28e3aef7c4E($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0, $3 = 0, $4 = 0;
  $1 = __stack_pointer - 32 | 0;
  __stack_pointer = $1;
  label$1 : {
   $2 = HEAP32[$0 >> 2] | 0;
   if (($2 | 0) != (-1 | 0)) {
    break label$1
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(0 | 0, 0 | 0);
   wasm2js_trap();
  }
  $3 = $2 << 1 | 0;
  $4 = $2 + 1 | 0;
  $3 = $3 >>> 0 > $4 >>> 0 ? $3 : $4;
  $3 = $3 >>> 0 > 8 >>> 0 ? $3 : 8;
  $4 = ($3 ^ -1 | 0) >>> 31 | 0;
  label$2 : {
   label$3 : {
    if ($2) {
     break label$3
    }
    $2 = 0;
    break label$2;
   }
   HEAP32[($1 + 28 | 0) >> 2] = $2;
   HEAP32[($1 + 20 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | 0;
   $2 = 1;
  }
  HEAP32[($1 + 24 | 0) >> 2] = $2;
  _ZN5alloc7raw_vec11finish_grow17ha2d904593814b148E($1 + 8 | 0 | 0, $4 | 0, $3 | 0, $1 + 20 | 0 | 0);
  label$4 : {
   if ((HEAP32[($1 + 8 | 0) >> 2] | 0 | 0) != (1 | 0)) {
    break label$4
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(HEAP32[($1 + 12 | 0) >> 2] | 0 | 0, HEAP32[($1 + 16 | 0) >> 2] | 0 | 0);
   wasm2js_trap();
  }
  $2 = HEAP32[($1 + 12 | 0) >> 2] | 0;
  HEAP32[$0 >> 2] = $3;
  HEAP32[($0 + 4 | 0) >> 2] = $2;
  __stack_pointer = $1 + 32 | 0;
 }
 
 function _ZN58_$LT$alloc__string__String$u20$as$u20$core__fmt__Write$GT$9write_str17h9c2d3e9aafc08637E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0;
  label$1 : {
   $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
   if (((HEAP32[$0 >> 2] | 0) - $3 | 0) >>> 0 >= $2 >>> 0) {
    break label$1
   }
   _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$7reserve21do_reserve_and_handle17h5e9daeeab98ea459E($0 | 0, $3 | 0, $2 | 0);
   $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
  }
  memcpy((HEAP32[($0 + 4 | 0) >> 2] | 0) + $3 | 0 | 0, $1 | 0, $2 | 0) | 0;
  HEAP32[($0 + 8 | 0) >> 2] = $3 + $2 | 0;
  return 0 | 0;
 }
 
 function _ZN5alloc7raw_vec11finish_grow17ha2d904593814b148E($0, $1, $2, $3) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  var $4 = 0;
  label$1 : {
   label$2 : {
    label$3 : {
     if (!$1) {
      break label$3
     }
     if (($2 | 0) <= (-1 | 0)) {
      break label$2
     }
     label$4 : {
      label$5 : {
       label$6 : {
        if (!(HEAP32[($3 + 4 | 0) >> 2] | 0)) {
         break label$6
        }
        label$7 : {
         $4 = HEAP32[($3 + 8 | 0) >> 2] | 0;
         if ($4) {
          break label$7
         }
         label$8 : {
          if ($2) {
           break label$8
          }
          $3 = $1;
          break label$4;
         }
         HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
         break label$5;
        }
        $3 = __rust_realloc(HEAP32[$3 >> 2] | 0 | 0, $4 | 0, $1 | 0, $2 | 0) | 0;
        break label$4;
       }
       label$9 : {
        if ($2) {
         break label$9
        }
        $3 = $1;
        break label$4;
       }
       HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
      }
      $3 = __rust_alloc($2 | 0, $1 | 0) | 0;
     }
     label$10 : {
      if (!$3) {
       break label$10
      }
      HEAP32[($0 + 8 | 0) >> 2] = $2;
      HEAP32[($0 + 4 | 0) >> 2] = $3;
      HEAP32[$0 >> 2] = 0;
      return;
     }
     HEAP32[($0 + 8 | 0) >> 2] = $2;
     HEAP32[($0 + 4 | 0) >> 2] = $1;
     break label$1;
    }
    HEAP32[($0 + 4 | 0) >> 2] = 0;
    break label$1;
   }
   HEAP32[($0 + 4 | 0) >> 2] = 0;
  }
  HEAP32[$0 >> 2] = 1;
 }
 
 function _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$12unlink_chunk17h20421146e3e4e9ccE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $4 = 0, $3 = 0, $5 = 0, wasm2js_i32$0 = 0, wasm2js_i32$1 = 0;
  $2 = HEAP32[($0 + 12 | 0) >> 2] | 0;
  label$1 : {
   label$2 : {
    label$3 : {
     if ($1 >>> 0 < 256 >>> 0) {
      break label$3
     }
     $3 = HEAP32[($0 + 24 | 0) >> 2] | 0;
     label$4 : {
      label$5 : {
       label$6 : {
        if (($2 | 0) != ($0 | 0)) {
         break label$6
        }
        $2 = HEAP32[($0 + 20 | 0) >> 2] | 0;
        $1 = HEAP32[($0 + ($2 ? 20 : 16) | 0) >> 2] | 0;
        if ($1) {
         break label$5
        }
        $2 = 0;
        break label$4;
       }
       $1 = HEAP32[($0 + 8 | 0) >> 2] | 0;
       HEAP32[($1 + 12 | 0) >> 2] = $2;
       HEAP32[($2 + 8 | 0) >> 2] = $1;
       break label$4;
      }
      $4 = $2 ? $0 + 20 | 0 : $0 + 16 | 0;
      label$7 : while (1) {
       $5 = $4;
       $2 = $1;
       $1 = HEAP32[($2 + 20 | 0) >> 2] | 0;
       $4 = $1 ? $2 + 20 | 0 : $2 + 16 | 0;
       $1 = HEAP32[($2 + ($1 ? 20 : 16) | 0) >> 2] | 0;
       if ($1) {
        continue label$7
       }
       break label$7;
      };
      HEAP32[$5 >> 2] = 0;
     }
     if (!$3) {
      break label$1
     }
     label$8 : {
      $1 = ((HEAP32[($0 + 28 | 0) >> 2] | 0) << 2 | 0) + 1051348 | 0;
      if ((HEAP32[$1 >> 2] | 0 | 0) == ($0 | 0)) {
       break label$8
      }
      HEAP32[($3 + ((HEAP32[($3 + 16 | 0) >> 2] | 0 | 0) == ($0 | 0) ? 16 : 20) | 0) >> 2] = $2;
      if (!$2) {
       break label$1
      }
      break label$2;
     }
     HEAP32[$1 >> 2] = $2;
     if ($2) {
      break label$2
     }
     (wasm2js_i32$0 = 0, wasm2js_i32$1 = (HEAP32[(0 + 1051760 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, HEAP32[($0 + 28 | 0) >> 2] | 0 | 0) | 0) | 0), HEAP32[(wasm2js_i32$0 + 1051760 | 0) >> 2] = wasm2js_i32$1;
     break label$1;
    }
    label$9 : {
     $4 = HEAP32[($0 + 8 | 0) >> 2] | 0;
     if (($2 | 0) == ($4 | 0)) {
      break label$9
     }
     HEAP32[($4 + 12 | 0) >> 2] = $2;
     HEAP32[($2 + 8 | 0) >> 2] = $4;
     return;
    }
    (wasm2js_i32$0 = 0, wasm2js_i32$1 = (HEAP32[(0 + 1051756 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, $1 >>> 3 | 0 | 0) | 0) | 0), HEAP32[(wasm2js_i32$0 + 1051756 | 0) >> 2] = wasm2js_i32$1;
    return;
   }
   HEAP32[($2 + 24 | 0) >> 2] = $3;
   label$10 : {
    $1 = HEAP32[($0 + 16 | 0) >> 2] | 0;
    if (!$1) {
     break label$10
    }
    HEAP32[($2 + 16 | 0) >> 2] = $1;
    HEAP32[($1 + 24 | 0) >> 2] = $2;
   }
   $1 = HEAP32[($0 + 20 | 0) >> 2] | 0;
   if (!$1) {
    break label$1
   }
   HEAP32[($2 + 20 | 0) >> 2] = $1;
   HEAP32[($1 + 24 | 0) >> 2] = $2;
   return;
  }
 }
 
 function _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$13dispose_chunk17hb68dd003b737d09cE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $3 = 0, $2 = 0;
  $2 = $0 + $1 | 0;
  label$1 : {
   label$2 : {
    $3 = HEAP32[($0 + 4 | 0) >> 2] | 0;
    if ($3 & 1 | 0) {
     break label$2
    }
    if (!($3 & 2 | 0)) {
     break label$1
    }
    $3 = HEAP32[$0 >> 2] | 0;
    $1 = $3 + $1 | 0;
    label$3 : {
     $0 = $0 - $3 | 0;
     if (($0 | 0) != (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
      break label$3
     }
     if (((HEAP32[($2 + 4 | 0) >> 2] | 0) & 3 | 0 | 0) != (3 | 0)) {
      break label$2
     }
     HEAP32[(0 + 1051764 | 0) >> 2] = $1;
     HEAP32[($2 + 4 | 0) >> 2] = (HEAP32[($2 + 4 | 0) >> 2] | 0) & -2 | 0;
     HEAP32[($0 + 4 | 0) >> 2] = $1 | 1 | 0;
     HEAP32[$2 >> 2] = $1;
     break label$1;
    }
    _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$12unlink_chunk17h20421146e3e4e9ccE($0 | 0, $3 | 0);
   }
   label$4 : {
    label$5 : {
     label$6 : {
      label$7 : {
       $3 = HEAP32[($2 + 4 | 0) >> 2] | 0;
       if ($3 & 2 | 0) {
        break label$7
       }
       if (($2 | 0) == (HEAP32[(0 + 1051776 | 0) >> 2] | 0 | 0)) {
        break label$5
       }
       if (($2 | 0) == (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
        break label$4
       }
       $3 = $3 & -8 | 0;
       _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$12unlink_chunk17h20421146e3e4e9ccE($2 | 0, $3 | 0);
       $1 = $3 + $1 | 0;
       HEAP32[($0 + 4 | 0) >> 2] = $1 | 1 | 0;
       HEAP32[($0 + $1 | 0) >> 2] = $1;
       if (($0 | 0) != (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
        break label$6
       }
       HEAP32[(0 + 1051764 | 0) >> 2] = $1;
       return;
      }
      HEAP32[($2 + 4 | 0) >> 2] = $3 & -2 | 0;
      HEAP32[($0 + 4 | 0) >> 2] = $1 | 1 | 0;
      HEAP32[($0 + $1 | 0) >> 2] = $1;
     }
     label$8 : {
      if ($1 >>> 0 < 256 >>> 0) {
       break label$8
      }
      _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$18insert_large_chunk17h8e4702b854476b2fE($0 | 0, $1 | 0);
      return;
     }
     $2 = ($1 & 248 | 0) + 1051492 | 0;
     label$9 : {
      label$10 : {
       $3 = HEAP32[(0 + 1051756 | 0) >> 2] | 0;
       $1 = 1 << ($1 >>> 3 | 0) | 0;
       if ($3 & $1 | 0) {
        break label$10
       }
       HEAP32[(0 + 1051756 | 0) >> 2] = $3 | $1 | 0;
       $1 = $2;
       break label$9;
      }
      $1 = HEAP32[($2 + 8 | 0) >> 2] | 0;
     }
     HEAP32[($2 + 8 | 0) >> 2] = $0;
     HEAP32[($1 + 12 | 0) >> 2] = $0;
     HEAP32[($0 + 12 | 0) >> 2] = $2;
     HEAP32[($0 + 8 | 0) >> 2] = $1;
     return;
    }
    HEAP32[(0 + 1051776 | 0) >> 2] = $0;
    $1 = (HEAP32[(0 + 1051768 | 0) >> 2] | 0) + $1 | 0;
    HEAP32[(0 + 1051768 | 0) >> 2] = $1;
    HEAP32[($0 + 4 | 0) >> 2] = $1 | 1 | 0;
    if (($0 | 0) != (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
     break label$1
    }
    HEAP32[(0 + 1051764 | 0) >> 2] = 0;
    HEAP32[(0 + 1051772 | 0) >> 2] = 0;
    return;
   }
   HEAP32[(0 + 1051772 | 0) >> 2] = $0;
   $1 = (HEAP32[(0 + 1051764 | 0) >> 2] | 0) + $1 | 0;
   HEAP32[(0 + 1051764 | 0) >> 2] = $1;
   HEAP32[($0 + 4 | 0) >> 2] = $1 | 1 | 0;
   HEAP32[($0 + $1 | 0) >> 2] = $1;
   return;
  }
 }
 
 function _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$18insert_large_chunk17h8e4702b854476b2fE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0, $4 = 0, $5 = 0;
  $2 = 0;
  label$1 : {
   if ($1 >>> 0 < 256 >>> 0) {
    break label$1
   }
   $2 = 31;
   if ($1 >>> 0 > 16777215 >>> 0) {
    break label$1
   }
   $2 = Math_clz32($1 >>> 8 | 0);
   $2 = ((($1 >>> (6 - $2 | 0) | 0) & 1 | 0) - ($2 << 1 | 0) | 0) + 62 | 0;
  }
  HEAP32[($0 + 16 | 0) >> 2] = 0;
  HEAP32[($0 + 20 | 0) >> 2] = 0;
  HEAP32[($0 + 28 | 0) >> 2] = $2;
  $3 = ($2 << 2 | 0) + 1051348 | 0;
  label$2 : {
   $4 = 1 << $2 | 0;
   if ((HEAP32[(0 + 1051760 | 0) >> 2] | 0) & $4 | 0) {
    break label$2
   }
   HEAP32[$3 >> 2] = $0;
   HEAP32[($0 + 24 | 0) >> 2] = $3;
   HEAP32[($0 + 12 | 0) >> 2] = $0;
   HEAP32[($0 + 8 | 0) >> 2] = $0;
   HEAP32[(0 + 1051760 | 0) >> 2] = HEAP32[(0 + 1051760 | 0) >> 2] | 0 | $4 | 0;
   return;
  }
  label$3 : {
   label$4 : {
    label$5 : {
     $4 = HEAP32[$3 >> 2] | 0;
     if (((HEAP32[($4 + 4 | 0) >> 2] | 0) & -8 | 0 | 0) != ($1 | 0)) {
      break label$5
     }
     $2 = $4;
     break label$4;
    }
    $3 = $1 << (($2 | 0) == (31 | 0) ? 0 : 25 - ($2 >>> 1 | 0) | 0) | 0;
    label$6 : while (1) {
     $5 = ($4 + (($3 >>> 29 | 0) & 4 | 0) | 0) + 16 | 0;
     $2 = HEAP32[$5 >> 2] | 0;
     if (!$2) {
      break label$3
     }
     $3 = $3 << 1 | 0;
     $4 = $2;
     if (((HEAP32[($2 + 4 | 0) >> 2] | 0) & -8 | 0 | 0) != ($1 | 0)) {
      continue label$6
     }
     break label$6;
    };
   }
   $3 = HEAP32[($2 + 8 | 0) >> 2] | 0;
   HEAP32[($3 + 12 | 0) >> 2] = $0;
   HEAP32[($2 + 8 | 0) >> 2] = $0;
   HEAP32[($0 + 24 | 0) >> 2] = 0;
   HEAP32[($0 + 12 | 0) >> 2] = $2;
   HEAP32[($0 + 8 | 0) >> 2] = $3;
   return;
  }
  HEAP32[$5 >> 2] = $0;
  HEAP32[($0 + 24 | 0) >> 2] = $4;
  HEAP32[($0 + 12 | 0) >> 2] = $0;
  HEAP32[($0 + 8 | 0) >> 2] = $0;
 }
 
 function _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$4free17hcade36dd23206a7bE($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0;
  $1 = $0 + -8 | 0;
  $2 = HEAP32[($0 + -4 | 0) >> 2] | 0;
  $0 = $2 & -8 | 0;
  $3 = $1 + $0 | 0;
  label$1 : {
   label$2 : {
    if ($2 & 1 | 0) {
     break label$2
    }
    if (!($2 & 2 | 0)) {
     break label$1
    }
    $2 = HEAP32[$1 >> 2] | 0;
    $0 = $2 + $0 | 0;
    label$3 : {
     $1 = $1 - $2 | 0;
     if (($1 | 0) != (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
      break label$3
     }
     if (((HEAP32[($3 + 4 | 0) >> 2] | 0) & 3 | 0 | 0) != (3 | 0)) {
      break label$2
     }
     HEAP32[(0 + 1051764 | 0) >> 2] = $0;
     HEAP32[($3 + 4 | 0) >> 2] = (HEAP32[($3 + 4 | 0) >> 2] | 0) & -2 | 0;
     HEAP32[($1 + 4 | 0) >> 2] = $0 | 1 | 0;
     HEAP32[$3 >> 2] = $0;
     return;
    }
    _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$12unlink_chunk17h20421146e3e4e9ccE($1 | 0, $2 | 0);
   }
   label$4 : {
    label$5 : {
     label$6 : {
      label$7 : {
       label$8 : {
        label$9 : {
         $2 = HEAP32[($3 + 4 | 0) >> 2] | 0;
         if ($2 & 2 | 0) {
          break label$9
         }
         if (($3 | 0) == (HEAP32[(0 + 1051776 | 0) >> 2] | 0 | 0)) {
          break label$7
         }
         if (($3 | 0) == (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
          break label$6
         }
         $2 = $2 & -8 | 0;
         _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$12unlink_chunk17h20421146e3e4e9ccE($3 | 0, $2 | 0);
         $0 = $2 + $0 | 0;
         HEAP32[($1 + 4 | 0) >> 2] = $0 | 1 | 0;
         HEAP32[($1 + $0 | 0) >> 2] = $0;
         if (($1 | 0) != (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
          break label$8
         }
         HEAP32[(0 + 1051764 | 0) >> 2] = $0;
         return;
        }
        HEAP32[($3 + 4 | 0) >> 2] = $2 & -2 | 0;
        HEAP32[($1 + 4 | 0) >> 2] = $0 | 1 | 0;
        HEAP32[($1 + $0 | 0) >> 2] = $0;
       }
       if ($0 >>> 0 < 256 >>> 0) {
        break label$5
       }
       _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$18insert_large_chunk17h8e4702b854476b2fE($1 | 0, $0 | 0);
       $1 = 0;
       $0 = (HEAP32[(0 + 1051796 | 0) >> 2] | 0) + -1 | 0;
       HEAP32[(0 + 1051796 | 0) >> 2] = $0;
       if ($0) {
        break label$1
       }
       label$10 : {
        $0 = HEAP32[(0 + 1051484 | 0) >> 2] | 0;
        if (!$0) {
         break label$10
        }
        $1 = 0;
        label$11 : while (1) {
         $1 = $1 + 1 | 0;
         $0 = HEAP32[($0 + 8 | 0) >> 2] | 0;
         if ($0) {
          continue label$11
         }
         break label$11;
        };
       }
       HEAP32[(0 + 1051796 | 0) >> 2] = $1 >>> 0 > 4095 >>> 0 ? $1 : 4095;
       return;
      }
      HEAP32[(0 + 1051776 | 0) >> 2] = $1;
      $0 = (HEAP32[(0 + 1051768 | 0) >> 2] | 0) + $0 | 0;
      HEAP32[(0 + 1051768 | 0) >> 2] = $0;
      HEAP32[($1 + 4 | 0) >> 2] = $0 | 1 | 0;
      label$12 : {
       if (($1 | 0) != (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
        break label$12
       }
       HEAP32[(0 + 1051764 | 0) >> 2] = 0;
       HEAP32[(0 + 1051772 | 0) >> 2] = 0;
      }
      $4 = HEAP32[(0 + 1051788 | 0) >> 2] | 0;
      if ($0 >>> 0 <= $4 >>> 0) {
       break label$1
      }
      $0 = HEAP32[(0 + 1051776 | 0) >> 2] | 0;
      if (!$0) {
       break label$1
      }
      $2 = 0;
      $5 = HEAP32[(0 + 1051768 | 0) >> 2] | 0;
      if ($5 >>> 0 < 41 >>> 0) {
       break label$4
      }
      $1 = 1051476;
      label$13 : while (1) {
       label$14 : {
        $3 = HEAP32[$1 >> 2] | 0;
        if ($3 >>> 0 > $0 >>> 0) {
         break label$14
        }
        if ($0 >>> 0 < ($3 + (HEAP32[($1 + 4 | 0) >> 2] | 0) | 0) >>> 0) {
         break label$4
        }
       }
       $1 = HEAP32[($1 + 8 | 0) >> 2] | 0;
       continue label$13;
      };
     }
     HEAP32[(0 + 1051772 | 0) >> 2] = $1;
     $0 = (HEAP32[(0 + 1051764 | 0) >> 2] | 0) + $0 | 0;
     HEAP32[(0 + 1051764 | 0) >> 2] = $0;
     HEAP32[($1 + 4 | 0) >> 2] = $0 | 1 | 0;
     HEAP32[($1 + $0 | 0) >> 2] = $0;
     return;
    }
    $3 = ($0 & 248 | 0) + 1051492 | 0;
    label$15 : {
     label$16 : {
      $2 = HEAP32[(0 + 1051756 | 0) >> 2] | 0;
      $0 = 1 << ($0 >>> 3 | 0) | 0;
      if ($2 & $0 | 0) {
       break label$16
      }
      HEAP32[(0 + 1051756 | 0) >> 2] = $2 | $0 | 0;
      $0 = $3;
      break label$15;
     }
     $0 = HEAP32[($3 + 8 | 0) >> 2] | 0;
    }
    HEAP32[($3 + 8 | 0) >> 2] = $1;
    HEAP32[($0 + 12 | 0) >> 2] = $1;
    HEAP32[($1 + 12 | 0) >> 2] = $3;
    HEAP32[($1 + 8 | 0) >> 2] = $0;
    return;
   }
   label$17 : {
    $1 = HEAP32[(0 + 1051484 | 0) >> 2] | 0;
    if (!$1) {
     break label$17
    }
    $2 = 0;
    label$18 : while (1) {
     $2 = $2 + 1 | 0;
     $1 = HEAP32[($1 + 8 | 0) >> 2] | 0;
     if ($1) {
      continue label$18
     }
     break label$18;
    };
   }
   HEAP32[(0 + 1051796 | 0) >> 2] = $2 >>> 0 > 4095 >>> 0 ? $2 : 4095;
   if ($5 >>> 0 <= $4 >>> 0) {
    break label$1
   }
   HEAP32[(0 + 1051788 | 0) >> 2] = -1;
  }
 }
 
 function _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$6malloc17hd9c2c8577ef4c61dE($0) {
  $0 = $0 | 0;
  var $7 = 0, $6 = 0, $2 = 0, $3 = 0, $8 = 0, $9 = 0, $5 = 0, $4 = 0, i64toi32_i32$1 = 0, $1 = 0, i64toi32_i32$2 = 0, i64toi32_i32$0 = 0, $247 = 0, $261 = 0, $618 = 0, $693 = 0, $10 = 0, $10$hi = 0, $721 = 0, $928 = 0, wasm2js_i32$0 = 0, wasm2js_i32$1 = 0;
  $1 = __stack_pointer - 16 | 0;
  __stack_pointer = $1;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        label$7 : {
         label$8 : {
          if ($0 >>> 0 < 245 >>> 0) {
           break label$8
          }
          label$9 : {
           if ($0 >>> 0 < -65587 >>> 0) {
            break label$9
           }
           $0 = 0;
           break label$1;
          }
          $2 = $0 + 11 | 0;
          $3 = $2 & -8 | 0;
          $4 = HEAP32[(0 + 1051760 | 0) >> 2] | 0;
          if (!$4) {
           break label$4
          }
          $5 = 31;
          label$10 : {
           if ($0 >>> 0 > 16777204 >>> 0) {
            break label$10
           }
           $0 = Math_clz32($2 >>> 8 | 0);
           $5 = ((($3 >>> (6 - $0 | 0) | 0) & 1 | 0) - ($0 << 1 | 0) | 0) + 62 | 0;
          }
          $2 = 0 - $3 | 0;
          label$11 : {
           $6 = HEAP32[(($5 << 2 | 0) + 1051348 | 0) >> 2] | 0;
           if ($6) {
            break label$11
           }
           $0 = 0;
           $7 = 0;
           break label$7;
          }
          $0 = 0;
          $8 = $3 << (($5 | 0) == (31 | 0) ? 0 : 25 - ($5 >>> 1 | 0) | 0) | 0;
          $7 = 0;
          label$12 : while (1) {
           label$13 : {
            $9 = (HEAP32[($6 + 4 | 0) >> 2] | 0) & -8 | 0;
            if ($9 >>> 0 < $3 >>> 0) {
             break label$13
            }
            $9 = $9 - $3 | 0;
            if ($9 >>> 0 >= $2 >>> 0) {
             break label$13
            }
            $2 = $9;
            $7 = $6;
            if ($2) {
             break label$13
            }
            $2 = 0;
            $7 = $6;
            $0 = $6;
            break label$6;
           }
           $9 = HEAP32[($6 + 20 | 0) >> 2] | 0;
           $6 = HEAP32[(($6 + (($8 >>> 29 | 0) & 4 | 0) | 0) + 16 | 0) >> 2] | 0;
           $0 = $9 ? (($9 | 0) != ($6 | 0) ? $9 : $0) : $0;
           $8 = $8 << 1 | 0;
           if (!$6) {
            break label$7
           }
           continue label$12;
          };
         }
         label$14 : {
          $6 = HEAP32[(0 + 1051756 | 0) >> 2] | 0;
          $3 = $0 >>> 0 < 11 >>> 0 ? 16 : ($0 + 11 | 0) & 504 | 0;
          $2 = $3 >>> 3 | 0;
          $0 = $6 >>> $2 | 0;
          if (!($0 & 3 | 0)) {
           break label$14
          }
          label$15 : {
           label$16 : {
            $8 = (($0 ^ -1 | 0) & 1 | 0) + $2 | 0;
            $3 = $8 << 3 | 0;
            $0 = $3 + 1051492 | 0;
            $2 = HEAP32[($3 + 1051500 | 0) >> 2] | 0;
            $7 = HEAP32[($2 + 8 | 0) >> 2] | 0;
            if (($0 | 0) == ($7 | 0)) {
             break label$16
            }
            HEAP32[($7 + 12 | 0) >> 2] = $0;
            HEAP32[($0 + 8 | 0) >> 2] = $7;
            break label$15;
           }
           (wasm2js_i32$0 = 0, wasm2js_i32$1 = $6 & (__wasm_rotl_i32(-2 | 0, $8 | 0) | 0) | 0), HEAP32[(wasm2js_i32$0 + 1051756 | 0) >> 2] = wasm2js_i32$1;
          }
          $0 = $2 + 8 | 0;
          HEAP32[($2 + 4 | 0) >> 2] = $3 | 3 | 0;
          $3 = $2 + $3 | 0;
          HEAP32[($3 + 4 | 0) >> 2] = HEAP32[($3 + 4 | 0) >> 2] | 0 | 1 | 0;
          break label$1;
         }
         if ($3 >>> 0 <= (HEAP32[(0 + 1051764 | 0) >> 2] | 0) >>> 0) {
          break label$4
         }
         label$17 : {
          label$18 : {
           label$19 : {
            if ($0) {
             break label$19
            }
            $0 = HEAP32[(0 + 1051760 | 0) >> 2] | 0;
            if (!$0) {
             break label$4
            }
            $7 = HEAP32[(((__wasm_ctz_i32($0 | 0) | 0) << 2 | 0) + 1051348 | 0) >> 2] | 0;
            $2 = ((HEAP32[($7 + 4 | 0) >> 2] | 0) & -8 | 0) - $3 | 0;
            $6 = $7;
            label$20 : while (1) {
             label$21 : {
              $0 = HEAP32[($7 + 16 | 0) >> 2] | 0;
              if ($0) {
               break label$21
              }
              $0 = HEAP32[($7 + 20 | 0) >> 2] | 0;
              if ($0) {
               break label$21
              }
              $5 = HEAP32[($6 + 24 | 0) >> 2] | 0;
              label$22 : {
               label$23 : {
                label$24 : {
                 $0 = HEAP32[($6 + 12 | 0) >> 2] | 0;
                 if (($0 | 0) != ($6 | 0)) {
                  break label$24
                 }
                 $0 = HEAP32[($6 + 20 | 0) >> 2] | 0;
                 $7 = HEAP32[($6 + ($0 ? 20 : 16) | 0) >> 2] | 0;
                 if ($7) {
                  break label$23
                 }
                 $0 = 0;
                 break label$22;
                }
                $7 = HEAP32[($6 + 8 | 0) >> 2] | 0;
                HEAP32[($7 + 12 | 0) >> 2] = $0;
                HEAP32[($0 + 8 | 0) >> 2] = $7;
                break label$22;
               }
               $8 = $0 ? $6 + 20 | 0 : $6 + 16 | 0;
               label$25 : while (1) {
                $9 = $8;
                $0 = $7;
                $7 = HEAP32[($0 + 20 | 0) >> 2] | 0;
                $8 = $7 ? $0 + 20 | 0 : $0 + 16 | 0;
                $7 = HEAP32[($0 + ($7 ? 20 : 16) | 0) >> 2] | 0;
                if ($7) {
                 continue label$25
                }
                break label$25;
               };
               HEAP32[$9 >> 2] = 0;
              }
              if (!$5) {
               break label$17
              }
              label$26 : {
               $7 = ((HEAP32[($6 + 28 | 0) >> 2] | 0) << 2 | 0) + 1051348 | 0;
               if ((HEAP32[$7 >> 2] | 0 | 0) == ($6 | 0)) {
                break label$26
               }
               HEAP32[($5 + ((HEAP32[($5 + 16 | 0) >> 2] | 0 | 0) == ($6 | 0) ? 16 : 20) | 0) >> 2] = $0;
               if (!$0) {
                break label$17
               }
               break label$18;
              }
              HEAP32[$7 >> 2] = $0;
              if ($0) {
               break label$18
              }
              (wasm2js_i32$0 = 0, wasm2js_i32$1 = (HEAP32[(0 + 1051760 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, HEAP32[($6 + 28 | 0) >> 2] | 0 | 0) | 0) | 0), HEAP32[(wasm2js_i32$0 + 1051760 | 0) >> 2] = wasm2js_i32$1;
              break label$17;
             }
             $7 = ((HEAP32[($0 + 4 | 0) >> 2] | 0) & -8 | 0) - $3 | 0;
             $247 = $7;
             $7 = $7 >>> 0 < $2 >>> 0;
             $2 = $7 ? $247 : $2;
             $6 = $7 ? $0 : $6;
             $7 = $0;
             continue label$20;
            };
           }
           label$27 : {
            label$28 : {
             $261 = $0 << $2 | 0;
             $0 = 2 << $2 | 0;
             $9 = __wasm_ctz_i32($261 & ($0 | (0 - $0 | 0) | 0) | 0 | 0) | 0;
             $2 = $9 << 3 | 0;
             $7 = $2 + 1051492 | 0;
             $0 = HEAP32[($2 + 1051500 | 0) >> 2] | 0;
             $8 = HEAP32[($0 + 8 | 0) >> 2] | 0;
             if (($7 | 0) == ($8 | 0)) {
              break label$28
             }
             HEAP32[($8 + 12 | 0) >> 2] = $7;
             HEAP32[($7 + 8 | 0) >> 2] = $8;
             break label$27;
            }
            (wasm2js_i32$0 = 0, wasm2js_i32$1 = $6 & (__wasm_rotl_i32(-2 | 0, $9 | 0) | 0) | 0), HEAP32[(wasm2js_i32$0 + 1051756 | 0) >> 2] = wasm2js_i32$1;
           }
           HEAP32[($0 + 4 | 0) >> 2] = $3 | 3 | 0;
           $8 = $0 + $3 | 0;
           $7 = $2 - $3 | 0;
           HEAP32[($8 + 4 | 0) >> 2] = $7 | 1 | 0;
           HEAP32[($0 + $2 | 0) >> 2] = $7;
           label$29 : {
            $6 = HEAP32[(0 + 1051764 | 0) >> 2] | 0;
            if (!$6) {
             break label$29
            }
            $2 = ($6 & -8 | 0) + 1051492 | 0;
            $3 = HEAP32[(0 + 1051772 | 0) >> 2] | 0;
            label$30 : {
             label$31 : {
              $9 = HEAP32[(0 + 1051756 | 0) >> 2] | 0;
              $6 = 1 << ($6 >>> 3 | 0) | 0;
              if ($9 & $6 | 0) {
               break label$31
              }
              HEAP32[(0 + 1051756 | 0) >> 2] = $9 | $6 | 0;
              $6 = $2;
              break label$30;
             }
             $6 = HEAP32[($2 + 8 | 0) >> 2] | 0;
            }
            HEAP32[($2 + 8 | 0) >> 2] = $3;
            HEAP32[($6 + 12 | 0) >> 2] = $3;
            HEAP32[($3 + 12 | 0) >> 2] = $2;
            HEAP32[($3 + 8 | 0) >> 2] = $6;
           }
           $0 = $0 + 8 | 0;
           HEAP32[(0 + 1051772 | 0) >> 2] = $8;
           HEAP32[(0 + 1051764 | 0) >> 2] = $7;
           break label$1;
          }
          HEAP32[($0 + 24 | 0) >> 2] = $5;
          label$32 : {
           $7 = HEAP32[($6 + 16 | 0) >> 2] | 0;
           if (!$7) {
            break label$32
           }
           HEAP32[($0 + 16 | 0) >> 2] = $7;
           HEAP32[($7 + 24 | 0) >> 2] = $0;
          }
          $7 = HEAP32[($6 + 20 | 0) >> 2] | 0;
          if (!$7) {
           break label$17
          }
          HEAP32[($0 + 20 | 0) >> 2] = $7;
          HEAP32[($7 + 24 | 0) >> 2] = $0;
         }
         label$33 : {
          label$34 : {
           label$35 : {
            if ($2 >>> 0 < 16 >>> 0) {
             break label$35
            }
            HEAP32[($6 + 4 | 0) >> 2] = $3 | 3 | 0;
            $3 = $6 + $3 | 0;
            HEAP32[($3 + 4 | 0) >> 2] = $2 | 1 | 0;
            HEAP32[($3 + $2 | 0) >> 2] = $2;
            $8 = HEAP32[(0 + 1051764 | 0) >> 2] | 0;
            if (!$8) {
             break label$34
            }
            $7 = ($8 & -8 | 0) + 1051492 | 0;
            $0 = HEAP32[(0 + 1051772 | 0) >> 2] | 0;
            label$36 : {
             label$37 : {
              $9 = HEAP32[(0 + 1051756 | 0) >> 2] | 0;
              $8 = 1 << ($8 >>> 3 | 0) | 0;
              if ($9 & $8 | 0) {
               break label$37
              }
              HEAP32[(0 + 1051756 | 0) >> 2] = $9 | $8 | 0;
              $8 = $7;
              break label$36;
             }
             $8 = HEAP32[($7 + 8 | 0) >> 2] | 0;
            }
            HEAP32[($7 + 8 | 0) >> 2] = $0;
            HEAP32[($8 + 12 | 0) >> 2] = $0;
            HEAP32[($0 + 12 | 0) >> 2] = $7;
            HEAP32[($0 + 8 | 0) >> 2] = $8;
            break label$34;
           }
           $0 = $2 + $3 | 0;
           HEAP32[($6 + 4 | 0) >> 2] = $0 | 3 | 0;
           $0 = $6 + $0 | 0;
           HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | 0 | 1 | 0;
           break label$33;
          }
          HEAP32[(0 + 1051772 | 0) >> 2] = $3;
          HEAP32[(0 + 1051764 | 0) >> 2] = $2;
         }
         $0 = $6 + 8 | 0;
         break label$1;
        }
        label$38 : {
         if ($0 | $7 | 0) {
          break label$38
         }
         $7 = 0;
         $0 = 2 << $5 | 0;
         $0 = ($0 | (0 - $0 | 0) | 0) & $4 | 0;
         if (!$0) {
          break label$4
         }
         $0 = HEAP32[(((__wasm_ctz_i32($0 | 0) | 0) << 2 | 0) + 1051348 | 0) >> 2] | 0;
        }
        if (!$0) {
         break label$5
        }
       }
       label$39 : while (1) {
        $6 = (HEAP32[($0 + 4 | 0) >> 2] | 0) & -8 | 0;
        $9 = $6 - $3 | 0;
        $5 = $9 >>> 0 < $2 >>> 0;
        $4 = $5 ? $0 : $7;
        $8 = $6 >>> 0 < $3 >>> 0;
        $9 = $5 ? $9 : $2;
        label$40 : {
         $6 = HEAP32[($0 + 16 | 0) >> 2] | 0;
         if ($6) {
          break label$40
         }
         $6 = HEAP32[($0 + 20 | 0) >> 2] | 0;
        }
        $7 = $8 ? $7 : $4;
        $2 = $8 ? $2 : $9;
        $0 = $6;
        if ($0) {
         continue label$39
        }
        break label$39;
       };
      }
      if (!$7) {
       break label$4
      }
      label$41 : {
       $0 = HEAP32[(0 + 1051764 | 0) >> 2] | 0;
       if ($0 >>> 0 < $3 >>> 0) {
        break label$41
       }
       if ($2 >>> 0 >= ($0 - $3 | 0) >>> 0) {
        break label$4
       }
      }
      $5 = HEAP32[($7 + 24 | 0) >> 2] | 0;
      label$42 : {
       label$43 : {
        label$44 : {
         $0 = HEAP32[($7 + 12 | 0) >> 2] | 0;
         if (($0 | 0) != ($7 | 0)) {
          break label$44
         }
         $0 = HEAP32[($7 + 20 | 0) >> 2] | 0;
         $6 = HEAP32[($7 + ($0 ? 20 : 16) | 0) >> 2] | 0;
         if ($6) {
          break label$43
         }
         $0 = 0;
         break label$42;
        }
        $6 = HEAP32[($7 + 8 | 0) >> 2] | 0;
        HEAP32[($6 + 12 | 0) >> 2] = $0;
        HEAP32[($0 + 8 | 0) >> 2] = $6;
        break label$42;
       }
       $8 = $0 ? $7 + 20 | 0 : $7 + 16 | 0;
       label$45 : while (1) {
        $9 = $8;
        $0 = $6;
        $6 = HEAP32[($0 + 20 | 0) >> 2] | 0;
        $8 = $6 ? $0 + 20 | 0 : $0 + 16 | 0;
        $6 = HEAP32[($0 + ($6 ? 20 : 16) | 0) >> 2] | 0;
        if ($6) {
         continue label$45
        }
        break label$45;
       };
       HEAP32[$9 >> 2] = 0;
      }
      if (!$5) {
       break label$2
      }
      label$46 : {
       $6 = ((HEAP32[($7 + 28 | 0) >> 2] | 0) << 2 | 0) + 1051348 | 0;
       if ((HEAP32[$6 >> 2] | 0 | 0) == ($7 | 0)) {
        break label$46
       }
       HEAP32[($5 + ((HEAP32[($5 + 16 | 0) >> 2] | 0 | 0) == ($7 | 0) ? 16 : 20) | 0) >> 2] = $0;
       if (!$0) {
        break label$2
       }
       break label$3;
      }
      HEAP32[$6 >> 2] = $0;
      if ($0) {
       break label$3
      }
      (wasm2js_i32$0 = 0, wasm2js_i32$1 = (HEAP32[(0 + 1051760 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, HEAP32[($7 + 28 | 0) >> 2] | 0 | 0) | 0) | 0), HEAP32[(wasm2js_i32$0 + 1051760 | 0) >> 2] = wasm2js_i32$1;
      break label$2;
     }
     label$47 : {
      label$48 : {
       label$49 : {
        label$50 : {
         label$51 : {
          label$52 : {
           $0 = HEAP32[(0 + 1051764 | 0) >> 2] | 0;
           if ($0 >>> 0 >= $3 >>> 0) {
            break label$52
           }
           label$53 : {
            $0 = HEAP32[(0 + 1051768 | 0) >> 2] | 0;
            if ($0 >>> 0 > $3 >>> 0) {
             break label$53
            }
            _ZN61_$LT$dlmalloc__sys__System$u20$as$u20$dlmalloc__Allocator$GT$5alloc17hb2750b8aaf9916efE($1 + 4 | 0 | 0, 1051800 | 0, ($3 + 65583 | 0) & -65536 | 0 | 0);
            label$54 : {
             $6 = HEAP32[($1 + 4 | 0) >> 2] | 0;
             if ($6) {
              break label$54
             }
             $0 = 0;
             break label$1;
            }
            $5 = HEAP32[($1 + 12 | 0) >> 2] | 0;
            $9 = HEAP32[($1 + 8 | 0) >> 2] | 0;
            $0 = (HEAP32[(0 + 1051780 | 0) >> 2] | 0) + $9 | 0;
            HEAP32[(0 + 1051780 | 0) >> 2] = $0;
            $2 = HEAP32[(0 + 1051784 | 0) >> 2] | 0;
            HEAP32[(0 + 1051784 | 0) >> 2] = $2 >>> 0 > $0 >>> 0 ? $2 : $0;
            label$55 : {
             label$56 : {
              label$57 : {
               $2 = HEAP32[(0 + 1051776 | 0) >> 2] | 0;
               if (!$2) {
                break label$57
               }
               $0 = 1051476;
               label$58 : while (1) {
                $7 = HEAP32[$0 >> 2] | 0;
                $8 = HEAP32[($0 + 4 | 0) >> 2] | 0;
                if (($6 | 0) == ($7 + $8 | 0 | 0)) {
                 break label$56
                }
                $0 = HEAP32[($0 + 8 | 0) >> 2] | 0;
                if ($0) {
                 continue label$58
                }
                break label$55;
               };
              }
              label$59 : {
               label$60 : {
                $0 = HEAP32[(0 + 1051792 | 0) >> 2] | 0;
                if (!$0) {
                 break label$60
                }
                if ($6 >>> 0 >= $0 >>> 0) {
                 break label$59
                }
               }
               HEAP32[(0 + 1051792 | 0) >> 2] = $6;
              }
              HEAP32[(0 + 1051796 | 0) >> 2] = 4095;
              HEAP32[(0 + 1051488 | 0) >> 2] = $5;
              HEAP32[(0 + 1051480 | 0) >> 2] = $9;
              HEAP32[(0 + 1051476 | 0) >> 2] = $6;
              HEAP32[(0 + 1051504 | 0) >> 2] = 1051492;
              HEAP32[(0 + 1051512 | 0) >> 2] = 1051500;
              HEAP32[(0 + 1051500 | 0) >> 2] = 1051492;
              HEAP32[(0 + 1051520 | 0) >> 2] = 1051508;
              HEAP32[(0 + 1051508 | 0) >> 2] = 1051500;
              HEAP32[(0 + 1051528 | 0) >> 2] = 1051516;
              HEAP32[(0 + 1051516 | 0) >> 2] = 1051508;
              HEAP32[(0 + 1051536 | 0) >> 2] = 1051524;
              HEAP32[(0 + 1051524 | 0) >> 2] = 1051516;
              HEAP32[(0 + 1051544 | 0) >> 2] = 1051532;
              HEAP32[(0 + 1051532 | 0) >> 2] = 1051524;
              HEAP32[(0 + 1051552 | 0) >> 2] = 1051540;
              HEAP32[(0 + 1051540 | 0) >> 2] = 1051532;
              HEAP32[(0 + 1051560 | 0) >> 2] = 1051548;
              HEAP32[(0 + 1051548 | 0) >> 2] = 1051540;
              HEAP32[(0 + 1051568 | 0) >> 2] = 1051556;
              HEAP32[(0 + 1051556 | 0) >> 2] = 1051548;
              HEAP32[(0 + 1051564 | 0) >> 2] = 1051556;
              HEAP32[(0 + 1051576 | 0) >> 2] = 1051564;
              HEAP32[(0 + 1051572 | 0) >> 2] = 1051564;
              HEAP32[(0 + 1051584 | 0) >> 2] = 1051572;
              HEAP32[(0 + 1051580 | 0) >> 2] = 1051572;
              HEAP32[(0 + 1051592 | 0) >> 2] = 1051580;
              HEAP32[(0 + 1051588 | 0) >> 2] = 1051580;
              HEAP32[(0 + 1051600 | 0) >> 2] = 1051588;
              HEAP32[(0 + 1051596 | 0) >> 2] = 1051588;
              HEAP32[(0 + 1051608 | 0) >> 2] = 1051596;
              HEAP32[(0 + 1051604 | 0) >> 2] = 1051596;
              HEAP32[(0 + 1051616 | 0) >> 2] = 1051604;
              HEAP32[(0 + 1051612 | 0) >> 2] = 1051604;
              HEAP32[(0 + 1051624 | 0) >> 2] = 1051612;
              HEAP32[(0 + 1051620 | 0) >> 2] = 1051612;
              HEAP32[(0 + 1051632 | 0) >> 2] = 1051620;
              HEAP32[(0 + 1051640 | 0) >> 2] = 1051628;
              HEAP32[(0 + 1051628 | 0) >> 2] = 1051620;
              HEAP32[(0 + 1051648 | 0) >> 2] = 1051636;
              HEAP32[(0 + 1051636 | 0) >> 2] = 1051628;
              HEAP32[(0 + 1051656 | 0) >> 2] = 1051644;
              HEAP32[(0 + 1051644 | 0) >> 2] = 1051636;
              HEAP32[(0 + 1051664 | 0) >> 2] = 1051652;
              HEAP32[(0 + 1051652 | 0) >> 2] = 1051644;
              HEAP32[(0 + 1051672 | 0) >> 2] = 1051660;
              HEAP32[(0 + 1051660 | 0) >> 2] = 1051652;
              HEAP32[(0 + 1051680 | 0) >> 2] = 1051668;
              HEAP32[(0 + 1051668 | 0) >> 2] = 1051660;
              HEAP32[(0 + 1051688 | 0) >> 2] = 1051676;
              HEAP32[(0 + 1051676 | 0) >> 2] = 1051668;
              HEAP32[(0 + 1051696 | 0) >> 2] = 1051684;
              HEAP32[(0 + 1051684 | 0) >> 2] = 1051676;
              HEAP32[(0 + 1051704 | 0) >> 2] = 1051692;
              HEAP32[(0 + 1051692 | 0) >> 2] = 1051684;
              HEAP32[(0 + 1051712 | 0) >> 2] = 1051700;
              HEAP32[(0 + 1051700 | 0) >> 2] = 1051692;
              HEAP32[(0 + 1051720 | 0) >> 2] = 1051708;
              HEAP32[(0 + 1051708 | 0) >> 2] = 1051700;
              HEAP32[(0 + 1051728 | 0) >> 2] = 1051716;
              HEAP32[(0 + 1051716 | 0) >> 2] = 1051708;
              HEAP32[(0 + 1051736 | 0) >> 2] = 1051724;
              HEAP32[(0 + 1051724 | 0) >> 2] = 1051716;
              HEAP32[(0 + 1051744 | 0) >> 2] = 1051732;
              HEAP32[(0 + 1051732 | 0) >> 2] = 1051724;
              HEAP32[(0 + 1051752 | 0) >> 2] = 1051740;
              HEAP32[(0 + 1051740 | 0) >> 2] = 1051732;
              $0 = ($6 + 15 | 0) & -8 | 0;
              $2 = $0 + -8 | 0;
              HEAP32[(0 + 1051776 | 0) >> 2] = $2;
              HEAP32[(0 + 1051748 | 0) >> 2] = 1051740;
              $618 = $6 - $0 | 0;
              $0 = $9 + -40 | 0;
              $7 = ($618 + $0 | 0) + 8 | 0;
              HEAP32[(0 + 1051768 | 0) >> 2] = $7;
              HEAP32[($2 + 4 | 0) >> 2] = $7 | 1 | 0;
              HEAP32[(($6 + $0 | 0) + 4 | 0) >> 2] = 40;
              HEAP32[(0 + 1051788 | 0) >> 2] = 2097152;
              break label$47;
             }
             if ($2 >>> 0 >= $6 >>> 0) {
              break label$55
             }
             if ($7 >>> 0 > $2 >>> 0) {
              break label$55
             }
             $7 = HEAP32[($0 + 12 | 0) >> 2] | 0;
             if ($7 & 1 | 0) {
              break label$55
             }
             if (($7 >>> 1 | 0 | 0) == ($5 | 0)) {
              break label$51
             }
            }
            $0 = HEAP32[(0 + 1051792 | 0) >> 2] | 0;
            HEAP32[(0 + 1051792 | 0) >> 2] = $6 >>> 0 > $0 >>> 0 ? $0 : $6;
            $7 = $6 + $9 | 0;
            $0 = 1051476;
            label$61 : {
             label$62 : {
              label$63 : {
               label$64 : while (1) {
                $8 = HEAP32[$0 >> 2] | 0;
                if (($8 | 0) == ($7 | 0)) {
                 break label$63
                }
                $0 = HEAP32[($0 + 8 | 0) >> 2] | 0;
                if ($0) {
                 continue label$64
                }
                break label$62;
               };
              }
              $7 = HEAP32[($0 + 12 | 0) >> 2] | 0;
              if ($7 & 1 | 0) {
               break label$62
              }
              if (($7 >>> 1 | 0 | 0) == ($5 | 0)) {
               break label$61
              }
             }
             $0 = 1051476;
             label$65 : {
              label$66 : while (1) {
               label$67 : {
                $7 = HEAP32[$0 >> 2] | 0;
                if ($7 >>> 0 > $2 >>> 0) {
                 break label$67
                }
                $7 = $7 + (HEAP32[($0 + 4 | 0) >> 2] | 0) | 0;
                if ($2 >>> 0 < $7 >>> 0) {
                 break label$65
                }
               }
               $0 = HEAP32[($0 + 8 | 0) >> 2] | 0;
               continue label$66;
              };
             }
             $0 = ($6 + 15 | 0) & -8 | 0;
             $8 = $0 + -8 | 0;
             HEAP32[(0 + 1051776 | 0) >> 2] = $8;
             $693 = $6 - $0 | 0;
             $0 = $9 + -40 | 0;
             $4 = ($693 + $0 | 0) + 8 | 0;
             HEAP32[(0 + 1051768 | 0) >> 2] = $4;
             HEAP32[($8 + 4 | 0) >> 2] = $4 | 1 | 0;
             HEAP32[(($6 + $0 | 0) + 4 | 0) >> 2] = 40;
             HEAP32[(0 + 1051788 | 0) >> 2] = 2097152;
             $0 = (($7 + -32 | 0) & -8 | 0) + -8 | 0;
             $8 = $0 >>> 0 < ($2 + 16 | 0) >>> 0 ? $2 : $0;
             HEAP32[($8 + 4 | 0) >> 2] = 27;
             i64toi32_i32$2 = 0;
             i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 1051476 | 0) >> 2] | 0;
             i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 1051480 | 0) >> 2] | 0;
             $10 = i64toi32_i32$0;
             $10$hi = i64toi32_i32$1;
             i64toi32_i32$2 = 0;
             i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 1051484 | 0) >> 2] | 0;
             i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 1051488 | 0) >> 2] | 0;
             $721 = i64toi32_i32$1;
             i64toi32_i32$1 = $8 + 16 | 0;
             HEAP32[i64toi32_i32$1 >> 2] = $721;
             HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
             i64toi32_i32$0 = $10$hi;
             i64toi32_i32$1 = $8;
             HEAP32[($8 + 8 | 0) >> 2] = $10;
             HEAP32[($8 + 12 | 0) >> 2] = i64toi32_i32$0;
             HEAP32[(0 + 1051488 | 0) >> 2] = $5;
             HEAP32[(0 + 1051480 | 0) >> 2] = $9;
             HEAP32[(0 + 1051476 | 0) >> 2] = $6;
             HEAP32[(0 + 1051484 | 0) >> 2] = $8 + 8 | 0;
             $0 = $8 + 28 | 0;
             label$68 : while (1) {
              HEAP32[$0 >> 2] = 7;
              $0 = $0 + 4 | 0;
              if ($0 >>> 0 < $7 >>> 0) {
               continue label$68
              }
              break label$68;
             };
             if (($8 | 0) == ($2 | 0)) {
              break label$47
             }
             HEAP32[($8 + 4 | 0) >> 2] = (HEAP32[($8 + 4 | 0) >> 2] | 0) & -2 | 0;
             $0 = $8 - $2 | 0;
             HEAP32[($2 + 4 | 0) >> 2] = $0 | 1 | 0;
             HEAP32[$8 >> 2] = $0;
             label$69 : {
              if ($0 >>> 0 < 256 >>> 0) {
               break label$69
              }
              _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$18insert_large_chunk17h8e4702b854476b2fE($2 | 0, $0 | 0);
              break label$47;
             }
             $7 = ($0 & 248 | 0) + 1051492 | 0;
             label$70 : {
              label$71 : {
               $6 = HEAP32[(0 + 1051756 | 0) >> 2] | 0;
               $0 = 1 << ($0 >>> 3 | 0) | 0;
               if ($6 & $0 | 0) {
                break label$71
               }
               HEAP32[(0 + 1051756 | 0) >> 2] = $6 | $0 | 0;
               $0 = $7;
               break label$70;
              }
              $0 = HEAP32[($7 + 8 | 0) >> 2] | 0;
             }
             HEAP32[($7 + 8 | 0) >> 2] = $2;
             HEAP32[($0 + 12 | 0) >> 2] = $2;
             HEAP32[($2 + 12 | 0) >> 2] = $7;
             HEAP32[($2 + 8 | 0) >> 2] = $0;
             break label$47;
            }
            HEAP32[$0 >> 2] = $6;
            HEAP32[($0 + 4 | 0) >> 2] = (HEAP32[($0 + 4 | 0) >> 2] | 0) + $9 | 0;
            $7 = (($6 + 15 | 0) & -8 | 0) + -8 | 0;
            HEAP32[($7 + 4 | 0) >> 2] = $3 | 3 | 0;
            $2 = (($8 + 15 | 0) & -8 | 0) + -8 | 0;
            $0 = $7 + $3 | 0;
            $3 = $2 - $0 | 0;
            if (($2 | 0) == (HEAP32[(0 + 1051776 | 0) >> 2] | 0 | 0)) {
             break label$50
            }
            if (($2 | 0) == (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
             break label$49
            }
            label$72 : {
             $6 = HEAP32[($2 + 4 | 0) >> 2] | 0;
             if (($6 & 3 | 0 | 0) != (1 | 0)) {
              break label$72
             }
             $6 = $6 & -8 | 0;
             _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$12unlink_chunk17h20421146e3e4e9ccE($2 | 0, $6 | 0);
             $3 = $6 + $3 | 0;
             $2 = $2 + $6 | 0;
             $6 = HEAP32[($2 + 4 | 0) >> 2] | 0;
            }
            HEAP32[($2 + 4 | 0) >> 2] = $6 & -2 | 0;
            HEAP32[($0 + 4 | 0) >> 2] = $3 | 1 | 0;
            HEAP32[($0 + $3 | 0) >> 2] = $3;
            label$73 : {
             if ($3 >>> 0 < 256 >>> 0) {
              break label$73
             }
             _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$18insert_large_chunk17h8e4702b854476b2fE($0 | 0, $3 | 0);
             break label$48;
            }
            $2 = ($3 & 248 | 0) + 1051492 | 0;
            label$74 : {
             label$75 : {
              $6 = HEAP32[(0 + 1051756 | 0) >> 2] | 0;
              $3 = 1 << ($3 >>> 3 | 0) | 0;
              if ($6 & $3 | 0) {
               break label$75
              }
              HEAP32[(0 + 1051756 | 0) >> 2] = $6 | $3 | 0;
              $3 = $2;
              break label$74;
             }
             $3 = HEAP32[($2 + 8 | 0) >> 2] | 0;
            }
            HEAP32[($2 + 8 | 0) >> 2] = $0;
            HEAP32[($3 + 12 | 0) >> 2] = $0;
            HEAP32[($0 + 12 | 0) >> 2] = $2;
            HEAP32[($0 + 8 | 0) >> 2] = $3;
            break label$48;
           }
           $2 = $0 - $3 | 0;
           HEAP32[(0 + 1051768 | 0) >> 2] = $2;
           $0 = HEAP32[(0 + 1051776 | 0) >> 2] | 0;
           $7 = $0 + $3 | 0;
           HEAP32[(0 + 1051776 | 0) >> 2] = $7;
           HEAP32[($7 + 4 | 0) >> 2] = $2 | 1 | 0;
           HEAP32[($0 + 4 | 0) >> 2] = $3 | 3 | 0;
           $0 = $0 + 8 | 0;
           break label$1;
          }
          $2 = HEAP32[(0 + 1051772 | 0) >> 2] | 0;
          label$76 : {
           label$77 : {
            $7 = $0 - $3 | 0;
            if ($7 >>> 0 > 15 >>> 0) {
             break label$77
            }
            HEAP32[(0 + 1051772 | 0) >> 2] = 0;
            HEAP32[(0 + 1051764 | 0) >> 2] = 0;
            HEAP32[($2 + 4 | 0) >> 2] = $0 | 3 | 0;
            $0 = $2 + $0 | 0;
            HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | 0 | 1 | 0;
            break label$76;
           }
           HEAP32[(0 + 1051764 | 0) >> 2] = $7;
           $6 = $2 + $3 | 0;
           HEAP32[(0 + 1051772 | 0) >> 2] = $6;
           HEAP32[($6 + 4 | 0) >> 2] = $7 | 1 | 0;
           HEAP32[($2 + $0 | 0) >> 2] = $7;
           HEAP32[($2 + 4 | 0) >> 2] = $3 | 3 | 0;
          }
          $0 = $2 + 8 | 0;
          break label$1;
         }
         HEAP32[($0 + 4 | 0) >> 2] = $8 + $9 | 0;
         $0 = HEAP32[(0 + 1051776 | 0) >> 2] | 0;
         $2 = ($0 + 15 | 0) & -8 | 0;
         $7 = $2 + -8 | 0;
         HEAP32[(0 + 1051776 | 0) >> 2] = $7;
         $928 = $0 - $2 | 0;
         $2 = (HEAP32[(0 + 1051768 | 0) >> 2] | 0) + $9 | 0;
         $6 = ($928 + $2 | 0) + 8 | 0;
         HEAP32[(0 + 1051768 | 0) >> 2] = $6;
         HEAP32[($7 + 4 | 0) >> 2] = $6 | 1 | 0;
         HEAP32[(($0 + $2 | 0) + 4 | 0) >> 2] = 40;
         HEAP32[(0 + 1051788 | 0) >> 2] = 2097152;
         break label$47;
        }
        HEAP32[(0 + 1051776 | 0) >> 2] = $0;
        $3 = (HEAP32[(0 + 1051768 | 0) >> 2] | 0) + $3 | 0;
        HEAP32[(0 + 1051768 | 0) >> 2] = $3;
        HEAP32[($0 + 4 | 0) >> 2] = $3 | 1 | 0;
        break label$48;
       }
       HEAP32[(0 + 1051772 | 0) >> 2] = $0;
       $3 = (HEAP32[(0 + 1051764 | 0) >> 2] | 0) + $3 | 0;
       HEAP32[(0 + 1051764 | 0) >> 2] = $3;
       HEAP32[($0 + 4 | 0) >> 2] = $3 | 1 | 0;
       HEAP32[($0 + $3 | 0) >> 2] = $3;
      }
      $0 = $7 + 8 | 0;
      break label$1;
     }
     $0 = 0;
     $2 = HEAP32[(0 + 1051768 | 0) >> 2] | 0;
     if ($2 >>> 0 <= $3 >>> 0) {
      break label$1
     }
     $2 = $2 - $3 | 0;
     HEAP32[(0 + 1051768 | 0) >> 2] = $2;
     $0 = HEAP32[(0 + 1051776 | 0) >> 2] | 0;
     $7 = $0 + $3 | 0;
     HEAP32[(0 + 1051776 | 0) >> 2] = $7;
     HEAP32[($7 + 4 | 0) >> 2] = $2 | 1 | 0;
     HEAP32[($0 + 4 | 0) >> 2] = $3 | 3 | 0;
     $0 = $0 + 8 | 0;
     break label$1;
    }
    HEAP32[($0 + 24 | 0) >> 2] = $5;
    label$78 : {
     $6 = HEAP32[($7 + 16 | 0) >> 2] | 0;
     if (!$6) {
      break label$78
     }
     HEAP32[($0 + 16 | 0) >> 2] = $6;
     HEAP32[($6 + 24 | 0) >> 2] = $0;
    }
    $6 = HEAP32[($7 + 20 | 0) >> 2] | 0;
    if (!$6) {
     break label$2
    }
    HEAP32[($0 + 20 | 0) >> 2] = $6;
    HEAP32[($6 + 24 | 0) >> 2] = $0;
   }
   label$79 : {
    label$80 : {
     if ($2 >>> 0 < 16 >>> 0) {
      break label$80
     }
     HEAP32[($7 + 4 | 0) >> 2] = $3 | 3 | 0;
     $0 = $7 + $3 | 0;
     HEAP32[($0 + 4 | 0) >> 2] = $2 | 1 | 0;
     HEAP32[($0 + $2 | 0) >> 2] = $2;
     label$81 : {
      if ($2 >>> 0 < 256 >>> 0) {
       break label$81
      }
      _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$18insert_large_chunk17h8e4702b854476b2fE($0 | 0, $2 | 0);
      break label$79;
     }
     $3 = ($2 & 248 | 0) + 1051492 | 0;
     label$82 : {
      label$83 : {
       $6 = HEAP32[(0 + 1051756 | 0) >> 2] | 0;
       $2 = 1 << ($2 >>> 3 | 0) | 0;
       if ($6 & $2 | 0) {
        break label$83
       }
       HEAP32[(0 + 1051756 | 0) >> 2] = $6 | $2 | 0;
       $2 = $3;
       break label$82;
      }
      $2 = HEAP32[($3 + 8 | 0) >> 2] | 0;
     }
     HEAP32[($3 + 8 | 0) >> 2] = $0;
     HEAP32[($2 + 12 | 0) >> 2] = $0;
     HEAP32[($0 + 12 | 0) >> 2] = $3;
     HEAP32[($0 + 8 | 0) >> 2] = $2;
     break label$79;
    }
    $0 = $2 + $3 | 0;
    HEAP32[($7 + 4 | 0) >> 2] = $0 | 3 | 0;
    $0 = $7 + $0 | 0;
    HEAP32[($0 + 4 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | 0 | 1 | 0;
   }
   $0 = $7 + 8 | 0;
  }
  __stack_pointer = $1 + 16 | 0;
  return $0 | 0;
 }
 
 function _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$8memalign17h816986e35e0be861E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $4 = 0, $3 = 0, $5 = 0, $6 = 0;
  $2 = 0;
  label$1 : {
   $0 = $0 >>> 0 > 16 >>> 0 ? $0 : 16;
   if ((-65587 - $0 | 0) >>> 0 <= $1 >>> 0) {
    break label$1
   }
   $3 = $1 >>> 0 < 11 >>> 0 ? 16 : ($1 + 11 | 0) & -8 | 0;
   $1 = _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$6malloc17hd9c2c8577ef4c61dE(($0 + $3 | 0) + 12 | 0 | 0) | 0;
   if (!$1) {
    break label$1
   }
   $2 = $1 + -8 | 0;
   label$2 : {
    label$3 : {
     $4 = $0 + -1 | 0;
     if ($4 & $1 | 0) {
      break label$3
     }
     $0 = $2;
     break label$2;
    }
    $5 = $1 + -4 | 0;
    $6 = HEAP32[$5 >> 2] | 0;
    $1 = (($4 + $1 | 0) & (0 - $0 | 0) | 0) + -8 | 0;
    $0 = $1 + (($1 - $2 | 0) >>> 0 > 16 >>> 0 ? 0 : $0) | 0;
    $1 = $0 - $2 | 0;
    $4 = ($6 & -8 | 0) - $1 | 0;
    label$4 : {
     if (!($6 & 3 | 0)) {
      break label$4
     }
     HEAP32[($0 + 4 | 0) >> 2] = $4 | ((HEAP32[($0 + 4 | 0) >> 2] | 0) & 1 | 0) | 0 | 2 | 0;
     $4 = $0 + $4 | 0;
     HEAP32[($4 + 4 | 0) >> 2] = HEAP32[($4 + 4 | 0) >> 2] | 0 | 1 | 0;
     HEAP32[$5 >> 2] = $1 | ((HEAP32[$5 >> 2] | 0) & 1 | 0) | 0 | 2 | 0;
     $4 = $2 + $1 | 0;
     HEAP32[($4 + 4 | 0) >> 2] = HEAP32[($4 + 4 | 0) >> 2] | 0 | 1 | 0;
     _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$13dispose_chunk17hb68dd003b737d09cE($2 | 0, $1 | 0);
     break label$2;
    }
    $2 = HEAP32[$2 >> 2] | 0;
    HEAP32[($0 + 4 | 0) >> 2] = $4;
    HEAP32[$0 >> 2] = $2 + $1 | 0;
   }
   label$5 : {
    $1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
    if (!($1 & 3 | 0)) {
     break label$5
    }
    $2 = $1 & -8 | 0;
    if ($2 >>> 0 <= ($3 + 16 | 0) >>> 0) {
     break label$5
    }
    HEAP32[($0 + 4 | 0) >> 2] = $3 | ($1 & 1 | 0) | 0 | 2 | 0;
    $1 = $0 + $3 | 0;
    $3 = $2 - $3 | 0;
    HEAP32[($1 + 4 | 0) >> 2] = $3 | 3 | 0;
    $2 = $0 + $2 | 0;
    HEAP32[($2 + 4 | 0) >> 2] = HEAP32[($2 + 4 | 0) >> 2] | 0 | 1 | 0;
    _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$13dispose_chunk17hb68dd003b737d09cE($1 | 0, $3 | 0);
   }
   $2 = $0 + 8 | 0;
  }
  return $2 | 0;
 }
 
 function _ZN3std3sys9backtrace26__rust_end_short_backtrace17h64c5c3eeff5e218cE($0) {
  $0 = $0 | 0;
  _ZN3std9panicking19begin_panic_handler28_$u7b$$u7b$closure$u7d$$u7d$17hae7a24cfbe5dc9e9E($0 | 0);
  wasm2js_trap();
 }
 
 function _ZN3std9panicking19begin_panic_handler28_$u7b$$u7b$closure$u7d$$u7d$17hae7a24cfbe5dc9e9E($0) {
  $0 = $0 | 0;
  var $2 = 0, $1 = 0, $3 = 0, $24 = 0, $37 = 0;
  $1 = __stack_pointer - 16 | 0;
  __stack_pointer = $1;
  $2 = HEAP32[($0 + 12 | 0) >> 2] | 0;
  label$1 : {
   label$2 : {
    label$3 : {
     switch (HEAP32[($0 + 4 | 0) >> 2] | 0 | 0) {
     case 0:
      if ($2) {
       break label$2
      }
      $2 = 1;
      $3 = 0;
      break label$1;
     case 1:
      break label$3;
     default:
      break label$2;
     };
    }
    if ($2) {
     break label$2
    }
    $2 = HEAP32[$0 >> 2] | 0;
    $3 = HEAP32[($2 + 4 | 0) >> 2] | 0;
    $2 = HEAP32[$2 >> 2] | 0;
    break label$1;
   }
   HEAP32[$1 >> 2] = -2147483648;
   HEAP32[($1 + 12 | 0) >> 2] = $0;
   $24 = HEAP32[($0 + 24 | 0) >> 2] | 0;
   $0 = HEAP32[($0 + 28 | 0) >> 2] | 0;
   _ZN3std9panicking20rust_panic_with_hook17h142fb958becc9908E($1 | 0, 1048912 | 0, $24 | 0, HEAPU8[($0 + 28 | 0) >> 0] | 0 | 0, HEAPU8[($0 + 29 | 0) >> 0] | 0 | 0);
   wasm2js_trap();
  }
  HEAP32[($1 + 4 | 0) >> 2] = $3;
  HEAP32[$1 >> 2] = $2;
  $37 = HEAP32[($0 + 24 | 0) >> 2] | 0;
  $0 = HEAP32[($0 + 28 | 0) >> 2] | 0;
  _ZN3std9panicking20rust_panic_with_hook17h142fb958becc9908E($1 | 0, 1048884 | 0, $37 | 0, HEAPU8[($0 + 28 | 0) >> 0] | 0 | 0, HEAPU8[($0 + 29 | 0) >> 0] | 0 | 0);
  wasm2js_trap();
 }
 
 function _ZN3std5alloc24default_alloc_error_hook17h708687752e0edcfaE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$4 = 0, i64toi32_i32$3 = 0, $12 = 0, $13 = 0, $15$hi = 0, $18$hi = 0, $19 = 0;
  $2 = __stack_pointer - 48 | 0;
  __stack_pointer = $2;
  label$1 : {
   if (!(HEAPU8[(0 + 1051324 | 0) >> 0] | 0)) {
    break label$1
   }
   HEAP32[($2 + 12 | 0) >> 2] = 2;
   HEAP32[($2 + 8 | 0) >> 2] = 1048804;
   i64toi32_i32$1 = $2;
   i64toi32_i32$0 = 0;
   HEAP32[($2 + 20 | 0) >> 2] = 1;
   HEAP32[($2 + 24 | 0) >> 2] = i64toi32_i32$0;
   HEAP32[($2 + 44 | 0) >> 2] = $1;
   $13 = $2;
   i64toi32_i32$0 = 0;
   i64toi32_i32$2 = 1;
   i64toi32_i32$1 = 0;
   i64toi32_i32$3 = 32;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
    $12 = 0;
   } else {
    i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
    $12 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   }
   $15$hi = i64toi32_i32$1;
   i64toi32_i32$1 = 0;
   $18$hi = i64toi32_i32$1;
   i64toi32_i32$1 = $15$hi;
   i64toi32_i32$0 = $12;
   i64toi32_i32$2 = $18$hi;
   i64toi32_i32$3 = $2 + 44 | 0;
   i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
   $19 = i64toi32_i32$0 | i64toi32_i32$3 | 0;
   i64toi32_i32$0 = $13;
   HEAP32[(i64toi32_i32$0 + 32 | 0) >> 2] = $19;
   HEAP32[(i64toi32_i32$0 + 36 | 0) >> 2] = i64toi32_i32$2;
   HEAP32[($2 + 16 | 0) >> 2] = $2 + 32 | 0;
   _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($2 + 8 | 0 | 0, 1048836 | 0);
   wasm2js_trap();
  }
  __stack_pointer = $2 + 48 | 0;
 }
 
 function __rdl_alloc($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  label$1 : {
   if ($1 >>> 0 < 9 >>> 0) {
    break label$1
   }
   return _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$8memalign17h816986e35e0be861E($1 | 0, $0 | 0) | 0 | 0;
  }
  return _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$6malloc17hd9c2c8577ef4c61dE($0 | 0) | 0 | 0;
 }
 
 function __rdl_dealloc($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $4 = 0;
  label$1 : {
   label$2 : {
    $3 = HEAP32[($0 + -4 | 0) >> 2] | 0;
    $4 = $3 & -8 | 0;
    $3 = $3 & 3 | 0;
    if ($4 >>> 0 < (($3 ? 4 : 8) + $1 | 0) >>> 0) {
     break label$2
    }
    label$3 : {
     if (!$3) {
      break label$3
     }
     if ($4 >>> 0 > ($1 + 39 | 0) >>> 0) {
      break label$1
     }
    }
    _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$4free17hcade36dd23206a7bE($0 | 0);
    return;
   }
   _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1048641 | 0, 46 | 0, 1048688 | 0);
   wasm2js_trap();
  }
  _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1048704 | 0, 46 | 0, 1048752 | 0);
  wasm2js_trap();
 }
 
 function __rdl_realloc($0, $1, $2, $3) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  var $7 = 0, $5 = 0, $8 = 0, $4 = 0, $6 = 0, $9 = 0;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       $4 = $0 + -4 | 0;
       $5 = HEAP32[$4 >> 2] | 0;
       $6 = $5 & -8 | 0;
       $7 = $5 & 3 | 0;
       if ($6 >>> 0 < (($7 ? 4 : 8) + $1 | 0) >>> 0) {
        break label$5
       }
       $8 = $1 + 39 | 0;
       label$6 : {
        if (!$7) {
         break label$6
        }
        if ($6 >>> 0 > $8 >>> 0) {
         break label$4
        }
       }
       label$7 : {
        label$8 : {
         label$9 : {
          if ($2 >>> 0 < 9 >>> 0) {
           break label$9
          }
          $2 = _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$8memalign17h816986e35e0be861E($2 | 0, $3 | 0) | 0;
          if ($2) {
           break label$8
          }
          return 0 | 0;
         }
         $2 = 0;
         if ($3 >>> 0 > -65588 >>> 0) {
          break label$7
         }
         $1 = $3 >>> 0 < 11 >>> 0 ? 16 : ($3 + 11 | 0) & -8 | 0;
         label$10 : {
          label$11 : {
           if ($7) {
            break label$11
           }
           if ($1 >>> 0 < 256 >>> 0) {
            break label$10
           }
           if ($6 >>> 0 < ($1 | 4 | 0) >>> 0) {
            break label$10
           }
           if (($6 - $1 | 0) >>> 0 >= 131073 >>> 0) {
            break label$10
           }
           return $0 | 0;
          }
          $8 = $0 + -8 | 0;
          $7 = $8 + $6 | 0;
          label$12 : {
           label$13 : {
            label$14 : {
             label$15 : {
              label$16 : {
               if ($6 >>> 0 >= $1 >>> 0) {
                break label$16
               }
               if (($7 | 0) == (HEAP32[(0 + 1051776 | 0) >> 2] | 0 | 0)) {
                break label$12
               }
               if (($7 | 0) == (HEAP32[(0 + 1051772 | 0) >> 2] | 0 | 0)) {
                break label$14
               }
               $5 = HEAP32[($7 + 4 | 0) >> 2] | 0;
               if ($5 & 2 | 0) {
                break label$10
               }
               $9 = $5 & -8 | 0;
               $5 = $9 + $6 | 0;
               if ($5 >>> 0 < $1 >>> 0) {
                break label$10
               }
               _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$12unlink_chunk17h20421146e3e4e9ccE($7 | 0, $9 | 0);
               $3 = $5 - $1 | 0;
               if ($3 >>> 0 < 16 >>> 0) {
                break label$15
               }
               HEAP32[$4 >> 2] = $1 | ((HEAP32[$4 >> 2] | 0) & 1 | 0) | 0 | 2 | 0;
               $1 = $8 + $1 | 0;
               HEAP32[($1 + 4 | 0) >> 2] = $3 | 3 | 0;
               $2 = $8 + $5 | 0;
               HEAP32[($2 + 4 | 0) >> 2] = HEAP32[($2 + 4 | 0) >> 2] | 0 | 1 | 0;
               _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$13dispose_chunk17hb68dd003b737d09cE($1 | 0, $3 | 0);
               return $0 | 0;
              }
              $3 = $6 - $1 | 0;
              if ($3 >>> 0 > 15 >>> 0) {
               break label$13
              }
              return $0 | 0;
             }
             HEAP32[$4 >> 2] = $5 | ((HEAP32[$4 >> 2] | 0) & 1 | 0) | 0 | 2 | 0;
             $1 = $8 + $5 | 0;
             HEAP32[($1 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2] | 0 | 1 | 0;
             return $0 | 0;
            }
            $7 = (HEAP32[(0 + 1051764 | 0) >> 2] | 0) + $6 | 0;
            if ($7 >>> 0 < $1 >>> 0) {
             break label$10
            }
            label$17 : {
             label$18 : {
              $3 = $7 - $1 | 0;
              if ($3 >>> 0 > 15 >>> 0) {
               break label$18
              }
              HEAP32[$4 >> 2] = $5 & 1 | 0 | $7 | 0 | 2 | 0;
              $1 = $8 + $7 | 0;
              HEAP32[($1 + 4 | 0) >> 2] = HEAP32[($1 + 4 | 0) >> 2] | 0 | 1 | 0;
              $3 = 0;
              $1 = 0;
              break label$17;
             }
             HEAP32[$4 >> 2] = $1 | ($5 & 1 | 0) | 0 | 2 | 0;
             $1 = $8 + $1 | 0;
             HEAP32[($1 + 4 | 0) >> 2] = $3 | 1 | 0;
             $2 = $8 + $7 | 0;
             HEAP32[$2 >> 2] = $3;
             HEAP32[($2 + 4 | 0) >> 2] = (HEAP32[($2 + 4 | 0) >> 2] | 0) & -2 | 0;
            }
            HEAP32[(0 + 1051772 | 0) >> 2] = $1;
            HEAP32[(0 + 1051764 | 0) >> 2] = $3;
            return $0 | 0;
           }
           HEAP32[$4 >> 2] = $1 | ($5 & 1 | 0) | 0 | 2 | 0;
           $1 = $8 + $1 | 0;
           HEAP32[($1 + 4 | 0) >> 2] = $3 | 3 | 0;
           HEAP32[($7 + 4 | 0) >> 2] = HEAP32[($7 + 4 | 0) >> 2] | 0 | 1 | 0;
           _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$13dispose_chunk17hb68dd003b737d09cE($1 | 0, $3 | 0);
           return $0 | 0;
          }
          $7 = (HEAP32[(0 + 1051768 | 0) >> 2] | 0) + $6 | 0;
          if ($7 >>> 0 > $1 >>> 0) {
           break label$1
          }
         }
         $1 = _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$6malloc17hd9c2c8577ef4c61dE($3 | 0) | 0;
         if (!$1) {
          break label$7
         }
         $2 = HEAP32[$4 >> 2] | 0;
         $2 = ($2 & 3 | 0 ? -4 : -8) + ($2 & -8 | 0) | 0;
         $1 = memcpy($1 | 0, $0 | 0, ($2 >>> 0 < $3 >>> 0 ? $2 : $3) | 0) | 0;
         _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$4free17hcade36dd23206a7bE($0 | 0);
         return $1 | 0;
        }
        memcpy($2 | 0, $0 | 0, ($1 >>> 0 < $3 >>> 0 ? $1 : $3) | 0) | 0;
        $3 = HEAP32[$4 >> 2] | 0;
        $7 = $3 & -8 | 0;
        $3 = $3 & 3 | 0;
        if ($7 >>> 0 < (($3 ? 4 : 8) + $1 | 0) >>> 0) {
         break label$3
        }
        label$19 : {
         if (!$3) {
          break label$19
         }
         if ($7 >>> 0 > $8 >>> 0) {
          break label$2
         }
        }
        _ZN8dlmalloc8dlmalloc17Dlmalloc$LT$A$GT$4free17hcade36dd23206a7bE($0 | 0);
       }
       return $2 | 0;
      }
      _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1048641 | 0, 46 | 0, 1048688 | 0);
      wasm2js_trap();
     }
     _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1048704 | 0, 46 | 0, 1048752 | 0);
     wasm2js_trap();
    }
    _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1048641 | 0, 46 | 0, 1048688 | 0);
    wasm2js_trap();
   }
   _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1048704 | 0, 46 | 0, 1048752 | 0);
   wasm2js_trap();
  }
  HEAP32[$4 >> 2] = $1 | ($5 & 1 | 0) | 0 | 2 | 0;
  $3 = $8 + $1 | 0;
  $1 = $7 - $1 | 0;
  HEAP32[($3 + 4 | 0) >> 2] = $1 | 1 | 0;
  HEAP32[(0 + 1051768 | 0) >> 2] = $1;
  HEAP32[(0 + 1051776 | 0) >> 2] = $3;
  return $0 | 0;
 }
 
 function rust_begin_unwind($0) {
  $0 = $0 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$1 = 0, $1 = 0, $2 = 0, $12 = 0, $17 = 0, $24 = 0;
  $1 = __stack_pointer - 32 | 0;
  __stack_pointer = $1;
  $2 = HEAP32[($0 + 24 | 0) >> 2] | 0;
  i64toi32_i32$2 = $0 + 16 | 0;
  i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
  $12 = i64toi32_i32$0;
  i64toi32_i32$0 = $1 + 16 | 0;
  HEAP32[i64toi32_i32$0 >> 2] = $12;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
  i64toi32_i32$2 = $0 + 8 | 0;
  i64toi32_i32$1 = HEAP32[i64toi32_i32$2 >> 2] | 0;
  i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
  $17 = i64toi32_i32$1;
  i64toi32_i32$1 = $1 + 8 | 0;
  HEAP32[i64toi32_i32$1 >> 2] = $17;
  HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
  HEAP32[($1 + 28 | 0) >> 2] = $0;
  HEAP32[($1 + 24 | 0) >> 2] = $2;
  i64toi32_i32$2 = $0;
  i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
  $24 = i64toi32_i32$0;
  i64toi32_i32$0 = $1;
  HEAP32[i64toi32_i32$0 >> 2] = $24;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
  _ZN3std3sys9backtrace26__rust_end_short_backtrace17h64c5c3eeff5e218cE(i64toi32_i32$0 | 0);
  wasm2js_trap();
 }
 
 function _ZN102_$LT$std__panicking__begin_panic_handler__FormatStringPayload$u20$as$u20$core__panic__PanicPayload$GT$8take_box17hfdafd7cd188838afE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$2 = 0, $2 = 0, $3 = 0, $5 = 0, $4 = 0, $5$hi = 0, $24 = 0, $30 = 0, $33 = 0, $73 = 0;
  $2 = __stack_pointer - 64 | 0;
  __stack_pointer = $2;
  label$1 : {
   if ((HEAP32[$1 >> 2] | 0 | 0) != (-2147483648 | 0)) {
    break label$1
   }
   $3 = HEAP32[($1 + 12 | 0) >> 2] | 0;
   $4 = ($2 + 28 | 0) + 8 | 0;
   HEAP32[$4 >> 2] = 0;
   i64toi32_i32$1 = $2;
   i64toi32_i32$0 = 1;
   HEAP32[(i64toi32_i32$1 + 28 | 0) >> 2] = 0;
   HEAP32[(i64toi32_i32$1 + 32 | 0) >> 2] = i64toi32_i32$0;
   i64toi32_i32$2 = $3 + 16 | 0;
   i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
   i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
   $24 = i64toi32_i32$0;
   i64toi32_i32$0 = ($2 + 40 | 0) + 16 | 0;
   HEAP32[i64toi32_i32$0 >> 2] = $24;
   HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
   i64toi32_i32$2 = $3 + 8 | 0;
   i64toi32_i32$1 = HEAP32[i64toi32_i32$2 >> 2] | 0;
   i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
   $30 = i64toi32_i32$1;
   i64toi32_i32$1 = ($2 + 40 | 0) + 8 | 0;
   HEAP32[i64toi32_i32$1 >> 2] = $30;
   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
   i64toi32_i32$2 = $3;
   i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
   i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
   $33 = i64toi32_i32$0;
   i64toi32_i32$0 = $2;
   HEAP32[(i64toi32_i32$0 + 40 | 0) >> 2] = $33;
   HEAP32[(i64toi32_i32$0 + 44 | 0) >> 2] = i64toi32_i32$1;
   _ZN4core3fmt5write17hd273a061a774381dE(i64toi32_i32$0 + 28 | 0 | 0, 1048576 | 0, i64toi32_i32$0 + 40 | 0 | 0) | 0;
   $3 = HEAP32[$4 >> 2] | 0;
   HEAP32[((i64toi32_i32$0 + 16 | 0) + 8 | 0) >> 2] = $3;
   i64toi32_i32$2 = i64toi32_i32$0;
   i64toi32_i32$1 = HEAP32[(i64toi32_i32$0 + 28 | 0) >> 2] | 0;
   i64toi32_i32$0 = HEAP32[(i64toi32_i32$0 + 32 | 0) >> 2] | 0;
   $5 = i64toi32_i32$1;
   $5$hi = i64toi32_i32$0;
   i64toi32_i32$1 = $2;
   HEAP32[(i64toi32_i32$1 + 16 | 0) >> 2] = $5;
   HEAP32[(i64toi32_i32$1 + 20 | 0) >> 2] = i64toi32_i32$0;
   HEAP32[($1 + 8 | 0) >> 2] = $3;
   i64toi32_i32$1 = $1;
   HEAP32[i64toi32_i32$1 >> 2] = $5;
   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
  }
  i64toi32_i32$2 = $1;
  i64toi32_i32$0 = HEAP32[$1 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[($1 + 4 | 0) >> 2] | 0;
  $5 = i64toi32_i32$0;
  $5$hi = i64toi32_i32$1;
  i64toi32_i32$0 = $1;
  i64toi32_i32$1 = 1;
  HEAP32[i64toi32_i32$0 >> 2] = 0;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
  $3 = $2 + 8 | 0;
  $1 = i64toi32_i32$0 + 8 | 0;
  HEAP32[$3 >> 2] = HEAP32[$1 >> 2] | 0;
  HEAP32[$1 >> 2] = 0;
  HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
  i64toi32_i32$1 = $5$hi;
  i64toi32_i32$0 = $2;
  HEAP32[i64toi32_i32$0 >> 2] = $5;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
  label$2 : {
   $1 = __rust_alloc(12 | 0, 4 | 0) | 0;
   if (!$1) {
    break label$2
   }
   i64toi32_i32$2 = i64toi32_i32$0;
   i64toi32_i32$1 = HEAP32[i64toi32_i32$0 >> 2] | 0;
   i64toi32_i32$0 = HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] | 0;
   $73 = i64toi32_i32$1;
   i64toi32_i32$1 = $1;
   HEAP32[i64toi32_i32$1 >> 2] = $73;
   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
   HEAP32[(i64toi32_i32$1 + 8 | 0) >> 2] = HEAP32[$3 >> 2] | 0;
   HEAP32[($0 + 4 | 0) >> 2] = 1048852;
   HEAP32[$0 >> 2] = i64toi32_i32$1;
   __stack_pointer = $2 + 64 | 0;
   return;
  }
  _ZN5alloc5alloc18handle_alloc_error17h123ae56be4092711E(4 | 0, 12 | 0);
  wasm2js_trap();
 }
 
 function _ZN102_$LT$std__panicking__begin_panic_handler__FormatStringPayload$u20$as$u20$core__panic__PanicPayload$GT$3get17h3875705a18b9af03E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$2 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $24 = 0, $30 = 0, $33 = 0;
  $2 = __stack_pointer - 48 | 0;
  __stack_pointer = $2;
  label$1 : {
   if ((HEAP32[$1 >> 2] | 0 | 0) != (-2147483648 | 0)) {
    break label$1
   }
   $3 = HEAP32[($1 + 12 | 0) >> 2] | 0;
   $4 = ($2 + 12 | 0) + 8 | 0;
   HEAP32[$4 >> 2] = 0;
   i64toi32_i32$1 = $2;
   i64toi32_i32$0 = 1;
   HEAP32[(i64toi32_i32$1 + 12 | 0) >> 2] = 0;
   HEAP32[(i64toi32_i32$1 + 16 | 0) >> 2] = i64toi32_i32$0;
   i64toi32_i32$2 = $3 + 16 | 0;
   i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
   i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
   $24 = i64toi32_i32$0;
   i64toi32_i32$0 = ($2 + 24 | 0) + 16 | 0;
   HEAP32[i64toi32_i32$0 >> 2] = $24;
   HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
   i64toi32_i32$2 = $3 + 8 | 0;
   i64toi32_i32$1 = HEAP32[i64toi32_i32$2 >> 2] | 0;
   i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
   $30 = i64toi32_i32$1;
   i64toi32_i32$1 = ($2 + 24 | 0) + 8 | 0;
   HEAP32[i64toi32_i32$1 >> 2] = $30;
   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
   i64toi32_i32$2 = $3;
   i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
   i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
   $33 = i64toi32_i32$0;
   i64toi32_i32$0 = $2;
   HEAP32[(i64toi32_i32$0 + 24 | 0) >> 2] = $33;
   HEAP32[(i64toi32_i32$0 + 28 | 0) >> 2] = i64toi32_i32$1;
   _ZN4core3fmt5write17hd273a061a774381dE(i64toi32_i32$0 + 12 | 0 | 0, 1048576 | 0, i64toi32_i32$0 + 24 | 0 | 0) | 0;
   $3 = HEAP32[$4 >> 2] | 0;
   HEAP32[(i64toi32_i32$0 + 8 | 0) >> 2] = $3;
   i64toi32_i32$2 = i64toi32_i32$0;
   i64toi32_i32$1 = HEAP32[(i64toi32_i32$0 + 12 | 0) >> 2] | 0;
   i64toi32_i32$0 = HEAP32[(i64toi32_i32$0 + 16 | 0) >> 2] | 0;
   $5 = i64toi32_i32$1;
   i64toi32_i32$1 = $2;
   HEAP32[i64toi32_i32$1 >> 2] = $5;
   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
   HEAP32[($1 + 8 | 0) >> 2] = $3;
   i64toi32_i32$1 = $1;
   HEAP32[i64toi32_i32$1 >> 2] = $5;
   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
  }
  HEAP32[($0 + 4 | 0) >> 2] = 1048852;
  HEAP32[$0 >> 2] = $1;
  __stack_pointer = $2 + 48 | 0;
 }
 
 function _ZN95_$LT$std__panicking__begin_panic_handler__FormatStringPayload$u20$as$u20$core__fmt__Display$GT$3fmt17h778dceefa8ea4afeE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$2 = 0, $2 = 0, $22 = 0, $28 = 0, $31 = 0;
  $2 = __stack_pointer - 32 | 0;
  __stack_pointer = $2;
  label$1 : {
   label$2 : {
    if ((HEAP32[$0 >> 2] | 0 | 0) == (-2147483648 | 0)) {
     break label$2
    }
    $0 = _ZN4core3fmt9Formatter9write_str17h7b04ca2eef2f5010E($1 | 0, HEAP32[($0 + 4 | 0) >> 2] | 0 | 0, HEAP32[($0 + 8 | 0) >> 2] | 0 | 0) | 0;
    break label$1;
   }
   $0 = HEAP32[($0 + 12 | 0) >> 2] | 0;
   i64toi32_i32$2 = $0 + 16 | 0;
   i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
   i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
   $22 = i64toi32_i32$0;
   i64toi32_i32$0 = ($2 + 8 | 0) + 16 | 0;
   HEAP32[i64toi32_i32$0 >> 2] = $22;
   HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
   i64toi32_i32$2 = $0 + 8 | 0;
   i64toi32_i32$1 = HEAP32[i64toi32_i32$2 >> 2] | 0;
   i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
   $28 = i64toi32_i32$1;
   i64toi32_i32$1 = ($2 + 8 | 0) + 8 | 0;
   HEAP32[i64toi32_i32$1 >> 2] = $28;
   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
   i64toi32_i32$2 = $0;
   i64toi32_i32$0 = HEAP32[$0 >> 2] | 0;
   i64toi32_i32$1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
   $31 = i64toi32_i32$0;
   i64toi32_i32$0 = $2;
   HEAP32[(i64toi32_i32$0 + 8 | 0) >> 2] = $31;
   HEAP32[(i64toi32_i32$0 + 12 | 0) >> 2] = i64toi32_i32$1;
   $0 = _ZN4core3fmt5write17hd273a061a774381dE(HEAP32[($1 + 20 | 0) >> 2] | 0 | 0, HEAP32[($1 + 24 | 0) >> 2] | 0 | 0, i64toi32_i32$0 + 8 | 0 | 0) | 0;
  }
  __stack_pointer = $2 + 32 | 0;
  return $0 | 0;
 }
 
 function _ZN99_$LT$std__panicking__begin_panic_handler__StaticStrPayload$u20$as$u20$core__panic__PanicPayload$GT$8take_box17hdbb807c1367ee940E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0;
  HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
  $2 = HEAP32[($1 + 4 | 0) >> 2] | 0;
  $3 = HEAP32[$1 >> 2] | 0;
  label$1 : {
   $1 = __rust_alloc(8 | 0, 4 | 0) | 0;
   if (!$1) {
    break label$1
   }
   HEAP32[($1 + 4 | 0) >> 2] = $2;
   HEAP32[$1 >> 2] = $3;
   HEAP32[($0 + 4 | 0) >> 2] = 1048868;
   HEAP32[$0 >> 2] = $1;
   return;
  }
  _ZN5alloc5alloc18handle_alloc_error17h123ae56be4092711E(4 | 0, 8 | 0);
  wasm2js_trap();
 }
 
 function _ZN99_$LT$std__panicking__begin_panic_handler__StaticStrPayload$u20$as$u20$core__panic__PanicPayload$GT$3get17hd2f9ef478e42b077E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  HEAP32[($0 + 4 | 0) >> 2] = 1048868;
  HEAP32[$0 >> 2] = $1;
 }
 
 function _ZN99_$LT$std__panicking__begin_panic_handler__StaticStrPayload$u20$as$u20$core__panic__PanicPayload$GT$6as_str17h231eb7cfbc685441E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$1 = 0, $4 = 0;
  i64toi32_i32$2 = $1;
  i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
  $4 = i64toi32_i32$0;
  i64toi32_i32$0 = $0;
  HEAP32[i64toi32_i32$0 >> 2] = $4;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
 }
 
 function _ZN92_$LT$std__panicking__begin_panic_handler__StaticStrPayload$u20$as$u20$core__fmt__Display$GT$3fmt17h7d6d1d4c62b643baE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return _ZN4core3fmt9Formatter9write_str17h7b04ca2eef2f5010E($1 | 0, HEAP32[$0 >> 2] | 0 | 0, HEAP32[($0 + 4 | 0) >> 2] | 0 | 0) | 0 | 0;
 }
 
 function _ZN3std9panicking20rust_panic_with_hook17h142fb958becc9908E($0, $1, $2, $3, $4) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  $4 = $4 | 0;
  var $5 = 0, $6 = 0, i64toi32_i32$1 = 0;
  $5 = __stack_pointer - 32 | 0;
  __stack_pointer = $5;
  $6 = HEAP32[(0 + 1051344 | 0) >> 2] | 0;
  HEAP32[(0 + 1051344 | 0) >> 2] = $6 + 1 | 0;
  label$1 : {
   label$2 : {
    if (($6 | 0) < (0 | 0)) {
     break label$2
    }
    if (HEAPU8[(0 + 1051804 | 0) >> 0] | 0) {
     break label$1
    }
    HEAP8[(0 + 1051804 | 0) >> 0] = 1;
    HEAP32[(0 + 1051800 | 0) >> 2] = (HEAP32[(0 + 1051800 | 0) >> 2] | 0) + 1 | 0;
    $6 = HEAP32[(0 + 1051332 | 0) >> 2] | 0;
    if (($6 | 0) <= (-1 | 0)) {
     break label$2
    }
    HEAP32[(0 + 1051332 | 0) >> 2] = $6 + 1 | 0;
    label$3 : {
     if (!(HEAP32[(0 + 1051336 | 0) >> 2] | 0)) {
      break label$3
     }
     FUNCTION_TABLE[HEAP32[($1 + 20 | 0) >> 2] | 0 | 0]($5 + 8 | 0, $0);
     HEAP8[($5 + 29 | 0) >> 0] = $4;
     HEAP8[($5 + 28 | 0) >> 0] = $3;
     HEAP32[($5 + 24 | 0) >> 2] = $2;
     i64toi32_i32$1 = HEAP32[($5 + 12 | 0) >> 2] | 0;
     HEAP32[($5 + 16 | 0) >> 2] = HEAP32[($5 + 8 | 0) >> 2] | 0;
     HEAP32[($5 + 20 | 0) >> 2] = i64toi32_i32$1;
     FUNCTION_TABLE[HEAP32[((HEAP32[(0 + 1051340 | 0) >> 2] | 0) + 20 | 0) >> 2] | 0 | 0](HEAP32[(0 + 1051336 | 0) >> 2] | 0, $5 + 16 | 0);
     $6 = (HEAP32[(0 + 1051332 | 0) >> 2] | 0) + -1 | 0;
    }
    HEAP32[(0 + 1051332 | 0) >> 2] = $6;
    HEAP8[(0 + 1051804 | 0) >> 0] = 0;
    if (!$3) {
     break label$2
    }
    rust_panic($0 | 0, $1 | 0);
   }
   wasm2js_trap();
  }
  FUNCTION_TABLE[HEAP32[($1 + 24 | 0) >> 2] | 0 | 0]($5, $0);
  wasm2js_trap();
 }
 
 function rust_panic($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  __rust_start_panic($0 | 0, $1 | 0) | 0;
  wasm2js_trap();
 }
 
 function __rg_oom($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0;
  $2 = HEAP32[(0 + 1051328 | 0) >> 2] | 0;
  FUNCTION_TABLE[($2 ? $2 : 2) | 0]($1, $0);
  wasm2js_trap();
 }
 
 function __rust_start_panic($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  wasm2js_trap();
 }
 
 function _ZN61_$LT$dlmalloc__sys__System$u20$as$u20$dlmalloc__Allocator$GT$5alloc17hb2750b8aaf9916efE($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $10 = 0;
  $3 = __wasm_memory_grow($2 >>> 16 | 0 | 0);
  HEAP32[($0 + 8 | 0) >> 2] = 0;
  $10 = $2 & -65536 | 0;
  $2 = ($3 | 0) == (-1 | 0);
  HEAP32[($0 + 4 | 0) >> 2] = $2 ? 0 : $10;
  HEAP32[$0 >> 2] = $2 ? 0 : $3 << 16 | 0;
 }
 
 function _ZN4core3fmt5Write9write_fmt17h12c6d34f0ecf8d3dE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return _ZN4core3fmt5write17hd273a061a774381dE($0 | 0, 1048948 | 0, $1 | 0) | 0 | 0;
 }
 
 function _ZN4core3ptr42drop_in_place$LT$alloc__string__String$GT$17h0f9d5bab53e46359E($0) {
  $0 = $0 | 0;
  var $1 = 0;
  label$1 : {
   $1 = HEAP32[$0 >> 2] | 0;
   if (!$1) {
    break label$1
   }
   __rust_dealloc(HEAP32[($0 + 4 | 0) >> 2] | 0 | 0, $1 | 0, 1 | 0);
  }
 }
 
 function _ZN53_$LT$core__fmt__Error$u20$as$u20$core__fmt__Debug$GT$3fmt17hc7b9dec108bfb98cE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return _ZN4core3fmt9Formatter9write_str17h7b04ca2eef2f5010E($1 | 0, 1048940 | 0, 5 | 0) | 0 | 0;
 }
 
 function _ZN5alloc7raw_vec17capacity_overflow17hf270d28094a4efafE() {
  var $0 = 0;
  $0 = __stack_pointer - 32 | 0;
  __stack_pointer = $0;
  HEAP32[($0 + 24 | 0) >> 2] = 0;
  HEAP32[($0 + 12 | 0) >> 2] = 1;
  HEAP32[($0 + 8 | 0) >> 2] = 1048992;
  HEAP32[($0 + 16 | 0) >> 2] = 4;
  HEAP32[($0 + 20 | 0) >> 2] = 0;
  _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($0 + 8 | 0 | 0, 1049020 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$7reserve21do_reserve_and_handle17h1929fa6bfa2184fdE($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $4 = 0;
  $3 = __stack_pointer - 32 | 0;
  __stack_pointer = $3;
  label$1 : {
   $2 = $1 + $2 | 0;
   if ($2 >>> 0 >= $1 >>> 0) {
    break label$1
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(0 | 0, 0 | 0);
   wasm2js_trap();
  }
  $4 = HEAP32[$0 >> 2] | 0;
  $1 = $4 << 1 | 0;
  $1 = $1 >>> 0 > $2 >>> 0 ? $1 : $2;
  $1 = $1 >>> 0 > 8 >>> 0 ? $1 : 8;
  $2 = ($1 ^ -1 | 0) >>> 31 | 0;
  label$2 : {
   label$3 : {
    if ($4) {
     break label$3
    }
    $4 = 0;
    break label$2;
   }
   HEAP32[($3 + 28 | 0) >> 2] = $4;
   HEAP32[($3 + 20 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | 0;
   $4 = 1;
  }
  HEAP32[($3 + 24 | 0) >> 2] = $4;
  _ZN5alloc7raw_vec11finish_grow17h7b9ce5ade3738748E($3 + 8 | 0 | 0, $2 | 0, $1 | 0, $3 + 20 | 0 | 0);
  label$4 : {
   if ((HEAP32[($3 + 8 | 0) >> 2] | 0 | 0) != (1 | 0)) {
    break label$4
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(HEAP32[($3 + 12 | 0) >> 2] | 0 | 0, HEAP32[($3 + 16 | 0) >> 2] | 0 | 0);
   wasm2js_trap();
  }
  $2 = HEAP32[($3 + 12 | 0) >> 2] | 0;
  HEAP32[$0 >> 2] = $1;
  HEAP32[($0 + 4 | 0) >> 2] = $2;
  __stack_pointer = $3 + 32 | 0;
 }
 
 function _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  label$1 : {
   if ($0) {
    break label$1
   }
   _ZN5alloc7raw_vec17capacity_overflow17hf270d28094a4efafE();
   wasm2js_trap();
  }
  _ZN5alloc5alloc18handle_alloc_error17h123ae56be4092711E($0 | 0, $1 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc7raw_vec11finish_grow17h7b9ce5ade3738748E($0, $1, $2, $3) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  var $4 = 0, $5 = 0, $6 = 0;
  $4 = 1;
  $5 = 0;
  $6 = 4;
  label$1 : {
   if (!$1) {
    break label$1
   }
   if (($2 | 0) < (0 | 0)) {
    break label$1
   }
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        if (!(HEAP32[($3 + 4 | 0) >> 2] | 0)) {
         break label$6
        }
        label$7 : {
         $4 = HEAP32[($3 + 8 | 0) >> 2] | 0;
         if ($4) {
          break label$7
         }
         label$8 : {
          if ($2) {
           break label$8
          }
          $4 = 1;
          break label$4;
         }
         HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
         $4 = __rust_alloc($2 | 0, 1 | 0) | 0;
         break label$5;
        }
        $4 = __rust_realloc(HEAP32[$3 >> 2] | 0 | 0, $4 | 0, 1 | 0, $2 | 0) | 0;
        break label$5;
       }
       label$9 : {
        if ($2) {
         break label$9
        }
        $4 = 1;
        break label$4;
       }
       HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
       $4 = __rust_alloc($2 | 0, 1 | 0) | 0;
      }
      if (!$4) {
       break label$3
      }
     }
     HEAP32[($0 + 4 | 0) >> 2] = $4;
     $4 = 0;
     break label$2;
    }
    $4 = 1;
    HEAP32[($0 + 4 | 0) >> 2] = 1;
   }
   $6 = 8;
   $5 = $2;
  }
  HEAP32[($0 + $6 | 0) >> 2] = $5;
  HEAP32[$0 >> 2] = $4;
 }
 
 function _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$8grow_one17h1fc259ca8e381992E($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0, $3 = 0, $4 = 0;
  $1 = __stack_pointer - 32 | 0;
  __stack_pointer = $1;
  label$1 : {
   $2 = HEAP32[$0 >> 2] | 0;
   if (($2 | 0) != (-1 | 0)) {
    break label$1
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(0 | 0, 0 | 0);
   wasm2js_trap();
  }
  $3 = $2 << 1 | 0;
  $4 = $2 + 1 | 0;
  $3 = $3 >>> 0 > $4 >>> 0 ? $3 : $4;
  $3 = $3 >>> 0 > 8 >>> 0 ? $3 : 8;
  $4 = ($3 ^ -1 | 0) >>> 31 | 0;
  label$2 : {
   label$3 : {
    if ($2) {
     break label$3
    }
    $2 = 0;
    break label$2;
   }
   HEAP32[($1 + 28 | 0) >> 2] = $2;
   HEAP32[($1 + 20 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | 0;
   $2 = 1;
  }
  HEAP32[($1 + 24 | 0) >> 2] = $2;
  _ZN5alloc7raw_vec11finish_grow17h7b9ce5ade3738748E($1 + 8 | 0 | 0, $4 | 0, $3 | 0, $1 + 20 | 0 | 0);
  label$4 : {
   if ((HEAP32[($1 + 8 | 0) >> 2] | 0 | 0) != (1 | 0)) {
    break label$4
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(HEAP32[($1 + 12 | 0) >> 2] | 0 | 0, HEAP32[($1 + 16 | 0) >> 2] | 0 | 0);
   wasm2js_trap();
  }
  $2 = HEAP32[($1 + 12 | 0) >> 2] | 0;
  HEAP32[$0 >> 2] = $3;
  HEAP32[($0 + 4 | 0) >> 2] = $2;
  __stack_pointer = $1 + 32 | 0;
 }
 
 function _ZN5alloc5alloc18handle_alloc_error17h123ae56be4092711E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  __rust_alloc_error_handler($1 | 0, $0 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc3fmt6format12format_inner17hfada08777d0a48e9E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $3 = 0, $7 = 0, $2 = 0, $5 = 0, $6 = 0, i64toi32_i32$0 = 0, $4 = 0, $8 = 0, i64toi32_i32$1 = 0, $101 = 0;
  $2 = __stack_pointer - 16 | 0;
  __stack_pointer = $2;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       $3 = HEAP32[($1 + 4 | 0) >> 2] | 0;
       if (!$3) {
        break label$5
       }
       $4 = HEAP32[$1 >> 2] | 0;
       $5 = $3 & 3 | 0;
       label$6 : {
        label$7 : {
         if ($3 >>> 0 >= 4 >>> 0) {
          break label$7
         }
         $3 = 0;
         $6 = 0;
         break label$6;
        }
        $7 = $4 + 28 | 0;
        $8 = $3 & -4 | 0;
        $3 = 0;
        $6 = 0;
        label$8 : while (1) {
         $3 = (HEAP32[$7 >> 2] | 0) + ((HEAP32[($7 + -8 | 0) >> 2] | 0) + ((HEAP32[($7 + -16 | 0) >> 2] | 0) + ((HEAP32[($7 + -24 | 0) >> 2] | 0) + $3 | 0) | 0) | 0) | 0;
         $7 = $7 + 32 | 0;
         $6 = $6 + 4 | 0;
         if (($8 | 0) != ($6 | 0)) {
          continue label$8
         }
         break label$8;
        };
       }
       label$9 : {
        if (!$5) {
         break label$9
        }
        $7 = (($6 << 3 | 0) + $4 | 0) + 4 | 0;
        label$10 : while (1) {
         $3 = (HEAP32[$7 >> 2] | 0) + $3 | 0;
         $7 = $7 + 8 | 0;
         $5 = $5 + -1 | 0;
         if ($5) {
          continue label$10
         }
         break label$10;
        };
       }
       label$11 : {
        if (!(HEAP32[($1 + 12 | 0) >> 2] | 0)) {
         break label$11
        }
        if (($3 | 0) < (0 | 0)) {
         break label$5
        }
        if ($3 >>> 0 < 16 >>> 0 & !(HEAP32[($4 + 4 | 0) >> 2] | 0) | 0) {
         break label$5
        }
        $3 = $3 << 1 | 0;
       }
       if ($3) {
        break label$4
       }
      }
      $7 = 1;
      $3 = 0;
      break label$3;
     }
     $5 = 0;
     if (($3 | 0) < (0 | 0)) {
      break label$2
     }
     HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
     $5 = 1;
     $7 = __rust_alloc($3 | 0, 1 | 0) | 0;
     if (!$7) {
      break label$2
     }
    }
    HEAP32[($2 + 8 | 0) >> 2] = 0;
    HEAP32[($2 + 4 | 0) >> 2] = $7;
    HEAP32[$2 >> 2] = $3;
    if (!(_ZN4core3fmt5write17hd273a061a774381dE($2 | 0, 1048948 | 0, $1 | 0) | 0)) {
     break label$1
    }
    _ZN4core6result13unwrap_failed17h63e31ad259971ff4E(1049052 | 0, 86 | 0, $2 + 15 | 0 | 0, 1049036 | 0, 1049156 | 0);
    wasm2js_trap();
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE($5 | 0, $3 | 0);
   wasm2js_trap();
  }
  i64toi32_i32$0 = HEAP32[$2 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[($2 + 4 | 0) >> 2] | 0;
  $101 = i64toi32_i32$0;
  i64toi32_i32$0 = $0;
  HEAP32[i64toi32_i32$0 >> 2] = $101;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
  HEAP32[(i64toi32_i32$0 + 8 | 0) >> 2] = HEAP32[($2 + 8 | 0) >> 2] | 0;
  __stack_pointer = $2 + 16 | 0;
 }
 
 function _ZN5alloc6string6String4push17heffbdde4b7aa7c44E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0;
  $2 = __stack_pointer - 16 | 0;
  __stack_pointer = $2;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      if ($1 >>> 0 < 128 >>> 0) {
       break label$4
      }
      HEAP32[($2 + 12 | 0) >> 2] = 0;
      if ($1 >>> 0 < 2048 >>> 0) {
       break label$3
      }
      label$5 : {
       if ($1 >>> 0 >= 65536 >>> 0) {
        break label$5
       }
       HEAP8[($2 + 14 | 0) >> 0] = $1 & 63 | 0 | 128 | 0;
       HEAP8[($2 + 12 | 0) >> 0] = $1 >>> 12 | 0 | 224 | 0;
       HEAP8[($2 + 13 | 0) >> 0] = ($1 >>> 6 | 0) & 63 | 0 | 128 | 0;
       $1 = 3;
       break label$2;
      }
      HEAP8[($2 + 15 | 0) >> 0] = $1 & 63 | 0 | 128 | 0;
      HEAP8[($2 + 12 | 0) >> 0] = $1 >>> 18 | 0 | 240 | 0;
      HEAP8[($2 + 14 | 0) >> 0] = ($1 >>> 6 | 0) & 63 | 0 | 128 | 0;
      HEAP8[($2 + 13 | 0) >> 0] = ($1 >>> 12 | 0) & 63 | 0 | 128 | 0;
      $1 = 4;
      break label$2;
     }
     label$6 : {
      $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
      if (($3 | 0) != (HEAP32[$0 >> 2] | 0 | 0)) {
       break label$6
      }
      _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$8grow_one17h1fc259ca8e381992E($0 | 0);
     }
     HEAP32[($0 + 8 | 0) >> 2] = $3 + 1 | 0;
     HEAP8[((HEAP32[($0 + 4 | 0) >> 2] | 0) + $3 | 0) >> 0] = $1;
     break label$1;
    }
    HEAP8[($2 + 13 | 0) >> 0] = $1 & 63 | 0 | 128 | 0;
    HEAP8[($2 + 12 | 0) >> 0] = $1 >>> 6 | 0 | 192 | 0;
    $1 = 2;
   }
   label$7 : {
    $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
    if (((HEAP32[$0 >> 2] | 0) - $3 | 0) >>> 0 >= $1 >>> 0) {
     break label$7
    }
    _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$7reserve21do_reserve_and_handle17h1929fa6bfa2184fdE($0 | 0, $3 | 0, $1 | 0);
    $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
   }
   memcpy((HEAP32[($0 + 4 | 0) >> 2] | 0) + $3 | 0 | 0, $2 + 12 | 0 | 0, $1 | 0) | 0;
   HEAP32[($0 + 8 | 0) >> 2] = $3 + $1 | 0;
  }
  __stack_pointer = $2 + 16 | 0;
 }
 
 function _ZN58_$LT$alloc__string__String$u20$as$u20$core__fmt__Write$GT$9write_str17h9c2d3e9aafc08637E_52($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0;
  label$1 : {
   $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
   if (((HEAP32[$0 >> 2] | 0) - $3 | 0) >>> 0 >= $2 >>> 0) {
    break label$1
   }
   _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$7reserve21do_reserve_and_handle17h1929fa6bfa2184fdE($0 | 0, $3 | 0, $2 | 0);
   $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
  }
  memcpy((HEAP32[($0 + 4 | 0) >> 2] | 0) + $3 | 0 | 0, $1 | 0, $2 | 0) | 0;
  HEAP32[($0 + 8 | 0) >> 2] = $3 + $2 | 0;
  return 0 | 0;
 }
 
 function _ZN58_$LT$alloc__string__String$u20$as$u20$core__fmt__Write$GT$10write_char17h9231f70fbd335441E_53($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  _ZN5alloc6string6String4push17heffbdde4b7aa7c44E($0 | 0, $1 | 0);
  return 0 | 0;
 }
 
 function _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$1 = 0, $2 = 0, $10 = 0, $15 = 0, $21 = 0;
  $2 = __stack_pointer - 32 | 0;
  __stack_pointer = $2;
  i64toi32_i32$2 = $0 + 16 | 0;
  i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
  $10 = i64toi32_i32$0;
  i64toi32_i32$0 = $2 + 16 | 0;
  HEAP32[i64toi32_i32$0 >> 2] = $10;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
  i64toi32_i32$2 = $0 + 8 | 0;
  i64toi32_i32$1 = HEAP32[i64toi32_i32$2 >> 2] | 0;
  i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
  $15 = i64toi32_i32$1;
  i64toi32_i32$1 = $2 + 8 | 0;
  HEAP32[i64toi32_i32$1 >> 2] = $15;
  HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
  HEAP16[($2 + 28 | 0) >> 1] = 1;
  HEAP32[($2 + 24 | 0) >> 2] = $1;
  i64toi32_i32$2 = $0;
  i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
  $21 = i64toi32_i32$0;
  i64toi32_i32$0 = $2;
  HEAP32[i64toi32_i32$0 >> 2] = $21;
  HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
  rust_begin_unwind(i64toi32_i32$0 | 0);
  wasm2js_trap();
 }
 
 function _ZN4core5slice5index26slice_start_index_len_fail17h65432e022682bf05E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$3 = 0, i64toi32_i32$4 = 0, $16 = 0, $4 = 0, $15 = 0, $4$hi = 0, $21$hi = 0, $22 = 0, $26$hi = 0, $27 = 0;
  $3 = __stack_pointer - 48 | 0;
  __stack_pointer = $3;
  HEAP32[$3 >> 2] = $0;
  HEAP32[($3 + 4 | 0) >> 2] = $1;
  HEAP32[($3 + 12 | 0) >> 2] = 2;
  HEAP32[($3 + 8 | 0) >> 2] = 1049632;
  i64toi32_i32$1 = $3;
  i64toi32_i32$0 = 0;
  HEAP32[($3 + 20 | 0) >> 2] = 2;
  HEAP32[($3 + 24 | 0) >> 2] = i64toi32_i32$0;
  $15 = $3;
  i64toi32_i32$0 = 0;
  i64toi32_i32$2 = 1;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   $16 = 0;
  } else {
   i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
   $16 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
  }
  $4 = $16;
  $4$hi = i64toi32_i32$1;
  i64toi32_i32$1 = 0;
  $21$hi = i64toi32_i32$1;
  i64toi32_i32$1 = $4$hi;
  i64toi32_i32$0 = $4;
  i64toi32_i32$2 = $21$hi;
  i64toi32_i32$3 = $3 + 4 | 0;
  i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
  $22 = i64toi32_i32$0 | i64toi32_i32$3 | 0;
  i64toi32_i32$0 = $15;
  HEAP32[(i64toi32_i32$0 + 40 | 0) >> 2] = $22;
  HEAP32[(i64toi32_i32$0 + 44 | 0) >> 2] = i64toi32_i32$2;
  i64toi32_i32$2 = i64toi32_i32$1;
  i64toi32_i32$2 = 0;
  $26$hi = i64toi32_i32$2;
  i64toi32_i32$2 = i64toi32_i32$1;
  i64toi32_i32$1 = $4;
  i64toi32_i32$0 = $26$hi;
  i64toi32_i32$3 = $3;
  i64toi32_i32$0 = i64toi32_i32$2 | i64toi32_i32$0 | 0;
  $27 = i64toi32_i32$1 | $3 | 0;
  i64toi32_i32$1 = $3;
  HEAP32[($3 + 32 | 0) >> 2] = $27;
  HEAP32[($3 + 36 | 0) >> 2] = i64toi32_i32$0;
  HEAP32[($3 + 16 | 0) >> 2] = $3 + 32 | 0;
  _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($3 + 8 | 0 | 0, $2 | 0);
  wasm2js_trap();
 }
 
 function _ZN4core9panicking18panic_bounds_check17hb583f390c1467acdE($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$3 = 0, i64toi32_i32$4 = 0, $16 = 0, $4 = 0, $15 = 0, $4$hi = 0, $20$hi = 0, $21 = 0, $26$hi = 0, $27 = 0;
  $3 = __stack_pointer - 48 | 0;
  __stack_pointer = $3;
  HEAP32[($3 + 4 | 0) >> 2] = $1;
  HEAP32[$3 >> 2] = $0;
  HEAP32[($3 + 12 | 0) >> 2] = 2;
  HEAP32[($3 + 8 | 0) >> 2] = 1049268;
  i64toi32_i32$1 = $3;
  i64toi32_i32$0 = 0;
  HEAP32[($3 + 20 | 0) >> 2] = 2;
  HEAP32[($3 + 24 | 0) >> 2] = i64toi32_i32$0;
  $15 = $3;
  i64toi32_i32$0 = 0;
  i64toi32_i32$2 = 1;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   $16 = 0;
  } else {
   i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
   $16 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
  }
  $4 = $16;
  $4$hi = i64toi32_i32$1;
  i64toi32_i32$1 = 0;
  $20$hi = i64toi32_i32$1;
  i64toi32_i32$1 = $4$hi;
  i64toi32_i32$0 = $4;
  i64toi32_i32$2 = $20$hi;
  i64toi32_i32$3 = $3;
  i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
  $21 = i64toi32_i32$0 | $3 | 0;
  i64toi32_i32$0 = $15;
  HEAP32[(i64toi32_i32$0 + 40 | 0) >> 2] = $21;
  HEAP32[(i64toi32_i32$0 + 44 | 0) >> 2] = i64toi32_i32$2;
  i64toi32_i32$2 = i64toi32_i32$1;
  i64toi32_i32$2 = 0;
  $26$hi = i64toi32_i32$2;
  i64toi32_i32$2 = i64toi32_i32$1;
  i64toi32_i32$1 = $4;
  i64toi32_i32$0 = $26$hi;
  i64toi32_i32$3 = $3 + 4 | 0;
  i64toi32_i32$0 = i64toi32_i32$2 | i64toi32_i32$0 | 0;
  $27 = i64toi32_i32$1 | i64toi32_i32$3 | 0;
  i64toi32_i32$1 = $3;
  HEAP32[($3 + 32 | 0) >> 2] = $27;
  HEAP32[($3 + 36 | 0) >> 2] = i64toi32_i32$0;
  HEAP32[($3 + 16 | 0) >> 2] = $3 + 32 | 0;
  _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($3 + 8 | 0 | 0, $2 | 0);
  wasm2js_trap();
 }
 
 function _ZN4core5slice5index24slice_end_index_len_fail17h02d344349d5072f8E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$3 = 0, i64toi32_i32$4 = 0, $16 = 0, $4 = 0, $15 = 0, $4$hi = 0, $21$hi = 0, $22 = 0, $26$hi = 0, $27 = 0;
  $3 = __stack_pointer - 48 | 0;
  __stack_pointer = $3;
  HEAP32[$3 >> 2] = $0;
  HEAP32[($3 + 4 | 0) >> 2] = $1;
  HEAP32[($3 + 12 | 0) >> 2] = 2;
  HEAP32[($3 + 8 | 0) >> 2] = 1049664;
  i64toi32_i32$1 = $3;
  i64toi32_i32$0 = 0;
  HEAP32[($3 + 20 | 0) >> 2] = 2;
  HEAP32[($3 + 24 | 0) >> 2] = i64toi32_i32$0;
  $15 = $3;
  i64toi32_i32$0 = 0;
  i64toi32_i32$2 = 1;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   $16 = 0;
  } else {
   i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
   $16 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
  }
  $4 = $16;
  $4$hi = i64toi32_i32$1;
  i64toi32_i32$1 = 0;
  $21$hi = i64toi32_i32$1;
  i64toi32_i32$1 = $4$hi;
  i64toi32_i32$0 = $4;
  i64toi32_i32$2 = $21$hi;
  i64toi32_i32$3 = $3 + 4 | 0;
  i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
  $22 = i64toi32_i32$0 | i64toi32_i32$3 | 0;
  i64toi32_i32$0 = $15;
  HEAP32[(i64toi32_i32$0 + 40 | 0) >> 2] = $22;
  HEAP32[(i64toi32_i32$0 + 44 | 0) >> 2] = i64toi32_i32$2;
  i64toi32_i32$2 = i64toi32_i32$1;
  i64toi32_i32$2 = 0;
  $26$hi = i64toi32_i32$2;
  i64toi32_i32$2 = i64toi32_i32$1;
  i64toi32_i32$1 = $4;
  i64toi32_i32$0 = $26$hi;
  i64toi32_i32$3 = $3;
  i64toi32_i32$0 = i64toi32_i32$2 | i64toi32_i32$0 | 0;
  $27 = i64toi32_i32$1 | $3 | 0;
  i64toi32_i32$1 = $3;
  HEAP32[($3 + 32 | 0) >> 2] = $27;
  HEAP32[($3 + 36 | 0) >> 2] = i64toi32_i32$0;
  HEAP32[($3 + 16 | 0) >> 2] = $3 + 32 | 0;
  _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($3 + 8 | 0 | 0, $2 | 0);
  wasm2js_trap();
 }
 
 function _ZN4core3fmt9Formatter3pad17hc540d40003d38a61E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $8 = 0, $7 = 0, $5 = 0, $6 = 0, $4 = 0;
  $3 = HEAP32[($0 + 8 | 0) >> 2] | 0;
  label$1 : {
   label$2 : {
    $4 = HEAP32[$0 >> 2] | 0;
    if ($4) {
     break label$2
    }
    if (!($3 & 1 | 0)) {
     break label$1
    }
   }
   label$3 : {
    if (!($3 & 1 | 0)) {
     break label$3
    }
    $5 = $1 + $2 | 0;
    label$4 : {
     label$5 : {
      $6 = HEAP32[($0 + 12 | 0) >> 2] | 0;
      if ($6) {
       break label$5
      }
      $7 = 0;
      $8 = $1;
      break label$4;
     }
     $7 = 0;
     $8 = $1;
     label$6 : while (1) {
      $3 = $8;
      if (($3 | 0) == ($5 | 0)) {
       break label$3
      }
      label$7 : {
       label$8 : {
        $8 = HEAP8[$3 >> 0] | 0;
        if (($8 | 0) <= (-1 | 0)) {
         break label$8
        }
        $8 = $3 + 1 | 0;
        break label$7;
       }
       label$9 : {
        if ($8 >>> 0 >= -32 >>> 0) {
         break label$9
        }
        $8 = $3 + 2 | 0;
        break label$7;
       }
       label$10 : {
        if ($8 >>> 0 >= -16 >>> 0) {
         break label$10
        }
        $8 = $3 + 3 | 0;
        break label$7;
       }
       $8 = $3 + 4 | 0;
      }
      $7 = ($8 - $3 | 0) + $7 | 0;
      $6 = $6 + -1 | 0;
      if ($6) {
       continue label$6
      }
      break label$6;
     };
    }
    if (($8 | 0) == ($5 | 0)) {
     break label$3
    }
    label$11 : {
     $3 = HEAP8[$8 >> 0] | 0;
     if (($3 | 0) > (-1 | 0)) {
      break label$11
     }
    }
    label$12 : {
     label$13 : {
      if (!$7) {
       break label$13
      }
      label$14 : {
       if ($7 >>> 0 >= $2 >>> 0) {
        break label$14
       }
       if ((HEAP8[($1 + $7 | 0) >> 0] | 0 | 0) > (-65 | 0)) {
        break label$13
       }
       $3 = 0;
       break label$12;
      }
      if (($7 | 0) == ($2 | 0)) {
       break label$13
      }
      $3 = 0;
      break label$12;
     }
     $3 = $1;
    }
    $2 = $3 ? $7 : $2;
    $1 = $3 ? $3 : $1;
   }
   label$15 : {
    if ($4) {
     break label$15
    }
    return FUNCTION_TABLE[HEAP32[((HEAP32[($0 + 24 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($0 + 20 | 0) >> 2] | 0, $1, $2) | 0 | 0;
   }
   $4 = HEAP32[($0 + 4 | 0) >> 2] | 0;
   label$16 : {
    label$17 : {
     if ($2 >>> 0 < 16 >>> 0) {
      break label$17
     }
     $3 = _ZN4core3str5count14do_count_chars17h03769f4f70ff5154E($1 | 0, $2 | 0) | 0;
     break label$16;
    }
    label$18 : {
     if ($2) {
      break label$18
     }
     $3 = 0;
     break label$16;
    }
    $6 = $2 & 3 | 0;
    label$19 : {
     label$20 : {
      if ($2 >>> 0 >= 4 >>> 0) {
       break label$20
      }
      $3 = 0;
      $7 = 0;
      break label$19;
     }
     $5 = $2 & 12 | 0;
     $3 = 0;
     $7 = 0;
     label$21 : while (1) {
      $8 = $1 + $7 | 0;
      $3 = ((($3 + ((HEAP8[$8 >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($8 + 1 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($8 + 2 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($8 + 3 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0;
      $7 = $7 + 4 | 0;
      if (($5 | 0) != ($7 | 0)) {
       continue label$21
      }
      break label$21;
     };
    }
    if (!$6) {
     break label$16
    }
    $8 = $1 + $7 | 0;
    label$22 : while (1) {
     $3 = $3 + ((HEAP8[$8 >> 0] | 0 | 0) > (-65 | 0)) | 0;
     $8 = $8 + 1 | 0;
     $6 = $6 + -1 | 0;
     if ($6) {
      continue label$22
     }
     break label$22;
    };
   }
   label$23 : {
    label$24 : {
     if ($4 >>> 0 <= $3 >>> 0) {
      break label$24
     }
     $5 = $4 - $3 | 0;
     $3 = 0;
     label$25 : {
      label$26 : {
       switch (HEAPU8[($0 + 32 | 0) >> 0] | 0 | 0) {
       case 1:
        $3 = $5;
        $5 = 0;
        break label$25;
       case 2:
        break label$26;
       default:
        break label$25;
       };
      }
      $3 = $5 >>> 1 | 0;
      $5 = ($5 + 1 | 0) >>> 1 | 0;
     }
     $3 = $3 + 1 | 0;
     $6 = HEAP32[($0 + 16 | 0) >> 2] | 0;
     $8 = HEAP32[($0 + 24 | 0) >> 2] | 0;
     $7 = HEAP32[($0 + 20 | 0) >> 2] | 0;
     label$28 : while (1) {
      $3 = $3 + -1 | 0;
      if (!$3) {
       break label$23
      }
      if (!(FUNCTION_TABLE[HEAP32[($8 + 16 | 0) >> 2] | 0 | 0]($7, $6) | 0)) {
       continue label$28
      }
      break label$28;
     };
     return 1 | 0;
    }
    return FUNCTION_TABLE[HEAP32[((HEAP32[($0 + 24 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($0 + 20 | 0) >> 2] | 0, $1, $2) | 0 | 0;
   }
   label$29 : {
    if (!(FUNCTION_TABLE[HEAP32[($8 + 12 | 0) >> 2] | 0 | 0]($7, $1, $2) | 0)) {
     break label$29
    }
    return 1 | 0;
   }
   $3 = 0;
   label$30 : while (1) {
    label$31 : {
     if (($5 | 0) != ($3 | 0)) {
      break label$31
     }
     return $5 >>> 0 < $5 >>> 0 | 0;
    }
    $3 = $3 + 1 | 0;
    if (!(FUNCTION_TABLE[HEAP32[($8 + 16 | 0) >> 2] | 0 | 0]($7, $6) | 0)) {
     continue label$30
    }
    break label$30;
   };
   return ($3 + -1 | 0) >>> 0 < $5 >>> 0 | 0;
  }
  return FUNCTION_TABLE[HEAP32[((HEAP32[($0 + 24 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($0 + 20 | 0) >> 2] | 0, $1, $2) | 0 | 0;
 }
 
 function _ZN4core9panicking5panic17h9f0a34b0744fbd45E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0;
  $3 = __stack_pointer - 32 | 0;
  __stack_pointer = $3;
  HEAP32[($3 + 16 | 0) >> 2] = 0;
  HEAP32[($3 + 4 | 0) >> 2] = 1;
  HEAP32[($3 + 8 | 0) >> 2] = 4;
  HEAP32[($3 + 12 | 0) >> 2] = 0;
  HEAP32[($3 + 28 | 0) >> 2] = $1;
  HEAP32[($3 + 24 | 0) >> 2] = $0;
  HEAP32[$3 >> 2] = $3 + 24 | 0;
  _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($3 | 0, $2 | 0);
  wasm2js_trap();
 }
 
 function _ZN4core3fmt3num3imp52_$LT$impl$u20$core__fmt__Display$u20$for$u20$u32$GT$3fmt17h5732d357c58d2b36E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$1 = 0;
  i64toi32_i32$1 = 0;
  return _ZN4core3fmt3num3imp7fmt_u6417h6f5511515637a348E(HEAP32[$0 >> 2] | 0 | 0, i64toi32_i32$1 | 0, 1 | 0, $1 | 0) | 0 | 0;
 }
 
 function _ZN4core3fmt5write17hd273a061a774381dE($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $7 = 0, $6 = 0, $11 = 0, $4 = 0, $12 = 0, $9 = 0, $5 = 0, $10 = 0, $8 = 0;
  $3 = __stack_pointer - 48 | 0;
  __stack_pointer = $3;
  HEAP8[($3 + 44 | 0) >> 0] = 3;
  HEAP32[($3 + 28 | 0) >> 2] = 32;
  $4 = 0;
  HEAP32[($3 + 40 | 0) >> 2] = 0;
  HEAP32[($3 + 36 | 0) >> 2] = $1;
  HEAP32[($3 + 32 | 0) >> 2] = $0;
  HEAP32[($3 + 20 | 0) >> 2] = 0;
  HEAP32[($3 + 12 | 0) >> 2] = 0;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       $5 = HEAP32[($2 + 16 | 0) >> 2] | 0;
       if ($5) {
        break label$5
       }
       $0 = HEAP32[($2 + 12 | 0) >> 2] | 0;
       if (!$0) {
        break label$4
       }
       $1 = HEAP32[($2 + 8 | 0) >> 2] | 0;
       $6 = $0 << 3 | 0;
       $4 = (($0 + -1 | 0) & 536870911 | 0) + 1 | 0;
       $0 = HEAP32[$2 >> 2] | 0;
       label$6 : while (1) {
        label$7 : {
         $7 = HEAP32[($0 + 4 | 0) >> 2] | 0;
         if (!$7) {
          break label$7
         }
         if (FUNCTION_TABLE[HEAP32[((HEAP32[($3 + 36 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($3 + 32 | 0) >> 2] | 0, HEAP32[$0 >> 2] | 0, $7) | 0) {
          break label$3
         }
        }
        if (FUNCTION_TABLE[HEAP32[($1 + 4 | 0) >> 2] | 0 | 0](HEAP32[$1 >> 2] | 0, $3 + 12 | 0) | 0) {
         break label$3
        }
        $1 = $1 + 8 | 0;
        $0 = $0 + 8 | 0;
        $6 = $6 + -8 | 0;
        if ($6) {
         continue label$6
        }
        break label$4;
       };
      }
      $1 = HEAP32[($2 + 20 | 0) >> 2] | 0;
      if (!$1) {
       break label$4
      }
      $8 = $1 << 5 | 0;
      $4 = (($1 + -1 | 0) & 134217727 | 0) + 1 | 0;
      $9 = HEAP32[($2 + 8 | 0) >> 2] | 0;
      $0 = HEAP32[$2 >> 2] | 0;
      $6 = 0;
      label$8 : while (1) {
       label$9 : {
        $1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
        if (!$1) {
         break label$9
        }
        if (FUNCTION_TABLE[HEAP32[((HEAP32[($3 + 36 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($3 + 32 | 0) >> 2] | 0, HEAP32[$0 >> 2] | 0, $1) | 0) {
         break label$3
        }
       }
       $1 = $5 + $6 | 0;
       HEAP32[($3 + 28 | 0) >> 2] = HEAP32[($1 + 16 | 0) >> 2] | 0;
       HEAP8[($3 + 44 | 0) >> 0] = HEAPU8[($1 + 28 | 0) >> 0] | 0;
       HEAP32[($3 + 40 | 0) >> 2] = HEAP32[($1 + 24 | 0) >> 2] | 0;
       $7 = HEAP32[($1 + 12 | 0) >> 2] | 0;
       $10 = 0;
       $11 = 0;
       label$10 : {
        label$11 : {
         switch (HEAP32[($1 + 8 | 0) >> 2] | 0 | 0) {
         case 1:
          $12 = $7 << 3 | 0;
          $11 = 0;
          $12 = $9 + $12 | 0;
          if (HEAP32[($12 + 4 | 0) >> 2] | 0) {
           break label$10
          }
          $7 = HEAP32[$12 >> 2] | 0;
          break;
         case 2:
          break label$10;
         default:
          break label$11;
         };
        }
        $11 = 1;
       }
       HEAP32[($3 + 16 | 0) >> 2] = $7;
       HEAP32[($3 + 12 | 0) >> 2] = $11;
       $7 = HEAP32[($1 + 4 | 0) >> 2] | 0;
       label$13 : {
        label$14 : {
         switch (HEAP32[$1 >> 2] | 0 | 0) {
         case 1:
          $11 = $7 << 3 | 0;
          $11 = $9 + $11 | 0;
          if (HEAP32[($11 + 4 | 0) >> 2] | 0) {
           break label$13
          }
          $7 = HEAP32[$11 >> 2] | 0;
          break;
         case 2:
          break label$13;
         default:
          break label$14;
         };
        }
        $10 = 1;
       }
       HEAP32[($3 + 24 | 0) >> 2] = $7;
       HEAP32[($3 + 20 | 0) >> 2] = $10;
       $1 = $9 + ((HEAP32[($1 + 20 | 0) >> 2] | 0) << 3 | 0) | 0;
       if (FUNCTION_TABLE[HEAP32[($1 + 4 | 0) >> 2] | 0 | 0](HEAP32[$1 >> 2] | 0, $3 + 12 | 0) | 0) {
        break label$3
       }
       $0 = $0 + 8 | 0;
       $6 = $6 + 32 | 0;
       if (($8 | 0) != ($6 | 0)) {
        continue label$8
       }
       break label$8;
      };
     }
     if ($4 >>> 0 >= (HEAP32[($2 + 4 | 0) >> 2] | 0) >>> 0) {
      break label$2
     }
     $1 = (HEAP32[$2 >> 2] | 0) + ($4 << 3 | 0) | 0;
     if (!(FUNCTION_TABLE[HEAP32[((HEAP32[($3 + 36 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($3 + 32 | 0) >> 2] | 0, HEAP32[$1 >> 2] | 0, HEAP32[($1 + 4 | 0) >> 2] | 0) | 0)) {
      break label$2
     }
    }
    $1 = 1;
    break label$1;
   }
   $1 = 0;
  }
  __stack_pointer = $3 + 48 | 0;
  return $1 | 0;
 }
 
 function _ZN4core3fmt3num3imp51_$LT$impl$u20$core__fmt__Display$u20$for$u20$u8$GT$3fmt17h96ec540fce0e8c05E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var i64toi32_i32$1 = 0;
  i64toi32_i32$1 = 0;
  return _ZN4core3fmt3num3imp7fmt_u6417h6f5511515637a348E(HEAPU8[$0 >> 0] | 0 | 0, i64toi32_i32$1 | 0, 1 | 0, $1 | 0) | 0 | 0;
 }
 
 function _ZN4core6result13unwrap_failed17h63e31ad259971ff4E($0, $1, $2, $3, $4) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  $4 = $4 | 0;
  var $5 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$2 = 0, i64toi32_i32$4 = 0, i64toi32_i32$3 = 0, $19 = 0, $21 = 0, $20 = 0, $22$hi = 0, $25$hi = 0, $26 = 0, $27 = 0, $29$hi = 0, $32$hi = 0, $33 = 0;
  $5 = __stack_pointer - 64 | 0;
  __stack_pointer = $5;
  HEAP32[($5 + 12 | 0) >> 2] = $1;
  HEAP32[($5 + 8 | 0) >> 2] = $0;
  HEAP32[($5 + 20 | 0) >> 2] = $3;
  HEAP32[($5 + 16 | 0) >> 2] = $2;
  HEAP32[($5 + 28 | 0) >> 2] = 2;
  HEAP32[($5 + 24 | 0) >> 2] = 1049288;
  i64toi32_i32$1 = $5;
  i64toi32_i32$0 = 0;
  HEAP32[($5 + 36 | 0) >> 2] = 2;
  HEAP32[($5 + 40 | 0) >> 2] = i64toi32_i32$0;
  $20 = $5;
  i64toi32_i32$0 = 0;
  i64toi32_i32$2 = 23;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   $19 = 0;
  } else {
   i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
   $19 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
  }
  $22$hi = i64toi32_i32$1;
  i64toi32_i32$1 = 0;
  $25$hi = i64toi32_i32$1;
  i64toi32_i32$1 = $22$hi;
  i64toi32_i32$0 = $19;
  i64toi32_i32$2 = $25$hi;
  i64toi32_i32$3 = $5 + 16 | 0;
  i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
  $26 = i64toi32_i32$0 | i64toi32_i32$3 | 0;
  i64toi32_i32$0 = $20;
  HEAP32[(i64toi32_i32$0 + 56 | 0) >> 2] = $26;
  HEAP32[(i64toi32_i32$0 + 60 | 0) >> 2] = i64toi32_i32$2;
  $27 = $5;
  i64toi32_i32$2 = 0;
  i64toi32_i32$1 = 24;
  i64toi32_i32$0 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$0 = i64toi32_i32$1 << i64toi32_i32$4 | 0;
   $21 = 0;
  } else {
   i64toi32_i32$0 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$1 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$2 << i64toi32_i32$4 | 0) | 0;
   $21 = i64toi32_i32$1 << i64toi32_i32$4 | 0;
  }
  $29$hi = i64toi32_i32$0;
  i64toi32_i32$0 = 0;
  $32$hi = i64toi32_i32$0;
  i64toi32_i32$0 = $29$hi;
  i64toi32_i32$2 = $21;
  i64toi32_i32$1 = $32$hi;
  i64toi32_i32$3 = $5 + 8 | 0;
  i64toi32_i32$1 = i64toi32_i32$0 | i64toi32_i32$1 | 0;
  $33 = i64toi32_i32$2 | i64toi32_i32$3 | 0;
  i64toi32_i32$2 = $27;
  HEAP32[(i64toi32_i32$2 + 48 | 0) >> 2] = $33;
  HEAP32[(i64toi32_i32$2 + 52 | 0) >> 2] = i64toi32_i32$1;
  HEAP32[($5 + 32 | 0) >> 2] = $5 + 48 | 0;
  _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($5 + 24 | 0 | 0, $4 | 0);
  wasm2js_trap();
 }
 
 function _ZN4core6option13unwrap_failed17h98817bc8a3accaffE($0) {
  $0 = $0 | 0;
  _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1049173 | 0, 43 | 0, $0 | 0);
  wasm2js_trap();
 }
 
 function _ZN44_$LT$$RF$T$u20$as$u20$core__fmt__Display$GT$3fmt17h0e730352ba1d2064E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return _ZN4core3fmt9Formatter3pad17hc540d40003d38a61E($1 | 0, HEAP32[$0 >> 2] | 0 | 0, HEAP32[($0 + 4 | 0) >> 2] | 0 | 0) | 0 | 0;
 }
 
 function _ZN42_$LT$$RF$T$u20$as$u20$core__fmt__Debug$GT$3fmt17h02f2c499cdd866a1E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return FUNCTION_TABLE[HEAP32[((HEAP32[($0 + 4 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[$0 >> 2] | 0, $1) | 0 | 0;
 }
 
 function _ZN68_$LT$core__fmt__builders__PadAdapter$u20$as$u20$core__fmt__Write$GT$9write_str17hcef790f9881e69b1E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $14 = 0, $9 = 0, $11 = 0, $13 = 0, $12 = 0, $8 = 0, $15 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $10 = 0, $3 = 0, $72 = 0;
  $3 = $1 + -1 | 0;
  $4 = HEAP32[($0 + 4 | 0) >> 2] | 0;
  $5 = HEAP32[$0 >> 2] | 0;
  $6 = HEAP32[($0 + 8 | 0) >> 2] | 0;
  $7 = 0;
  $8 = 0;
  $9 = 0;
  $10 = 0;
  label$1 : {
   label$2 : while (1) {
    if ($10 & 1 | 0) {
     break label$1
    }
    label$3 : {
     label$4 : {
      if ($9 >>> 0 > $2 >>> 0) {
       break label$4
      }
      label$5 : while (1) {
       $11 = $1 + $9 | 0;
       label$6 : {
        label$7 : {
         label$8 : {
          label$9 : {
           $12 = $2 - $9 | 0;
           if ($12 >>> 0 > 7 >>> 0) {
            break label$9
           }
           if (($2 | 0) != ($9 | 0)) {
            break label$8
           }
           $9 = $2;
           break label$4;
          }
          label$10 : {
           label$11 : {
            $13 = ($11 + 3 | 0) & -4 | 0;
            $14 = $13 - $11 | 0;
            if (!$14) {
             break label$11
            }
            $0 = 0;
            label$12 : while (1) {
             if ((HEAPU8[($11 + $0 | 0) >> 0] | 0 | 0) == (10 | 0)) {
              break label$6
             }
             $0 = $0 + 1 | 0;
             if (($14 | 0) != ($0 | 0)) {
              continue label$12
             }
             break label$12;
            };
            $15 = $12 + -8 | 0;
            if ($14 >>> 0 <= $15 >>> 0) {
             break label$10
            }
            break label$7;
           }
           $15 = $12 + -8 | 0;
          }
          label$13 : while (1) {
           $0 = HEAP32[$13 >> 2] | 0;
           $72 = 16843008 - ($0 ^ 168430090 | 0) | 0 | $0 | 0;
           $0 = HEAP32[($13 + 4 | 0) >> 2] | 0;
           if ((($72 & (16843008 - ($0 ^ 168430090 | 0) | 0 | $0 | 0) | 0) & -2139062144 | 0 | 0) != (-2139062144 | 0)) {
            break label$7
           }
           $13 = $13 + 8 | 0;
           $14 = $14 + 8 | 0;
           if ($14 >>> 0 <= $15 >>> 0) {
            continue label$13
           }
           break label$7;
          };
         }
         $0 = 0;
         label$14 : while (1) {
          if ((HEAPU8[($11 + $0 | 0) >> 0] | 0 | 0) == (10 | 0)) {
           break label$6
          }
          $0 = $0 + 1 | 0;
          if (($12 | 0) != ($0 | 0)) {
           continue label$14
          }
          break label$14;
         };
         $9 = $2;
         break label$4;
        }
        label$15 : {
         if (($14 | 0) != ($12 | 0)) {
          break label$15
         }
         $9 = $2;
         break label$4;
        }
        label$16 : while (1) {
         label$17 : {
          if ((HEAPU8[($11 + $14 | 0) >> 0] | 0 | 0) != (10 | 0)) {
           break label$17
          }
          $0 = $14;
          break label$6;
         }
         $14 = $14 + 1 | 0;
         if (($12 | 0) != ($14 | 0)) {
          continue label$16
         }
         break label$16;
        };
        $9 = $2;
        break label$4;
       }
       $14 = $0 + $9 | 0;
       $9 = $14 + 1 | 0;
       label$18 : {
        if ($14 >>> 0 >= $2 >>> 0) {
         break label$18
        }
        if ((HEAPU8[($11 + $0 | 0) >> 0] | 0 | 0) != (10 | 0)) {
         break label$18
        }
        $11 = $9;
        $0 = $9;
        break label$3;
       }
       if ($9 >>> 0 <= $2 >>> 0) {
        continue label$5
       }
       break label$5;
      };
     }
     $10 = 1;
     $11 = $8;
     $0 = $2;
     if (($11 | 0) == ($0 | 0)) {
      break label$1
     }
    }
    label$19 : {
     label$20 : {
      if (!(HEAPU8[$6 >> 0] | 0)) {
       break label$20
      }
      if (FUNCTION_TABLE[HEAP32[($4 + 12 | 0) >> 2] | 0 | 0]($5, 1049328, 4) | 0) {
       break label$19
      }
     }
     $13 = $0 - $8 | 0;
     $14 = 0;
     label$21 : {
      if (($0 | 0) == ($8 | 0)) {
       break label$21
      }
      $14 = (HEAPU8[($3 + $0 | 0) >> 0] | 0 | 0) == (10 | 0);
     }
     $0 = $1 + $8 | 0;
     HEAP8[$6 >> 0] = $14;
     $8 = $11;
     if (!(FUNCTION_TABLE[HEAP32[($4 + 12 | 0) >> 2] | 0 | 0]($5, $0, $13) | 0)) {
      continue label$2
     }
    }
    break label$2;
   };
   $7 = 1;
  }
  return $7 | 0;
 }
 
 function _ZN68_$LT$core__fmt__builders__PadAdapter$u20$as$u20$core__fmt__Write$GT$10write_char17h8982d69464cb262aE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0;
  $2 = HEAP32[($0 + 4 | 0) >> 2] | 0;
  $3 = HEAP32[$0 >> 2] | 0;
  label$1 : {
   $0 = HEAP32[($0 + 8 | 0) >> 2] | 0;
   if (!(HEAPU8[$0 >> 0] | 0)) {
    break label$1
   }
   if (!(FUNCTION_TABLE[HEAP32[($2 + 12 | 0) >> 2] | 0 | 0]($3, 1049328, 4) | 0)) {
    break label$1
   }
   return 1 | 0;
  }
  HEAP8[$0 >> 0] = ($1 | 0) == (10 | 0);
  return FUNCTION_TABLE[HEAP32[($2 + 16 | 0) >> 2] | 0 | 0]($3, $1) | 0 | 0;
 }
 
 function _ZN4core3fmt8builders8DebugSet5entry17h7036b50f83a7398eE($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $6 = 0, i64toi32_i32$0 = 0, $4 = 0, i64toi32_i32$1 = 0, $7 = 0, $5 = 0, $45 = 0, $52 = 0, $64 = 0;
  $3 = __stack_pointer - 64 | 0;
  __stack_pointer = $3;
  $4 = 1;
  label$1 : {
   if (HEAPU8[($0 + 4 | 0) >> 0] | 0) {
    break label$1
   }
   $5 = HEAPU8[($0 + 5 | 0) >> 0] | 0;
   label$2 : {
    label$3 : {
     $6 = HEAP32[$0 >> 2] | 0;
     $7 = HEAP32[($6 + 28 | 0) >> 2] | 0;
     if ($7 & 4 | 0) {
      break label$3
     }
     $4 = 1;
     if (!($5 & 1 | 0)) {
      break label$2
     }
     if (!(FUNCTION_TABLE[HEAP32[((HEAP32[($6 + 24 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($6 + 20 | 0) >> 2] | 0, 1049332, 2) | 0)) {
      break label$2
     }
     break label$1;
    }
    $4 = 1;
    label$4 : {
     if ($5 & 1 | 0) {
      break label$4
     }
     if (FUNCTION_TABLE[HEAP32[((HEAP32[($6 + 24 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($6 + 20 | 0) >> 2] | 0, 1049336, 1) | 0) {
      break label$1
     }
     $7 = HEAP32[($6 + 28 | 0) >> 2] | 0;
    }
    $4 = 1;
    HEAP8[($3 + 27 | 0) >> 0] = 1;
    i64toi32_i32$0 = HEAP32[($6 + 20 | 0) >> 2] | 0;
    i64toi32_i32$1 = HEAP32[($6 + 24 | 0) >> 2] | 0;
    $45 = i64toi32_i32$0;
    i64toi32_i32$0 = $3;
    HEAP32[($3 + 12 | 0) >> 2] = $45;
    HEAP32[($3 + 16 | 0) >> 2] = i64toi32_i32$1;
    HEAP32[($3 + 52 | 0) >> 2] = 1049304;
    HEAP32[($3 + 20 | 0) >> 2] = $3 + 27 | 0;
    i64toi32_i32$1 = HEAP32[($6 + 8 | 0) >> 2] | 0;
    i64toi32_i32$0 = HEAP32[($6 + 12 | 0) >> 2] | 0;
    $52 = i64toi32_i32$1;
    i64toi32_i32$1 = $3;
    HEAP32[($3 + 36 | 0) >> 2] = $52;
    HEAP32[($3 + 40 | 0) >> 2] = i64toi32_i32$0;
    i64toi32_i32$0 = HEAP32[$6 >> 2] | 0;
    i64toi32_i32$1 = HEAP32[($6 + 4 | 0) >> 2] | 0;
    HEAP32[($3 + 56 | 0) >> 2] = $7;
    HEAP32[($3 + 44 | 0) >> 2] = HEAP32[($6 + 16 | 0) >> 2] | 0;
    HEAP8[($3 + 60 | 0) >> 0] = HEAPU8[($6 + 32 | 0) >> 0] | 0;
    $64 = i64toi32_i32$0;
    i64toi32_i32$0 = $3;
    HEAP32[($3 + 28 | 0) >> 2] = $64;
    HEAP32[($3 + 32 | 0) >> 2] = i64toi32_i32$1;
    HEAP32[($3 + 48 | 0) >> 2] = $3 + 12 | 0;
    if (FUNCTION_TABLE[HEAP32[($2 + 12 | 0) >> 2] | 0 | 0]($1, $3 + 28 | 0) | 0) {
     break label$1
    }
    $4 = FUNCTION_TABLE[HEAP32[((HEAP32[($3 + 52 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($3 + 48 | 0) >> 2] | 0, 1049334, 2) | 0;
    break label$1;
   }
   $4 = FUNCTION_TABLE[HEAP32[($2 + 12 | 0) >> 2] | 0 | 0]($1, $6) | 0;
  }
  HEAP8[($0 + 5 | 0) >> 0] = 1;
  HEAP8[($0 + 4 | 0) >> 0] = $4;
  __stack_pointer = $3 + 64 | 0;
  return $0 | 0;
 }
 
 function _ZN4core3fmt8builders9DebugList6finish17h4ef7645c675cb82eE($0) {
  $0 = $0 | 0;
  var $1 = 0;
  $1 = 1;
  label$1 : {
   if (HEAPU8[($0 + 4 | 0) >> 0] | 0) {
    break label$1
   }
   $1 = HEAP32[$0 >> 2] | 0;
   $1 = FUNCTION_TABLE[HEAP32[((HEAP32[($1 + 24 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($1 + 20 | 0) >> 2] | 0, 1049337, 1) | 0;
  }
  HEAP8[($0 + 4 | 0) >> 0] = $1;
  return $1 | 0;
 }
 
 function _ZN4core3fmt9Formatter12pad_integral17hc60d9805b485ef36E($0, $1, $2, $3, $4, $5) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  $4 = $4 | 0;
  $5 = $5 | 0;
  var $12 = 0, $6 = 0, $10 = 0, $9 = 0, $7 = 0, $8 = 0, $11 = 0;
  label$1 : {
   label$2 : {
    if ($1) {
     break label$2
    }
    $6 = $5 + 1 | 0;
    $7 = HEAP32[($0 + 28 | 0) >> 2] | 0;
    $8 = 45;
    break label$1;
   }
   $7 = HEAP32[($0 + 28 | 0) >> 2] | 0;
   $1 = $7 & 1 | 0;
   $8 = $1 ? 43 : 1114112;
   $6 = $1 + $5 | 0;
  }
  label$3 : {
   label$4 : {
    if ($7 & 4 | 0) {
     break label$4
    }
    $2 = 0;
    break label$3;
   }
   label$5 : {
    label$6 : {
     if ($3 >>> 0 < 16 >>> 0) {
      break label$6
     }
     $1 = _ZN4core3str5count14do_count_chars17h03769f4f70ff5154E($2 | 0, $3 | 0) | 0;
     break label$5;
    }
    label$7 : {
     if ($3) {
      break label$7
     }
     $1 = 0;
     break label$5;
    }
    $9 = $3 & 3 | 0;
    label$8 : {
     label$9 : {
      if ($3 >>> 0 >= 4 >>> 0) {
       break label$9
      }
      $1 = 0;
      $10 = 0;
      break label$8;
     }
     $11 = $3 & 12 | 0;
     $1 = 0;
     $10 = 0;
     label$10 : while (1) {
      $12 = $2 + $10 | 0;
      $1 = ((($1 + ((HEAP8[$12 >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($12 + 1 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($12 + 2 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($12 + 3 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0;
      $10 = $10 + 4 | 0;
      if (($11 | 0) != ($10 | 0)) {
       continue label$10
      }
      break label$10;
     };
    }
    if (!$9) {
     break label$5
    }
    $12 = $2 + $10 | 0;
    label$11 : while (1) {
     $1 = $1 + ((HEAP8[$12 >> 0] | 0 | 0) > (-65 | 0)) | 0;
     $12 = $12 + 1 | 0;
     $9 = $9 + -1 | 0;
     if ($9) {
      continue label$11
     }
     break label$11;
    };
   }
   $6 = $1 + $6 | 0;
  }
  label$12 : {
   if (HEAP32[$0 >> 2] | 0) {
    break label$12
   }
   label$13 : {
    $1 = HEAP32[($0 + 20 | 0) >> 2] | 0;
    $12 = HEAP32[($0 + 24 | 0) >> 2] | 0;
    if (!(_ZN4core3fmt9Formatter12pad_integral12write_prefix17h581ad47c6930a5a3E($1 | 0, $12 | 0, $8 | 0, $2 | 0, $3 | 0) | 0)) {
     break label$13
    }
    return 1 | 0;
   }
   return FUNCTION_TABLE[HEAP32[($12 + 12 | 0) >> 2] | 0 | 0]($1, $4, $5) | 0 | 0;
  }
  label$14 : {
   label$15 : {
    label$16 : {
     label$17 : {
      $1 = HEAP32[($0 + 4 | 0) >> 2] | 0;
      if ($1 >>> 0 > $6 >>> 0) {
       break label$17
      }
      $1 = HEAP32[($0 + 20 | 0) >> 2] | 0;
      $12 = HEAP32[($0 + 24 | 0) >> 2] | 0;
      if (!(_ZN4core3fmt9Formatter12pad_integral12write_prefix17h581ad47c6930a5a3E($1 | 0, $12 | 0, $8 | 0, $2 | 0, $3 | 0) | 0)) {
       break label$16
      }
      return 1 | 0;
     }
     if (!($7 & 8 | 0)) {
      break label$15
     }
     $9 = HEAP32[($0 + 16 | 0) >> 2] | 0;
     HEAP32[($0 + 16 | 0) >> 2] = 48;
     $7 = HEAPU8[($0 + 32 | 0) >> 0] | 0;
     $11 = 1;
     HEAP8[($0 + 32 | 0) >> 0] = 1;
     $12 = HEAP32[($0 + 20 | 0) >> 2] | 0;
     $10 = HEAP32[($0 + 24 | 0) >> 2] | 0;
     if (_ZN4core3fmt9Formatter12pad_integral12write_prefix17h581ad47c6930a5a3E($12 | 0, $10 | 0, $8 | 0, $2 | 0, $3 | 0) | 0) {
      break label$14
     }
     $1 = ($1 - $6 | 0) + 1 | 0;
     label$18 : {
      label$19 : while (1) {
       $1 = $1 + -1 | 0;
       if (!$1) {
        break label$18
       }
       if (!(FUNCTION_TABLE[HEAP32[($10 + 16 | 0) >> 2] | 0 | 0]($12, 48) | 0)) {
        continue label$19
       }
       break label$19;
      };
      return 1 | 0;
     }
     label$20 : {
      if (!(FUNCTION_TABLE[HEAP32[($10 + 12 | 0) >> 2] | 0 | 0]($12, $4, $5) | 0)) {
       break label$20
      }
      return 1 | 0;
     }
     HEAP8[($0 + 32 | 0) >> 0] = $7;
     HEAP32[($0 + 16 | 0) >> 2] = $9;
     return 0 | 0;
    }
    $11 = FUNCTION_TABLE[HEAP32[($12 + 12 | 0) >> 2] | 0 | 0]($1, $4, $5) | 0;
    break label$14;
   }
   $6 = $1 - $6 | 0;
   label$21 : {
    label$22 : {
     label$23 : {
      $1 = HEAPU8[($0 + 32 | 0) >> 0] | 0;
      switch ($1 | 0) {
      case 2:
       break label$22;
      case 1:
      case 3:
       break label$23;
      default:
       break label$21;
      };
     }
     $1 = $6;
     $6 = 0;
     break label$21;
    }
    $1 = $6 >>> 1 | 0;
    $6 = ($6 + 1 | 0) >>> 1 | 0;
   }
   $1 = $1 + 1 | 0;
   $9 = HEAP32[($0 + 16 | 0) >> 2] | 0;
   $12 = HEAP32[($0 + 24 | 0) >> 2] | 0;
   $10 = HEAP32[($0 + 20 | 0) >> 2] | 0;
   label$24 : {
    label$25 : while (1) {
     $1 = $1 + -1 | 0;
     if (!$1) {
      break label$24
     }
     if (!(FUNCTION_TABLE[HEAP32[($12 + 16 | 0) >> 2] | 0 | 0]($10, $9) | 0)) {
      continue label$25
     }
     break label$25;
    };
    return 1 | 0;
   }
   $11 = 1;
   if (_ZN4core3fmt9Formatter12pad_integral12write_prefix17h581ad47c6930a5a3E($10 | 0, $12 | 0, $8 | 0, $2 | 0, $3 | 0) | 0) {
    break label$14
   }
   if (FUNCTION_TABLE[HEAP32[($12 + 12 | 0) >> 2] | 0 | 0]($10, $4, $5) | 0) {
    break label$14
   }
   $1 = 0;
   label$26 : while (1) {
    label$27 : {
     if (($6 | 0) != ($1 | 0)) {
      break label$27
     }
     return $6 >>> 0 < $6 >>> 0 | 0;
    }
    $1 = $1 + 1 | 0;
    if (!(FUNCTION_TABLE[HEAP32[($12 + 16 | 0) >> 2] | 0 | 0]($10, $9) | 0)) {
     continue label$26
    }
    break label$26;
   };
   return ($1 + -1 | 0) >>> 0 < $6 >>> 0 | 0;
  }
  return $11 | 0;
 }
 
 function _ZN4core3fmt5Write9write_fmt17h7b710d0d35de0c2bE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return _ZN4core3fmt5write17hd273a061a774381dE($0 | 0, 1049304 | 0, $1 | 0) | 0 | 0;
 }
 
 function _ZN4core3str5count14do_count_chars17h03769f4f70ff5154E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $9 = 0, $8 = 0, $3 = 0, $6 = 0, $4 = 0, $5 = 0, $7 = 0, $132 = 0, $141 = 0, $150 = 0;
  label$1 : {
   label$2 : {
    $2 = ($0 + 3 | 0) & -4 | 0;
    $3 = $2 - $0 | 0;
    if ($1 >>> 0 < $3 >>> 0) {
     break label$2
    }
    $4 = $1 - $3 | 0;
    if ($4 >>> 0 < 4 >>> 0) {
     break label$2
    }
    $5 = $4 & 3 | 0;
    $6 = 0;
    $1 = 0;
    label$3 : {
     $7 = ($2 | 0) == ($0 | 0);
     if ($7) {
      break label$3
     }
     $1 = 0;
     label$4 : {
      label$5 : {
       $8 = $0 - $2 | 0;
       if ($8 >>> 0 <= -4 >>> 0) {
        break label$5
       }
       $9 = 0;
       break label$4;
      }
      $9 = 0;
      label$6 : while (1) {
       $2 = $0 + $9 | 0;
       $1 = ((($1 + ((HEAP8[$2 >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($2 + 1 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($2 + 2 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($2 + 3 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0;
       $9 = $9 + 4 | 0;
       if ($9) {
        continue label$6
       }
       break label$6;
      };
     }
     if ($7) {
      break label$3
     }
     $2 = $0 + $9 | 0;
     label$7 : while (1) {
      $1 = $1 + ((HEAP8[$2 >> 0] | 0 | 0) > (-65 | 0)) | 0;
      $2 = $2 + 1 | 0;
      $8 = $8 + 1 | 0;
      if ($8) {
       continue label$7
      }
      break label$7;
     };
    }
    $9 = $0 + $3 | 0;
    label$8 : {
     if (!$5) {
      break label$8
     }
     $2 = $9 + ($4 & -4 | 0) | 0;
     $6 = (HEAP8[$2 >> 0] | 0 | 0) > (-65 | 0);
     if (($5 | 0) == (1 | 0)) {
      break label$8
     }
     $6 = $6 + ((HEAP8[($2 + 1 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0;
     if (($5 | 0) == (2 | 0)) {
      break label$8
     }
     $6 = $6 + ((HEAP8[($2 + 2 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0;
    }
    $3 = $4 >>> 2 | 0;
    $8 = $6 + $1 | 0;
    label$9 : while (1) {
     $4 = $9;
     if (!$3) {
      break label$1
     }
     $6 = $3 >>> 0 < 192 >>> 0 ? $3 : 192;
     $7 = $6 & 3 | 0;
     $5 = $6 << 2 | 0;
     $2 = 0;
     label$10 : {
      if ($3 >>> 0 < 4 >>> 0) {
       break label$10
      }
      $0 = $9 + ($5 & 1008 | 0) | 0;
      $2 = 0;
      $1 = $9;
      label$11 : while (1) {
       $9 = HEAP32[($1 + 12 | 0) >> 2] | 0;
       $132 = (($9 ^ -1 | 0) >>> 7 | 0 | ($9 >>> 6 | 0) | 0) & 16843009 | 0;
       $9 = HEAP32[($1 + 8 | 0) >> 2] | 0;
       $141 = (($9 ^ -1 | 0) >>> 7 | 0 | ($9 >>> 6 | 0) | 0) & 16843009 | 0;
       $9 = HEAP32[($1 + 4 | 0) >> 2] | 0;
       $150 = (($9 ^ -1 | 0) >>> 7 | 0 | ($9 >>> 6 | 0) | 0) & 16843009 | 0;
       $9 = HEAP32[$1 >> 2] | 0;
       $2 = $132 + ($141 + ($150 + (((($9 ^ -1 | 0) >>> 7 | 0 | ($9 >>> 6 | 0) | 0) & 16843009 | 0) + $2 | 0) | 0) | 0) | 0;
       $1 = $1 + 16 | 0;
       if (($1 | 0) != ($0 | 0)) {
        continue label$11
       }
       break label$11;
      };
     }
     $3 = $3 - $6 | 0;
     $9 = $4 + $5 | 0;
     $8 = (Math_imul((($2 >>> 8 | 0) & 16711935 | 0) + ($2 & 16711935 | 0) | 0, 65537) >>> 16 | 0) + $8 | 0;
     if (!$7) {
      continue label$9
     }
     break label$9;
    };
    $2 = $4 + (($6 & 252 | 0) << 2 | 0) | 0;
    $1 = HEAP32[$2 >> 2] | 0;
    $1 = (($1 ^ -1 | 0) >>> 7 | 0 | ($1 >>> 6 | 0) | 0) & 16843009 | 0;
    label$12 : {
     if (($7 | 0) == (1 | 0)) {
      break label$12
     }
     $9 = HEAP32[($2 + 4 | 0) >> 2] | 0;
     $1 = ((($9 ^ -1 | 0) >>> 7 | 0 | ($9 >>> 6 | 0) | 0) & 16843009 | 0) + $1 | 0;
     if (($7 | 0) == (2 | 0)) {
      break label$12
     }
     $2 = HEAP32[($2 + 8 | 0) >> 2] | 0;
     $1 = ((($2 ^ -1 | 0) >>> 7 | 0 | ($2 >>> 6 | 0) | 0) & 16843009 | 0) + $1 | 0;
    }
    return (Math_imul((($1 >>> 8 | 0) & 459007 | 0) + ($1 & 16711935 | 0) | 0, 65537) >>> 16 | 0) + $8 | 0 | 0;
   }
   label$13 : {
    if ($1) {
     break label$13
    }
    return 0 | 0;
   }
   $9 = $1 & 3 | 0;
   label$14 : {
    label$15 : {
     if ($1 >>> 0 >= 4 >>> 0) {
      break label$15
     }
     $8 = 0;
     $2 = 0;
     break label$14;
    }
    $3 = $1 & -4 | 0;
    $8 = 0;
    $2 = 0;
    label$16 : while (1) {
     $1 = $0 + $2 | 0;
     $8 = ((($8 + ((HEAP8[$1 >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($1 + 1 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($1 + 2 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($1 + 3 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0;
     $2 = $2 + 4 | 0;
     if (($3 | 0) != ($2 | 0)) {
      continue label$16
     }
     break label$16;
    };
   }
   if (!$9) {
    break label$1
   }
   $1 = $0 + $2 | 0;
   label$17 : while (1) {
    $8 = $8 + ((HEAP8[$1 >> 0] | 0 | 0) > (-65 | 0)) | 0;
    $1 = $1 + 1 | 0;
    $9 = $9 + -1 | 0;
    if ($9) {
     continue label$17
    }
    break label$17;
   };
  }
  return $8 | 0;
 }
 
 function _ZN4core3fmt9Formatter12pad_integral12write_prefix17h581ad47c6930a5a3E($0, $1, $2, $3, $4) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  $4 = $4 | 0;
  label$1 : {
   if (($2 | 0) == (1114112 | 0)) {
    break label$1
   }
   if (!(FUNCTION_TABLE[HEAP32[($1 + 16 | 0) >> 2] | 0 | 0]($0, $2) | 0)) {
    break label$1
   }
   return 1 | 0;
  }
  label$2 : {
   if ($3) {
    break label$2
   }
   return 0 | 0;
  }
  return FUNCTION_TABLE[HEAP32[($1 + 12 | 0) >> 2] | 0 | 0]($0, $3, $4) | 0 | 0;
 }
 
 function _ZN4core3fmt9Formatter9write_str17h7b04ca2eef2f5010E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  return FUNCTION_TABLE[HEAP32[((HEAP32[($0 + 24 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($0 + 20 | 0) >> 2] | 0, $1, $2) | 0 | 0;
 }
 
 function _ZN4core3fmt9Formatter10debug_list17hd710ece3eac84443E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0;
  $2 = FUNCTION_TABLE[HEAP32[((HEAP32[($1 + 24 | 0) >> 2] | 0) + 12 | 0) >> 2] | 0 | 0](HEAP32[($1 + 20 | 0) >> 2] | 0, 1049172, 1) | 0;
  HEAP8[($0 + 5 | 0) >> 0] = 0;
  HEAP8[($0 + 4 | 0) >> 0] = $2;
  HEAP32[$0 >> 2] = $1;
 }
 
 function _ZN4core3str5count23char_count_general_case17ha75d4189ecacd84eE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $5 = 0, $3 = 0, $2 = 0, $4 = 0;
  label$1 : {
   if ($1) {
    break label$1
   }
   return 0 | 0;
  }
  $2 = $1 & 3 | 0;
  label$2 : {
   label$3 : {
    if ($1 >>> 0 >= 4 >>> 0) {
     break label$3
    }
    $1 = 0;
    $3 = 0;
    break label$2;
   }
   $4 = $1 & -4 | 0;
   $1 = 0;
   $3 = 0;
   label$4 : while (1) {
    $5 = $0 + $3 | 0;
    $1 = ((($1 + ((HEAP8[$5 >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($5 + 1 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($5 + 2 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0) + ((HEAP8[($5 + 3 | 0) >> 0] | 0 | 0) > (-65 | 0)) | 0;
    $3 = $3 + 4 | 0;
    if (($4 | 0) != ($3 | 0)) {
     continue label$4
    }
    break label$4;
   };
  }
  label$5 : {
   if (!$2) {
    break label$5
   }
   $5 = $0 + $3 | 0;
   label$6 : while (1) {
    $1 = $1 + ((HEAP8[$5 >> 0] | 0 | 0) > (-65 | 0)) | 0;
    $5 = $5 + 1 | 0;
    $2 = $2 + -1 | 0;
    if ($2) {
     continue label$6
    }
    break label$6;
   };
  }
  return $1 | 0;
 }
 
 function _ZN4core3fmt3num52_$LT$impl$u20$core__fmt__UpperHex$u20$for$u20$i8$GT$3fmt17h8bec9e17aa3a250bE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $3 = 0, $4 = 0, $2 = 0;
  $2 = __stack_pointer - 128 | 0;
  __stack_pointer = $2;
  $3 = HEAPU8[$0 >> 0] | 0;
  $0 = 0;
  label$1 : while (1) {
   $4 = $3 & 15 | 0;
   HEAP8[(($2 + $0 | 0) + 127 | 0) >> 0] = $4 >>> 0 < 10 >>> 0 ? $4 | 48 | 0 : $4 + 55 | 0;
   $0 = $0 + -1 | 0;
   $4 = $3 & 255 | 0;
   $3 = $4 >>> 4 | 0;
   if ($4 >>> 0 >= 16 >>> 0) {
    continue label$1
   }
   break label$1;
  };
  label$2 : {
   $3 = $0 + 128 | 0;
   if ($3 >>> 0 < 129 >>> 0) {
    break label$2
   }
   _ZN4core5slice5index26slice_start_index_len_fail17h65432e022682bf05E($3 | 0, 128 | 0, 1049360 | 0);
   wasm2js_trap();
  }
  $0 = _ZN4core3fmt9Formatter12pad_integral17hc60d9805b485ef36E($1 | 0, 1 | 0, 1049376 | 0, 2 | 0, ($2 + $0 | 0) + 128 | 0 | 0, 0 - $0 | 0 | 0) | 0;
  __stack_pointer = $2 + 128 | 0;
  return $0 | 0;
 }
 
 function _ZN4core3fmt3num52_$LT$impl$u20$core__fmt__LowerHex$u20$for$u20$i8$GT$3fmt17hbd8bbf103c04b7d4E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $3 = 0, $4 = 0, $2 = 0;
  $2 = __stack_pointer - 128 | 0;
  __stack_pointer = $2;
  $3 = HEAPU8[$0 >> 0] | 0;
  $0 = 0;
  label$1 : while (1) {
   $4 = $3 & 15 | 0;
   HEAP8[(($2 + $0 | 0) + 127 | 0) >> 0] = $4 >>> 0 < 10 >>> 0 ? $4 | 48 | 0 : $4 + 87 | 0;
   $0 = $0 + -1 | 0;
   $4 = $3 & 255 | 0;
   $3 = $4 >>> 4 | 0;
   if ($4 >>> 0 >= 16 >>> 0) {
    continue label$1
   }
   break label$1;
  };
  label$2 : {
   $3 = $0 + 128 | 0;
   if ($3 >>> 0 < 129 >>> 0) {
    break label$2
   }
   _ZN4core5slice5index26slice_start_index_len_fail17h65432e022682bf05E($3 | 0, 128 | 0, 1049360 | 0);
   wasm2js_trap();
  }
  $0 = _ZN4core3fmt9Formatter12pad_integral17hc60d9805b485ef36E($1 | 0, 1 | 0, 1049376 | 0, 2 | 0, ($2 + $0 | 0) + 128 | 0 | 0, 0 - $0 | 0 | 0) | 0;
  __stack_pointer = $2 + 128 | 0;
  return $0 | 0;
 }
 
 function _ZN4core3fmt3num3imp7fmt_u6417h6f5511515637a348E($0, $0$hi, $1, $2) {
  $0 = $0 | 0;
  $0$hi = $0$hi | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var i64toi32_i32$2 = 0, $4 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, $6 = 0, i64toi32_i32$3 = 0, i64toi32_i32$5 = 0, $3 = 0, $5 = 0, $5$hi = 0, $7 = 0, $8 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $30 = 0, $25 = 0, $25$hi = 0;
  $3 = __stack_pointer - 48 | 0;
  __stack_pointer = $3;
  $4 = 39;
  label$1 : {
   label$2 : {
    i64toi32_i32$0 = $0$hi;
    i64toi32_i32$2 = $0;
    i64toi32_i32$1 = 0;
    i64toi32_i32$3 = 1e4;
    if (i64toi32_i32$0 >>> 0 > i64toi32_i32$1 >>> 0 | ((i64toi32_i32$0 | 0) == (i64toi32_i32$1 | 0) & i64toi32_i32$2 >>> 0 >= i64toi32_i32$3 >>> 0 | 0) | 0) {
     break label$2
    }
    i64toi32_i32$2 = i64toi32_i32$0;
    $5 = $0;
    $5$hi = i64toi32_i32$2;
    break label$1;
   }
   $4 = 39;
   label$3 : while (1) {
    $6 = ($3 + 9 | 0) + $4 | 0;
    i64toi32_i32$2 = $0$hi;
    i64toi32_i32$0 = 0;
    i64toi32_i32$0 = __wasm_i64_udiv($0 | 0, i64toi32_i32$2 | 0, 1e4 | 0, i64toi32_i32$0 | 0) | 0;
    i64toi32_i32$2 = i64toi32_i32$HIGH_BITS;
    $5 = i64toi32_i32$0;
    $5$hi = i64toi32_i32$2;
    i64toi32_i32$0 = 0;
    i64toi32_i32$0 = __wasm_i64_mul($5 | 0, i64toi32_i32$2 | 0, 1e4 | 0, i64toi32_i32$0 | 0) | 0;
    i64toi32_i32$2 = i64toi32_i32$HIGH_BITS;
    $25 = i64toi32_i32$0;
    $25$hi = i64toi32_i32$2;
    i64toi32_i32$2 = $0$hi;
    i64toi32_i32$3 = $0;
    i64toi32_i32$0 = $25$hi;
    i64toi32_i32$1 = $25;
    i64toi32_i32$5 = (i64toi32_i32$3 >>> 0 < i64toi32_i32$1 >>> 0) + i64toi32_i32$0 | 0;
    i64toi32_i32$5 = i64toi32_i32$2 - i64toi32_i32$5 | 0;
    $7 = i64toi32_i32$3 - i64toi32_i32$1 | 0;
    $8 = (($7 & 65535 | 0) >>> 0) / (100 >>> 0) | 0;
    $18 = ($8 << 1 | 0) + 1049378 | 0;
    $19 = $6 + -4 | 0;
    $20 = HEAPU8[$18 >> 0] | 0 | ((HEAPU8[($18 + 1 | 0) >> 0] | 0) << 8 | 0) | 0;
    HEAP8[$19 >> 0] = $20;
    HEAP8[($19 + 1 | 0) >> 0] = $20 >>> 8 | 0;
    $21 = ((($7 - Math_imul($8, 100) | 0) & 65535 | 0) << 1 | 0) + 1049378 | 0;
    $22 = $6 + -2 | 0;
    $23 = HEAPU8[$21 >> 0] | 0 | ((HEAPU8[($21 + 1 | 0) >> 0] | 0) << 8 | 0) | 0;
    HEAP8[$22 >> 0] = $23;
    HEAP8[($22 + 1 | 0) >> 0] = $23 >>> 8 | 0;
    $4 = $4 + -4 | 0;
    i64toi32_i32$5 = i64toi32_i32$2;
    i64toi32_i32$5 = i64toi32_i32$2;
    i64toi32_i32$2 = i64toi32_i32$3;
    i64toi32_i32$3 = 0;
    i64toi32_i32$1 = 99999999;
    $6 = i64toi32_i32$5 >>> 0 > i64toi32_i32$3 >>> 0 | ((i64toi32_i32$5 | 0) == (i64toi32_i32$3 | 0) & i64toi32_i32$2 >>> 0 > i64toi32_i32$1 >>> 0 | 0) | 0;
    i64toi32_i32$2 = $5$hi;
    $0 = $5;
    $0$hi = i64toi32_i32$2;
    if ($6) {
     continue label$3
    }
    break label$3;
   };
  }
  label$4 : {
   label$5 : {
    i64toi32_i32$2 = $5$hi;
    i64toi32_i32$1 = $5;
    i64toi32_i32$5 = 0;
    i64toi32_i32$3 = 99;
    if (i64toi32_i32$2 >>> 0 > i64toi32_i32$5 >>> 0 | ((i64toi32_i32$2 | 0) == (i64toi32_i32$5 | 0) & i64toi32_i32$1 >>> 0 > i64toi32_i32$3 >>> 0 | 0) | 0) {
     break label$5
    }
    i64toi32_i32$1 = i64toi32_i32$2;
    i64toi32_i32$1 = i64toi32_i32$2;
    $6 = $5;
    break label$4;
   }
   $4 = $4 + -2 | 0;
   i64toi32_i32$1 = $5$hi;
   $6 = $5;
   $6 = (($6 & 65535 | 0) >>> 0) / (100 >>> 0) | 0;
   $24 = ((($5 - Math_imul($6, 100) | 0) & 65535 | 0) << 1 | 0) + 1049378 | 0;
   $26 = ($3 + 9 | 0) + $4 | 0;
   $27 = HEAPU8[$24 >> 0] | 0 | ((HEAPU8[($24 + 1 | 0) >> 0] | 0) << 8 | 0) | 0;
   HEAP8[$26 >> 0] = $27;
   HEAP8[($26 + 1 | 0) >> 0] = $27 >>> 8 | 0;
  }
  label$6 : {
   label$7 : {
    if ($6 >>> 0 < 10 >>> 0) {
     break label$7
    }
    $4 = $4 + -2 | 0;
    $28 = ($6 << 1 | 0) + 1049378 | 0;
    $29 = ($3 + 9 | 0) + $4 | 0;
    $30 = HEAPU8[$28 >> 0] | 0 | ((HEAPU8[($28 + 1 | 0) >> 0] | 0) << 8 | 0) | 0;
    HEAP8[$29 >> 0] = $30;
    HEAP8[($29 + 1 | 0) >> 0] = $30 >>> 8 | 0;
    break label$6;
   }
   $4 = $4 + -1 | 0;
   HEAP8[(($3 + 9 | 0) + $4 | 0) >> 0] = $6 | 48 | 0;
  }
  $4 = _ZN4core3fmt9Formatter12pad_integral17hc60d9805b485ef36E($2 | 0, $1 | 0, 1 | 0, 0 | 0, ($3 + 9 | 0) + $4 | 0 | 0, 39 - $4 | 0 | 0) | 0;
  __stack_pointer = $3 + 48 | 0;
  return $4 | 0;
 }
 
 function memcpy($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $5 = 0, $6 = 0, $4 = 0, $9 = 0, $8 = 0, $7 = 0, $10 = 0, $66 = 0;
  label$1 : {
   label$2 : {
    if ($2 >>> 0 >= 16 >>> 0) {
     break label$2
    }
    $3 = $0;
    break label$1;
   }
   $4 = (0 - $0 | 0) & 3 | 0;
   $5 = $0 + $4 | 0;
   label$3 : {
    if (!$4) {
     break label$3
    }
    $3 = $0;
    $6 = $1;
    label$4 : while (1) {
     HEAP8[$3 >> 0] = HEAPU8[$6 >> 0] | 0;
     $6 = $6 + 1 | 0;
     $3 = $3 + 1 | 0;
     if ($3 >>> 0 < $5 >>> 0) {
      continue label$4
     }
     break label$4;
    };
   }
   $7 = $2 - $4 | 0;
   $8 = $7 & -4 | 0;
   $3 = $5 + $8 | 0;
   label$5 : {
    label$6 : {
     $9 = $1 + $4 | 0;
     if (!($9 & 3 | 0)) {
      break label$6
     }
     if (($8 | 0) < (1 | 0)) {
      break label$5
     }
     $6 = $9 << 3 | 0;
     $2 = $6 & 24 | 0;
     $10 = $9 & -4 | 0;
     $1 = $10 + 4 | 0;
     $4 = (0 - $6 | 0) & 24 | 0;
     $6 = HEAP32[$10 >> 2] | 0;
     label$7 : while (1) {
      $66 = $6 >>> $2 | 0;
      $6 = HEAP32[$1 >> 2] | 0;
      HEAP32[$5 >> 2] = $66 | ($6 << $4 | 0) | 0;
      $1 = $1 + 4 | 0;
      $5 = $5 + 4 | 0;
      if ($5 >>> 0 < $3 >>> 0) {
       continue label$7
      }
      break label$5;
     };
    }
    if (($8 | 0) < (1 | 0)) {
     break label$5
    }
    $1 = $9;
    label$8 : while (1) {
     HEAP32[$5 >> 2] = HEAP32[$1 >> 2] | 0;
     $1 = $1 + 4 | 0;
     $5 = $5 + 4 | 0;
     if ($5 >>> 0 < $3 >>> 0) {
      continue label$8
     }
     break label$8;
    };
   }
   $2 = $7 & 3 | 0;
   $1 = $9 + $8 | 0;
  }
  label$9 : {
   if (!$2) {
    break label$9
   }
   $5 = $3 + $2 | 0;
   label$10 : while (1) {
    HEAP8[$3 >> 0] = HEAPU8[$1 >> 0] | 0;
    $1 = $1 + 1 | 0;
    $3 = $3 + 1 | 0;
    if ($3 >>> 0 < $5 >>> 0) {
     continue label$10
    }
    break label$10;
   };
  }
  return $0 | 0;
 }
 
 function _ZN17compiler_builtins3mem7memmove17h66fcfbf60419fbe2E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $4 = 0, $5 = 0, $8 = 0, $6 = 0, $3 = 0, $7 = 0, $9 = 0, $10 = 0, $81 = 0, $164 = 0;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      if (($0 - $1 | 0) >>> 0 >= $2 >>> 0) {
       break label$4
      }
      $3 = $1 + $2 | 0;
      $4 = $0 + $2 | 0;
      label$5 : {
       if ($2 >>> 0 >= 16 >>> 0) {
        break label$5
       }
       $5 = $0;
       break label$2;
      }
      $5 = $4 & -4 | 0;
      $6 = $4 & 3 | 0;
      $7 = 0 - $6 | 0;
      label$6 : {
       if (!$6) {
        break label$6
       }
       $8 = ($1 + $2 | 0) + -1 | 0;
       label$7 : while (1) {
        $4 = $4 + -1 | 0;
        HEAP8[$4 >> 0] = HEAPU8[$8 >> 0] | 0;
        $8 = $8 + -1 | 0;
        if ($5 >>> 0 < $4 >>> 0) {
         continue label$7
        }
        break label$7;
       };
      }
      $9 = $2 - $6 | 0;
      $6 = $9 & -4 | 0;
      $4 = $5 - $6 | 0;
      label$8 : {
       $7 = $3 + $7 | 0;
       if (!($7 & 3 | 0)) {
        break label$8
       }
       if (($6 | 0) < (1 | 0)) {
        break label$3
       }
       $8 = $7 << 3 | 0;
       $2 = $8 & 24 | 0;
       $10 = $7 & -4 | 0;
       $1 = $10 + -4 | 0;
       $3 = (0 - $8 | 0) & 24 | 0;
       $8 = HEAP32[$10 >> 2] | 0;
       label$9 : while (1) {
        $5 = $5 + -4 | 0;
        $81 = $8 << $3 | 0;
        $8 = HEAP32[$1 >> 2] | 0;
        HEAP32[$5 >> 2] = $81 | ($8 >>> $2 | 0) | 0;
        $1 = $1 + -4 | 0;
        if ($4 >>> 0 < $5 >>> 0) {
         continue label$9
        }
        break label$3;
       };
      }
      if (($6 | 0) < (1 | 0)) {
       break label$3
      }
      $1 = ($9 + $1 | 0) + -4 | 0;
      label$10 : while (1) {
       $5 = $5 + -4 | 0;
       HEAP32[$5 >> 2] = HEAP32[$1 >> 2] | 0;
       $1 = $1 + -4 | 0;
       if ($4 >>> 0 < $5 >>> 0) {
        continue label$10
       }
       break label$3;
      };
     }
     label$11 : {
      label$12 : {
       if ($2 >>> 0 >= 16 >>> 0) {
        break label$12
       }
       $4 = $0;
       break label$11;
      }
      $3 = (0 - $0 | 0) & 3 | 0;
      $5 = $0 + $3 | 0;
      label$13 : {
       if (!$3) {
        break label$13
       }
       $4 = $0;
       $8 = $1;
       label$14 : while (1) {
        HEAP8[$4 >> 0] = HEAPU8[$8 >> 0] | 0;
        $8 = $8 + 1 | 0;
        $4 = $4 + 1 | 0;
        if ($4 >>> 0 < $5 >>> 0) {
         continue label$14
        }
        break label$14;
       };
      }
      $9 = $2 - $3 | 0;
      $7 = $9 & -4 | 0;
      $4 = $5 + $7 | 0;
      label$15 : {
       label$16 : {
        $6 = $1 + $3 | 0;
        if (!($6 & 3 | 0)) {
         break label$16
        }
        if (($7 | 0) < (1 | 0)) {
         break label$15
        }
        $8 = $6 << 3 | 0;
        $2 = $8 & 24 | 0;
        $10 = $6 & -4 | 0;
        $1 = $10 + 4 | 0;
        $3 = (0 - $8 | 0) & 24 | 0;
        $8 = HEAP32[$10 >> 2] | 0;
        label$17 : while (1) {
         $164 = $8 >>> $2 | 0;
         $8 = HEAP32[$1 >> 2] | 0;
         HEAP32[$5 >> 2] = $164 | ($8 << $3 | 0) | 0;
         $1 = $1 + 4 | 0;
         $5 = $5 + 4 | 0;
         if ($5 >>> 0 < $4 >>> 0) {
          continue label$17
         }
         break label$15;
        };
       }
       if (($7 | 0) < (1 | 0)) {
        break label$15
       }
       $1 = $6;
       label$18 : while (1) {
        HEAP32[$5 >> 2] = HEAP32[$1 >> 2] | 0;
        $1 = $1 + 4 | 0;
        $5 = $5 + 4 | 0;
        if ($5 >>> 0 < $4 >>> 0) {
         continue label$18
        }
        break label$18;
       };
      }
      $2 = $9 & 3 | 0;
      $1 = $6 + $7 | 0;
     }
     if (!$2) {
      break label$1
     }
     $5 = $4 + $2 | 0;
     label$19 : while (1) {
      HEAP8[$4 >> 0] = HEAPU8[$1 >> 0] | 0;
      $1 = $1 + 1 | 0;
      $4 = $4 + 1 | 0;
      if ($4 >>> 0 < $5 >>> 0) {
       continue label$19
      }
      break label$1;
     };
    }
    $1 = $9 & 3 | 0;
    if (!$1) {
     break label$1
    }
    $3 = $7 + (0 - $6 | 0) | 0;
    $5 = $4 - $1 | 0;
   }
   $1 = $3 + -1 | 0;
   label$20 : while (1) {
    $4 = $4 + -1 | 0;
    HEAP8[$4 >> 0] = HEAPU8[$1 >> 0] | 0;
    $1 = $1 + -1 | 0;
    if ($5 >>> 0 < $4 >>> 0) {
     continue label$20
    }
    break label$20;
   };
  }
  return $0 | 0;
 }
 
 function memmove($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  return _ZN17compiler_builtins3mem7memmove17h66fcfbf60419fbe2E($0 | 0, $1 | 0, $2 | 0) | 0 | 0;
 }
 
 function _ZN5alloc11collections5btree4node210Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Leaf$GT$$C$alloc__collections__btree__node__marker__Edge$GT$16insert_recursing17h01740383b348720fE($0, $1, $2, $3, $4) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  $4 = $4 | 0;
  var $6 = 0, $5 = 0, $8 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, $11 = 0, $7 = 0, $12 = 0, $10 = 0, $9 = 0, $17 = 0, $14 = 0, $16 = 0, $15 = 0, $13 = 0, $18 = 0, $19 = 0, $74 = 0, $101 = 0, $116 = 0, $143 = 0, $160 = 0, $187 = 0, $202 = 0, $229 = 0, $234 = 0, $269 = 0, $331 = 0, $345 = 0, $389 = 0, $399 = 0, $415 = 0, $432 = 0, $586 = 0, $603 = 0, $693 = 0, $734 = 0, $739 = 0, $755 = 0, $770 = 0, $871 = 0, $890 = 0, $923 = 0;
  $5 = __stack_pointer - 80 | 0;
  __stack_pointer = $5;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        label$7 : {
         label$8 : {
          label$9 : {
           label$10 : {
            label$11 : {
             label$12 : {
              label$13 : {
               label$14 : {
                label$15 : {
                 label$16 : {
                  label$17 : {
                   label$18 : {
                    label$19 : {
                     label$20 : {
                      $6 = HEAP32[$1 >> 2] | 0;
                      $7 = HEAPU16[($6 + 182 | 0) >> 1] | 0;
                      if ($7 >>> 0 < 11 >>> 0) {
                       break label$20
                      }
                      HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
                      $8 = HEAP32[($1 + 4 | 0) >> 2] | 0;
                      $9 = HEAP32[($1 + 8 | 0) >> 2] | 0;
                      $7 = __rust_alloc(184 | 0, 4 | 0) | 0;
                      if (!$7) {
                       break label$12
                      }
                      HEAP16[($7 + 182 | 0) >> 1] = 0;
                      HEAP32[$7 >> 2] = 0;
                      if ($9 >>> 0 < 5 >>> 0) {
                       break label$19
                      }
                      switch ($9 + -5 | 0 | 0) {
                      case 1:
                       break label$16;
                      case 0:
                       break label$17;
                      default:
                       break label$18;
                      };
                     }
                     $10 = $6 + 4 | 0;
                     $8 = HEAP32[($1 + 8 | 0) >> 2] | 0;
                     $11 = $10 + ($8 << 2 | 0) | 0;
                     $1 = HEAP32[($1 + 4 | 0) >> 2] | 0;
                     $12 = $8 + 1 | 0;
                     if ($12 >>> 0 <= $7 >>> 0) {
                      break label$14
                     }
                     HEAP32[$11 >> 2] = $2;
                     break label$13;
                    }
                    $1 = (HEAPU16[($6 + 182 | 0) >> 1] | 0) + -5 | 0;
                    HEAP16[($7 + 182 | 0) >> 1] = $1;
                    $12 = ($5 + 48 | 0) + 8 | 0;
                    HEAP32[$12 >> 2] = HEAP32[($6 + 104 | 0) >> 2] | 0;
                    i64toi32_i32$0 = HEAP32[($6 + 96 | 0) >> 2] | 0;
                    i64toi32_i32$1 = HEAP32[($6 + 100 | 0) >> 2] | 0;
                    $74 = i64toi32_i32$0;
                    i64toi32_i32$0 = $5;
                    HEAP32[($5 + 48 | 0) >> 2] = $74;
                    HEAP32[($5 + 52 | 0) >> 2] = i64toi32_i32$1;
                    if ($1 >>> 0 >= 12 >>> 0) {
                     break label$11
                    }
                    $11 = HEAP32[($6 + 20 | 0) >> 2] | 0;
                    memcpy($7 + 4 | 0 | 0, $6 + 24 | 0 | 0, $1 << 2 | 0 | 0) | 0;
                    memcpy($7 + 48 | 0 | 0, $6 + 108 | 0 | 0, Math_imul($1, 12) | 0) | 0;
                    HEAP16[($6 + 182 | 0) >> 1] = 4;
                    HEAP32[(($5 + 32 | 0) + 8 | 0) >> 2] = HEAP32[$12 >> 2] | 0;
                    i64toi32_i32$1 = HEAP32[($5 + 48 | 0) >> 2] | 0;
                    i64toi32_i32$0 = HEAP32[($5 + 52 | 0) >> 2] | 0;
                    $101 = i64toi32_i32$1;
                    i64toi32_i32$1 = $5;
                    HEAP32[($5 + 32 | 0) >> 2] = $101;
                    HEAP32[($5 + 36 | 0) >> 2] = i64toi32_i32$0;
                    break label$7;
                   }
                   $1 = (HEAPU16[($6 + 182 | 0) >> 1] | 0) + -7 | 0;
                   HEAP16[($7 + 182 | 0) >> 1] = $1;
                   $12 = ($5 + 48 | 0) + 8 | 0;
                   HEAP32[$12 >> 2] = HEAP32[($6 + 128 | 0) >> 2] | 0;
                   i64toi32_i32$0 = HEAP32[($6 + 120 | 0) >> 2] | 0;
                   i64toi32_i32$1 = HEAP32[($6 + 124 | 0) >> 2] | 0;
                   $116 = i64toi32_i32$0;
                   i64toi32_i32$0 = $5;
                   HEAP32[($5 + 48 | 0) >> 2] = $116;
                   HEAP32[($5 + 52 | 0) >> 2] = i64toi32_i32$1;
                   if ($1 >>> 0 >= 12 >>> 0) {
                    break label$10
                   }
                   $11 = HEAP32[($6 + 28 | 0) >> 2] | 0;
                   memcpy($7 + 4 | 0 | 0, $6 + 32 | 0 | 0, $1 << 2 | 0 | 0) | 0;
                   memcpy($7 + 48 | 0 | 0, $6 + 132 | 0 | 0, Math_imul($1, 12) | 0) | 0;
                   HEAP16[($6 + 182 | 0) >> 1] = 6;
                   HEAP32[(($5 + 32 | 0) + 8 | 0) >> 2] = HEAP32[$12 >> 2] | 0;
                   i64toi32_i32$1 = HEAP32[($5 + 48 | 0) >> 2] | 0;
                   i64toi32_i32$0 = HEAP32[($5 + 52 | 0) >> 2] | 0;
                   $143 = i64toi32_i32$1;
                   i64toi32_i32$1 = $5;
                   HEAP32[($5 + 32 | 0) >> 2] = $143;
                   HEAP32[($5 + 36 | 0) >> 2] = i64toi32_i32$0;
                   $9 = $9 + -7 | 0;
                   break label$15;
                  }
                  $1 = (HEAPU16[($6 + 182 | 0) >> 1] | 0) + -6 | 0;
                  HEAP16[($7 + 182 | 0) >> 1] = $1;
                  $12 = ($5 + 48 | 0) + 8 | 0;
                  HEAP32[$12 >> 2] = HEAP32[($6 + 116 | 0) >> 2] | 0;
                  i64toi32_i32$0 = HEAP32[($6 + 108 | 0) >> 2] | 0;
                  i64toi32_i32$1 = HEAP32[($6 + 112 | 0) >> 2] | 0;
                  $160 = i64toi32_i32$0;
                  i64toi32_i32$0 = $5;
                  HEAP32[($5 + 48 | 0) >> 2] = $160;
                  HEAP32[($5 + 52 | 0) >> 2] = i64toi32_i32$1;
                  if ($1 >>> 0 >= 12 >>> 0) {
                   break label$9
                  }
                  $11 = HEAP32[($6 + 24 | 0) >> 2] | 0;
                  memcpy($7 + 4 | 0 | 0, $6 + 28 | 0 | 0, $1 << 2 | 0 | 0) | 0;
                  memcpy($7 + 48 | 0 | 0, $6 + 120 | 0 | 0, Math_imul($1, 12) | 0) | 0;
                  $9 = 5;
                  HEAP16[($6 + 182 | 0) >> 1] = 5;
                  HEAP32[(($5 + 32 | 0) + 8 | 0) >> 2] = HEAP32[$12 >> 2] | 0;
                  i64toi32_i32$1 = HEAP32[($5 + 48 | 0) >> 2] | 0;
                  i64toi32_i32$0 = HEAP32[($5 + 52 | 0) >> 2] | 0;
                  $187 = i64toi32_i32$1;
                  i64toi32_i32$1 = $5;
                  HEAP32[($5 + 32 | 0) >> 2] = $187;
                  HEAP32[($5 + 36 | 0) >> 2] = i64toi32_i32$0;
                  break label$7;
                 }
                 $1 = (HEAPU16[($6 + 182 | 0) >> 1] | 0) + -6 | 0;
                 HEAP16[($7 + 182 | 0) >> 1] = $1;
                 $12 = ($5 + 48 | 0) + 8 | 0;
                 HEAP32[$12 >> 2] = HEAP32[($6 + 116 | 0) >> 2] | 0;
                 i64toi32_i32$0 = HEAP32[($6 + 108 | 0) >> 2] | 0;
                 i64toi32_i32$1 = HEAP32[($6 + 112 | 0) >> 2] | 0;
                 $202 = i64toi32_i32$0;
                 i64toi32_i32$0 = $5;
                 HEAP32[($5 + 48 | 0) >> 2] = $202;
                 HEAP32[($5 + 52 | 0) >> 2] = i64toi32_i32$1;
                 if ($1 >>> 0 >= 12 >>> 0) {
                  break label$8
                 }
                 $11 = HEAP32[($6 + 24 | 0) >> 2] | 0;
                 memcpy($7 + 4 | 0 | 0, $6 + 28 | 0 | 0, $1 << 2 | 0 | 0) | 0;
                 memcpy($7 + 48 | 0 | 0, $6 + 120 | 0 | 0, Math_imul($1, 12) | 0) | 0;
                 HEAP16[($6 + 182 | 0) >> 1] = 5;
                 HEAP32[(($5 + 32 | 0) + 8 | 0) >> 2] = HEAP32[$12 >> 2] | 0;
                 i64toi32_i32$1 = HEAP32[($5 + 48 | 0) >> 2] | 0;
                 i64toi32_i32$0 = HEAP32[($5 + 52 | 0) >> 2] | 0;
                 $229 = i64toi32_i32$1;
                 i64toi32_i32$1 = $5;
                 HEAP32[($5 + 32 | 0) >> 2] = $229;
                 HEAP32[($5 + 36 | 0) >> 2] = i64toi32_i32$0;
                 $9 = 0;
                }
                $13 = 0;
                $14 = $7;
                break label$6;
               }
               $234 = $10 + ($12 << 2 | 0) | 0;
               $10 = $7 - $8 | 0;
               memmove($234 | 0, $11 | 0, $10 << 2 | 0 | 0) | 0;
               HEAP32[$11 >> 2] = $2;
               $11 = $6 + 48 | 0;
               memmove($11 + Math_imul($12, 12) | 0 | 0, $11 + Math_imul($8, 12) | 0 | 0, Math_imul($10, 12) | 0) | 0;
              }
              $11 = $6 + Math_imul($8, 12) | 0;
              HEAP32[($11 + 56 | 0) >> 2] = HEAP32[($3 + 8 | 0) >> 2] | 0;
              i64toi32_i32$0 = HEAP32[$3 >> 2] | 0;
              i64toi32_i32$1 = HEAP32[($3 + 4 | 0) >> 2] | 0;
              $269 = i64toi32_i32$0;
              i64toi32_i32$0 = $11 + 48 | 0;
              HEAP32[i64toi32_i32$0 >> 2] = $269;
              HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
              HEAP16[($6 + 182 | 0) >> 1] = $7 + 1 | 0;
              HEAP32[($0 + 8 | 0) >> 2] = $8;
              HEAP32[($0 + 4 | 0) >> 2] = $1;
              HEAP32[$0 >> 2] = $6;
              break label$5;
             }
             _ZN5alloc5alloc18handle_alloc_error17h123ae56be4092711E(4 | 0, 184 | 0);
             wasm2js_trap();
            }
            _ZN4core5slice5index24slice_end_index_len_fail17h02d344349d5072f8E($1 | 0, 11 | 0, 1050144 | 0);
            wasm2js_trap();
           }
           _ZN4core5slice5index24slice_end_index_len_fail17h02d344349d5072f8E($1 | 0, 11 | 0, 1050144 | 0);
           wasm2js_trap();
          }
          _ZN4core5slice5index24slice_end_index_len_fail17h02d344349d5072f8E($1 | 0, 11 | 0, 1050144 | 0);
          wasm2js_trap();
         }
         _ZN4core5slice5index24slice_end_index_len_fail17h02d344349d5072f8E($1 | 0, 11 | 0, 1050144 | 0);
         wasm2js_trap();
        }
        $13 = $8;
        $14 = $6;
       }
       $1 = ($14 + 4 | 0) + ($9 << 2 | 0) | 0;
       label$21 : {
        label$22 : {
         $10 = HEAPU16[($14 + 182 | 0) >> 1] | 0;
         if ($10 >>> 0 > $9 >>> 0) {
          break label$22
         }
         HEAP32[$1 >> 2] = $2;
         break label$21;
        }
        $12 = $10 - $9 | 0;
        memmove($1 + 4 | 0 | 0, $1 | 0, $12 << 2 | 0 | 0) | 0;
        HEAP32[$1 >> 2] = $2;
        $1 = $14 + Math_imul($9, 12) | 0;
        memmove($1 + 60 | 0 | 0, $1 + 48 | 0 | 0, Math_imul($12, 12) | 0) | 0;
       }
       $1 = $14 + Math_imul($9, 12) | 0;
       HEAP32[($1 + 56 | 0) >> 2] = HEAP32[($3 + 8 | 0) >> 2] | 0;
       i64toi32_i32$1 = HEAP32[$3 >> 2] | 0;
       i64toi32_i32$0 = HEAP32[($3 + 4 | 0) >> 2] | 0;
       $331 = i64toi32_i32$1;
       i64toi32_i32$1 = $1 + 48 | 0;
       HEAP32[i64toi32_i32$1 >> 2] = $331;
       HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
       $12 = ($5 + 16 | 0) + 8 | 0;
       HEAP32[$12 >> 2] = HEAP32[(($5 + 32 | 0) + 8 | 0) >> 2] | 0;
       HEAP16[($14 + 182 | 0) >> 1] = $10 + 1 | 0;
       i64toi32_i32$0 = HEAP32[($5 + 32 | 0) >> 2] | 0;
       i64toi32_i32$1 = HEAP32[($5 + 36 | 0) >> 2] | 0;
       $345 = i64toi32_i32$0;
       i64toi32_i32$0 = $5;
       HEAP32[($5 + 16 | 0) >> 2] = $345;
       HEAP32[($5 + 20 | 0) >> 2] = i64toi32_i32$1;
       label$23 : {
        label$24 : {
         label$25 : {
          $1 = HEAP32[$6 >> 2] | 0;
          if ($1) {
           break label$25
          }
          $3 = 0;
          break label$24;
         }
         $10 = $5 + 68 | 0;
         $3 = 0;
         label$26 : while (1) {
          if (($8 | 0) != ($3 | 0)) {
           break label$4
          }
          $3 = HEAPU16[($6 + 180 | 0) >> 1] | 0;
          label$27 : {
           label$28 : {
            label$29 : {
             label$30 : {
              label$31 : {
               label$32 : {
                label$33 : {
                 label$34 : {
                  $2 = HEAPU16[($1 + 182 | 0) >> 1] | 0;
                  if ($2 >>> 0 < 11 >>> 0) {
                   break label$34
                  }
                  $6 = $8 + 1 | 0;
                  if ($3 >>> 0 < 5 >>> 0) {
                   break label$33
                  }
                  switch ($3 + -5 | 0 | 0) {
                  case 1:
                   break label$30;
                  case 0:
                   break label$31;
                  default:
                   break label$32;
                  };
                 }
                 $10 = $1 + 4 | 0;
                 $15 = $3 << 2 | 0;
                 $8 = $10 + $15 | 0;
                 $6 = $3 + 1 | 0;
                 $12 = $2 + 1 | 0;
                 label$35 : {
                  label$36 : {
                   if ($3 >>> 0 < $2 >>> 0) {
                    break label$36
                   }
                   HEAP32[$8 >> 2] = $11;
                   $8 = $1 + Math_imul($3, 12) | 0;
                   i64toi32_i32$1 = HEAP32[($5 + 16 | 0) >> 2] | 0;
                   i64toi32_i32$0 = HEAP32[($5 + 20 | 0) >> 2] | 0;
                   $389 = i64toi32_i32$1;
                   i64toi32_i32$1 = $8 + 48 | 0;
                   HEAP32[i64toi32_i32$1 >> 2] = $389;
                   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
                   HEAP32[($8 + 56 | 0) >> 2] = HEAP32[($5 + 24 | 0) >> 2] | 0;
                   break label$35;
                  }
                  $16 = $6 << 2 | 0;
                  $399 = $10 + $16 | 0;
                  $10 = $2 - $3 | 0;
                  $17 = $10 << 2 | 0;
                  memmove($399 | 0, $8 | 0, $17 | 0) | 0;
                  HEAP32[$8 >> 2] = $11;
                  $8 = $1 + 48 | 0;
                  $415 = $8 + Math_imul($6, 12) | 0;
                  $8 = $8 + Math_imul($3, 12) | 0;
                  memmove($415 | 0, $8 | 0, Math_imul($10, 12) | 0) | 0;
                  HEAP32[($8 + 8 | 0) >> 2] = HEAP32[(($5 + 16 | 0) + 8 | 0) >> 2] | 0;
                  i64toi32_i32$0 = HEAP32[($5 + 16 | 0) >> 2] | 0;
                  i64toi32_i32$1 = HEAP32[($5 + 20 | 0) >> 2] | 0;
                  $432 = i64toi32_i32$0;
                  i64toi32_i32$0 = $8;
                  HEAP32[$8 >> 2] = $432;
                  HEAP32[($8 + 4 | 0) >> 2] = i64toi32_i32$1;
                  $8 = $1 + 184 | 0;
                  memmove(($8 + $15 | 0) + 8 | 0 | 0, $8 + $16 | 0 | 0, $17 | 0) | 0;
                 }
                 HEAP16[($1 + 182 | 0) >> 1] = $12;
                 HEAP32[(($1 + ($6 << 2 | 0) | 0) + 184 | 0) >> 2] = $7;
                 $11 = $2 + 2 | 0;
                 if ($6 >>> 0 >= $11 >>> 0) {
                  break label$23
                 }
                 label$37 : {
                  $2 = $2 - $3 | 0;
                  $8 = ($2 + 1 | 0) & 3 | 0;
                  if (!$8) {
                   break label$37
                  }
                  $3 = ($1 + ($3 << 2 | 0) | 0) + 188 | 0;
                  label$38 : while (1) {
                   $7 = HEAP32[$3 >> 2] | 0;
                   HEAP16[($7 + 180 | 0) >> 1] = $6;
                   HEAP32[$7 >> 2] = $1;
                   $3 = $3 + 4 | 0;
                   $6 = $6 + 1 | 0;
                   $8 = $8 + -1 | 0;
                   if ($8) {
                    continue label$38
                   }
                   break label$38;
                  };
                 }
                 if ($2 >>> 0 < 3 >>> 0) {
                  break label$23
                 }
                 $3 = (($6 << 2 | 0) + $1 | 0) + 196 | 0;
                 label$39 : while (1) {
                  $8 = HEAP32[($3 + -12 | 0) >> 2] | 0;
                  HEAP16[($8 + 180 | 0) >> 1] = $6;
                  HEAP32[$8 >> 2] = $1;
                  $8 = HEAP32[($3 + -8 | 0) >> 2] | 0;
                  HEAP16[($8 + 180 | 0) >> 1] = $6 + 1 | 0;
                  HEAP32[$8 >> 2] = $1;
                  $8 = HEAP32[($3 + -4 | 0) >> 2] | 0;
                  HEAP16[($8 + 180 | 0) >> 1] = $6 + 2 | 0;
                  HEAP32[$8 >> 2] = $1;
                  $8 = HEAP32[$3 >> 2] | 0;
                  HEAP16[($8 + 180 | 0) >> 1] = $6 + 3 | 0;
                  HEAP32[$8 >> 2] = $1;
                  $3 = $3 + 16 | 0;
                  $6 = $6 + 4 | 0;
                  if (($11 | 0) != ($6 | 0)) {
                   continue label$39
                  }
                  break label$23;
                 };
                }
                HEAP32[($5 + 40 | 0) >> 2] = 4;
                HEAP32[($5 + 36 | 0) >> 2] = $6;
                HEAP32[($5 + 32 | 0) >> 2] = $1;
                _ZN5alloc11collections5btree4node212Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Internal$GT$$C$alloc__collections__btree__node__marker__KV$GT$5split17h714854686ba3ee4cE($5 + 48 | 0 | 0, $5 + 32 | 0 | 0);
                $1 = HEAP32[($5 + 48 | 0) >> 2] | 0;
                break label$28;
               }
               HEAP32[($5 + 40 | 0) >> 2] = 6;
               HEAP32[($5 + 36 | 0) >> 2] = $6;
               HEAP32[($5 + 32 | 0) >> 2] = $1;
               $3 = $3 + -7 | 0;
               break label$29;
              }
              HEAP32[($5 + 40 | 0) >> 2] = 5;
              HEAP32[($5 + 36 | 0) >> 2] = $6;
              HEAP32[($5 + 32 | 0) >> 2] = $1;
              _ZN5alloc11collections5btree4node212Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Internal$GT$$C$alloc__collections__btree__node__marker__KV$GT$5split17h714854686ba3ee4cE($5 + 48 | 0 | 0, $5 + 32 | 0 | 0);
              $6 = HEAP32[($5 + 48 | 0) >> 2] | 0;
              $1 = HEAPU16[($6 + 182 | 0) >> 1] | 0;
              $3 = $1 + 1 | 0;
              label$40 : {
               label$41 : {
                label$42 : {
                 if ($1 >>> 0 < 6 >>> 0) {
                  break label$42
                 }
                 $8 = $1 + -5 | 0;
                 memmove($6 + 28 | 0 | 0, $6 + 24 | 0 | 0, $8 << 2 | 0 | 0) | 0;
                 HEAP32[($6 + 24 | 0) >> 2] = $11;
                 memmove($6 + 120 | 0 | 0, $6 + 108 | 0 | 0, Math_imul($8, 12) | 0) | 0;
                 HEAP32[($6 + 116 | 0) >> 2] = HEAP32[$12 >> 2] | 0;
                 i64toi32_i32$1 = HEAP32[($5 + 16 | 0) >> 2] | 0;
                 i64toi32_i32$0 = HEAP32[($5 + 20 | 0) >> 2] | 0;
                 $586 = i64toi32_i32$1;
                 i64toi32_i32$1 = $6;
                 HEAP32[($6 + 108 | 0) >> 2] = $586;
                 HEAP32[($6 + 112 | 0) >> 2] = i64toi32_i32$0;
                 memmove($6 + 212 | 0 | 0, $6 + 208 | 0 | 0, ($1 << 2 | 0) + -20 | 0 | 0) | 0;
                 HEAP16[($6 + 182 | 0) >> 1] = $3;
                 HEAP32[($6 + 208 | 0) >> 2] = $7;
                 break label$41;
                }
                HEAP32[($6 + 24 | 0) >> 2] = $11;
                i64toi32_i32$0 = HEAP32[($5 + 16 | 0) >> 2] | 0;
                i64toi32_i32$1 = HEAP32[($5 + 20 | 0) >> 2] | 0;
                $603 = i64toi32_i32$0;
                i64toi32_i32$0 = $6;
                HEAP32[($6 + 108 | 0) >> 2] = $603;
                HEAP32[($6 + 112 | 0) >> 2] = i64toi32_i32$1;
                HEAP32[($6 + 208 | 0) >> 2] = $7;
                HEAP16[($6 + 182 | 0) >> 1] = $3;
                HEAP32[($6 + 116 | 0) >> 2] = HEAP32[$12 >> 2] | 0;
                if (($1 | 0) != (5 | 0)) {
                 break label$40
                }
               }
               $7 = $1 & 3 | 0;
               $3 = 6;
               label$43 : {
                if (($1 + -5 | 0) >>> 0 < 3 >>> 0) {
                 break label$43
                }
                $2 = ($1 & 65532 | 0) + -8 | 0;
                $1 = 6;
                $8 = 0;
                label$44 : while (1) {
                 $3 = $6 + $8 | 0;
                 $11 = HEAP32[($3 + 208 | 0) >> 2] | 0;
                 HEAP16[($11 + 180 | 0) >> 1] = $1;
                 HEAP32[$11 >> 2] = $6;
                 $11 = HEAP32[($3 + 212 | 0) >> 2] | 0;
                 HEAP16[($11 + 180 | 0) >> 1] = $1 + 1 | 0;
                 HEAP32[$11 >> 2] = $6;
                 $11 = HEAP32[($3 + 216 | 0) >> 2] | 0;
                 HEAP16[($11 + 180 | 0) >> 1] = $1 + 2 | 0;
                 HEAP32[$11 >> 2] = $6;
                 $3 = HEAP32[($3 + 220 | 0) >> 2] | 0;
                 HEAP16[($3 + 180 | 0) >> 1] = $1 + 3 | 0;
                 HEAP32[$3 >> 2] = $6;
                 $8 = $8 + 16 | 0;
                 $11 = $1 + -6 | 0;
                 $3 = $1 + 4 | 0;
                 $1 = $3;
                 if (($11 | 0) != ($2 | 0)) {
                  continue label$44
                 }
                 break label$44;
                };
               }
               if (!$7) {
                break label$40
               }
               $1 = ($6 + ($3 << 2 | 0) | 0) + 184 | 0;
               label$45 : while (1) {
                $8 = HEAP32[$1 >> 2] | 0;
                HEAP16[($8 + 180 | 0) >> 1] = $3;
                HEAP32[$8 >> 2] = $6;
                $1 = $1 + 4 | 0;
                $3 = $3 + 1 | 0;
                $7 = $7 + -1 | 0;
                if ($7) {
                 continue label$45
                }
                break label$45;
               };
              }
              HEAP32[($5 + 8 | 0) >> 2] = HEAP32[($10 + 8 | 0) >> 2] | 0;
              i64toi32_i32$1 = HEAP32[$10 >> 2] | 0;
              i64toi32_i32$0 = HEAP32[($10 + 4 | 0) >> 2] | 0;
              $693 = i64toi32_i32$1;
              i64toi32_i32$1 = $5;
              HEAP32[$5 >> 2] = $693;
              HEAP32[($5 + 4 | 0) >> 2] = i64toi32_i32$0;
              break label$27;
             }
             HEAP32[($5 + 40 | 0) >> 2] = 5;
             HEAP32[($5 + 36 | 0) >> 2] = $6;
             HEAP32[($5 + 32 | 0) >> 2] = $1;
             $3 = 0;
            }
            _ZN5alloc11collections5btree4node212Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Internal$GT$$C$alloc__collections__btree__node__marker__KV$GT$5split17h714854686ba3ee4cE($5 + 48 | 0 | 0, $5 + 32 | 0 | 0);
            $1 = HEAP32[($5 + 56 | 0) >> 2] | 0;
           }
           $17 = $1 + 4 | 0;
           $16 = $3 << 2 | 0;
           $2 = $17 + $16 | 0;
           $6 = $3 + 1 | 0;
           $8 = HEAPU16[($1 + 182 | 0) >> 1] | 0;
           $15 = $8 + 1 | 0;
           label$46 : {
            label$47 : {
             if ($8 >>> 0 > $3 >>> 0) {
              break label$47
             }
             HEAP32[$2 >> 2] = $11;
             $11 = $1 + Math_imul($3, 12) | 0;
             HEAP32[($11 + 56 | 0) >> 2] = HEAP32[$12 >> 2] | 0;
             i64toi32_i32$0 = HEAP32[($5 + 16 | 0) >> 2] | 0;
             i64toi32_i32$1 = HEAP32[($5 + 20 | 0) >> 2] | 0;
             $734 = i64toi32_i32$0;
             i64toi32_i32$0 = $11 + 48 | 0;
             HEAP32[i64toi32_i32$0 >> 2] = $734;
             HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
             break label$46;
            }
            $18 = $6 << 2 | 0;
            $739 = $17 + $18 | 0;
            $17 = $8 - $3 | 0;
            $19 = $17 << 2 | 0;
            memmove($739 | 0, $2 | 0, $19 | 0) | 0;
            HEAP32[$2 >> 2] = $11;
            $11 = $1 + 48 | 0;
            $755 = $11 + Math_imul($6, 12) | 0;
            $11 = $11 + Math_imul($3, 12) | 0;
            memmove($755 | 0, $11 | 0, Math_imul($17, 12) | 0) | 0;
            HEAP32[($11 + 8 | 0) >> 2] = HEAP32[$12 >> 2] | 0;
            i64toi32_i32$1 = HEAP32[($5 + 16 | 0) >> 2] | 0;
            i64toi32_i32$0 = HEAP32[($5 + 20 | 0) >> 2] | 0;
            $770 = i64toi32_i32$1;
            i64toi32_i32$1 = $11;
            HEAP32[i64toi32_i32$1 >> 2] = $770;
            HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
            $11 = $1 + 184 | 0;
            memmove(($11 + $16 | 0) + 8 | 0 | 0, $11 + $18 | 0 | 0, $19 | 0) | 0;
           }
           HEAP32[(($1 + ($6 << 2 | 0) | 0) + 184 | 0) >> 2] = $7;
           HEAP16[($1 + 182 | 0) >> 1] = $15;
           label$48 : {
            $11 = $8 + 2 | 0;
            if ($6 >>> 0 >= $11 >>> 0) {
             break label$48
            }
            label$49 : {
             $2 = $8 - $3 | 0;
             $8 = ($2 + 1 | 0) & 3 | 0;
             if (!$8) {
              break label$49
             }
             $3 = ($1 + $16 | 0) + 188 | 0;
             label$50 : while (1) {
              $7 = HEAP32[$3 >> 2] | 0;
              HEAP16[($7 + 180 | 0) >> 1] = $6;
              HEAP32[$7 >> 2] = $1;
              $3 = $3 + 4 | 0;
              $6 = $6 + 1 | 0;
              $8 = $8 + -1 | 0;
              if ($8) {
               continue label$50
              }
              break label$50;
             };
            }
            if ($2 >>> 0 < 3 >>> 0) {
             break label$48
            }
            $3 = ($1 + ($6 << 2 | 0) | 0) + 196 | 0;
            label$51 : while (1) {
             $8 = HEAP32[($3 + -12 | 0) >> 2] | 0;
             HEAP16[($8 + 180 | 0) >> 1] = $6;
             HEAP32[$8 >> 2] = $1;
             $8 = HEAP32[($3 + -8 | 0) >> 2] | 0;
             HEAP16[($8 + 180 | 0) >> 1] = $6 + 1 | 0;
             HEAP32[$8 >> 2] = $1;
             $8 = HEAP32[($3 + -4 | 0) >> 2] | 0;
             HEAP16[($8 + 180 | 0) >> 1] = $6 + 2 | 0;
             HEAP32[$8 >> 2] = $1;
             $8 = HEAP32[$3 >> 2] | 0;
             HEAP16[($8 + 180 | 0) >> 1] = $6 + 3 | 0;
             HEAP32[$8 >> 2] = $1;
             $3 = $3 + 16 | 0;
             $6 = $6 + 4 | 0;
             if (($11 | 0) != ($6 | 0)) {
              continue label$51
             }
             break label$51;
            };
           }
           HEAP32[($5 + 8 | 0) >> 2] = HEAP32[($10 + 8 | 0) >> 2] | 0;
           i64toi32_i32$0 = HEAP32[$10 >> 2] | 0;
           i64toi32_i32$1 = HEAP32[($10 + 4 | 0) >> 2] | 0;
           $871 = i64toi32_i32$0;
           i64toi32_i32$0 = $5;
           HEAP32[$5 >> 2] = $871;
           HEAP32[($5 + 4 | 0) >> 2] = i64toi32_i32$1;
           $6 = HEAP32[($5 + 48 | 0) >> 2] | 0;
           if (!$6) {
            break label$23
           }
          }
          $11 = HEAP32[($5 + 64 | 0) >> 2] | 0;
          $3 = HEAP32[($5 + 60 | 0) >> 2] | 0;
          $7 = HEAP32[($5 + 56 | 0) >> 2] | 0;
          $8 = HEAP32[($5 + 52 | 0) >> 2] | 0;
          HEAP32[$12 >> 2] = HEAP32[($5 + 8 | 0) >> 2] | 0;
          i64toi32_i32$1 = HEAP32[$5 >> 2] | 0;
          i64toi32_i32$0 = HEAP32[($5 + 4 | 0) >> 2] | 0;
          $890 = i64toi32_i32$1;
          i64toi32_i32$1 = $5;
          HEAP32[($5 + 16 | 0) >> 2] = $890;
          HEAP32[($5 + 20 | 0) >> 2] = i64toi32_i32$0;
          $1 = HEAP32[$6 >> 2] | 0;
          if ($1) {
           continue label$26
          }
          break label$26;
         };
        }
        $1 = HEAP32[$4 >> 2] | 0;
        $8 = HEAP32[$1 >> 2] | 0;
        if (!$8) {
         break label$3
        }
        HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
        $2 = HEAP32[($1 + 4 | 0) >> 2] | 0;
        $6 = __rust_alloc(232 | 0, 4 | 0) | 0;
        if (!$6) {
         break label$2
        }
        HEAP32[($6 + 184 | 0) >> 2] = $8;
        HEAP16[($6 + 182 | 0) >> 1] = 0;
        HEAP32[$6 >> 2] = 0;
        HEAP16[($8 + 180 | 0) >> 1] = 0;
        HEAP32[$8 >> 2] = $6;
        HEAP32[($1 + 4 | 0) >> 2] = $2 + 1 | 0;
        HEAP32[$1 >> 2] = $6;
        if (($2 | 0) != ($3 | 0)) {
         break label$1
        }
        i64toi32_i32$0 = HEAP32[($5 + 16 | 0) >> 2] | 0;
        i64toi32_i32$1 = HEAP32[($5 + 20 | 0) >> 2] | 0;
        $923 = i64toi32_i32$0;
        i64toi32_i32$0 = $6;
        HEAP32[($6 + 48 | 0) >> 2] = $923;
        HEAP32[($6 + 52 | 0) >> 2] = i64toi32_i32$1;
        HEAP32[($6 + 4 | 0) >> 2] = $11;
        HEAP16[($6 + 182 | 0) >> 1] = 1;
        HEAP32[($6 + 188 | 0) >> 2] = $7;
        HEAP32[($6 + 56 | 0) >> 2] = HEAP32[($5 + 24 | 0) >> 2] | 0;
        HEAP16[($7 + 180 | 0) >> 1] = 1;
        HEAP32[$7 >> 2] = $6;
       }
       HEAP32[($0 + 8 | 0) >> 2] = $9;
       HEAP32[($0 + 4 | 0) >> 2] = $13;
       HEAP32[$0 >> 2] = $14;
      }
      __stack_pointer = $5 + 80 | 0;
      return;
     }
     _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050176 | 0, 53 | 0, 1050232 | 0);
     wasm2js_trap();
    }
    _ZN4core6option13unwrap_failed17h98817bc8a3accaffE(1049776 | 0);
    wasm2js_trap();
   }
   _ZN5alloc5alloc18handle_alloc_error17h123ae56be4092711E(4 | 0, 232 | 0);
   wasm2js_trap();
  }
  _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1049883 | 0, 48 | 0, 1049932 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc11collections5btree4node212Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Internal$GT$$C$alloc__collections__btree__node__marker__KV$GT$5split17h714854686ba3ee4cE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $7 = 0, $8 = 0, $10 = 0, $6 = 0, $5 = 0, $3 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, $9 = 0, $4 = 0, $48 = 0, $11 = 0, $93 = 0, $146 = 0;
  $2 = __stack_pointer - 32 | 0;
  __stack_pointer = $2;
  HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
  $3 = HEAP32[$1 >> 2] | 0;
  $4 = HEAPU16[($3 + 182 | 0) >> 1] | 0;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       $5 = __rust_alloc(232 | 0, 4 | 0) | 0;
       if (!$5) {
        break label$5
       }
       HEAP32[$5 >> 2] = 0;
       $6 = HEAPU16[($3 + 182 | 0) >> 1] | 0;
       $7 = HEAP32[($1 + 8 | 0) >> 2] | 0;
       $8 = $6 + ($7 ^ -1 | 0) | 0;
       HEAP16[($5 + 182 | 0) >> 1] = $8;
       $9 = $3 + 48 | 0;
       $10 = $9 + Math_imul($7, 12) | 0;
       HEAP32[(($2 + 16 | 0) + 8 | 0) >> 2] = HEAP32[($10 + 8 | 0) >> 2] | 0;
       i64toi32_i32$0 = HEAP32[$10 >> 2] | 0;
       i64toi32_i32$1 = HEAP32[($10 + 4 | 0) >> 2] | 0;
       $48 = i64toi32_i32$0;
       i64toi32_i32$0 = $2;
       HEAP32[($2 + 16 | 0) >> 2] = $48;
       HEAP32[($2 + 20 | 0) >> 2] = i64toi32_i32$1;
       if ($8 >>> 0 >= 12 >>> 0) {
        break label$4
       }
       $10 = $7 + 1 | 0;
       if (($6 - $10 | 0 | 0) != ($8 | 0)) {
        break label$3
       }
       $6 = $3 + 4 | 0;
       $11 = HEAP32[($6 + ($7 << 2 | 0) | 0) >> 2] | 0;
       memcpy($5 + 4 | 0 | 0, $6 + ($10 << 2 | 0) | 0 | 0, $8 << 2 | 0 | 0) | 0;
       memcpy($5 + 48 | 0 | 0, $9 + Math_imul($10, 12) | 0 | 0, Math_imul($8, 12) | 0) | 0;
       HEAP16[($3 + 182 | 0) >> 1] = $7;
       HEAP32[($2 + 8 | 0) >> 2] = HEAP32[(($2 + 16 | 0) + 8 | 0) >> 2] | 0;
       i64toi32_i32$1 = HEAP32[($2 + 16 | 0) >> 2] | 0;
       i64toi32_i32$0 = HEAP32[($2 + 20 | 0) >> 2] | 0;
       $93 = i64toi32_i32$1;
       i64toi32_i32$1 = $2;
       HEAP32[$2 >> 2] = $93;
       HEAP32[($2 + 4 | 0) >> 2] = i64toi32_i32$0;
       $8 = HEAPU16[($5 + 182 | 0) >> 1] | 0;
       $10 = $8 + 1 | 0;
       if ($8 >>> 0 >= 12 >>> 0) {
        break label$2
       }
       $6 = $4 - $7 | 0;
       if (($6 | 0) != ($10 | 0)) {
        break label$1
       }
       $10 = memcpy($5 + 184 | 0 | 0, ($3 + ($7 << 2 | 0) | 0) + 188 | 0 | 0, $6 << 2 | 0 | 0) | 0;
       $6 = HEAP32[($1 + 4 | 0) >> 2] | 0;
       $7 = 0;
       label$6 : {
        label$7 : while (1) {
         $1 = HEAP32[($10 + ($7 << 2 | 0) | 0) >> 2] | 0;
         HEAP16[($1 + 180 | 0) >> 1] = $7;
         HEAP32[$1 >> 2] = $5;
         if ($7 >>> 0 >= $8 >>> 0) {
          break label$6
         }
         $7 = $7 + ($7 >>> 0 < $8 >>> 0) | 0;
         if ($7 >>> 0 <= $8 >>> 0) {
          continue label$7
         }
         break label$7;
        };
       }
       HEAP32[($0 + 16 | 0) >> 2] = $11;
       HEAP32[($0 + 4 | 0) >> 2] = $6;
       HEAP32[$0 >> 2] = $3;
       i64toi32_i32$0 = HEAP32[$2 >> 2] | 0;
       i64toi32_i32$1 = HEAP32[($2 + 4 | 0) >> 2] | 0;
       $146 = i64toi32_i32$0;
       i64toi32_i32$0 = $0;
       HEAP32[($0 + 20 | 0) >> 2] = $146;
       HEAP32[($0 + 24 | 0) >> 2] = i64toi32_i32$1;
       HEAP32[($0 + 12 | 0) >> 2] = $6;
       HEAP32[($0 + 8 | 0) >> 2] = $5;
       HEAP32[($0 + 28 | 0) >> 2] = HEAP32[($2 + 8 | 0) >> 2] | 0;
       __stack_pointer = $2 + 32 | 0;
       return;
      }
      _ZN5alloc5alloc18handle_alloc_error17h123ae56be4092711E(4 | 0, 232 | 0);
      wasm2js_trap();
     }
     _ZN4core5slice5index24slice_end_index_len_fail17h02d344349d5072f8E($8 | 0, 11 | 0, 1050144 | 0);
     wasm2js_trap();
    }
    _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050088 | 0, 40 | 0, 1050128 | 0);
    wasm2js_trap();
   }
   _ZN4core5slice5index24slice_end_index_len_fail17h02d344349d5072f8E($10 | 0, 12 | 0, 1050160 | 0);
   wasm2js_trap();
  }
  _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050088 | 0, 40 | 0, 1050128 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$15bulk_steal_left17hdff94e2f76df3257E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $8 = 0, $9 = 0, $3 = 0, $4 = 0, $6 = 0, $7 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, $12 = 0, $2 = 0, $5 = 0, $10 = 0, $11 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $15$hi = 0, $18 = 0, $19 = 0, $19$hi = 0;
  $2 = __stack_pointer - 32 | 0;
  __stack_pointer = $2;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        $3 = HEAP32[($0 + 20 | 0) >> 2] | 0;
        $4 = HEAPU16[($3 + 182 | 0) >> 1] | 0;
        $5 = $4 + $1 | 0;
        if ($5 >>> 0 >= 12 >>> 0) {
         break label$6
        }
        $6 = HEAP32[($0 + 12 | 0) >> 2] | 0;
        $7 = HEAPU16[($6 + 182 | 0) >> 1] | 0;
        if ($7 >>> 0 < $1 >>> 0) {
         break label$5
        }
        $8 = $7 - $1 | 0;
        HEAP16[($6 + 182 | 0) >> 1] = $8;
        HEAP16[($3 + 182 | 0) >> 1] = $5;
        $9 = $3 + 4 | 0;
        $10 = $1 << 2 | 0;
        $11 = $4 << 2 | 0;
        memmove($9 + $10 | 0 | 0, $9 | 0, $11 | 0) | 0;
        $12 = $3 + 48 | 0;
        memmove($12 + Math_imul($1, 12) | 0 | 0, $12 | 0, Math_imul($4, 12) | 0) | 0;
        $4 = $8 + 1 | 0;
        $7 = $7 - $4 | 0;
        if (($7 | 0) != ($1 + -1 | 0 | 0)) {
         break label$4
        }
        $13 = $6 + 4 | 0;
        memcpy($9 | 0, $13 + ($4 << 2 | 0) | 0 | 0, $7 << 2 | 0 | 0) | 0;
        $9 = $6 + 48 | 0;
        $7 = Math_imul($7, 12);
        $12 = memcpy($12 | 0, $9 + Math_imul($4, 12) | 0 | 0, $7 | 0) | 0;
        $9 = $9 + Math_imul($8, 12) | 0;
        $14 = HEAP32[($9 + 8 | 0) >> 2] | 0;
        HEAP32[($2 + 8 | 0) >> 2] = $14;
        i64toi32_i32$0 = HEAP32[$9 >> 2] | 0;
        i64toi32_i32$1 = HEAP32[($9 + 4 | 0) >> 2] | 0;
        $15 = i64toi32_i32$0;
        $15$hi = i64toi32_i32$1;
        $9 = HEAP32[$0 >> 2] | 0;
        $16 = HEAP32[($0 + 8 | 0) >> 2] | 0;
        $17 = ($9 + ($16 << 2 | 0) | 0) + 4 | 0;
        $18 = HEAP32[$17 >> 2] | 0;
        HEAP32[$17 >> 2] = HEAP32[($13 + ($8 << 2 | 0) | 0) >> 2] | 0;
        i64toi32_i32$0 = $2;
        HEAP32[i64toi32_i32$0 >> 2] = $15;
        HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
        $8 = $9 + Math_imul($16, 12) | 0;
        $9 = $8 + 48 | 0;
        i64toi32_i32$1 = HEAP32[$9 >> 2] | 0;
        i64toi32_i32$0 = HEAP32[($9 + 4 | 0) >> 2] | 0;
        $19 = i64toi32_i32$1;
        $19$hi = i64toi32_i32$0;
        i64toi32_i32$0 = $15$hi;
        i64toi32_i32$1 = $9;
        HEAP32[$9 >> 2] = $15;
        HEAP32[($9 + 4 | 0) >> 2] = i64toi32_i32$0;
        $8 = $8 + 56 | 0;
        $9 = HEAP32[$8 >> 2] | 0;
        HEAP32[$8 >> 2] = $14;
        HEAP32[($3 + $10 | 0) >> 2] = $18;
        $8 = $12 + $7 | 0;
        HEAP32[($8 + 8 | 0) >> 2] = $9;
        i64toi32_i32$0 = $19$hi;
        i64toi32_i32$1 = $8;
        HEAP32[$8 >> 2] = $19;
        HEAP32[($8 + 4 | 0) >> 2] = i64toi32_i32$0;
        $8 = HEAP32[($0 + 24 | 0) >> 2] | 0;
        label$7 : {
         if (HEAP32[($0 + 16 | 0) >> 2] | 0) {
          break label$7
         }
         if (!$8) {
          break label$2
         }
         break label$1;
        }
        if (!$8) {
         break label$1
        }
        $0 = $3 + 184 | 0;
        $1 = $1 << 2 | 0;
        memmove($0 + $1 | 0 | 0, $0 | 0, $11 + 4 | 0 | 0) | 0;
        memcpy($0 | 0, ($6 + ($4 << 2 | 0) | 0) + 184 | 0 | 0, $1 | 0) | 0;
        $8 = $5 + 1 | 0;
        $6 = $8 & 3 | 0;
        $1 = 0;
        if ($5 >>> 0 < 3 >>> 0) {
         break label$3
        }
        $0 = $3 + 196 | 0;
        $4 = $8 & 60 | 0;
        $1 = 0;
        label$8 : while (1) {
         $8 = HEAP32[($0 + -12 | 0) >> 2] | 0;
         HEAP16[($8 + 180 | 0) >> 1] = $1;
         HEAP32[$8 >> 2] = $3;
         $8 = HEAP32[($0 + -8 | 0) >> 2] | 0;
         HEAP16[($8 + 180 | 0) >> 1] = $1 + 1 | 0;
         HEAP32[$8 >> 2] = $3;
         $8 = HEAP32[($0 + -4 | 0) >> 2] | 0;
         HEAP16[($8 + 180 | 0) >> 1] = $1 + 2 | 0;
         HEAP32[$8 >> 2] = $3;
         $8 = HEAP32[$0 >> 2] | 0;
         HEAP16[($8 + 180 | 0) >> 1] = $1 + 3 | 0;
         HEAP32[$8 >> 2] = $3;
         $0 = $0 + 16 | 0;
         $1 = $1 + 4 | 0;
         if (($4 | 0) != ($1 | 0)) {
          continue label$8
         }
         break label$3;
        };
       }
       _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050248 | 0, 51 | 0, 1050300 | 0);
       wasm2js_trap();
      }
      _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050316 | 0, 39 | 0, 1050356 | 0);
      wasm2js_trap();
     }
     _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050088 | 0, 40 | 0, 1050128 | 0);
     wasm2js_trap();
    }
    if (!$6) {
     break label$2
    }
    $0 = (($1 << 2 | 0) + $3 | 0) + 184 | 0;
    label$9 : while (1) {
     $8 = HEAP32[$0 >> 2] | 0;
     HEAP16[($8 + 180 | 0) >> 1] = $1;
     HEAP32[$8 >> 2] = $3;
     $0 = $0 + 4 | 0;
     $1 = $1 + 1 | 0;
     $6 = $6 + -1 | 0;
     if ($6) {
      continue label$9
     }
     break label$9;
    };
   }
   __stack_pointer = $2 + 32 | 0;
   return;
  }
  _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050372 | 0, 40 | 0, 1050412 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$16bulk_steal_right17h9c412c550e5d39d3E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $7 = 0, $3 = 0, $4 = 0, $6 = 0, $14 = 0, $9 = 0, i64toi32_i32$0 = 0, $12 = 0, i64toi32_i32$1 = 0, $8 = 0, $15 = 0, $2 = 0, $5 = 0, $10 = 0, $11 = 0, $13 = 0, $17 = 0, $13$hi = 0, $16 = 0, $18 = 0, $18$hi = 0, $126 = 0;
  $2 = __stack_pointer - 32 | 0;
  __stack_pointer = $2;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        $3 = HEAP32[($0 + 12 | 0) >> 2] | 0;
        $4 = HEAPU16[($3 + 182 | 0) >> 1] | 0;
        $5 = $4 + $1 | 0;
        if ($5 >>> 0 >= 12 >>> 0) {
         break label$6
        }
        $6 = HEAP32[($0 + 20 | 0) >> 2] | 0;
        $7 = HEAPU16[($6 + 182 | 0) >> 1] | 0;
        if ($7 >>> 0 < $1 >>> 0) {
         break label$5
        }
        HEAP16[($3 + 182 | 0) >> 1] = $5;
        $8 = $7 - $1 | 0;
        HEAP16[($6 + 182 | 0) >> 1] = $8;
        $9 = $6 + 48 | 0;
        $10 = $1 + -1 | 0;
        $11 = Math_imul($10, 12);
        $7 = $9 + $11 | 0;
        $12 = HEAP32[($7 + 8 | 0) >> 2] | 0;
        HEAP32[($2 + 8 | 0) >> 2] = $12;
        i64toi32_i32$0 = HEAP32[$7 >> 2] | 0;
        i64toi32_i32$1 = HEAP32[($7 + 4 | 0) >> 2] | 0;
        $13 = i64toi32_i32$0;
        $13$hi = i64toi32_i32$1;
        $7 = HEAP32[$0 >> 2] | 0;
        $14 = HEAP32[($0 + 8 | 0) >> 2] | 0;
        $15 = ($7 + ($14 << 2 | 0) | 0) + 4 | 0;
        $16 = HEAP32[$15 >> 2] | 0;
        $17 = $1 << 2 | 0;
        HEAP32[$15 >> 2] = HEAP32[($6 + $17 | 0) >> 2] | 0;
        i64toi32_i32$0 = $2;
        HEAP32[i64toi32_i32$0 >> 2] = $13;
        HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
        $7 = $7 + Math_imul($14, 12) | 0;
        $14 = $7 + 48 | 0;
        i64toi32_i32$1 = HEAP32[$14 >> 2] | 0;
        i64toi32_i32$0 = HEAP32[($14 + 4 | 0) >> 2] | 0;
        $18 = i64toi32_i32$1;
        $18$hi = i64toi32_i32$0;
        i64toi32_i32$0 = $13$hi;
        i64toi32_i32$1 = $14;
        HEAP32[i64toi32_i32$1 >> 2] = $13;
        HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = i64toi32_i32$0;
        $7 = $7 + 56 | 0;
        $14 = HEAP32[$7 >> 2] | 0;
        HEAP32[$7 >> 2] = $12;
        $12 = $3 + 4 | 0;
        HEAP32[($12 + ($4 << 2 | 0) | 0) >> 2] = $16;
        $15 = $3 + 48 | 0;
        $7 = $15 + Math_imul($4, 12) | 0;
        i64toi32_i32$0 = $18$hi;
        i64toi32_i32$1 = $7;
        HEAP32[$7 >> 2] = $18;
        HEAP32[($7 + 4 | 0) >> 2] = i64toi32_i32$0;
        HEAP32[($7 + 8 | 0) >> 2] = $14;
        $7 = $4 + 1 | 0;
        if (($10 | 0) != ($5 - $7 | 0 | 0)) {
         break label$4
        }
        $126 = $12 + ($7 << 2 | 0) | 0;
        $12 = $6 + 4 | 0;
        memcpy($126 | 0, $12 | 0, $10 << 2 | 0 | 0) | 0;
        memcpy($15 + Math_imul($7, 12) | 0 | 0, $9 | 0, $11 | 0) | 0;
        $14 = $8 << 2 | 0;
        memmove($12 | 0, $12 + $17 | 0 | 0, $14 | 0) | 0;
        memmove($9 | 0, $9 + Math_imul($1, 12) | 0 | 0, Math_imul($8, 12) | 0) | 0;
        $9 = HEAP32[($0 + 24 | 0) >> 2] | 0;
        label$7 : {
         if (HEAP32[($0 + 16 | 0) >> 2] | 0) {
          break label$7
         }
         if (!$9) {
          break label$2
         }
         break label$1;
        }
        if (!$9) {
         break label$1
        }
        $0 = $6 + 184 | 0;
        $9 = $1 << 2 | 0;
        memcpy(($3 + ($7 << 2 | 0) | 0) + 184 | 0 | 0, $0 | 0, $9 | 0) | 0;
        memmove($0 | 0, $0 + $9 | 0 | 0, $14 + 4 | 0 | 0) | 0;
        label$8 : {
         $0 = $1 & 3 | 0;
         if (!$0) {
          break label$8
         }
         $1 = (($4 << 2 | 0) + $3 | 0) + 188 | 0;
         label$9 : while (1) {
          $4 = HEAP32[$1 >> 2] | 0;
          HEAP16[($4 + 180 | 0) >> 1] = $7;
          HEAP32[$4 >> 2] = $3;
          $1 = $1 + 4 | 0;
          $7 = $7 + 1 | 0;
          $0 = $0 + -1 | 0;
          if ($0) {
           continue label$9
          }
          break label$9;
         };
        }
        label$10 : {
         if ($10 >>> 0 < 3 >>> 0) {
          break label$10
         }
         $0 = $7 << 2 | 0;
         label$11 : while (1) {
          $1 = $3 + $0 | 0;
          $4 = HEAP32[($1 + 184 | 0) >> 2] | 0;
          HEAP16[($4 + 180 | 0) >> 1] = $7;
          HEAP32[$4 >> 2] = $3;
          $4 = HEAP32[($1 + 188 | 0) >> 2] | 0;
          HEAP16[($4 + 180 | 0) >> 1] = $7 + 1 | 0;
          HEAP32[$4 >> 2] = $3;
          $4 = HEAP32[($1 + 192 | 0) >> 2] | 0;
          HEAP16[($4 + 180 | 0) >> 1] = $7 + 2 | 0;
          HEAP32[$4 >> 2] = $3;
          $1 = HEAP32[($1 + 196 | 0) >> 2] | 0;
          $4 = $7 + 3 | 0;
          HEAP16[($1 + 180 | 0) >> 1] = $4;
          HEAP32[$1 >> 2] = $3;
          $7 = $7 + 4 | 0;
          $0 = $0 + 16 | 0;
          if (($4 | 0) != ($5 | 0)) {
           continue label$11
          }
          break label$11;
         };
        }
        if (($8 | 0) == (-1 | 0)) {
         break label$2
        }
        $0 = $8 + 1 | 0;
        $1 = $0 & 3 | 0;
        $7 = 0;
        if ($8 >>> 0 < 3 >>> 0) {
         break label$3
        }
        $3 = $6 + 196 | 0;
        $4 = $0 & -4 | 0;
        $7 = 0;
        label$12 : while (1) {
         $0 = HEAP32[($3 + -12 | 0) >> 2] | 0;
         HEAP16[($0 + 180 | 0) >> 1] = $7;
         HEAP32[$0 >> 2] = $6;
         $0 = HEAP32[($3 + -8 | 0) >> 2] | 0;
         HEAP16[($0 + 180 | 0) >> 1] = $7 + 1 | 0;
         HEAP32[$0 >> 2] = $6;
         $0 = HEAP32[($3 + -4 | 0) >> 2] | 0;
         HEAP16[($0 + 180 | 0) >> 1] = $7 + 2 | 0;
         HEAP32[$0 >> 2] = $6;
         $0 = HEAP32[$3 >> 2] | 0;
         HEAP16[($0 + 180 | 0) >> 1] = $7 + 3 | 0;
         HEAP32[$0 >> 2] = $6;
         $3 = $3 + 16 | 0;
         $7 = $7 + 4 | 0;
         if (($4 | 0) != ($7 | 0)) {
          continue label$12
         }
         break label$3;
        };
       }
       _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050428 | 0, 50 | 0, 1050480 | 0);
       wasm2js_trap();
      }
      _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050496 | 0, 40 | 0, 1050536 | 0);
      wasm2js_trap();
     }
     _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050088 | 0, 40 | 0, 1050128 | 0);
     wasm2js_trap();
    }
    if (!$1) {
     break label$2
    }
    $3 = (($7 << 2 | 0) + $6 | 0) + 184 | 0;
    label$13 : while (1) {
     $0 = HEAP32[$3 >> 2] | 0;
     HEAP16[($0 + 180 | 0) >> 1] = $7;
     HEAP32[$0 >> 2] = $6;
     $3 = $3 + 4 | 0;
     $7 = $7 + 1 | 0;
     $1 = $1 + -1 | 0;
     if ($1) {
      continue label$13
     }
     break label$13;
    };
   }
   __stack_pointer = $2 + 32 | 0;
   return;
  }
  _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050372 | 0, 40 | 0, 1050552 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$8do_merge17h3854facd3939f96eE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $13 = 0, $11 = 0, $16 = 0, $5 = 0, $3 = 0, $15 = 0, $14 = 0, $2 = 0, $4 = 0, $6 = 0, $7 = 0, $8 = 0, $12 = 0, $17 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, $9 = 0, $10 = 0, $97 = 0, $116 = 0;
  $2 = __stack_pointer - 16 | 0;
  __stack_pointer = $2;
  label$1 : {
   label$2 : {
    $3 = HEAP32[($1 + 12 | 0) >> 2] | 0;
    $4 = HEAPU16[($3 + 182 | 0) >> 1] | 0;
    $5 = $4 + 1 | 0;
    $6 = HEAP32[($1 + 20 | 0) >> 2] | 0;
    $7 = HEAPU16[($6 + 182 | 0) >> 1] | 0;
    $8 = $5 + $7 | 0;
    if ($8 >>> 0 >= 12 >>> 0) {
     break label$2
    }
    $9 = HEAP32[($1 + 16 | 0) >> 2] | 0;
    $10 = HEAP32[($1 + 4 | 0) >> 2] | 0;
    $11 = HEAP32[$1 >> 2] | 0;
    $12 = HEAPU16[($11 + 182 | 0) >> 1] | 0;
    HEAP16[($3 + 182 | 0) >> 1] = $8;
    $13 = HEAP32[($1 + 8 | 0) >> 2] | 0;
    $1 = $11 + ($13 << 2 | 0) | 0;
    $14 = $1 + 4 | 0;
    $15 = HEAP32[$14 >> 2] | 0;
    $16 = $12 + ($13 ^ -1 | 0) | 0;
    $17 = $16 << 2 | 0;
    memmove($14 | 0, $1 + 8 | 0 | 0, $17 | 0) | 0;
    $1 = $3 + 4 | 0;
    HEAP32[($1 + ($4 << 2 | 0) | 0) >> 2] = $15;
    memcpy($1 + ($5 << 2 | 0) | 0 | 0, $6 + 4 | 0 | 0, $7 << 2 | 0 | 0) | 0;
    $14 = $2 + 8 | 0;
    $1 = $11 + Math_imul($13, 12) | 0;
    HEAP32[$14 >> 2] = HEAP32[($1 + 56 | 0) >> 2] | 0;
    $15 = $1 + 48 | 0;
    i64toi32_i32$0 = HEAP32[$15 >> 2] | 0;
    i64toi32_i32$1 = HEAP32[($15 + 4 | 0) >> 2] | 0;
    $97 = i64toi32_i32$0;
    i64toi32_i32$0 = $2;
    HEAP32[$2 >> 2] = $97;
    HEAP32[($2 + 4 | 0) >> 2] = i64toi32_i32$1;
    memmove($15 | 0, $1 + 60 | 0 | 0, Math_imul($16, 12) | 0) | 0;
    $1 = $3 + 48 | 0;
    $15 = $1 + Math_imul($4, 12) | 0;
    HEAP32[($15 + 8 | 0) >> 2] = HEAP32[$14 >> 2] | 0;
    i64toi32_i32$1 = HEAP32[$2 >> 2] | 0;
    i64toi32_i32$0 = HEAP32[($2 + 4 | 0) >> 2] | 0;
    $116 = i64toi32_i32$1;
    i64toi32_i32$1 = $15;
    HEAP32[$15 >> 2] = $116;
    HEAP32[($15 + 4 | 0) >> 2] = i64toi32_i32$0;
    memcpy($1 + Math_imul($5, 12) | 0 | 0, $6 + 48 | 0 | 0, Math_imul($7, 12) | 0) | 0;
    $15 = 184;
    $1 = $13 + 1 | 0;
    $14 = $11 + ($1 << 2 | 0) | 0;
    memmove($14 + 184 | 0 | 0, $14 + 188 | 0 | 0, $17 | 0) | 0;
    label$3 : {
     if ($1 >>> 0 >= $12 >>> 0) {
      break label$3
     }
     $17 = ($12 - $13 | 0) + -2 | 0;
     label$4 : {
      $16 = $16 & 3 | 0;
      if (!$16) {
       break label$4
      }
      $13 = (($13 << 2 | 0) + $11 | 0) + 188 | 0;
      label$5 : while (1) {
       $14 = HEAP32[$13 >> 2] | 0;
       HEAP16[($14 + 180 | 0) >> 1] = $1;
       HEAP32[$14 >> 2] = $11;
       $13 = $13 + 4 | 0;
       $1 = $1 + 1 | 0;
       $16 = $16 + -1 | 0;
       if ($16) {
        continue label$5
       }
       break label$5;
      };
     }
     if ($17 >>> 0 < 3 >>> 0) {
      break label$3
     }
     $13 = (($1 << 2 | 0) + $11 | 0) + 196 | 0;
     label$6 : while (1) {
      $16 = HEAP32[($13 + -12 | 0) >> 2] | 0;
      HEAP16[($16 + 180 | 0) >> 1] = $1;
      HEAP32[$16 >> 2] = $11;
      $16 = HEAP32[($13 + -8 | 0) >> 2] | 0;
      HEAP16[($16 + 180 | 0) >> 1] = $1 + 1 | 0;
      HEAP32[$16 >> 2] = $11;
      $16 = HEAP32[($13 + -4 | 0) >> 2] | 0;
      HEAP16[($16 + 180 | 0) >> 1] = $1 + 2 | 0;
      HEAP32[$16 >> 2] = $11;
      $16 = HEAP32[$13 >> 2] | 0;
      HEAP16[($16 + 180 | 0) >> 1] = $1 + 3 | 0;
      HEAP32[$16 >> 2] = $11;
      $13 = $13 + 16 | 0;
      $1 = $1 + 4 | 0;
      if (($12 | 0) != ($1 | 0)) {
       continue label$6
      }
      break label$6;
     };
    }
    HEAP16[($11 + 182 | 0) >> 1] = (HEAPU16[($11 + 182 | 0) >> 1] | 0) + -1 | 0;
    label$7 : {
     if ($10 >>> 0 < 2 >>> 0) {
      break label$7
     }
     $1 = $7 + 1 | 0;
     if (($1 | 0) != ($8 - $4 | 0 | 0)) {
      break label$1
     }
     memcpy(($3 + 184 | 0) + ($5 << 2 | 0) | 0 | 0, $6 + 184 | 0 | 0, $1 << 2 | 0 | 0) | 0;
     label$8 : {
      $11 = $1 & 3 | 0;
      if (!$11) {
       break label$8
      }
      $1 = (($4 << 2 | 0) + $3 | 0) + 188 | 0;
      label$9 : while (1) {
       $13 = HEAP32[$1 >> 2] | 0;
       HEAP16[($13 + 180 | 0) >> 1] = $5;
       HEAP32[$13 >> 2] = $3;
       $1 = $1 + 4 | 0;
       $5 = $5 + 1 | 0;
       $11 = $11 + -1 | 0;
       if ($11) {
        continue label$9
       }
       break label$9;
      };
     }
     $15 = 232;
     if ($7 >>> 0 < 3 >>> 0) {
      break label$7
     }
     $11 = $5 << 2 | 0;
     label$10 : while (1) {
      $1 = $3 + $11 | 0;
      $13 = HEAP32[($1 + 184 | 0) >> 2] | 0;
      HEAP16[($13 + 180 | 0) >> 1] = $5;
      HEAP32[$13 >> 2] = $3;
      $13 = HEAP32[($1 + 188 | 0) >> 2] | 0;
      HEAP16[($13 + 180 | 0) >> 1] = $5 + 1 | 0;
      HEAP32[$13 >> 2] = $3;
      $13 = HEAP32[($1 + 192 | 0) >> 2] | 0;
      HEAP16[($13 + 180 | 0) >> 1] = $5 + 2 | 0;
      HEAP32[$13 >> 2] = $3;
      $1 = HEAP32[($1 + 196 | 0) >> 2] | 0;
      $13 = $5 + 3 | 0;
      HEAP16[($1 + 180 | 0) >> 1] = $13;
      HEAP32[$1 >> 2] = $3;
      $5 = $5 + 4 | 0;
      $11 = $11 + 16 | 0;
      if (($13 | 0) != ($8 | 0)) {
       continue label$10
      }
      break label$10;
     };
    }
    __rust_dealloc($6 | 0, $15 | 0, 4 | 0);
    HEAP32[($0 + 4 | 0) >> 2] = $9;
    HEAP32[$0 >> 2] = $3;
    __stack_pointer = $2 + 16 | 0;
    return;
   }
   _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050728 | 0, 42 | 0, 1050772 | 0);
   wasm2js_trap();
  }
  _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050088 | 0, 40 | 0, 1050128 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc11collections5btree6remove259_$LT$impl$u20$alloc__collections__btree__node__Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Leaf$GT$$C$alloc__collections__btree__node__marker__KV$GT$$GT$14remove_leaf_kv17h1338e9b021c47ae4E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $6 = 0, $13 = 0, $10 = 0, $9 = 0, $7 = 0, i64toi32_i32$1 = 0, $17 = 0, $4 = 0, $12 = 0, i64toi32_i32$0 = 0, $5 = 0, $16 = 0, $15 = 0, $21 = 0, i64toi32_i32$2 = 0, $18 = 0, $19 = 0, $14 = 0, $20 = 0, $23 = 0, $11 = 0, $22 = 0, $8 = 0, $66 = 0, $332 = 0, $375 = 0, $394 = 0, $594 = 0;
  $3 = __stack_pointer - 128 | 0;
  __stack_pointer = $3;
  $4 = HEAP32[$1 >> 2] | 0;
  $5 = HEAP32[($1 + 8 | 0) >> 2] | 0;
  $6 = $4 + ($5 << 2 | 0) | 0;
  $7 = $6 + 4 | 0;
  $8 = HEAP32[$7 >> 2] | 0;
  $9 = HEAPU16[($4 + 182 | 0) >> 1] | 0;
  $10 = ($5 ^ -1 | 0) + $9 | 0;
  memmove($7 | 0, $6 + 8 | 0 | 0, $10 << 2 | 0 | 0) | 0;
  $11 = ($3 + 24 | 0) + 8 | 0;
  $6 = $4 + Math_imul($5, 12) | 0;
  HEAP32[$11 >> 2] = HEAP32[($6 + 56 | 0) >> 2] | 0;
  $7 = $6 + 48 | 0;
  i64toi32_i32$2 = $7;
  i64toi32_i32$0 = HEAP32[$7 >> 2] | 0;
  i64toi32_i32$1 = HEAP32[($7 + 4 | 0) >> 2] | 0;
  $66 = i64toi32_i32$0;
  i64toi32_i32$0 = $3;
  HEAP32[($3 + 24 | 0) >> 2] = $66;
  HEAP32[($3 + 28 | 0) >> 2] = i64toi32_i32$1;
  memmove($7 | 0, $6 + 60 | 0 | 0, Math_imul($10, 12) | 0) | 0;
  $6 = $9 + -1 | 0;
  HEAP16[($4 + 182 | 0) >> 1] = $6;
  $12 = HEAP32[($1 + 4 | 0) >> 2] | 0;
  label$1 : {
   if (($6 & 65535 | 0) >>> 0 > 4 >>> 0) {
    break label$1
   }
   $1 = HEAP32[$4 >> 2] | 0;
   if (!$1) {
    break label$1
   }
   $7 = $12 + 1 | 0;
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        $9 = HEAPU16[($4 + 180 | 0) >> 1] | 0;
        if ($9) {
         break label$6
        }
        if (HEAPU16[($1 + 182 | 0) >> 1] | 0) {
         break label$5
        }
        HEAP32[($3 + 72 | 0) >> 2] = 1;
        HEAP32[($3 + 68 | 0) >> 2] = 1050012;
        i64toi32_i32$0 = $3;
        i64toi32_i32$1 = 0;
        HEAP32[($3 + 80 | 0) >> 2] = 0;
        HEAP32[($3 + 84 | 0) >> 2] = i64toi32_i32$1;
        HEAP32[($3 + 76 | 0) >> 2] = $3 + 124 | 0;
        _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($3 + 68 | 0 | 0, 1050020 | 0);
        wasm2js_trap();
       }
       label$7 : {
        $9 = $9 + -1 | 0;
        $10 = HEAP32[(($1 + ($9 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
        $13 = HEAPU16[($10 + 182 | 0) >> 1] | 0;
        $6 = $6 & 65535 | 0;
        if ((($13 + $6 | 0) + 1 | 0) >>> 0 < 12 >>> 0) {
         break label$7
        }
        HEAP32[($3 + 92 | 0) >> 2] = $12;
        HEAP32[($3 + 88 | 0) >> 2] = $4;
        HEAP32[($3 + 84 | 0) >> 2] = $12;
        HEAP32[($3 + 80 | 0) >> 2] = $10;
        HEAP32[($3 + 76 | 0) >> 2] = $9;
        HEAP32[($3 + 72 | 0) >> 2] = $7;
        HEAP32[($3 + 68 | 0) >> 2] = $1;
        _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$15bulk_steal_left17hdff94e2f76df3257E($3 + 68 | 0 | 0, 1 | 0);
        $5 = $5 + 1 | 0;
        break label$2;
       }
       HEAP32[($3 + 92 | 0) >> 2] = $12;
       HEAP32[($3 + 88 | 0) >> 2] = $4;
       HEAP32[($3 + 84 | 0) >> 2] = $12;
       HEAP32[($3 + 80 | 0) >> 2] = $10;
       HEAP32[($3 + 76 | 0) >> 2] = $9;
       HEAP32[($3 + 72 | 0) >> 2] = $7;
       HEAP32[($3 + 68 | 0) >> 2] = $1;
       if ($5 >>> 0 > $6 >>> 0) {
        break label$4
       }
       $5 = ($5 + $13 | 0) + 1 | 0;
       _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$8do_merge17h3854facd3939f96eE($3 + 16 | 0 | 0, $3 + 68 | 0 | 0);
       $12 = HEAP32[($3 + 20 | 0) >> 2] | 0;
       $4 = HEAP32[($3 + 16 | 0) >> 2] | 0;
       break label$2;
      }
      label$8 : {
       $9 = $6 & 65535 | 0;
       $6 = HEAP32[($1 + 188 | 0) >> 2] | 0;
       if ((($9 + (HEAPU16[($6 + 182 | 0) >> 1] | 0) | 0) + 1 | 0) >>> 0 < 12 >>> 0) {
        break label$8
       }
       HEAP32[($3 + 92 | 0) >> 2] = $12;
       HEAP32[($3 + 88 | 0) >> 2] = $6;
       HEAP32[($3 + 84 | 0) >> 2] = $12;
       HEAP32[($3 + 80 | 0) >> 2] = $4;
       HEAP32[($3 + 76 | 0) >> 2] = 0;
       HEAP32[($3 + 72 | 0) >> 2] = $7;
       HEAP32[($3 + 68 | 0) >> 2] = $1;
       _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$16bulk_steal_right17h9c412c550e5d39d3E($3 + 68 | 0 | 0, 1 | 0);
       break label$2;
      }
      HEAP32[($3 + 92 | 0) >> 2] = $12;
      HEAP32[($3 + 88 | 0) >> 2] = $6;
      HEAP32[($3 + 84 | 0) >> 2] = $12;
      HEAP32[($3 + 80 | 0) >> 2] = $4;
      HEAP32[($3 + 76 | 0) >> 2] = 0;
      HEAP32[($3 + 72 | 0) >> 2] = $7;
      HEAP32[($3 + 68 | 0) >> 2] = $1;
      if ($5 >>> 0 > $9 >>> 0) {
       break label$3
      }
      _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$8do_merge17h3854facd3939f96eE($3 + 8 | 0 | 0, $3 + 68 | 0 | 0);
      $12 = HEAP32[($3 + 12 | 0) >> 2] | 0;
      $4 = HEAP32[($3 + 8 | 0) >> 2] | 0;
      break label$2;
     }
     _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050568 | 0, 142 | 0, 1050712 | 0);
     wasm2js_trap();
    }
    _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050568 | 0, 142 | 0, 1050712 | 0);
    wasm2js_trap();
   }
   $9 = HEAP32[$4 >> 2] | 0;
   if (!$9) {
    break label$1
   }
   $6 = HEAPU16[($9 + 182 | 0) >> 1] | 0;
   if ($6 >>> 0 > 4 >>> 0) {
    break label$1
   }
   $14 = $12 + 1 | 0;
   label$9 : {
    label$10 : {
     label$11 : {
      label$12 : while (1) {
       $1 = $14;
       $15 = $9;
       $9 = HEAP32[$9 >> 2] | 0;
       if (!$9) {
        break label$11
       }
       $16 = $6 & 65535 | 0;
       $14 = $1 + 1 | 0;
       label$13 : {
        label$14 : {
         label$15 : {
          label$16 : {
           $6 = HEAPU16[($15 + 180 | 0) >> 1] | 0;
           if ($6) {
            break label$16
           }
           label$17 : {
            $6 = HEAPU16[($9 + 182 | 0) >> 1] | 0;
            if ($6) {
             break label$17
            }
            HEAP32[($3 + 100 | 0) >> 2] = 1;
            HEAP32[($3 + 96 | 0) >> 2] = 1050012;
            i64toi32_i32$0 = $3;
            i64toi32_i32$1 = 0;
            HEAP32[($3 + 108 | 0) >> 2] = 0;
            HEAP32[($3 + 112 | 0) >> 2] = i64toi32_i32$1;
            HEAP32[($3 + 104 | 0) >> 2] = $3 + 124 | 0;
            _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($3 + 96 | 0 | 0, 1050020 | 0);
            wasm2js_trap();
           }
           HEAP32[($3 + 92 | 0) >> 2] = $1;
           HEAP32[($3 + 84 | 0) >> 2] = $1;
           HEAP32[($3 + 80 | 0) >> 2] = $15;
           $13 = 0;
           HEAP32[($3 + 76 | 0) >> 2] = 0;
           HEAP32[($3 + 72 | 0) >> 2] = $14;
           HEAP32[($3 + 68 | 0) >> 2] = $9;
           $10 = HEAP32[($9 + 188 | 0) >> 2] | 0;
           HEAP32[($3 + 88 | 0) >> 2] = $10;
           $1 = $16 + 1 | 0;
           $17 = HEAPU16[($10 + 182 | 0) >> 1] | 0;
           $18 = $1 + $17 | 0;
           if ($18 >>> 0 >= 12 >>> 0) {
            break label$15
           }
           $7 = $15;
           $15 = $10;
           $19 = $16;
           $16 = $17;
           break label$13;
          }
          HEAP32[($3 + 64 | 0) >> 2] = $1;
          HEAP32[($3 + 60 | 0) >> 2] = $15;
          HEAP32[($3 + 56 | 0) >> 2] = $1;
          HEAP32[($3 + 44 | 0) >> 2] = $14;
          $13 = $6 + -1 | 0;
          HEAP32[($3 + 48 | 0) >> 2] = $13;
          HEAP32[($3 + 40 | 0) >> 2] = $9;
          $7 = HEAP32[(($9 + ($13 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
          HEAP32[($3 + 52 | 0) >> 2] = $7;
          $19 = HEAPU16[($7 + 182 | 0) >> 1] | 0;
          if ((($16 + $19 | 0) + 1 | 0) >>> 0 < 12 >>> 0) {
           break label$14
          }
          _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$15bulk_steal_left17hdff94e2f76df3257E($3 + 40 | 0 | 0, 5 - $16 | 0 | 0);
          break label$1;
         }
         _ZN5alloc11collections5btree4node29BalancingContext$LT$K$C$V$GT$16bulk_steal_right17h9c412c550e5d39d3E($3 + 68 | 0 | 0, 5 - $16 | 0 | 0);
         break label$1;
        }
        $1 = $19 + 1 | 0;
        $18 = $1 + $16 | 0;
        $6 = HEAPU16[($9 + 182 | 0) >> 1] | 0;
       }
       HEAP16[($7 + 182 | 0) >> 1] = $18;
       $10 = $9 + ($13 << 2 | 0) | 0;
       $17 = $10 + 4 | 0;
       $20 = HEAP32[$17 >> 2] | 0;
       $332 = $10 + 8 | 0;
       $21 = $6 & 65535 | 0;
       $10 = $21 + ($13 ^ -1 | 0) | 0;
       $22 = $10 << 2 | 0;
       memmove($17 | 0, $332 | 0, $22 | 0) | 0;
       $6 = $7 + 4 | 0;
       HEAP32[($6 + ($19 << 2 | 0) | 0) >> 2] = $20;
       $23 = $1 << 2 | 0;
       memcpy($6 + $23 | 0 | 0, $15 + 4 | 0 | 0, $16 << 2 | 0 | 0) | 0;
       $17 = ($3 + 96 | 0) + 8 | 0;
       $6 = $9 + Math_imul($13, 12) | 0;
       HEAP32[$17 >> 2] = HEAP32[($6 + 56 | 0) >> 2] | 0;
       $20 = $6 + 48 | 0;
       i64toi32_i32$2 = $20;
       i64toi32_i32$1 = HEAP32[i64toi32_i32$2 >> 2] | 0;
       i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
       $375 = i64toi32_i32$1;
       i64toi32_i32$1 = $3;
       HEAP32[($3 + 96 | 0) >> 2] = $375;
       HEAP32[($3 + 100 | 0) >> 2] = i64toi32_i32$0;
       memmove(i64toi32_i32$2 | 0, $6 + 60 | 0 | 0, Math_imul($10, 12) | 0) | 0;
       $6 = $7 + 48 | 0;
       $10 = $6 + Math_imul($19, 12) | 0;
       HEAP32[($10 + 8 | 0) >> 2] = HEAP32[$17 >> 2] | 0;
       i64toi32_i32$2 = $3;
       i64toi32_i32$0 = HEAP32[($3 + 96 | 0) >> 2] | 0;
       i64toi32_i32$1 = HEAP32[($3 + 100 | 0) >> 2] | 0;
       $394 = i64toi32_i32$0;
       i64toi32_i32$0 = $10;
       HEAP32[$10 >> 2] = $394;
       HEAP32[($10 + 4 | 0) >> 2] = i64toi32_i32$1;
       memcpy($6 + Math_imul($1, 12) | 0 | 0, $15 + 48 | 0 | 0, Math_imul($16, 12) | 0) | 0;
       $6 = $13 + 1 | 0;
       $17 = $9 + ($6 << 2 | 0) | 0;
       $10 = $17 + 184 | 0;
       memmove($10 | 0, $17 + 188 | 0 | 0, $22 | 0) | 0;
       label$18 : {
        if ($21 >>> 0 <= $6 >>> 0) {
         break label$18
        }
        $20 = ($21 - $13 | 0) + -2 | 0;
        label$19 : {
         $13 = ($21 - $6 | 0) & 3 | 0;
         if (!$13) {
          break label$19
         }
         label$20 : while (1) {
          $17 = HEAP32[$10 >> 2] | 0;
          HEAP16[($17 + 180 | 0) >> 1] = $6;
          HEAP32[$17 >> 2] = $9;
          $10 = $10 + 4 | 0;
          $6 = $6 + 1 | 0;
          $13 = $13 + -1 | 0;
          if ($13) {
           continue label$20
          }
          break label$20;
         };
        }
        if ($20 >>> 0 < 3 >>> 0) {
         break label$18
        }
        $10 = ($9 + ($6 << 2 | 0) | 0) + 196 | 0;
        label$21 : while (1) {
         $13 = HEAP32[($10 + -12 | 0) >> 2] | 0;
         HEAP16[($13 + 180 | 0) >> 1] = $6;
         HEAP32[$13 >> 2] = $9;
         $13 = HEAP32[($10 + -8 | 0) >> 2] | 0;
         HEAP16[($13 + 180 | 0) >> 1] = $6 + 1 | 0;
         HEAP32[$13 >> 2] = $9;
         $13 = HEAP32[($10 + -4 | 0) >> 2] | 0;
         HEAP16[($13 + 180 | 0) >> 1] = $6 + 2 | 0;
         HEAP32[$13 >> 2] = $9;
         $13 = HEAP32[$10 >> 2] | 0;
         HEAP16[($13 + 180 | 0) >> 1] = $6 + 3 | 0;
         HEAP32[$13 >> 2] = $9;
         $10 = $10 + 16 | 0;
         $6 = $6 + 4 | 0;
         if (($21 | 0) != ($6 | 0)) {
          continue label$21
         }
         break label$21;
        };
       }
       HEAP16[($9 + 182 | 0) >> 1] = (HEAPU16[($9 + 182 | 0) >> 1] | 0) + -1 | 0;
       $17 = 184;
       label$22 : {
        if ($14 >>> 0 < 2 >>> 0) {
         break label$22
        }
        $6 = $16 + 1 | 0;
        if (($6 | 0) != ($18 - $19 | 0 | 0)) {
         break label$10
        }
        memcpy(($7 + 184 | 0) + $23 | 0 | 0, $15 + 184 | 0 | 0, $6 << 2 | 0 | 0) | 0;
        label$23 : {
         $21 = $18 - $1 | 0;
         $10 = ($21 + 1 | 0) & 3 | 0;
         if (!$10) {
          break label$23
         }
         $6 = ($7 + $23 | 0) + 184 | 0;
         label$24 : while (1) {
          $13 = HEAP32[$6 >> 2] | 0;
          HEAP16[($13 + 180 | 0) >> 1] = $1;
          HEAP32[$13 >> 2] = $7;
          $6 = $6 + 4 | 0;
          $1 = $1 + 1 | 0;
          $10 = $10 + -1 | 0;
          if ($10) {
           continue label$24
          }
          break label$24;
         };
        }
        $17 = 232;
        if ($21 >>> 0 < 3 >>> 0) {
         break label$22
        }
        $10 = $1 << 2 | 0;
        label$25 : while (1) {
         $6 = $7 + $10 | 0;
         $13 = HEAP32[($6 + 184 | 0) >> 2] | 0;
         HEAP16[($13 + 180 | 0) >> 1] = $1;
         HEAP32[$13 >> 2] = $7;
         $13 = HEAP32[($6 + 188 | 0) >> 2] | 0;
         HEAP16[($13 + 180 | 0) >> 1] = $1 + 1 | 0;
         HEAP32[$13 >> 2] = $7;
         $13 = HEAP32[($6 + 192 | 0) >> 2] | 0;
         HEAP16[($13 + 180 | 0) >> 1] = $1 + 2 | 0;
         HEAP32[$13 >> 2] = $7;
         $6 = HEAP32[($6 + 196 | 0) >> 2] | 0;
         $13 = $1 + 3 | 0;
         HEAP16[($6 + 180 | 0) >> 1] = $13;
         HEAP32[$6 >> 2] = $7;
         $1 = $1 + 4 | 0;
         $10 = $10 + 16 | 0;
         if (($13 | 0) != ($18 | 0)) {
          continue label$25
         }
         break label$25;
        };
       }
       __rust_dealloc($15 | 0, $17 | 0, 4 | 0);
       $6 = HEAPU16[($9 + 182 | 0) >> 1] | 0;
       if ($6 >>> 0 <= 4 >>> 0) {
        continue label$12
       }
       break label$1;
      };
     }
     if (!($6 & 65535 | 0)) {
      break label$9
     }
     break label$1;
    }
    _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050088 | 0, 40 | 0, 1050128 | 0);
    wasm2js_trap();
   }
   HEAP8[$2 >> 0] = 1;
  }
  HEAP32[$0 >> 2] = $8;
  i64toi32_i32$2 = $3;
  i64toi32_i32$1 = HEAP32[($3 + 24 | 0) >> 2] | 0;
  i64toi32_i32$0 = HEAP32[($3 + 28 | 0) >> 2] | 0;
  $594 = i64toi32_i32$1;
  i64toi32_i32$1 = $0;
  HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = $594;
  HEAP32[(i64toi32_i32$1 + 8 | 0) >> 2] = i64toi32_i32$0;
  HEAP32[(i64toi32_i32$1 + 24 | 0) >> 2] = $5;
  HEAP32[(i64toi32_i32$1 + 20 | 0) >> 2] = $12;
  HEAP32[(i64toi32_i32$1 + 16 | 0) >> 2] = $4;
  HEAP32[(i64toi32_i32$1 + 12 | 0) >> 2] = HEAP32[$11 >> 2] | 0;
  __stack_pointer = $3 + 128 | 0;
 }
 
 function _ZN5alloc11collections5btree6remove269_$LT$impl$u20$alloc__collections__btree__node__Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__LeafOrInternal$GT$$C$alloc__collections__btree__node__marker__KV$GT$$GT$18remove_kv_tracking17h9cdde6bfc5849410E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $5 = 0, i64toi32_i32$1 = 0, $4 = 0, $6 = 0, i64toi32_i32$5 = 0, i64toi32_i32$0 = 0, i64toi32_i32$4 = 0, i64toi32_i32$2 = 0, i64toi32_i32$3 = 0, $7 = 0, $21 = 0, $92 = 0, $112 = 0, $8 = 0, $9 = 0, $9$hi = 0, $161 = 0, $210 = 0;
  $3 = __stack_pointer - 80 | 0;
  __stack_pointer = $3;
  $4 = HEAP32[($1 + 8 | 0) >> 2] | 0;
  $5 = HEAP32[$1 >> 2] | 0;
  label$1 : {
   label$2 : {
    $6 = HEAP32[($1 + 4 | 0) >> 2] | 0;
    if ($6) {
     break label$2
    }
    HEAP32[($3 + 16 | 0) >> 2] = $4;
    HEAP32[($3 + 12 | 0) >> 2] = 0;
    HEAP32[($3 + 8 | 0) >> 2] = $5;
    _ZN5alloc11collections5btree6remove259_$LT$impl$u20$alloc__collections__btree__node__Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Leaf$GT$$C$alloc__collections__btree__node__marker__KV$GT$$GT$14remove_leaf_kv17h1338e9b021c47ae4E($0 | 0, $3 + 8 | 0 | 0, $2 | 0);
    break label$1;
   }
   $1 = HEAP32[(($5 + ($4 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
   label$3 : {
    $4 = $6 + -1 | 0;
    if (!$4) {
     break label$3
    }
    $5 = $6 + -2 | 0;
    label$4 : {
     $6 = $4 & 3 | 0;
     if (!$6) {
      break label$4
     }
     label$5 : while (1) {
      $4 = $4 + -1 | 0;
      $1 = HEAP32[(($1 + ((HEAPU16[($1 + 182 | 0) >> 1] | 0) << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
      $6 = $6 + -1 | 0;
      if ($6) {
       continue label$5
      }
      break label$5;
     };
    }
    if ($5 >>> 0 < 3 >>> 0) {
     break label$3
    }
    label$6 : while (1) {
     $1 = HEAP32[(($1 + ((HEAPU16[($1 + 182 | 0) >> 1] | 0) << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     $1 = HEAP32[(($1 + ((HEAPU16[($1 + 182 | 0) >> 1] | 0) << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     $1 = HEAP32[(($1 + ((HEAPU16[($1 + 182 | 0) >> 1] | 0) << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     $1 = HEAP32[(($1 + ((HEAPU16[($1 + 182 | 0) >> 1] | 0) << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     $4 = $4 + -4 | 0;
     if ($4) {
      continue label$6
     }
     break label$6;
    };
   }
   HEAP32[($3 + 20 | 0) >> 2] = $1;
   $92 = $3;
   i64toi32_i32$2 = $1;
   i64toi32_i32$0 = HEAPU16[($1 + 182 | 0) >> 1] | 0;
   i64toi32_i32$1 = 0;
   i64toi32_i32$2 = i64toi32_i32$0;
   i64toi32_i32$0 = 0;
   i64toi32_i32$3 = 32;
   i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
   if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
    i64toi32_i32$0 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
    $21 = 0;
   } else {
    i64toi32_i32$0 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
    $21 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   }
   i64toi32_i32$1 = $21;
   i64toi32_i32$2 = -1;
   i64toi32_i32$3 = 0;
   i64toi32_i32$4 = i64toi32_i32$1 + i64toi32_i32$3 | 0;
   i64toi32_i32$5 = i64toi32_i32$0 + i64toi32_i32$2 | 0;
   if (i64toi32_i32$4 >>> 0 < i64toi32_i32$3 >>> 0) {
    i64toi32_i32$5 = i64toi32_i32$5 + 1 | 0
   }
   i64toi32_i32$1 = $92;
   HEAP32[(i64toi32_i32$1 + 24 | 0) >> 2] = i64toi32_i32$4;
   HEAP32[(i64toi32_i32$1 + 28 | 0) >> 2] = i64toi32_i32$5;
   _ZN5alloc11collections5btree6remove259_$LT$impl$u20$alloc__collections__btree__node__Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Leaf$GT$$C$alloc__collections__btree__node__marker__KV$GT$$GT$14remove_leaf_kv17h1338e9b021c47ae4E($3 + 32 | 0 | 0, $3 + 20 | 0 | 0, $2 | 0);
   $6 = ($3 + 64 | 0) + 8 | 0;
   HEAP32[$6 >> 2] = HEAP32[(($3 + 32 | 0) + 12 | 0) >> 2] | 0;
   i64toi32_i32$0 = $3;
   i64toi32_i32$5 = HEAP32[($3 + 36 | 0) >> 2] | 0;
   i64toi32_i32$1 = HEAP32[($3 + 40 | 0) >> 2] | 0;
   $112 = i64toi32_i32$5;
   i64toi32_i32$5 = $3;
   HEAP32[($3 + 64 | 0) >> 2] = $112;
   HEAP32[($3 + 68 | 0) >> 2] = i64toi32_i32$1;
   $5 = HEAP32[($3 + 32 | 0) >> 2] | 0;
   $2 = HEAP32[($3 + 52 | 0) >> 2] | 0;
   label$7 : {
    $4 = HEAP32[($3 + 56 | 0) >> 2] | 0;
    $1 = HEAP32[($3 + 48 | 0) >> 2] | 0;
    if ($4 >>> 0 < (HEAPU16[($1 + 182 | 0) >> 1] | 0) >>> 0) {
     break label$7
    }
    label$8 : while (1) {
     $2 = $2 + 1 | 0;
     $4 = HEAPU16[($1 + 180 | 0) >> 1] | 0;
     $1 = HEAP32[$1 >> 2] | 0;
     if ($4 >>> 0 >= (HEAPU16[($1 + 182 | 0) >> 1] | 0) >>> 0) {
      continue label$8
     }
     break label$8;
    };
   }
   $7 = ($1 + ($4 << 2 | 0) | 0) + 4 | 0;
   $8 = HEAP32[$7 >> 2] | 0;
   HEAP32[$7 >> 2] = $5;
   $5 = $1 + Math_imul($4, 12) | 0;
   $7 = $5 + 56 | 0;
   HEAP32[(($3 + 32 | 0) + 8 | 0) >> 2] = HEAP32[$7 >> 2] | 0;
   $5 = $5 + 48 | 0;
   i64toi32_i32$0 = $5;
   i64toi32_i32$1 = HEAP32[$5 >> 2] | 0;
   i64toi32_i32$5 = HEAP32[($5 + 4 | 0) >> 2] | 0;
   $9 = i64toi32_i32$1;
   $9$hi = i64toi32_i32$5;
   i64toi32_i32$0 = $3;
   i64toi32_i32$5 = HEAP32[($3 + 64 | 0) >> 2] | 0;
   i64toi32_i32$1 = HEAP32[($3 + 68 | 0) >> 2] | 0;
   $161 = i64toi32_i32$5;
   i64toi32_i32$5 = $5;
   HEAP32[$5 >> 2] = $161;
   HEAP32[($5 + 4 | 0) >> 2] = i64toi32_i32$1;
   HEAP32[$7 >> 2] = HEAP32[$6 >> 2] | 0;
   i64toi32_i32$1 = $9$hi;
   i64toi32_i32$5 = $3;
   HEAP32[($3 + 32 | 0) >> 2] = $9;
   HEAP32[($3 + 36 | 0) >> 2] = i64toi32_i32$1;
   $5 = $4 + 1 | 0;
   label$9 : {
    if (!$2) {
     break label$9
    }
    $4 = ($1 + ($5 << 2 | 0) | 0) + 184 | 0;
    label$10 : {
     label$11 : {
      $5 = $2 & 7 | 0;
      if ($5) {
       break label$11
      }
      $6 = $2;
      break label$10;
     }
     $6 = $2;
     label$12 : while (1) {
      $6 = $6 + -1 | 0;
      $1 = HEAP32[$4 >> 2] | 0;
      $4 = $1 + 184 | 0;
      $5 = $5 + -1 | 0;
      if ($5) {
       continue label$12
      }
      break label$12;
     };
    }
    $5 = 0;
    if ($2 >>> 0 < 8 >>> 0) {
     break label$9
    }
    label$13 : while (1) {
     $1 = HEAP32[((HEAP32[((HEAP32[((HEAP32[((HEAP32[((HEAP32[((HEAP32[((HEAP32[$4 >> 2] | 0) + 184 | 0) >> 2] | 0) + 184 | 0) >> 2] | 0) + 184 | 0) >> 2] | 0) + 184 | 0) >> 2] | 0) + 184 | 0) >> 2] | 0) + 184 | 0) >> 2] | 0) + 184 | 0) >> 2] | 0;
     $4 = $1 + 184 | 0;
     $6 = $6 + -8 | 0;
     if ($6) {
      continue label$13
     }
     break label$13;
    };
   }
   HEAP32[$0 >> 2] = $8;
   i64toi32_i32$0 = $3;
   i64toi32_i32$1 = HEAP32[($3 + 32 | 0) >> 2] | 0;
   i64toi32_i32$5 = HEAP32[($3 + 36 | 0) >> 2] | 0;
   $210 = i64toi32_i32$1;
   i64toi32_i32$1 = $0;
   HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = $210;
   HEAP32[(i64toi32_i32$1 + 8 | 0) >> 2] = i64toi32_i32$5;
   HEAP32[(i64toi32_i32$1 + 24 | 0) >> 2] = $5;
   HEAP32[(i64toi32_i32$1 + 20 | 0) >> 2] = 0;
   HEAP32[(i64toi32_i32$1 + 16 | 0) >> 2] = $1;
   HEAP32[(i64toi32_i32$1 + 12 | 0) >> 2] = HEAP32[($3 + 40 | 0) >> 2] | 0;
  }
  __stack_pointer = $3 + 80 | 0;
 }
 
 function _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$7reserve21do_reserve_and_handle17h3c2f1fde18393d5eE_llvm_5589736827978271673($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $4 = 0;
  $3 = __stack_pointer - 32 | 0;
  __stack_pointer = $3;
  label$1 : {
   $2 = $1 + $2 | 0;
   if ($2 >>> 0 >= $1 >>> 0) {
    break label$1
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(0 | 0, 0 | 0);
   wasm2js_trap();
  }
  $4 = HEAP32[$0 >> 2] | 0;
  $1 = $4 << 1 | 0;
  $1 = $1 >>> 0 > $2 >>> 0 ? $1 : $2;
  $1 = $1 >>> 0 > 8 >>> 0 ? $1 : 8;
  $2 = ($1 ^ -1 | 0) >>> 31 | 0;
  label$2 : {
   label$3 : {
    if ($4) {
     break label$3
    }
    $4 = 0;
    break label$2;
   }
   HEAP32[($3 + 28 | 0) >> 2] = $4;
   HEAP32[($3 + 20 | 0) >> 2] = HEAP32[($0 + 4 | 0) >> 2] | 0;
   $4 = 1;
  }
  HEAP32[($3 + 24 | 0) >> 2] = $4;
  _ZN5alloc7raw_vec11finish_grow17h2a582f1f38547224E_llvm_5589736827978271673($3 + 8 | 0 | 0, $2 | 0, $1 | 0, $3 + 20 | 0 | 0);
  label$4 : {
   if ((HEAP32[($3 + 8 | 0) >> 2] | 0 | 0) != (1 | 0)) {
    break label$4
   }
   _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(HEAP32[($3 + 12 | 0) >> 2] | 0 | 0, HEAP32[($3 + 16 | 0) >> 2] | 0 | 0);
   wasm2js_trap();
  }
  $2 = HEAP32[($3 + 12 | 0) >> 2] | 0;
  HEAP32[$0 >> 2] = $1;
  HEAP32[($0 + 4 | 0) >> 2] = $2;
  __stack_pointer = $3 + 32 | 0;
 }
 
 function _ZN5alloc11collections5btree3map25BTreeMap$LT$K$C$V$C$A$GT$6insert17ha01c5540b97f764fE($0, $1, $2, $3) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  var $10 = 0, $4 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, $7 = 0, i64toi32_i32$2 = 0, $5 = 0, $11 = 0, $12 = 0, $6 = 0, $8 = 0, $9 = 0, $75 = 0, $95 = 0, $123 = 0, $126 = 0;
  $4 = __stack_pointer - 48 | 0;
  __stack_pointer = $4;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       $5 = HEAP32[$1 >> 2] | 0;
       if (!$5) {
        break label$5
       }
       $6 = HEAP32[($1 + 4 | 0) >> 2] | 0;
       label$6 : while (1) {
        $7 = $5 + 4 | 0;
        $8 = HEAPU16[($5 + 182 | 0) >> 1] | 0;
        $9 = Math_imul($8, 12);
        $10 = 0;
        $11 = -1;
        label$7 : {
         label$8 : while (1) {
          label$9 : {
           if (($9 | 0) != ($10 | 0)) {
            break label$9
           }
           $11 = $8;
           break label$7;
          }
          $12 = HEAP32[$7 >> 2] | 0;
          $11 = $11 + 1 | 0;
          $10 = $10 + 12 | 0;
          $7 = $7 + 4 | 0;
          $12 = $12 >>> 0 > $2 >>> 0 ? -1 : ($12 | 0) != ($2 | 0);
          if (($12 | 0) == (1 | 0)) {
           continue label$8
          }
          break label$8;
         };
         if (!($12 & 255 | 0)) {
          break label$3
         }
        }
        if (!$6) {
         break label$4
        }
        $6 = $6 + -1 | 0;
        $5 = HEAP32[(($5 + ($11 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
        continue label$6;
       };
      }
      $7 = 0;
      HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
      $10 = __rust_alloc(184 | 0, 4 | 0) | 0;
      if (!$10) {
       break label$1
      }
      HEAP16[($10 + 182 | 0) >> 1] = 1;
      HEAP32[$10 >> 2] = 0;
      HEAP32[($10 + 4 | 0) >> 2] = $2;
      i64toi32_i32$1 = $1;
      i64toi32_i32$0 = 1;
      HEAP32[(i64toi32_i32$1 + 4 | 0) >> 2] = 0;
      HEAP32[(i64toi32_i32$1 + 8 | 0) >> 2] = i64toi32_i32$0;
      HEAP32[i64toi32_i32$1 >> 2] = $10;
      i64toi32_i32$2 = $3;
      i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
      i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
      $75 = i64toi32_i32$0;
      i64toi32_i32$0 = $10;
      HEAP32[($10 + 48 | 0) >> 2] = $75;
      HEAP32[($10 + 52 | 0) >> 2] = i64toi32_i32$1;
      HEAP32[($10 + 56 | 0) >> 2] = HEAP32[(i64toi32_i32$2 + 8 | 0) >> 2] | 0;
      break label$2;
     }
     $7 = 0;
     HEAP32[($4 + 16 | 0) >> 2] = 0;
     HEAP32[($4 + 12 | 0) >> 2] = $5;
     HEAP32[($4 + 8 | 0) >> 2] = $2;
     HEAP32[($4 + 4 | 0) >> 2] = $1;
     HEAP32[($4 + 20 | 0) >> 2] = $11;
     HEAP32[($4 + 32 | 0) >> 2] = $11;
     i64toi32_i32$2 = $4;
     i64toi32_i32$1 = HEAP32[($4 + 12 | 0) >> 2] | 0;
     i64toi32_i32$0 = HEAP32[($4 + 16 | 0) >> 2] | 0;
     $95 = i64toi32_i32$1;
     i64toi32_i32$1 = $4;
     HEAP32[($4 + 24 | 0) >> 2] = $95;
     HEAP32[($4 + 28 | 0) >> 2] = i64toi32_i32$0;
     _ZN5alloc11collections5btree4node210Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__Leaf$GT$$C$alloc__collections__btree__node__marker__Edge$GT$16insert_recursing17h01740383b348720fE($4 + 36 | 0 | 0, $4 + 24 | 0 | 0, $2 | 0, $3 | 0, $4 + 4 | 0 | 0);
     $10 = HEAP32[($4 + 4 | 0) >> 2] | 0;
     HEAP32[($10 + 8 | 0) >> 2] = (HEAP32[($10 + 8 | 0) >> 2] | 0) + 1 | 0;
     break label$2;
    }
    $10 = $5 + $10 | 0;
    $7 = $10 + 44 | 0;
    HEAP32[($0 + 12 | 0) >> 2] = HEAP32[$7 >> 2] | 0;
    $10 = $10 + 36 | 0;
    i64toi32_i32$2 = $10;
    i64toi32_i32$0 = HEAP32[$10 >> 2] | 0;
    i64toi32_i32$1 = HEAP32[($10 + 4 | 0) >> 2] | 0;
    $123 = i64toi32_i32$0;
    i64toi32_i32$0 = $0;
    HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = $123;
    HEAP32[(i64toi32_i32$0 + 8 | 0) >> 2] = i64toi32_i32$1;
    i64toi32_i32$2 = $3;
    i64toi32_i32$1 = HEAP32[i64toi32_i32$2 >> 2] | 0;
    i64toi32_i32$0 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
    $126 = i64toi32_i32$1;
    i64toi32_i32$1 = $10;
    HEAP32[$10 >> 2] = $126;
    HEAP32[($10 + 4 | 0) >> 2] = i64toi32_i32$0;
    HEAP32[$7 >> 2] = HEAP32[(i64toi32_i32$2 + 8 | 0) >> 2] | 0;
    $7 = 1;
   }
   HEAP32[$0 >> 2] = $7;
   __stack_pointer = $4 + 48 | 0;
   return;
  }
  _ZN5alloc5alloc18handle_alloc_error17h123ae56be4092711E(4 | 0, 184 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc11collections5btree3map25BTreeMap$LT$K$C$V$C$A$GT$6remove17hc793cbb765ab111dE($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$2 = 0, $9 = 0, $10 = 0, $4 = 0, $6 = 0, $5 = 0, $7 = 0, $8 = 0, $82 = 0, $85 = 0, $96 = 0, $99 = 0, $123 = 0, $126 = 0, $129 = 0;
  $3 = __stack_pointer - 96 | 0;
  __stack_pointer = $3;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      $4 = HEAP32[$1 >> 2] | 0;
      if ($4) {
       break label$4
      }
      $2 = 0;
      break label$3;
     }
     $5 = HEAP32[$2 >> 2] | 0;
     $6 = HEAP32[($1 + 4 | 0) >> 2] | 0;
     label$5 : while (1) {
      $7 = HEAPU16[($4 + 182 | 0) >> 1] | 0;
      $8 = $7 << 2 | 0;
      $2 = 0;
      $9 = -1;
      label$6 : {
       label$7 : {
        label$8 : while (1) {
         label$9 : {
          if (($8 | 0) != ($2 | 0)) {
           break label$9
          }
          $9 = $7;
          break label$7;
         }
         $10 = $4 + $2 | 0;
         $9 = $9 + 1 | 0;
         $2 = $2 + 4 | 0;
         $10 = HEAP32[($10 + 4 | 0) >> 2] | 0;
         $10 = $10 >>> 0 > $5 >>> 0 ? -1 : ($10 | 0) != ($5 | 0);
         if (($10 | 0) == (1 | 0)) {
          continue label$8
         }
         break label$8;
        };
        if (!($10 & 255 | 0)) {
         break label$6
        }
       }
       label$10 : {
        if ($6) {
         break label$10
        }
        $2 = 0;
        break label$3;
       }
       $6 = $6 + -1 | 0;
       $4 = HEAP32[(($4 + ($9 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
       continue label$5;
      }
      break label$5;
     };
     HEAP32[($3 + 40 | 0) >> 2] = $1;
     HEAP32[($3 + 36 | 0) >> 2] = $9;
     HEAP32[($3 + 32 | 0) >> 2] = $6;
     HEAP32[($3 + 28 | 0) >> 2] = $4;
     HEAP8[($3 + 47 | 0) >> 0] = 0;
     _ZN5alloc11collections5btree6remove269_$LT$impl$u20$alloc__collections__btree__node__Handle$LT$alloc__collections__btree__node__NodeRef$LT$alloc__collections__btree__node__marker__Mut$C$K$C$V$C$alloc__collections__btree__node__marker__LeafOrInternal$GT$$C$alloc__collections__btree__node__marker__KV$GT$$GT$18remove_kv_tracking17h9cdde6bfc5849410E($3 + 68 | 0 | 0, $3 + 28 | 0 | 0, $3 + 47 | 0 | 0);
     $2 = ($3 + 48 | 0) + 8 | 0;
     i64toi32_i32$2 = ($3 + 68 | 0) + 8 | 0;
     i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
     i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
     $82 = i64toi32_i32$0;
     i64toi32_i32$0 = $2;
     HEAP32[i64toi32_i32$0 >> 2] = $82;
     HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
     i64toi32_i32$2 = $3;
     i64toi32_i32$1 = HEAP32[($3 + 68 | 0) >> 2] | 0;
     i64toi32_i32$0 = HEAP32[($3 + 72 | 0) >> 2] | 0;
     $85 = i64toi32_i32$1;
     i64toi32_i32$1 = $3;
     HEAP32[($3 + 48 | 0) >> 2] = $85;
     HEAP32[($3 + 52 | 0) >> 2] = i64toi32_i32$0;
     HEAP32[($1 + 8 | 0) >> 2] = (HEAP32[($1 + 8 | 0) >> 2] | 0) + -1 | 0;
     label$11 : {
      label$12 : {
       if (HEAPU8[($3 + 47 | 0) >> 0] | 0) {
        break label$12
       }
       i64toi32_i32$2 = $2;
       i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
       i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
       $96 = i64toi32_i32$0;
       i64toi32_i32$0 = ($3 + 8 | 0) + 8 | 0;
       HEAP32[i64toi32_i32$0 >> 2] = $96;
       HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
       i64toi32_i32$2 = $3;
       i64toi32_i32$1 = HEAP32[($3 + 48 | 0) >> 2] | 0;
       i64toi32_i32$0 = HEAP32[($3 + 52 | 0) >> 2] | 0;
       $99 = i64toi32_i32$1;
       i64toi32_i32$1 = $3;
       HEAP32[($3 + 8 | 0) >> 2] = $99;
       HEAP32[($3 + 12 | 0) >> 2] = i64toi32_i32$0;
       break label$11;
      }
      $2 = HEAP32[$1 >> 2] | 0;
      if (!$2) {
       break label$2
      }
      $9 = HEAP32[($1 + 4 | 0) >> 2] | 0;
      if (!$9) {
       break label$1
      }
      HEAP32[($1 + 4 | 0) >> 2] = $9 + -1 | 0;
      $9 = HEAP32[($2 + 184 | 0) >> 2] | 0;
      HEAP32[$1 >> 2] = $9;
      HEAP32[$9 >> 2] = 0;
      __rust_dealloc($2 | 0, 232 | 0, 4 | 0);
      i64toi32_i32$2 = ($3 + 48 | 0) + 8 | 0;
      i64toi32_i32$0 = HEAP32[i64toi32_i32$2 >> 2] | 0;
      i64toi32_i32$1 = HEAP32[(i64toi32_i32$2 + 4 | 0) >> 2] | 0;
      $123 = i64toi32_i32$0;
      i64toi32_i32$0 = ($3 + 8 | 0) + 8 | 0;
      HEAP32[i64toi32_i32$0 >> 2] = $123;
      HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
      i64toi32_i32$2 = $3;
      i64toi32_i32$1 = HEAP32[($3 + 48 | 0) >> 2] | 0;
      i64toi32_i32$0 = HEAP32[($3 + 52 | 0) >> 2] | 0;
      $126 = i64toi32_i32$1;
      i64toi32_i32$1 = $3;
      HEAP32[($3 + 8 | 0) >> 2] = $126;
      HEAP32[($3 + 12 | 0) >> 2] = i64toi32_i32$0;
     }
     i64toi32_i32$2 = $3;
     i64toi32_i32$0 = HEAP32[($3 + 12 | 0) >> 2] | 0;
     i64toi32_i32$1 = HEAP32[($3 + 16 | 0) >> 2] | 0;
     $129 = i64toi32_i32$0;
     i64toi32_i32$0 = $0;
     HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = $129;
     HEAP32[(i64toi32_i32$0 + 8 | 0) >> 2] = i64toi32_i32$1;
     HEAP32[(i64toi32_i32$0 + 12 | 0) >> 2] = HEAP32[(($3 + 8 | 0) + 12 | 0) >> 2] | 0;
     $2 = 1;
    }
    HEAP32[$0 >> 2] = $2;
    __stack_pointer = $3 + 96 | 0;
    return;
   }
   _ZN4core6option13unwrap_failed17h98817bc8a3accaffE(1051024 | 0);
   wasm2js_trap();
  }
  _ZN4core9panicking5panic17h9f0a34b0744fbd45E(1050036 | 0, 33 | 0, 1050072 | 0);
  wasm2js_trap();
 }
 
 function _ZN5alloc7raw_vec11finish_grow17h2a582f1f38547224E_llvm_5589736827978271673($0, $1, $2, $3) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  $3 = $3 | 0;
  var $4 = 0, $5 = 0, $6 = 0;
  $4 = 1;
  $5 = 0;
  $6 = 4;
  label$1 : {
   if (!$1) {
    break label$1
   }
   if (($2 | 0) < (0 | 0)) {
    break label$1
   }
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        if (!(HEAP32[($3 + 4 | 0) >> 2] | 0)) {
         break label$6
        }
        label$7 : {
         $4 = HEAP32[($3 + 8 | 0) >> 2] | 0;
         if ($4) {
          break label$7
         }
         label$8 : {
          if ($2) {
           break label$8
          }
          $4 = 1;
          break label$4;
         }
         HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
         $4 = __rust_alloc($2 | 0, 1 | 0) | 0;
         break label$5;
        }
        $4 = __rust_realloc(HEAP32[$3 >> 2] | 0 | 0, $4 | 0, 1 | 0, $2 | 0) | 0;
        break label$5;
       }
       label$9 : {
        if ($2) {
         break label$9
        }
        $4 = 1;
        break label$4;
       }
       HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
       $4 = __rust_alloc($2 | 0, 1 | 0) | 0;
      }
      if (!$4) {
       break label$3
      }
     }
     HEAP32[($0 + 4 | 0) >> 2] = $4;
     $4 = 0;
     break label$2;
    }
    $4 = 1;
    HEAP32[($0 + 4 | 0) >> 2] = 1;
   }
   $6 = 8;
   $5 = $2;
  }
  HEAP32[($0 + $6 | 0) >> 2] = $5;
  HEAP32[$0 >> 2] = $4;
 }
 
 function _ZN98_$LT$alloc__vec__Vec$LT$T$GT$$u20$as$u20$alloc__vec__spec_from_iter__SpecFromIter$LT$T$C$I$GT$$GT$9from_iter17hace63ed3f33297cdE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $6 = 0, $5 = 0, $3 = 0, $9 = 0, $4 = 0, i64toi32_i32$0 = 0, $10 = 0, $7 = 0, i64toi32_i32$1 = 0, $8 = 0, $11 = 0, $12 = 0, $237 = 0;
  $2 = __stack_pointer - 48 | 0;
  __stack_pointer = $2;
  $3 = HEAP32[($1 + 8 | 0) >> 2] | 0;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        $4 = HEAP32[$1 >> 2] | 0;
        if ($4) {
         break label$6
        }
        if (!$3) {
         break label$5
        }
        $5 = (HEAP32[($1 + 12 | 0) >> 2] | 0) - $3 | 0;
        break label$3;
       }
       $6 = (HEAP32[($1 + 4 | 0) >> 2] | 0) - $4 | 0;
       if ($3) {
        break label$4
       }
       $5 = $6;
       break label$3;
      }
      i64toi32_i32$1 = $2;
      i64toi32_i32$0 = 1;
      HEAP32[($2 + 12 | 0) >> 2] = 0;
      HEAP32[($2 + 16 | 0) >> 2] = i64toi32_i32$0;
      $6 = 0;
      break label$2;
     }
     $5 = ((HEAP32[($1 + 12 | 0) >> 2] | 0) - $3 | 0) + $6 | 0;
     if ($5 >>> 0 < $6 >>> 0) {
      break label$1
     }
    }
    label$7 : {
     label$8 : {
      label$9 : {
       label$10 : {
        label$11 : {
         if ($5) {
          break label$11
         }
         $7 = 1;
         break label$10;
        }
        $6 = 0;
        if (($5 | 0) < (0 | 0)) {
         break label$9
        }
        HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
        $6 = 1;
        $7 = __rust_alloc($5 | 0, 1 | 0) | 0;
        if (!$7) {
         break label$9
        }
       }
       $6 = 0;
       HEAP32[($2 + 20 | 0) >> 2] = 0;
       HEAP32[($2 + 16 | 0) >> 2] = $7;
       HEAP32[($2 + 12 | 0) >> 2] = $5;
       $8 = HEAP32[($1 + 12 | 0) >> 2] | 0;
       $1 = HEAP32[($1 + 4 | 0) >> 2] | 0;
       label$12 : {
        label$13 : {
         label$14 : {
          if ($4) {
           break label$14
          }
          if (!$3) {
           break label$2
          }
          $6 = $8 - $3 | 0;
          break label$13;
         }
         $9 = $1 - $4 | 0;
         label$15 : {
          if ($3) {
           break label$15
          }
          $6 = $9;
          break label$13;
         }
         $6 = ($8 - $3 | 0) + $9 | 0;
         if ($6 >>> 0 < $9 >>> 0) {
          break label$12
         }
        }
        if ($6 >>> 0 > $5 >>> 0) {
         break label$8
        }
        $6 = 0;
        break label$7;
       }
       HEAP32[($2 + 40 | 0) >> 2] = 0;
       HEAP32[($2 + 28 | 0) >> 2] = 1;
       HEAP32[($2 + 24 | 0) >> 2] = 1050808;
       i64toi32_i32$1 = $2;
       i64toi32_i32$0 = 0;
       HEAP32[($2 + 32 | 0) >> 2] = 4;
       HEAP32[($2 + 36 | 0) >> 2] = i64toi32_i32$0;
       _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($2 + 24 | 0 | 0, 1051116 | 0);
       wasm2js_trap();
      }
      _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE($6 | 0, $5 | 0);
      wasm2js_trap();
     }
     _ZN5alloc7raw_vec19RawVec$LT$T$C$A$GT$7reserve21do_reserve_and_handle17h3c2f1fde18393d5eE_llvm_5589736827978271673($2 + 12 | 0 | 0, 0 | 0, $6 | 0);
     $7 = HEAP32[($2 + 16 | 0) >> 2] | 0;
     $6 = HEAP32[($2 + 20 | 0) >> 2] | 0;
    }
    label$16 : {
     if (!$4) {
      break label$16
     }
     if (($4 | 0) == ($1 | 0)) {
      break label$16
     }
     $5 = $1 - $4 | 0;
     $10 = $5 & 3 | 0;
     label$17 : {
      label$18 : {
       if (($4 - $1 | 0) >>> 0 <= -4 >>> 0) {
        break label$18
       }
       $1 = 0;
       break label$17;
      }
      $11 = $7 + $6 | 0;
      $12 = $5 & -4 | 0;
      $1 = 0;
      label$19 : while (1) {
       $5 = $11 + $1 | 0;
       $9 = $4 + $1 | 0;
       HEAP8[$5 >> 0] = HEAPU8[$9 >> 0] | 0;
       HEAP8[($5 + 1 | 0) >> 0] = HEAPU8[($9 + 1 | 0) >> 0] | 0;
       HEAP8[($5 + 2 | 0) >> 0] = HEAPU8[($9 + 2 | 0) >> 0] | 0;
       HEAP8[($5 + 3 | 0) >> 0] = HEAPU8[($9 + 3 | 0) >> 0] | 0;
       $1 = $1 + 4 | 0;
       if (($12 | 0) != ($1 | 0)) {
        continue label$19
       }
       break label$19;
      };
      $6 = $6 + $1 | 0;
     }
     if (!$10) {
      break label$16
     }
     $1 = $4 + $1 | 0;
     label$20 : while (1) {
      HEAP8[($7 + $6 | 0) >> 0] = HEAPU8[$1 >> 0] | 0;
      $1 = $1 + 1 | 0;
      $6 = $6 + 1 | 0;
      $10 = $10 + -1 | 0;
      if ($10) {
       continue label$20
      }
      break label$20;
     };
    }
    if (!$3) {
     break label$2
    }
    if (($3 | 0) == ($8 | 0)) {
     break label$2
    }
    $1 = $8 - $3 | 0;
    $10 = $1 & 3 | 0;
    label$21 : {
     label$22 : {
      if (($3 - $8 | 0) >>> 0 <= -4 >>> 0) {
       break label$22
      }
      $1 = 0;
      break label$21;
     }
     $4 = $7 + $6 | 0;
     $11 = $1 & -4 | 0;
     $1 = 0;
     label$23 : while (1) {
      $5 = $4 + $1 | 0;
      $9 = $3 + $1 | 0;
      HEAP8[$5 >> 0] = HEAPU8[$9 >> 0] | 0;
      HEAP8[($5 + 1 | 0) >> 0] = HEAPU8[($9 + 1 | 0) >> 0] | 0;
      HEAP8[($5 + 2 | 0) >> 0] = HEAPU8[($9 + 2 | 0) >> 0] | 0;
      HEAP8[($5 + 3 | 0) >> 0] = HEAPU8[($9 + 3 | 0) >> 0] | 0;
      $1 = $1 + 4 | 0;
      if (($11 | 0) != ($1 | 0)) {
       continue label$23
      }
      break label$23;
     };
     $6 = $6 + $1 | 0;
    }
    if (!$10) {
     break label$2
    }
    $1 = $3 + $1 | 0;
    label$24 : while (1) {
     HEAP8[($7 + $6 | 0) >> 0] = HEAPU8[$1 >> 0] | 0;
     $1 = $1 + 1 | 0;
     $6 = $6 + 1 | 0;
     $10 = $10 + -1 | 0;
     if ($10) {
      continue label$24
     }
     break label$24;
    };
   }
   HEAP32[($2 + 20 | 0) >> 2] = $6;
   i64toi32_i32$0 = HEAP32[($2 + 12 | 0) >> 2] | 0;
   i64toi32_i32$1 = HEAP32[($2 + 16 | 0) >> 2] | 0;
   $237 = i64toi32_i32$0;
   i64toi32_i32$0 = $0;
   HEAP32[i64toi32_i32$0 >> 2] = $237;
   HEAP32[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
   HEAP32[(i64toi32_i32$0 + 8 | 0) >> 2] = HEAP32[(($2 + 12 | 0) + 8 | 0) >> 2] | 0;
   __stack_pointer = $2 + 48 | 0;
   return;
  }
  HEAP32[($2 + 40 | 0) >> 2] = 0;
  HEAP32[($2 + 28 | 0) >> 2] = 1;
  HEAP32[($2 + 24 | 0) >> 2] = 1050808;
  i64toi32_i32$0 = $2;
  i64toi32_i32$1 = 0;
  HEAP32[($2 + 32 | 0) >> 2] = 4;
  HEAP32[($2 + 36 | 0) >> 2] = i64toi32_i32$1;
  _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($2 + 24 | 0 | 0, 1050912 | 0);
  wasm2js_trap();
 }
 
 function _ZN42_$LT$$RF$T$u20$as$u20$core__fmt__Debug$GT$3fmt17h48376aecd7558ddcE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0;
  $2 = __stack_pointer - 16 | 0;
  __stack_pointer = $2;
  $3 = HEAP32[($0 + 4 | 0) >> 2] | 0;
  $0 = HEAP32[$0 >> 2] | 0;
  _ZN4core3fmt9Formatter10debug_list17hd710ece3eac84443E($2 + 4 | 0 | 0, $1 | 0);
  label$1 : {
   if (!$3) {
    break label$1
   }
   label$2 : while (1) {
    HEAP32[($2 + 12 | 0) >> 2] = $0;
    _ZN4core3fmt8builders8DebugSet5entry17h7036b50f83a7398eE($2 + 4 | 0 | 0, $2 + 12 | 0 | 0, 1051132 | 0) | 0;
    $0 = $0 + 1 | 0;
    $3 = $3 + -1 | 0;
    if ($3) {
     continue label$2
    }
    break label$2;
   };
  }
  $0 = _ZN4core3fmt8builders9DebugList6finish17h4ef7645c675cb82eE($2 + 4 | 0 | 0) | 0;
  __stack_pointer = $2 + 16 | 0;
  return $0 | 0;
 }
 
 function _ZN42_$LT$$RF$T$u20$as$u20$core__fmt__Debug$GT$3fmt17hc2f10bc6239b2f43E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0;
  $0 = HEAP32[$0 >> 2] | 0;
  label$1 : {
   $2 = HEAP32[($1 + 28 | 0) >> 2] | 0;
   if ($2 & 16 | 0) {
    break label$1
   }
   label$2 : {
    if ($2 & 32 | 0) {
     break label$2
    }
    return _ZN4core3fmt3num3imp51_$LT$impl$u20$core__fmt__Display$u20$for$u20$u8$GT$3fmt17h96ec540fce0e8c05E($0 | 0, $1 | 0) | 0 | 0;
   }
   return _ZN4core3fmt3num52_$LT$impl$u20$core__fmt__UpperHex$u20$for$u20$i8$GT$3fmt17h8bec9e17aa3a250bE($0 | 0, $1 | 0) | 0 | 0;
  }
  return _ZN4core3fmt3num52_$LT$impl$u20$core__fmt__LowerHex$u20$for$u20$i8$GT$3fmt17hbd8bbf103c04b7d4E($0 | 0, $1 | 0) | 0 | 0;
 }
 
 function _ZN12rust_runtime3mem6WACell8new_data17h26cb5cb718c9ee73E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $10 = 0, $11 = 0, $7 = 0, $8 = 0, $9 = 0;
  $3 = __stack_pointer - 48 | 0;
  __stack_pointer = $3;
  $4 = 0;
  HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
  $5 = $2 + 8 | 0;
  $6 = __rust_alloc($5 | 0, 1 | 0) | 0;
  HEAP32[($3 + 12 | 0) >> 2] = $0 << 24 | 0 | (($0 & 65280 | 0) << 8 | 0) | 0 | (($0 >>> 8 | 0) & 65280 | 0 | ($0 >>> 24 | 0) | 0) | 0;
  HEAP32[($3 + 16 | 0) >> 2] = $2 << 24 | 0 | (($2 & 65280 | 0) << 8 | 0) | 0 | (($2 >>> 8 | 0) & 65280 | 0 | ($2 >>> 24 | 0) | 0) | 0;
  HEAP32[($3 + 20 | 0) >> 2] = $1;
  $7 = $1 + $2 | 0;
  HEAP32[($3 + 32 | 0) >> 2] = $3 + 16 | 0;
  $8 = ($3 + 16 | 0) + 4 | 0;
  $9 = ($3 + 12 | 0) + 4 | 0;
  $0 = $3 + 12 | 0;
  $1 = 1;
  label$1 : {
   label$2 : {
    label$3 : while (1) {
     label$4 : {
      label$5 : {
       label$6 : {
        label$7 : {
         if ($1 & 1 | 0) {
          break label$7
         }
         $10 = $0;
         break label$6;
        }
        label$8 : {
         if (!$0) {
          break label$8
         }
         if (($0 | 0) == ($9 | 0)) {
          break label$8
         }
         $1 = 1;
         $10 = $0 + 1 | 0;
         break label$4;
        }
        $10 = 0;
        $0 = HEAP32[($3 + 32 | 0) >> 2] | 0;
        if (!$0) {
         break label$6
        }
        if (($8 | 0) == ($0 | 0)) {
         break label$6
        }
        $11 = $3 + 32 | 0;
        $1 = 1;
        break label$5;
       }
       $0 = HEAP32[($3 + 20 | 0) >> 2] | 0;
       if (!$0) {
        break label$2
       }
       if (($7 | 0) == ($0 | 0)) {
        break label$2
       }
       $11 = $3 + 20 | 0;
       $1 = 0;
      }
      HEAP32[$11 >> 2] = $0 + 1 | 0;
     }
     if (($5 | 0) == ($4 | 0)) {
      break label$1
     }
     HEAP8[($6 + $4 | 0) >> 0] = HEAPU8[$0 >> 0] | 0;
     $4 = $4 + 1 | 0;
     $0 = $10;
     continue label$3;
    };
   }
   HEAP32[($3 + 28 | 0) >> 2] = 1;
   HEAP32[($3 + 20 | 0) >> 2] = $2;
   HEAP32[($3 + 24 | 0) >> 2] = $6;
   $0 = $6 + 8 | 0;
   _ZN5alloc11collections5btree3map25BTreeMap$LT$K$C$V$C$A$GT$6insert17ha01c5540b97f764fE($3 + 32 | 0 | 0, 1051808 | 0, $0 | 0, $3 + 20 | 0 | 0);
   label$9 : {
    if (!(HEAP32[($3 + 32 | 0) >> 2] | 0)) {
     break label$9
    }
    __rust_dealloc(HEAP32[($3 + 40 | 0) >> 2] | 0 | 0, HEAP32[($3 + 36 | 0) >> 2] | 0 | 0, 1 | 0);
   }
   __stack_pointer = $3 + 48 | 0;
   return $0 | 0;
  }
  _ZN4core9panicking18panic_bounds_check17hb583f390c1467acdE($5 | 0, $5 | 0, 1051176 | 0);
  wasm2js_trap();
 }
 
 function _ZN12rust_runtime3mem6WACell8new_size17h2ed2900047365a20E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $3 = 0, $4 = 0, $7 = 0, $5 = 0, $8 = 0, $6 = 0;
  $2 = __stack_pointer - 32 | 0;
  __stack_pointer = $2;
  $3 = 0;
  HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
  $4 = $1 + 8 | 0;
  $5 = __rust_alloc($4 | 0, 1 | 0) | 0;
  HEAP32[($2 + 4 | 0) >> 2] = $0 << 24 | 0 | (($0 & 65280 | 0) << 8 | 0) | 0 | (($0 >>> 8 | 0) & 65280 | 0 | ($0 >>> 24 | 0) | 0) | 0;
  HEAP32[($2 + 16 | 0) >> 2] = $1 << 24 | 0 | (($1 & 65280 | 0) << 8 | 0) | 0 | (($1 >>> 8 | 0) & 65280 | 0 | ($1 >>> 24 | 0) | 0) | 0;
  $6 = ($2 + 4 | 0) + 4 | 0;
  $0 = $2 + 4 | 0;
  $7 = 0;
  label$1 : {
   label$2 : {
    label$3 : while (1) {
     label$4 : {
      label$5 : {
       if (!$0) {
        break label$5
       }
       if (($0 | 0) == ($6 | 0)) {
        break label$5
       }
       $8 = $0 + 1 | 0;
       break label$4;
      }
      if (($3 | 0) == (4 | 0)) {
       break label$2
      }
      $0 = ($2 + 16 | 0) + $3 | 0;
      $3 = $3 + 1 | 0;
      $8 = 0;
     }
     if (($4 | 0) == ($7 | 0)) {
      break label$1
     }
     HEAP8[($5 + $7 | 0) >> 0] = HEAPU8[$0 >> 0] | 0;
     $7 = $7 + 1 | 0;
     $0 = $8;
     continue label$3;
    };
   }
   HEAP32[($2 + 12 | 0) >> 2] = 1;
   HEAP32[($2 + 4 | 0) >> 2] = $1;
   HEAP32[($2 + 8 | 0) >> 2] = $5;
   $0 = $5 + 8 | 0;
   _ZN5alloc11collections5btree3map25BTreeMap$LT$K$C$V$C$A$GT$6insert17ha01c5540b97f764fE($2 + 16 | 0 | 0, 1051808 | 0, $0 | 0, $2 + 4 | 0 | 0);
   label$6 : {
    if (!(HEAP32[($2 + 16 | 0) >> 2] | 0)) {
     break label$6
    }
    __rust_dealloc(HEAP32[($2 + 24 | 0) >> 2] | 0 | 0, HEAP32[($2 + 20 | 0) >> 2] | 0 | 0, 1 | 0);
   }
   __stack_pointer = $2 + 32 | 0;
   return $0 | 0;
  }
  _ZN4core9panicking18panic_bounds_check17hb583f390c1467acdE($4 | 0, $4 | 0, 1051192 | 0);
  wasm2js_trap();
 }
 
 function _ZN12rust_runtime3mem8WABuffer8from_ref17hd15e58422a800be2E($0) {
  $0 = $0 | 0;
  var $1 = 0, $8 = 0, $3 = 0, $7 = 0, $2 = 0, $4 = 0, $6 = 0, $5 = 0;
  label$1 : {
   $1 = HEAP32[(0 + 1051808 | 0) >> 2] | 0;
   if (!$1) {
    break label$1
   }
   $2 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
   label$2 : while (1) {
    $3 = $1 + 44 | 0;
    $4 = $1 + 4 | 0;
    $5 = HEAPU16[($1 + 182 | 0) >> 1] | 0;
    $6 = $5 << 2 | 0;
    $7 = -1;
    label$3 : {
     label$4 : {
      label$5 : while (1) {
       label$6 : {
        if ($6) {
         break label$6
        }
        $7 = $5;
        break label$4;
       }
       $8 = HEAP32[$4 >> 2] | 0;
       $7 = $7 + 1 | 0;
       $3 = $3 + 12 | 0;
       $6 = $6 + -4 | 0;
       $4 = $4 + 4 | 0;
       $8 = $8 >>> 0 > $0 >>> 0 ? -1 : ($8 | 0) != ($0 | 0);
       if (($8 | 0) == (1 | 0)) {
        continue label$5
       }
       break label$5;
      };
      if (!($8 & 255 | 0)) {
       break label$3
      }
     }
     if (!$2) {
      break label$1
     }
     $2 = $2 + -1 | 0;
     $1 = HEAP32[(($1 + ($7 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     continue label$2;
    }
    break label$2;
   };
   HEAP32[$3 >> 2] = (HEAP32[$3 >> 2] | 0) + 1 | 0;
  }
  return $0 | 0;
 }
 
 function _ZN12rust_runtime3mem7WAArray8from_ref17hc48303b07ff6a176E($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $12 = 0, $6 = 0, $7 = 0, $10 = 0, $11 = 0, $8 = 0, $5 = 0, $2 = 0, $3 = 0, $4 = 0, $9 = 0, $13 = 0;
  $2 = __stack_pointer - 32 | 0;
  __stack_pointer = $2;
  label$1 : {
   label$2 : {
    $3 = HEAP32[(0 + 1051808 | 0) >> 2] | 0;
    if (!$3) {
     break label$2
    }
    $4 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
    $5 = $4;
    $6 = $3;
    label$3 : {
     label$4 : while (1) {
      $7 = $6 + 44 | 0;
      $8 = $6 + 4 | 0;
      $9 = HEAPU16[($6 + 182 | 0) >> 1] | 0;
      $10 = $9 << 2 | 0;
      $11 = -1;
      label$5 : {
       label$6 : {
        label$7 : while (1) {
         label$8 : {
          if ($10) {
           break label$8
          }
          $11 = $9;
          break label$6;
         }
         $12 = HEAP32[$8 >> 2] | 0;
         $11 = $11 + 1 | 0;
         $7 = $7 + 12 | 0;
         $10 = $10 + -4 | 0;
         $8 = $8 + 4 | 0;
         $12 = $12 >>> 0 > $1 >>> 0 ? -1 : ($12 | 0) != ($1 | 0);
         if (($12 | 0) == (1 | 0)) {
          continue label$7
         }
         break label$7;
        };
        if (!($12 & 255 | 0)) {
         break label$5
        }
       }
       if (!$5) {
        break label$3
       }
       $5 = $5 + -1 | 0;
       $6 = HEAP32[(($6 + ($11 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
       continue label$4;
      }
      break label$4;
     };
     HEAP32[$7 >> 2] = (HEAP32[$7 >> 2] | 0) + 1 | 0;
     $4 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
    }
    $5 = $4;
    $6 = $3;
    label$9 : while (1) {
     $7 = $6 + 40 | 0;
     $8 = $6 + 4 | 0;
     $9 = HEAPU16[($6 + 182 | 0) >> 1] | 0;
     $10 = $9 << 2 | 0;
     $11 = -1;
     label$10 : {
      label$11 : {
       label$12 : while (1) {
        label$13 : {
         if ($10) {
          break label$13
         }
         $11 = $9;
         break label$11;
        }
        $12 = HEAP32[$8 >> 2] | 0;
        $11 = $11 + 1 | 0;
        $7 = $7 + 12 | 0;
        $10 = $10 + -4 | 0;
        $8 = $8 + 4 | 0;
        $12 = $12 >>> 0 > $1 >>> 0 ? -1 : ($12 | 0) != ($1 | 0);
        if (($12 | 0) == (1 | 0)) {
         continue label$12
        }
        break label$12;
       };
       if (!($12 & 255 | 0)) {
        break label$10
       }
      }
      if (!$5) {
       break label$2
      }
      $5 = $5 + -1 | 0;
      $6 = HEAP32[(($6 + ($11 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
      continue label$9;
     }
     break label$9;
    };
    $10 = HEAP32[($7 + -4 | 0) >> 2] | 0;
    if ($10 >>> 0 <= 3 >>> 0) {
     break label$1
    }
    $13 = (HEAP32[$7 >> 2] | 0) + 8 | 0;
    $6 = HEAPU8[$13 >> 0] | 0 | ((HEAPU8[($13 + 1 | 0) >> 0] | 0) << 8 | 0) | 0 | ((HEAPU8[($13 + 2 | 0) >> 0] | 0) << 16 | 0 | ((HEAPU8[($13 + 3 | 0) >> 0] | 0) << 24 | 0) | 0) | 0;
    label$14 : {
     label$15 : while (1) {
      $7 = $3 + 44 | 0;
      $8 = $3 + 4 | 0;
      $5 = HEAPU16[($3 + 182 | 0) >> 1] | 0;
      $10 = $5 << 2 | 0;
      $11 = -1;
      label$16 : {
       label$17 : {
        label$18 : while (1) {
         label$19 : {
          if ($10) {
           break label$19
          }
          $11 = $5;
          break label$17;
         }
         $12 = HEAP32[$8 >> 2] | 0;
         $11 = $11 + 1 | 0;
         $7 = $7 + 12 | 0;
         $10 = $10 + -4 | 0;
         $8 = $8 + 4 | 0;
         $12 = $12 >>> 0 > $6 >>> 0 ? -1 : ($12 | 0) != ($6 | 0);
         if (($12 | 0) == (1 | 0)) {
          continue label$18
         }
         break label$18;
        };
        if (!($12 & 255 | 0)) {
         break label$16
        }
       }
       if (!$4) {
        break label$14
       }
       $4 = $4 + -1 | 0;
       $3 = HEAP32[(($3 + ($11 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
       continue label$15;
      }
      break label$15;
     };
     HEAP32[$7 >> 2] = (HEAP32[$7 >> 2] | 0) + 1 | 0;
    }
    HEAP32[($0 + 4 | 0) >> 2] = $6;
    HEAP32[$0 >> 2] = $1;
    __stack_pointer = $2 + 32 | 0;
    return;
   }
   HEAP32[($2 + 24 | 0) >> 2] = 0;
   HEAP32[($2 + 12 | 0) >> 2] = 1;
   HEAP32[($2 + 8 | 0) >> 2] = 1051224;
   HEAP32[($2 + 16 | 0) >> 2] = 4;
   HEAP32[($2 + 20 | 0) >> 2] = 0;
   _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($2 + 8 | 0 | 0, 1051248 | 0);
   wasm2js_trap();
  }
  _ZN4core5slice5index24slice_end_index_len_fail17h02d344349d5072f8E(4 | 0, $10 | 0, 1051160 | 0);
  wasm2js_trap();
 }
 
 function _ZN12rust_runtime3mem8WAString3new17h3b4e78424fef5447E($0, $1, $2) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  $2 = $2 | 0;
  var $3 = 0, $4 = 0, $5 = 0;
  $3 = __stack_pointer - 32 | 0;
  __stack_pointer = $3;
  $4 = $1 + $2 | 0;
  label$1 : {
   label$2 : {
    if ($2 >>> 0 < 16 >>> 0) {
     break label$2
    }
    $2 = _ZN4core3str5count14do_count_chars17h03769f4f70ff5154E($1 | 0, $2 | 0) | 0;
    break label$1;
   }
   $2 = _ZN4core3str5count23char_count_general_case17ha75d4189ecacd84eE($1 | 0, $2 | 0) | 0;
  }
  HEAP32[($3 + 24 | 0) >> 2] = $4;
  HEAP32[($3 + 20 | 0) >> 2] = $1;
  HEAP32[($3 + 16 | 0) >> 2] = ($3 + 30 | 0) + 2 | 0;
  HEAP16[($3 + 30 | 0) >> 1] = $2;
  HEAP32[($3 + 12 | 0) >> 2] = $3 + 30 | 0;
  _ZN98_$LT$alloc__vec__Vec$LT$T$GT$$u20$as$u20$alloc__vec__spec_from_iter__SpecFromIter$LT$T$C$I$GT$$GT$9from_iter17hace63ed3f33297cdE($3 | 0, $3 + 12 | 0 | 0);
  $5 = HEAP32[($3 + 4 | 0) >> 2] | 0;
  $4 = HEAP32[($3 + 8 | 0) >> 2] | 0;
  $1 = _ZN12rust_runtime3mem6WACell8new_data17h26cb5cb718c9ee73E(1 | 0, $5 | 0, $4 | 0) | 0;
  HEAPU8[(0 + 1051325 | 0) >> 0] | 0;
  label$3 : {
   $2 = __rust_alloc(12 | 0, 1 | 0) | 0;
   if (!$2) {
    break label$3
   }
   HEAP8[($2 + 8 | 0) >> 0] = $4;
   HEAP8[($2 + 9 | 0) >> 0] = $4 >>> 8 | 0;
   HEAP8[($2 + 10 | 0) >> 0] = $4 >>> 16 | 0;
   HEAP8[($2 + 11 | 0) >> 0] = $4 >>> 24 | 0;
   HEAP8[($2 + 4 | 0) >> 0] = $1;
   HEAP8[($2 + 5 | 0) >> 0] = $1 >>> 8 | 0;
   HEAP8[($2 + 6 | 0) >> 0] = $1 >>> 16 | 0;
   HEAP8[($2 + 7 | 0) >> 0] = $1 >>> 24 | 0;
   HEAP8[$2 >> 0] = $1;
   HEAP8[($2 + 1 | 0) >> 0] = $1 >>> 8 | 0;
   HEAP8[($2 + 2 | 0) >> 0] = $1 >>> 16 | 0;
   HEAP8[($2 + 3 | 0) >> 0] = $1 >>> 24 | 0;
   $4 = _ZN12rust_runtime3mem6WACell8new_data17h26cb5cb718c9ee73E(2 | 0, $2 | 0, 12 | 0) | 0;
   __rust_dealloc($2 | 0, 12 | 0, 1 | 0);
   label$4 : {
    $2 = HEAP32[$3 >> 2] | 0;
    if (!$2) {
     break label$4
    }
    __rust_dealloc($5 | 0, $2 | 0, 1 | 0);
   }
   HEAP32[($0 + 4 | 0) >> 2] = $1;
   HEAP32[$0 >> 2] = $4;
   __stack_pointer = $3 + 32 | 0;
   return;
  }
  _ZN5alloc7raw_vec12handle_error17h7f22430f64ae98acE(1 | 0, 12 | 0);
  wasm2js_trap();
 }
 
 function _ZN12rust_runtime3mem7log_str17hac61e78d5ba71dcfE($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  var $2 = 0, $4 = 0, $10 = 0, $5 = 0, $7 = 0, $9 = 0, $6 = 0, $3 = 0, $8 = 0;
  $2 = __stack_pointer - 32 | 0;
  __stack_pointer = $2;
  _ZN12rust_runtime3mem8WAString3new17h3b4e78424fef5447E($2 | 0, $0 | 0, $1 | 0);
  $3 = HEAP32[($2 + 4 | 0) >> 2] | 0;
  $4 = HEAP32[$2 >> 2] | 0;
  _ZN12rust_runtime3mem3log17hfd3cd80676177765E($4 | 0);
  label$1 : {
   $5 = HEAP32[(0 + 1051808 | 0) >> 2] | 0;
   if (!$5) {
    break label$1
   }
   $6 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
   label$2 : {
    label$3 : while (1) {
     $7 = $5 + 44 | 0;
     $0 = $5 + 4 | 0;
     $8 = HEAPU16[($5 + 182 | 0) >> 1] | 0;
     $1 = $8 << 2 | 0;
     $9 = -1;
     label$4 : {
      label$5 : {
       label$6 : while (1) {
        label$7 : {
         if ($1) {
          break label$7
         }
         $9 = $8;
         break label$5;
        }
        $10 = HEAP32[$0 >> 2] | 0;
        $9 = $9 + 1 | 0;
        $7 = $7 + 12 | 0;
        $1 = $1 + -4 | 0;
        $0 = $0 + 4 | 0;
        $10 = $10 >>> 0 > $4 >>> 0 ? -1 : ($10 | 0) != ($4 | 0);
        if (($10 | 0) == (1 | 0)) {
         continue label$6
        }
        break label$6;
       };
       if (!($10 & 255 | 0)) {
        break label$4
       }
      }
      if (!$6) {
       break label$2
      }
      $6 = $6 + -1 | 0;
      $5 = HEAP32[(($5 + ($9 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
      continue label$3;
     }
     break label$3;
    };
    label$8 : {
     $1 = HEAP32[$7 >> 2] | 0;
     if ($1 >>> 0 > 1 >>> 0) {
      break label$8
     }
     HEAP32[($2 + 12 | 0) >> 2] = $4;
     _ZN5alloc11collections5btree3map25BTreeMap$LT$K$C$V$C$A$GT$6remove17hc793cbb765ab111dE($2 + 16 | 0 | 0, 1051808 | 0, $2 + 12 | 0 | 0);
     if (!(HEAP32[($2 + 16 | 0) >> 2] | 0)) {
      break label$2
     }
     __rust_dealloc(HEAP32[($2 + 24 | 0) >> 2] | 0 | 0, HEAP32[($2 + 20 | 0) >> 2] | 0 | 0, 1 | 0);
     break label$2;
    }
    HEAP32[$7 >> 2] = $1 + -1 | 0;
   }
   $4 = HEAP32[(0 + 1051808 | 0) >> 2] | 0;
   if (!$4) {
    break label$1
   }
   $5 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
   label$9 : while (1) {
    $7 = $4 + 44 | 0;
    $0 = $4 + 4 | 0;
    $6 = HEAPU16[($4 + 182 | 0) >> 1] | 0;
    $1 = $6 << 2 | 0;
    $9 = -1;
    label$10 : {
     label$11 : {
      label$12 : while (1) {
       label$13 : {
        if ($1) {
         break label$13
        }
        $9 = $6;
        break label$11;
       }
       $10 = HEAP32[$0 >> 2] | 0;
       $9 = $9 + 1 | 0;
       $7 = $7 + 12 | 0;
       $1 = $1 + -4 | 0;
       $0 = $0 + 4 | 0;
       $10 = $10 >>> 0 > $3 >>> 0 ? -1 : ($10 | 0) != ($3 | 0);
       if (($10 | 0) == (1 | 0)) {
        continue label$12
       }
       break label$12;
      };
      if (!($10 & 255 | 0)) {
       break label$10
      }
     }
     if (!$5) {
      break label$1
     }
     $5 = $5 + -1 | 0;
     $4 = HEAP32[(($4 + ($9 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     continue label$9;
    }
    break label$9;
   };
   label$14 : {
    $1 = HEAP32[$7 >> 2] | 0;
    if ($1 >>> 0 > 1 >>> 0) {
     break label$14
    }
    HEAP32[($2 + 12 | 0) >> 2] = $3;
    _ZN5alloc11collections5btree3map25BTreeMap$LT$K$C$V$C$A$GT$6remove17hc793cbb765ab111dE($2 + 16 | 0 | 0, 1051808 | 0, $2 + 12 | 0 | 0);
    if (!(HEAP32[($2 + 16 | 0) >> 2] | 0)) {
     break label$1
    }
    __rust_dealloc(HEAP32[($2 + 24 | 0) >> 2] | 0 | 0, HEAP32[($2 + 20 | 0) >> 2] | 0 | 0, 1 | 0);
    break label$1;
   }
   HEAP32[$7 >> 2] = $1 + -1 | 0;
  }
  __stack_pointer = $2 + 32 | 0;
 }
 
 function execute($0) {
  $0 = $0 | 0;
  _ZN12rust_runtime3mem7log_str17hac61e78d5ba71dcfE(1051264 | 0, 11 | 0);
  return $0 | 0;
 }
 
 function setEnvironment($0) {
  $0 = $0 | 0;
  var $1 = 0, $2 = 0, $10 = 0, $7 = 0, $9 = 0, $6 = 0, $4 = 0, $5 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$2 = 0, $3 = 0, $8 = 0, i64toi32_i32$4 = 0, i64toi32_i32$3 = 0, $20 = 0, $80 = 0, $82$hi = 0, $85$hi = 0, $86 = 0;
  $1 = __stack_pointer - 64 | 0;
  __stack_pointer = $1;
  _ZN12rust_runtime3mem7WAArray8from_ref17hc48303b07ff6a176E($1 | 0, $0 | 0);
  label$1 : {
   label$2 : {
    $2 = HEAP32[(0 + 1051808 | 0) >> 2] | 0;
    if (!$2) {
     break label$2
    }
    $3 = HEAP32[($1 + 4 | 0) >> 2] | 0;
    $4 = HEAP32[$1 >> 2] | 0;
    $5 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
    label$3 : while (1) {
     $6 = $2 + 36 | 0;
     $7 = $2 + 4 | 0;
     $8 = HEAPU16[($2 + 182 | 0) >> 1] | 0;
     $0 = $8 << 2 | 0;
     $9 = -1;
     label$4 : {
      label$5 : while (1) {
       label$6 : {
        if ($0) {
         break label$6
        }
        $9 = $8;
        break label$4;
       }
       $10 = HEAP32[$7 >> 2] | 0;
       $9 = $9 + 1 | 0;
       $6 = $6 + 12 | 0;
       $0 = $0 + -4 | 0;
       $7 = $7 + 4 | 0;
       $10 = $10 >>> 0 > $3 >>> 0 ? -1 : ($10 | 0) != ($3 | 0);
       if (($10 | 0) == (1 | 0)) {
        continue label$5
       }
       break label$5;
      };
      if (!($10 & 255 | 0)) {
       break label$1
      }
     }
     if (!$5) {
      break label$2
     }
     $5 = $5 + -1 | 0;
     $2 = HEAP32[(($2 + ($9 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     continue label$3;
    };
   }
   HEAP32[($1 + 56 | 0) >> 2] = 0;
   HEAP32[($1 + 44 | 0) >> 2] = 1;
   HEAP32[($1 + 40 | 0) >> 2] = 1051224;
   i64toi32_i32$1 = $1;
   i64toi32_i32$0 = 0;
   HEAP32[($1 + 48 | 0) >> 2] = 4;
   HEAP32[($1 + 52 | 0) >> 2] = i64toi32_i32$0;
   _ZN4core9panicking9panic_fmt17hb2f16849466f57b6E($1 + 40 | 0 | 0, 1051232 | 0);
   wasm2js_trap();
  }
  HEAP32[($1 + 36 | 0) >> 2] = HEAP32[$6 >> 2] | 0;
  HEAP32[($1 + 32 | 0) >> 2] = $3;
  HEAP32[($1 + 44 | 0) >> 2] = 1;
  HEAP32[($1 + 40 | 0) >> 2] = 1051292;
  i64toi32_i32$1 = $1;
  i64toi32_i32$0 = 0;
  HEAP32[($1 + 52 | 0) >> 2] = 1;
  HEAP32[($1 + 56 | 0) >> 2] = i64toi32_i32$0;
  $80 = $1;
  i64toi32_i32$0 = 0;
  i64toi32_i32$2 = 28;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
   $20 = 0;
  } else {
   i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$0 << i64toi32_i32$4 | 0) | 0;
   $20 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
  }
  $82$hi = i64toi32_i32$1;
  i64toi32_i32$1 = 0;
  $85$hi = i64toi32_i32$1;
  i64toi32_i32$1 = $82$hi;
  i64toi32_i32$0 = $20;
  i64toi32_i32$2 = $85$hi;
  i64toi32_i32$3 = $1 + 32 | 0;
  i64toi32_i32$2 = i64toi32_i32$1 | i64toi32_i32$2 | 0;
  $86 = i64toi32_i32$0 | i64toi32_i32$3 | 0;
  i64toi32_i32$0 = $80;
  HEAP32[(i64toi32_i32$0 + 24 | 0) >> 2] = $86;
  HEAP32[(i64toi32_i32$0 + 28 | 0) >> 2] = i64toi32_i32$2;
  HEAP32[($1 + 48 | 0) >> 2] = $1 + 24 | 0;
  _ZN5alloc3fmt6format12format_inner17hfada08777d0a48e9E($1 + 12 | 0 | 0, $1 + 40 | 0 | 0);
  $0 = HEAP32[($1 + 16 | 0) >> 2] | 0;
  _ZN12rust_runtime3mem7log_str17hac61e78d5ba71dcfE($0 | 0, HEAP32[($1 + 20 | 0) >> 2] | 0 | 0);
  label$7 : {
   $7 = HEAP32[($1 + 12 | 0) >> 2] | 0;
   if (!$7) {
    break label$7
   }
   __rust_dealloc($0 | 0, $7 | 0, 1 | 0);
  }
  label$8 : {
   $2 = HEAP32[(0 + 1051808 | 0) >> 2] | 0;
   if (!$2) {
    break label$8
   }
   $5 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
   label$9 : {
    label$10 : while (1) {
     $6 = $2 + 44 | 0;
     $7 = $2 + 4 | 0;
     $8 = HEAPU16[($2 + 182 | 0) >> 1] | 0;
     $0 = $8 << 2 | 0;
     $9 = -1;
     label$11 : {
      label$12 : {
       label$13 : while (1) {
        label$14 : {
         if ($0) {
          break label$14
         }
         $9 = $8;
         break label$12;
        }
        $10 = HEAP32[$7 >> 2] | 0;
        $9 = $9 + 1 | 0;
        $6 = $6 + 12 | 0;
        $0 = $0 + -4 | 0;
        $7 = $7 + 4 | 0;
        $10 = $10 >>> 0 > $4 >>> 0 ? -1 : ($10 | 0) != ($4 | 0);
        if (($10 | 0) == (1 | 0)) {
         continue label$13
        }
        break label$13;
       };
       if (!($10 & 255 | 0)) {
        break label$11
       }
      }
      if (!$5) {
       break label$9
      }
      $5 = $5 + -1 | 0;
      $2 = HEAP32[(($2 + ($9 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
      continue label$10;
     }
     break label$10;
    };
    label$15 : {
     $0 = HEAP32[$6 >> 2] | 0;
     if ($0 >>> 0 > 1 >>> 0) {
      break label$15
     }
     HEAP32[($1 + 12 | 0) >> 2] = $4;
     _ZN5alloc11collections5btree3map25BTreeMap$LT$K$C$V$C$A$GT$6remove17hc793cbb765ab111dE($1 + 40 | 0 | 0, 1051808 | 0, $1 + 12 | 0 | 0);
     if (!(HEAP32[($1 + 40 | 0) >> 2] | 0)) {
      break label$9
     }
     __rust_dealloc(HEAP32[($1 + 48 | 0) >> 2] | 0 | 0, HEAP32[($1 + 44 | 0) >> 2] | 0 | 0, 1 | 0);
     break label$9;
    }
    HEAP32[$6 >> 2] = $0 + -1 | 0;
   }
   $4 = HEAP32[(0 + 1051808 | 0) >> 2] | 0;
   if (!$4) {
    break label$8
   }
   $2 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
   label$16 : while (1) {
    $6 = $4 + 44 | 0;
    $7 = $4 + 4 | 0;
    $5 = HEAPU16[($4 + 182 | 0) >> 1] | 0;
    $0 = $5 << 2 | 0;
    $9 = -1;
    label$17 : {
     label$18 : {
      label$19 : while (1) {
       label$20 : {
        if ($0) {
         break label$20
        }
        $9 = $5;
        break label$18;
       }
       $10 = HEAP32[$7 >> 2] | 0;
       $9 = $9 + 1 | 0;
       $6 = $6 + 12 | 0;
       $0 = $0 + -4 | 0;
       $7 = $7 + 4 | 0;
       $10 = $10 >>> 0 > $3 >>> 0 ? -1 : ($10 | 0) != ($3 | 0);
       if (($10 | 0) == (1 | 0)) {
        continue label$19
       }
       break label$19;
      };
      if (!($10 & 255 | 0)) {
       break label$17
      }
     }
     if (!$2) {
      break label$8
     }
     $2 = $2 + -1 | 0;
     $4 = HEAP32[(($4 + ($9 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     continue label$16;
    }
    break label$16;
   };
   label$21 : {
    $0 = HEAP32[$6 >> 2] | 0;
    if ($0 >>> 0 > 1 >>> 0) {
     break label$21
    }
    HEAP32[($1 + 12 | 0) >> 2] = $3;
    _ZN5alloc11collections5btree3map25BTreeMap$LT$K$C$V$C$A$GT$6remove17hc793cbb765ab111dE($1 + 40 | 0 | 0, 1051808 | 0, $1 + 12 | 0 | 0);
    if (!(HEAP32[($1 + 40 | 0) >> 2] | 0)) {
     break label$8
    }
    __rust_dealloc(HEAP32[($1 + 48 | 0) >> 2] | 0 | 0, HEAP32[($1 + 44 | 0) >> 2] | 0 | 0, 1 | 0);
    break label$8;
   }
   HEAP32[$6 >> 2] = $0 + -1 | 0;
  }
  __stack_pointer = $1 + 64 | 0;
 }
 
 function onDeploy($0) {
  $0 = $0 | 0;
  _ZN12rust_runtime3mem7log_str17hac61e78d5ba71dcfE(1051300 | 0, 13 | 0);
 }
 
 function __new($0, $1) {
  $0 = $0 | 0;
  $1 = $1 | 0;
  return _ZN12rust_runtime3mem6WACell8new_size17h2ed2900047365a20E($1 | 0, $0 | 0) | 0 | 0;
 }
 
 function __unpin($0) {
  $0 = $0 | 0;
  var $1 = 0, $8 = 0, $3 = 0, $7 = 0, $2 = 0, $4 = 0, $6 = 0, $5 = 0;
  label$1 : {
   $1 = HEAP32[(0 + 1051808 | 0) >> 2] | 0;
   if (!$1) {
    break label$1
   }
   $2 = HEAP32[(0 + 1051812 | 0) >> 2] | 0;
   label$2 : while (1) {
    $3 = $1 + 44 | 0;
    $4 = $1 + 4 | 0;
    $5 = HEAPU16[($1 + 182 | 0) >> 1] | 0;
    $6 = $5 << 2 | 0;
    $7 = -1;
    label$3 : {
     label$4 : {
      label$5 : while (1) {
       label$6 : {
        if ($6) {
         break label$6
        }
        $7 = $5;
        break label$4;
       }
       $8 = HEAP32[$4 >> 2] | 0;
       $7 = $7 + 1 | 0;
       $3 = $3 + 12 | 0;
       $6 = $6 + -4 | 0;
       $4 = $4 + 4 | 0;
       $8 = $8 >>> 0 > $0 >>> 0 ? -1 : ($8 | 0) != ($0 | 0);
       if (($8 | 0) == (1 | 0)) {
        continue label$5
       }
       break label$5;
      };
      if (!($8 & 255 | 0)) {
       break label$3
      }
     }
     if (!$2) {
      break label$1
     }
     $2 = $2 + -1 | 0;
     $1 = HEAP32[(($1 + ($7 << 2 | 0) | 0) + 184 | 0) >> 2] | 0;
     continue label$2;
    }
    break label$2;
   };
   HEAP32[$3 >> 2] = (HEAP32[$3 >> 2] | 0) + -1 | 0;
  }
  _ZN12rust_runtime3mem7log_str17hac61e78d5ba71dcfE(1051313 | 0, 9 | 0);
 }
 
 function __collect() {
  
 }
 
 function _ZN17compiler_builtins3int3mul3Mul3mul17h070e9a1c69faec5bE(var$0, var$0$hi, var$1, var$1$hi) {
  var$0 = var$0 | 0;
  var$0$hi = var$0$hi | 0;
  var$1 = var$1 | 0;
  var$1$hi = var$1$hi | 0;
  var i64toi32_i32$4 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, var$2 = 0, i64toi32_i32$2 = 0, i64toi32_i32$3 = 0, var$3 = 0, var$4 = 0, var$5 = 0, $21 = 0, $22 = 0, var$6 = 0, $24 = 0, $17 = 0, $18 = 0, $23 = 0, $29 = 0, $45 = 0, $56$hi = 0, $62$hi = 0;
  i64toi32_i32$0 = var$1$hi;
  var$2 = var$1;
  var$4 = var$2 >>> 16 | 0;
  i64toi32_i32$0 = var$0$hi;
  var$3 = var$0;
  var$5 = var$3 >>> 16 | 0;
  $17 = Math_imul(var$4, var$5);
  $18 = var$2;
  i64toi32_i32$2 = var$3;
  i64toi32_i32$1 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$1 = 0;
   $21 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
  } else {
   i64toi32_i32$1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
   $21 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$0 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
  }
  $23 = $17 + Math_imul($18, $21) | 0;
  i64toi32_i32$1 = var$1$hi;
  i64toi32_i32$0 = var$1;
  i64toi32_i32$2 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$2 = 0;
   $22 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
  } else {
   i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
   $22 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$0 >>> i64toi32_i32$4 | 0) | 0;
  }
  $29 = $23 + Math_imul($22, var$3) | 0;
  var$2 = var$2 & 65535 | 0;
  var$3 = var$3 & 65535 | 0;
  var$6 = Math_imul(var$2, var$3);
  var$2 = (var$6 >>> 16 | 0) + Math_imul(var$2, var$5) | 0;
  $45 = $29 + (var$2 >>> 16 | 0) | 0;
  var$2 = (var$2 & 65535 | 0) + Math_imul(var$4, var$3) | 0;
  i64toi32_i32$2 = 0;
  i64toi32_i32$1 = $45 + (var$2 >>> 16 | 0) | 0;
  i64toi32_i32$0 = 0;
  i64toi32_i32$3 = 32;
  i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
  if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
   i64toi32_i32$0 = i64toi32_i32$1 << i64toi32_i32$4 | 0;
   $24 = 0;
  } else {
   i64toi32_i32$0 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$1 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$2 << i64toi32_i32$4 | 0) | 0;
   $24 = i64toi32_i32$1 << i64toi32_i32$4 | 0;
  }
  $56$hi = i64toi32_i32$0;
  i64toi32_i32$0 = 0;
  $62$hi = i64toi32_i32$0;
  i64toi32_i32$0 = $56$hi;
  i64toi32_i32$2 = $24;
  i64toi32_i32$1 = $62$hi;
  i64toi32_i32$3 = var$2 << 16 | 0 | (var$6 & 65535 | 0) | 0;
  i64toi32_i32$1 = i64toi32_i32$0 | i64toi32_i32$1 | 0;
  i64toi32_i32$2 = i64toi32_i32$2 | i64toi32_i32$3 | 0;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
  return i64toi32_i32$2 | 0;
 }
 
 function _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E(var$0, var$0$hi, var$1, var$1$hi) {
  var$0 = var$0 | 0;
  var$0$hi = var$0$hi | 0;
  var$1 = var$1 | 0;
  var$1$hi = var$1$hi | 0;
  var i64toi32_i32$2 = 0, i64toi32_i32$3 = 0, i64toi32_i32$4 = 0, i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$5 = 0, var$2 = 0, var$3 = 0, var$4 = 0, var$5 = 0, var$5$hi = 0, var$6 = 0, var$6$hi = 0, i64toi32_i32$6 = 0, $37 = 0, $38 = 0, $39 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, var$8$hi = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, var$7$hi = 0, $49 = 0, $63$hi = 0, $65 = 0, $65$hi = 0, $120$hi = 0, $129$hi = 0, $134$hi = 0, var$8 = 0, $140 = 0, $140$hi = 0, $142$hi = 0, $144 = 0, $144$hi = 0, $151 = 0, $151$hi = 0, $154$hi = 0, var$7 = 0, $165$hi = 0;
  label$1 : {
   label$2 : {
    label$3 : {
     label$4 : {
      label$5 : {
       label$6 : {
        label$7 : {
         label$8 : {
          label$9 : {
           label$10 : {
            label$11 : {
             i64toi32_i32$0 = var$0$hi;
             i64toi32_i32$2 = var$0;
             i64toi32_i32$1 = 0;
             i64toi32_i32$3 = 32;
             i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
             if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
              i64toi32_i32$1 = 0;
              $37 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
             } else {
              i64toi32_i32$1 = i64toi32_i32$0 >>> i64toi32_i32$4 | 0;
              $37 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$0 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
             }
             var$2 = $37;
             if (var$2) {
              i64toi32_i32$1 = var$1$hi;
              var$3 = var$1;
              if (!var$3) {
               break label$11
              }
              i64toi32_i32$0 = var$3;
              i64toi32_i32$2 = 0;
              i64toi32_i32$3 = 32;
              i64toi32_i32$4 = i64toi32_i32$3 & 31 | 0;
              if (32 >>> 0 <= (i64toi32_i32$3 & 63 | 0) >>> 0) {
               i64toi32_i32$2 = 0;
               $38 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
              } else {
               i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$4 | 0;
               $38 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$0 >>> i64toi32_i32$4 | 0) | 0;
              }
              var$4 = $38;
              if (!var$4) {
               break label$9
              }
              var$2 = Math_clz32(var$4) - Math_clz32(var$2) | 0;
              if (var$2 >>> 0 <= 31 >>> 0) {
               break label$8
              }
              break label$2;
             }
             i64toi32_i32$2 = var$1$hi;
             i64toi32_i32$1 = var$1;
             i64toi32_i32$0 = 1;
             i64toi32_i32$3 = 0;
             if (i64toi32_i32$2 >>> 0 > i64toi32_i32$0 >>> 0 | ((i64toi32_i32$2 | 0) == (i64toi32_i32$0 | 0) & i64toi32_i32$1 >>> 0 >= i64toi32_i32$3 >>> 0 | 0) | 0) {
              break label$2
             }
             i64toi32_i32$1 = var$0$hi;
             var$2 = var$0;
             i64toi32_i32$1 = i64toi32_i32$2;
             i64toi32_i32$1 = i64toi32_i32$2;
             var$3 = var$1;
             var$2 = (var$2 >>> 0) / (var$3 >>> 0) | 0;
             i64toi32_i32$1 = 0;
             __wasm_intrinsics_temp_i64 = var$0 - Math_imul(var$2, var$3) | 0;
             __wasm_intrinsics_temp_i64$hi = i64toi32_i32$1;
             i64toi32_i32$1 = 0;
             i64toi32_i32$2 = var$2;
             i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
             return i64toi32_i32$2 | 0;
            }
            i64toi32_i32$2 = var$1$hi;
            i64toi32_i32$3 = var$1;
            i64toi32_i32$1 = 0;
            i64toi32_i32$0 = 32;
            i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
            if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
             i64toi32_i32$1 = 0;
             $39 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
            } else {
             i64toi32_i32$1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
             $39 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$2 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$3 >>> i64toi32_i32$4 | 0) | 0;
            }
            var$3 = $39;
            i64toi32_i32$1 = var$0$hi;
            if (!var$0) {
             break label$7
            }
            if (!var$3) {
             break label$6
            }
            var$4 = var$3 + -1 | 0;
            if (var$4 & var$3 | 0) {
             break label$6
            }
            i64toi32_i32$1 = 0;
            i64toi32_i32$2 = var$4 & var$2 | 0;
            i64toi32_i32$3 = 0;
            i64toi32_i32$0 = 32;
            i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
            if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
             i64toi32_i32$3 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
             $40 = 0;
            } else {
             i64toi32_i32$3 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
             $40 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
            }
            $63$hi = i64toi32_i32$3;
            i64toi32_i32$3 = var$0$hi;
            i64toi32_i32$1 = var$0;
            i64toi32_i32$2 = 0;
            i64toi32_i32$0 = -1;
            i64toi32_i32$2 = i64toi32_i32$3 & i64toi32_i32$2 | 0;
            $65 = i64toi32_i32$1 & i64toi32_i32$0 | 0;
            $65$hi = i64toi32_i32$2;
            i64toi32_i32$2 = $63$hi;
            i64toi32_i32$3 = $40;
            i64toi32_i32$1 = $65$hi;
            i64toi32_i32$0 = $65;
            i64toi32_i32$1 = i64toi32_i32$2 | i64toi32_i32$1 | 0;
            __wasm_intrinsics_temp_i64 = i64toi32_i32$3 | i64toi32_i32$0 | 0;
            __wasm_intrinsics_temp_i64$hi = i64toi32_i32$1;
            i64toi32_i32$1 = 0;
            i64toi32_i32$3 = var$2 >>> ((__wasm_ctz_i32(var$3 | 0) | 0) & 31 | 0) | 0;
            i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
            return i64toi32_i32$3 | 0;
           }
          }
          var$4 = var$3 + -1 | 0;
          if (!(var$4 & var$3 | 0)) {
           break label$5
          }
          var$2 = (Math_clz32(var$3) + 33 | 0) - Math_clz32(var$2) | 0;
          var$3 = 0 - var$2 | 0;
          break label$3;
         }
         var$3 = 63 - var$2 | 0;
         var$2 = var$2 + 1 | 0;
         break label$3;
        }
        var$4 = (var$2 >>> 0) / (var$3 >>> 0) | 0;
        i64toi32_i32$3 = 0;
        i64toi32_i32$2 = var$2 - Math_imul(var$4, var$3) | 0;
        i64toi32_i32$1 = 0;
        i64toi32_i32$0 = 32;
        i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
        if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
         i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
         $41 = 0;
        } else {
         i64toi32_i32$1 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$3 << i64toi32_i32$4 | 0) | 0;
         $41 = i64toi32_i32$2 << i64toi32_i32$4 | 0;
        }
        __wasm_intrinsics_temp_i64 = $41;
        __wasm_intrinsics_temp_i64$hi = i64toi32_i32$1;
        i64toi32_i32$1 = 0;
        i64toi32_i32$2 = var$4;
        i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
        return i64toi32_i32$2 | 0;
       }
       var$2 = Math_clz32(var$3) - Math_clz32(var$2) | 0;
       if (var$2 >>> 0 < 31 >>> 0) {
        break label$4
       }
       break label$2;
      }
      i64toi32_i32$2 = var$0$hi;
      i64toi32_i32$2 = 0;
      __wasm_intrinsics_temp_i64 = var$4 & var$0 | 0;
      __wasm_intrinsics_temp_i64$hi = i64toi32_i32$2;
      if ((var$3 | 0) == (1 | 0)) {
       break label$1
      }
      i64toi32_i32$2 = var$0$hi;
      i64toi32_i32$2 = 0;
      $120$hi = i64toi32_i32$2;
      i64toi32_i32$2 = var$0$hi;
      i64toi32_i32$3 = var$0;
      i64toi32_i32$1 = $120$hi;
      i64toi32_i32$0 = __wasm_ctz_i32(var$3 | 0) | 0;
      i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
      if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
       i64toi32_i32$1 = 0;
       $42 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
      } else {
       i64toi32_i32$1 = i64toi32_i32$2 >>> i64toi32_i32$4 | 0;
       $42 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$2 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$3 >>> i64toi32_i32$4 | 0) | 0;
      }
      i64toi32_i32$3 = $42;
      i64toi32_i32$HIGH_BITS = i64toi32_i32$1;
      return i64toi32_i32$3 | 0;
     }
     var$3 = 63 - var$2 | 0;
     var$2 = var$2 + 1 | 0;
    }
    i64toi32_i32$3 = var$0$hi;
    i64toi32_i32$3 = 0;
    $129$hi = i64toi32_i32$3;
    i64toi32_i32$3 = var$0$hi;
    i64toi32_i32$2 = var$0;
    i64toi32_i32$1 = $129$hi;
    i64toi32_i32$0 = var$2 & 63 | 0;
    i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
     i64toi32_i32$1 = 0;
     $43 = i64toi32_i32$3 >>> i64toi32_i32$4 | 0;
    } else {
     i64toi32_i32$1 = i64toi32_i32$3 >>> i64toi32_i32$4 | 0;
     $43 = (((1 << i64toi32_i32$4 | 0) - 1 | 0) & i64toi32_i32$3 | 0) << (32 - i64toi32_i32$4 | 0) | 0 | (i64toi32_i32$2 >>> i64toi32_i32$4 | 0) | 0;
    }
    var$5 = $43;
    var$5$hi = i64toi32_i32$1;
    i64toi32_i32$1 = var$0$hi;
    i64toi32_i32$1 = 0;
    $134$hi = i64toi32_i32$1;
    i64toi32_i32$1 = var$0$hi;
    i64toi32_i32$3 = var$0;
    i64toi32_i32$2 = $134$hi;
    i64toi32_i32$0 = var$3 & 63 | 0;
    i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
     i64toi32_i32$2 = i64toi32_i32$3 << i64toi32_i32$4 | 0;
     $44 = 0;
    } else {
     i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$3 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$1 << i64toi32_i32$4 | 0) | 0;
     $44 = i64toi32_i32$3 << i64toi32_i32$4 | 0;
    }
    var$0 = $44;
    var$0$hi = i64toi32_i32$2;
    label$13 : {
     if (var$2) {
      i64toi32_i32$2 = var$1$hi;
      i64toi32_i32$1 = var$1;
      i64toi32_i32$3 = -1;
      i64toi32_i32$0 = -1;
      i64toi32_i32$4 = i64toi32_i32$1 + i64toi32_i32$0 | 0;
      i64toi32_i32$5 = i64toi32_i32$2 + i64toi32_i32$3 | 0;
      if (i64toi32_i32$4 >>> 0 < i64toi32_i32$0 >>> 0) {
       i64toi32_i32$5 = i64toi32_i32$5 + 1 | 0
      }
      var$8 = i64toi32_i32$4;
      var$8$hi = i64toi32_i32$5;
      label$15 : while (1) {
       i64toi32_i32$5 = var$5$hi;
       i64toi32_i32$2 = var$5;
       i64toi32_i32$1 = 0;
       i64toi32_i32$0 = 1;
       i64toi32_i32$3 = i64toi32_i32$0 & 31 | 0;
       if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
        i64toi32_i32$1 = i64toi32_i32$2 << i64toi32_i32$3 | 0;
        $45 = 0;
       } else {
        i64toi32_i32$1 = ((1 << i64toi32_i32$3 | 0) - 1 | 0) & (i64toi32_i32$2 >>> (32 - i64toi32_i32$3 | 0) | 0) | 0 | (i64toi32_i32$5 << i64toi32_i32$3 | 0) | 0;
        $45 = i64toi32_i32$2 << i64toi32_i32$3 | 0;
       }
       $140 = $45;
       $140$hi = i64toi32_i32$1;
       i64toi32_i32$1 = var$0$hi;
       i64toi32_i32$5 = var$0;
       i64toi32_i32$2 = 0;
       i64toi32_i32$0 = 63;
       i64toi32_i32$3 = i64toi32_i32$0 & 31 | 0;
       if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
        i64toi32_i32$2 = 0;
        $46 = i64toi32_i32$1 >>> i64toi32_i32$3 | 0;
       } else {
        i64toi32_i32$2 = i64toi32_i32$1 >>> i64toi32_i32$3 | 0;
        $46 = (((1 << i64toi32_i32$3 | 0) - 1 | 0) & i64toi32_i32$1 | 0) << (32 - i64toi32_i32$3 | 0) | 0 | (i64toi32_i32$5 >>> i64toi32_i32$3 | 0) | 0;
       }
       $142$hi = i64toi32_i32$2;
       i64toi32_i32$2 = $140$hi;
       i64toi32_i32$1 = $140;
       i64toi32_i32$5 = $142$hi;
       i64toi32_i32$0 = $46;
       i64toi32_i32$5 = i64toi32_i32$2 | i64toi32_i32$5 | 0;
       var$5 = i64toi32_i32$1 | i64toi32_i32$0 | 0;
       var$5$hi = i64toi32_i32$5;
       $144 = var$5;
       $144$hi = i64toi32_i32$5;
       i64toi32_i32$5 = var$8$hi;
       i64toi32_i32$5 = var$5$hi;
       i64toi32_i32$5 = var$8$hi;
       i64toi32_i32$2 = var$8;
       i64toi32_i32$1 = var$5$hi;
       i64toi32_i32$0 = var$5;
       i64toi32_i32$3 = i64toi32_i32$2 - i64toi32_i32$0 | 0;
       i64toi32_i32$6 = i64toi32_i32$2 >>> 0 < i64toi32_i32$0 >>> 0;
       i64toi32_i32$4 = i64toi32_i32$6 + i64toi32_i32$1 | 0;
       i64toi32_i32$4 = i64toi32_i32$5 - i64toi32_i32$4 | 0;
       i64toi32_i32$5 = i64toi32_i32$3;
       i64toi32_i32$2 = 0;
       i64toi32_i32$0 = 63;
       i64toi32_i32$1 = i64toi32_i32$0 & 31 | 0;
       if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
        i64toi32_i32$2 = i64toi32_i32$4 >> 31 | 0;
        $47 = i64toi32_i32$4 >> i64toi32_i32$1 | 0;
       } else {
        i64toi32_i32$2 = i64toi32_i32$4 >> i64toi32_i32$1 | 0;
        $47 = (((1 << i64toi32_i32$1 | 0) - 1 | 0) & i64toi32_i32$4 | 0) << (32 - i64toi32_i32$1 | 0) | 0 | (i64toi32_i32$5 >>> i64toi32_i32$1 | 0) | 0;
       }
       var$6 = $47;
       var$6$hi = i64toi32_i32$2;
       i64toi32_i32$2 = var$1$hi;
       i64toi32_i32$2 = var$6$hi;
       i64toi32_i32$4 = var$6;
       i64toi32_i32$5 = var$1$hi;
       i64toi32_i32$0 = var$1;
       i64toi32_i32$5 = i64toi32_i32$2 & i64toi32_i32$5 | 0;
       $151 = i64toi32_i32$4 & i64toi32_i32$0 | 0;
       $151$hi = i64toi32_i32$5;
       i64toi32_i32$5 = $144$hi;
       i64toi32_i32$2 = $144;
       i64toi32_i32$4 = $151$hi;
       i64toi32_i32$0 = $151;
       i64toi32_i32$1 = i64toi32_i32$2 - i64toi32_i32$0 | 0;
       i64toi32_i32$6 = i64toi32_i32$2 >>> 0 < i64toi32_i32$0 >>> 0;
       i64toi32_i32$3 = i64toi32_i32$6 + i64toi32_i32$4 | 0;
       i64toi32_i32$3 = i64toi32_i32$5 - i64toi32_i32$3 | 0;
       var$5 = i64toi32_i32$1;
       var$5$hi = i64toi32_i32$3;
       i64toi32_i32$3 = var$0$hi;
       i64toi32_i32$5 = var$0;
       i64toi32_i32$2 = 0;
       i64toi32_i32$0 = 1;
       i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
       if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
        i64toi32_i32$2 = i64toi32_i32$5 << i64toi32_i32$4 | 0;
        $48 = 0;
       } else {
        i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$5 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$3 << i64toi32_i32$4 | 0) | 0;
        $48 = i64toi32_i32$5 << i64toi32_i32$4 | 0;
       }
       $154$hi = i64toi32_i32$2;
       i64toi32_i32$2 = var$7$hi;
       i64toi32_i32$2 = $154$hi;
       i64toi32_i32$3 = $48;
       i64toi32_i32$5 = var$7$hi;
       i64toi32_i32$0 = var$7;
       i64toi32_i32$5 = i64toi32_i32$2 | i64toi32_i32$5 | 0;
       var$0 = i64toi32_i32$3 | i64toi32_i32$0 | 0;
       var$0$hi = i64toi32_i32$5;
       i64toi32_i32$5 = var$6$hi;
       i64toi32_i32$2 = var$6;
       i64toi32_i32$3 = 0;
       i64toi32_i32$0 = 1;
       i64toi32_i32$3 = i64toi32_i32$5 & i64toi32_i32$3 | 0;
       var$6 = i64toi32_i32$2 & i64toi32_i32$0 | 0;
       var$6$hi = i64toi32_i32$3;
       var$7 = var$6;
       var$7$hi = i64toi32_i32$3;
       var$2 = var$2 + -1 | 0;
       if (var$2) {
        continue label$15
       }
       break label$15;
      };
      break label$13;
     }
    }
    i64toi32_i32$3 = var$5$hi;
    __wasm_intrinsics_temp_i64 = var$5;
    __wasm_intrinsics_temp_i64$hi = i64toi32_i32$3;
    i64toi32_i32$3 = var$0$hi;
    i64toi32_i32$5 = var$0;
    i64toi32_i32$2 = 0;
    i64toi32_i32$0 = 1;
    i64toi32_i32$4 = i64toi32_i32$0 & 31 | 0;
    if (32 >>> 0 <= (i64toi32_i32$0 & 63 | 0) >>> 0) {
     i64toi32_i32$2 = i64toi32_i32$5 << i64toi32_i32$4 | 0;
     $49 = 0;
    } else {
     i64toi32_i32$2 = ((1 << i64toi32_i32$4 | 0) - 1 | 0) & (i64toi32_i32$5 >>> (32 - i64toi32_i32$4 | 0) | 0) | 0 | (i64toi32_i32$3 << i64toi32_i32$4 | 0) | 0;
     $49 = i64toi32_i32$5 << i64toi32_i32$4 | 0;
    }
    $165$hi = i64toi32_i32$2;
    i64toi32_i32$2 = var$6$hi;
    i64toi32_i32$2 = $165$hi;
    i64toi32_i32$3 = $49;
    i64toi32_i32$5 = var$6$hi;
    i64toi32_i32$0 = var$6;
    i64toi32_i32$5 = i64toi32_i32$2 | i64toi32_i32$5 | 0;
    i64toi32_i32$3 = i64toi32_i32$3 | i64toi32_i32$0 | 0;
    i64toi32_i32$HIGH_BITS = i64toi32_i32$5;
    return i64toi32_i32$3 | 0;
   }
   i64toi32_i32$3 = var$0$hi;
   __wasm_intrinsics_temp_i64 = var$0;
   __wasm_intrinsics_temp_i64$hi = i64toi32_i32$3;
   i64toi32_i32$3 = 0;
   var$0 = 0;
   var$0$hi = i64toi32_i32$3;
  }
  i64toi32_i32$3 = var$0$hi;
  i64toi32_i32$5 = var$0;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$3;
  return i64toi32_i32$5 | 0;
 }
 
 function __wasm_ctz_i32(var$0) {
  var$0 = var$0 | 0;
  if (var$0) {
   return 31 - Math_clz32((var$0 + -1 | 0) ^ var$0 | 0) | 0 | 0
  }
  return 32 | 0;
 }
 
 function __wasm_i64_mul(var$0, var$0$hi, var$1, var$1$hi) {
  var$0 = var$0 | 0;
  var$0$hi = var$0$hi | 0;
  var$1 = var$1 | 0;
  var$1$hi = var$1$hi | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0;
  i64toi32_i32$0 = var$0$hi;
  i64toi32_i32$0 = var$1$hi;
  i64toi32_i32$0 = var$0$hi;
  i64toi32_i32$1 = var$1$hi;
  i64toi32_i32$1 = _ZN17compiler_builtins3int3mul3Mul3mul17h070e9a1c69faec5bE(var$0 | 0, i64toi32_i32$0 | 0, var$1 | 0, i64toi32_i32$1 | 0) | 0;
  i64toi32_i32$0 = i64toi32_i32$HIGH_BITS;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$0;
  return i64toi32_i32$1 | 0;
 }
 
 function __wasm_i64_udiv(var$0, var$0$hi, var$1, var$1$hi) {
  var$0 = var$0 | 0;
  var$0$hi = var$0$hi | 0;
  var$1 = var$1 | 0;
  var$1$hi = var$1$hi | 0;
  var i64toi32_i32$0 = 0, i64toi32_i32$1 = 0;
  i64toi32_i32$0 = var$0$hi;
  i64toi32_i32$0 = var$1$hi;
  i64toi32_i32$0 = var$0$hi;
  i64toi32_i32$1 = var$1$hi;
  i64toi32_i32$1 = _ZN17compiler_builtins3int4udiv10divmod_u6417h6026910b5ed08e40E(var$0 | 0, i64toi32_i32$0 | 0, var$1 | 0, i64toi32_i32$1 | 0) | 0;
  i64toi32_i32$0 = i64toi32_i32$HIGH_BITS;
  i64toi32_i32$HIGH_BITS = i64toi32_i32$0;
  return i64toi32_i32$1 | 0;
 }
 
 function __wasm_rotl_i32(var$0, var$1) {
  var$0 = var$0 | 0;
  var$1 = var$1 | 0;
  var var$2 = 0;
  var$2 = var$1 & 31 | 0;
  var$1 = (0 - var$1 | 0) & 31 | 0;
  return ((-1 >>> var$2 | 0) & var$0 | 0) << var$2 | 0 | (((-1 << var$1 | 0) & var$0 | 0) >>> var$1 | 0) | 0 | 0;
 }
 
 bufferView = HEAPU8;
 initActiveSegments(imports);
 var FUNCTION_TABLE = [null, _ZN4core3fmt3num3imp52_$LT$impl$u20$core__fmt__Display$u20$for$u20$u32$GT$3fmt17h5732d357c58d2b36E, _ZN3std5alloc24default_alloc_error_hook17h708687752e0edcfaE, _ZN4core3ptr42drop_in_place$LT$alloc__string__String$GT$17hb5bccdeece555eeeE, _ZN58_$LT$alloc__string__String$u20$as$u20$core__fmt__Write$GT$9write_str17h9c2d3e9aafc08637E, _ZN58_$LT$alloc__string__String$u20$as$u20$core__fmt__Write$GT$10write_char17h9231f70fbd335441E, _ZN4core3fmt5Write9write_fmt17h44df5905957d3a1fE, _ZN36_$LT$T$u20$as$u20$core__any__Any$GT$7type_id17h698f49bbed3b63dfE, _ZN36_$LT$T$u20$as$u20$core__any__Any$GT$7type_id17h1116370b49193673E, _ZN92_$LT$std__panicking__begin_panic_handler__StaticStrPayload$u20$as$u20$core__fmt__Display$GT$3fmt17h7d6d1d4c62b643baE, _ZN99_$LT$std__panicking__begin_panic_handler__StaticStrPayload$u20$as$u20$core__panic__PanicPayload$GT$8take_box17hdbb807c1367ee940E, _ZN99_$LT$std__panicking__begin_panic_handler__StaticStrPayload$u20$as$u20$core__panic__PanicPayload$GT$3get17hd2f9ef478e42b077E, _ZN99_$LT$std__panicking__begin_panic_handler__StaticStrPayload$u20$as$u20$core__panic__PanicPayload$GT$6as_str17h231eb7cfbc685441E, _ZN4core3ptr77drop_in_place$LT$std__panicking__begin_panic_handler__FormatStringPayload$GT$17hec524af3f69d5a53E, _ZN95_$LT$std__panicking__begin_panic_handler__FormatStringPayload$u20$as$u20$core__fmt__Display$GT$3fmt17h778dceefa8ea4afeE, _ZN102_$LT$std__panicking__begin_panic_handler__FormatStringPayload$u20$as$u20$core__panic__PanicPayload$GT$8take_box17hfdafd7cd188838afE, _ZN102_$LT$std__panicking__begin_panic_handler__FormatStringPayload$u20$as$u20$core__panic__PanicPayload$GT$3get17h3875705a18b9af03E, _ZN4core5panic12PanicPayload6as_str17hd887f5dc9940e8f0E, _ZN4core3ptr42drop_in_place$LT$alloc__string__String$GT$17h0f9d5bab53e46359E, _ZN58_$LT$alloc__string__String$u20$as$u20$core__fmt__Write$GT$9write_str17h9c2d3e9aafc08637E_52, _ZN58_$LT$alloc__string__String$u20$as$u20$core__fmt__Write$GT$10write_char17h9231f70fbd335441E_53, _ZN4core3fmt5Write9write_fmt17h12c6d34f0ecf8d3dE, _ZN53_$LT$core__fmt__Error$u20$as$u20$core__fmt__Debug$GT$3fmt17hc7b9dec108bfb98cE, _ZN42_$LT$$RF$T$u20$as$u20$core__fmt__Debug$GT$3fmt17h02f2c499cdd866a1E, _ZN44_$LT$$RF$T$u20$as$u20$core__fmt__Display$GT$3fmt17h0e730352ba1d2064E, _ZN68_$LT$core__fmt__builders__PadAdapter$u20$as$u20$core__fmt__Write$GT$9write_str17hcef790f9881e69b1E, _ZN68_$LT$core__fmt__builders__PadAdapter$u20$as$u20$core__fmt__Write$GT$10write_char17h8982d69464cb262aE, _ZN4core3fmt5Write9write_fmt17h7b710d0d35de0c2bE, _ZN42_$LT$$RF$T$u20$as$u20$core__fmt__Debug$GT$3fmt17h48376aecd7558ddcE, _ZN42_$LT$$RF$T$u20$as$u20$core__fmt__Debug$GT$3fmt17hc2f10bc6239b2f43E];
 function __wasm_memory_size() {
  return buffer.byteLength / 65536 | 0;
 }
 
 function __wasm_memory_grow(pagesToAdd) {
  pagesToAdd = pagesToAdd | 0;
  var oldPages = __wasm_memory_size() | 0;
  var newPages = oldPages + pagesToAdd | 0;
  if ((oldPages < newPages) && (newPages < 65536)) {
   var newBuffer = new ArrayBuffer(Math_imul(newPages, 65536));
   var newHEAP8 = new Int8Array(newBuffer);
   newHEAP8.set(HEAP8);
   HEAP8 = new Int8Array(newBuffer);
   HEAP16 = new Int16Array(newBuffer);
   HEAP32 = new Int32Array(newBuffer);
   HEAPU8 = new Uint8Array(newBuffer);
   HEAPU16 = new Uint16Array(newBuffer);
   HEAPU32 = new Uint32Array(newBuffer);
   HEAPF32 = new Float32Array(newBuffer);
   HEAPF64 = new Float64Array(newBuffer);
   buffer = newBuffer;
   bufferView = HEAPU8;
  }
  return oldPages;
 }
 
 return {
  "memory": Object.create(Object.prototype, {
   "grow": {
    "value": __wasm_memory_grow
   }, 
   "buffer": {
    "get": function () {
     return buffer;
    }
    
   }
  }), 
  "execute": execute, 
  "setEnvironment": setEnvironment, 
  "onDeploy": onDeploy, 
  "__new": __new, 
  "__unpin": __unpin, 
  "__collect": __collect, 
  "__pin": _ZN12rust_runtime3mem8WABuffer8from_ref17hd15e58422a800be2E, 
  "__data_end": {
   get value() {
    return global$1;
   }, 
   set value(_global$1) {
    global$1 = _global$1;
   }
  }, 
  "__heap_base": {
   get value() {
    return global$2;
   }, 
   set value(_global$2) {
    global$2 = _global$2;
   }
  }
 };
}

var retasmFunc = asmFunc({
  "env": env,
});
export var memory = retasmFunc.memory;
export var execute = retasmFunc.execute;
export var setEnvironment = retasmFunc.setEnvironment;
export var onDeploy = retasmFunc.onDeploy;
export var __new = retasmFunc.__new;
export var __unpin = retasmFunc.__unpin;
export var __collect = retasmFunc.__collect;
export var __pin = retasmFunc.__pin;
export var __data_end = retasmFunc.__data_end;
export var __heap_base = retasmFunc.__heap_base;
