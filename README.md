# NcbiWasm
NCBI Toolkit WebAssembly Demo

Small demo of NCBI Toolkit ported to WebAssembly: view and modify NCBI ASN.1 data directly in your browser.

WebAssembly module provides asnObject class. Constructor creates an instance from ASN.1 text data. Only Seq-entry is supported.

Class provides the following methods:
* getView() - Get FlatFile view
* getText() - Get ASN.1 text 
* applyMacro(string mql) - Apply Macro, Macro language description: https://www.ncbi.nlm.nih.gov/tools/gbench/manual3/
* undoLast() - Undo last macro

---
1\. Install
  ```
  npm install
  ```

2\. Test
  ```
  npm run dev
  ```

3\. Build
  ```
  npm run build
  ```
