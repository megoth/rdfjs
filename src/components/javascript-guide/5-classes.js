class SomeClass {
    constructor() {
        this.foo = 42;
    }
}

class ExtendedClass extends SomeClass {
    constructor() {
        super();
        this.bar = 1337;
    }
}