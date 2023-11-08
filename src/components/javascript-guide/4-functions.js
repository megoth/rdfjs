function functionName(arg1, arg2) {
    return arg1 + arg2;
}

const anonymousFunction1 = function (arg1, arg2) {
    return arg1 + arg2;
};
const anonymousFunction2 = (arg1, arg2) => arg1 + arg2;

const objectWithMethods = {
    foo: functionName,
    bar: (arg3) => arg3 + 42,
    baz: function (arg4, arg5) {
        return this.foo(arg4, arg5) + this.bar(arg4);
    },
};