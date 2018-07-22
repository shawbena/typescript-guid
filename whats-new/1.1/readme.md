# TypeScript 1.1

## 性能改进

## 更佳的模块可见性规则

现在只有在在提供了 `--declaration` 标签时才严格地强制模块中类型的可见性。对 Angular 来说是很有用的，如：

```ts
module MyControllers {
  interface ZooScope extends ng.IScope {
    animals: Animal[];
  }
  export class ZooController {
    // Used to be an error (cannot expose ZooScope), but now is only
    // an error when trying to generate .d.ts files
    constructor(public $scope: ZooScope) { }
    /* more code */
  }
}
```