class Thing{
    protected doSomething(){
        /* ... */
    }
}

class MyThing extends Thing{
    public myMethod(){
        //ok, can acdess protected member from subclass
        this.doSomething();
    }
}

var t = new MyThing();
// t.doSomething(); // [ts] 属性“doSomething”受保护，只能在类“Thing”及其子类中访问。
