// Scope is what we have access to at any point in time (the debug tool can help define what you have access to)

// global
let companyName = "CodeCademy";

// Function
function doStuff() {
  let functionScoped = "this is not avaialble outside the function";
}

//  Block - any time we create curly braces, we create a block
{
  let blockScoped = "only in the curly braces";
}
